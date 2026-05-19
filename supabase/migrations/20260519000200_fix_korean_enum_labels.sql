do $$
begin
  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'age_group' and e.enumlabel = '泥?냼?꾨?'
  ) then
    alter type public.age_group rename value '泥?냼?꾨?' to '청소년부';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'age_group' and e.enumlabel = '泥?뀈遺'
  ) then
    alter type public.age_group rename value '泥?뀈遺' to '청년부';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'age_group' and e.enumlabel = '以묒옣?꾨?'
  ) then
    alter type public.age_group rename value '以묒옣?꾨?' to '중장년부';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'age_group' and e.enumlabel = '?쒕땲?대?'
  ) then
    alter type public.age_group rename value '?쒕땲?대?' to '시니어부';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'production_type' and e.enumlabel = '媛쒖씤'
  ) then
    alter type public.production_type rename value '媛쒖씤' to '개인';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'production_type' and e.enumlabel = '?'
  ) then
    alter type public.production_type rename value '?' to '팀';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'submission_status' and e.enumlabel = '?묒닔?꾨즺'
  ) then
    alter type public.submission_status rename value '?묒닔?꾨즺' to '접수완료';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'submission_status' and e.enumlabel = '寃?좎쨷'
  ) then
    alter type public.submission_status rename value '寃?좎쨷' to '검토중';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'submission_status' and e.enumlabel = '?섏긽?뺤젙'
  ) then
    alter type public.submission_status rename value '?섏긽?뺤젙' to '수상확정';
  end if;

  if exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'submission_status' and e.enumlabel = '?대뀈???щ룄???묒썝?댁슂'
  ) then
    alter type public.submission_status rename value '?대뀈???щ룄???묒썝?댁슂' to '내년에 재도전 응원해요';
  end if;
end $$;

alter table public.submissions alter column status set default '접수완료';

comment on column public.submissions.status is 'Admin review status: 접수완료, 검토중, 수상확정, 내년에 재도전 응원해요.';
