create table if not exists public.sponsor_inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_no text not null unique,
  organization_name text not null,
  organization_type text not null,
  contact_name text not null,
  position_title text,
  phone text not null,
  email text not null,
  interest_type text not null,
  budget_range text not null,
  message text not null,
  privacy_consent boolean not null,
  marketing_consent boolean not null default false,
  status text not null default '문의접수',
  admin_memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sponsor_inquiries_email_shape check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  constraint sponsor_inquiries_privacy_required check (privacy_consent),
  constraint sponsor_inquiries_status_allowed check (
    status in ('문의접수', '검토중', '연락완료', '후원확정', '보류')
  )
);

create index if not exists sponsor_inquiries_status_idx on public.sponsor_inquiries (status);
create index if not exists sponsor_inquiries_created_at_idx on public.sponsor_inquiries (created_at desc);
create index if not exists sponsor_inquiries_email_idx on public.sponsor_inquiries (email);
create index if not exists sponsor_inquiries_organization_idx on public.sponsor_inquiries (organization_name);

drop trigger if exists set_sponsor_inquiries_updated_at on public.sponsor_inquiries;

create trigger set_sponsor_inquiries_updated_at
before update on public.sponsor_inquiries
for each row
execute function public.set_updated_at();

alter table public.sponsor_inquiries enable row level security;

revoke all on public.sponsor_inquiries from anon;
revoke all on public.sponsor_inquiries from authenticated;

comment on table public.sponsor_inquiries is 'SIADAFF 2026 sponsorship inquiries. Personal data retention policy: one year from inquiry date.';
comment on column public.sponsor_inquiries.status is 'Admin review status: 문의접수, 검토중, 연락완료, 후원확정, 보류.';

create or replace function public.purge_expired_sponsor_inquiries()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.sponsor_inquiries
  where created_at < now() - interval '1 year';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

comment on function public.purge_expired_sponsor_inquiries() is 'Deletes SIADAFF sponsor inquiries older than one year according to the privacy retention policy.';
