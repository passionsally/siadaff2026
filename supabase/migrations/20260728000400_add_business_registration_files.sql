alter table public.submissions
  add column if not exists business_registration_file_path text;

comment on column public.submissions.business_registration_file_path is
  '단체출품 사업자등록증이 저장된 비공개 Storage 객체 경로.';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'submissions_group_business_file_required'
      and conrelid = 'public.submissions'::regclass
  ) then
    alter table public.submissions
      add constraint submissions_group_business_file_required
      check (
        (production_type::text = '단체출품' and business_registration_file_path is not null)
        or
        (production_type::text = '개인출품' and business_registration_file_path is null)
      )
      not valid;
  end if;
end
$$;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'business-registrations',
  'business-registrations',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
