create extension if not exists pgcrypto;

do $$
begin
  create type public.submission_category as enum (
    'Brand Poster',
    'Ad Film',
    'Short-form Drama'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.age_group as enum (
    '청소년부',
    '청년부',
    '중장년부',
    '시니어부'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.production_type as enum (
    '개인',
    '팀'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.submission_status as enum (
    '접수완료',
    '검토중',
    '수상확정',
    '내년에 재도전 응원해요'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  receipt_no text not null unique,
  category public.submission_category not null,
  entry_title text not null,
  work_title text not null,
  age_group public.age_group not null,
  production_type public.production_type not null,
  runtime_or_size text not null,
  ai_used boolean not null,
  ai_description text,
  synopsis text not null,
  youtube_url text,
  instagram_url text,
  tiktok_url text,
  name text not null,
  phone text not null,
  email text not null,
  rules_consent boolean not null,
  rights_consent boolean not null,
  privacy_consent boolean not null,
  promotion_consent boolean not null,
  status public.submission_status not null default '접수완료',
  admin_memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint submissions_one_sns_url_required check (
    nullif(btrim(coalesce(youtube_url, '')), '') is not null
    or nullif(btrim(coalesce(instagram_url, '')), '') is not null
    or nullif(btrim(coalesce(tiktok_url, '')), '') is not null
  ),
  constraint submissions_consents_required check (
    rules_consent
    and rights_consent
    and privacy_consent
    and promotion_consent
  ),
  constraint submissions_email_shape check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  )
);

create index if not exists submissions_status_idx on public.submissions (status);
create index if not exists submissions_category_idx on public.submissions (category);
create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_email_idx on public.submissions (email);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_submissions_updated_at on public.submissions;

create trigger set_submissions_updated_at
before update on public.submissions
for each row
execute function public.set_updated_at();

alter table public.submissions enable row level security;

revoke all on public.submissions from anon;
revoke all on public.submissions from authenticated;

comment on table public.submissions is 'SIADAFF 2026 entry submissions. Personal data retention policy: one year from submission date.';
comment on column public.submissions.status is 'Admin review status: 접수완료, 검토중, 수상확정, 내년에 재도전 응원해요.';

create or replace function public.purge_expired_submissions()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.submissions
  where created_at < now() - interval '1 year';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

comment on function public.purge_expired_submissions() is 'Deletes SIADAFF submissions older than one year according to the privacy retention policy.';
