alter type public.age_group add value if not exists '성인부';
alter type public.age_group add value if not exists '단체출품';
alter type public.production_type add value if not exists '단체출품';

alter table public.submissions
  drop constraint if exists submissions_company_business_number_required;

alter table public.submissions
  add constraint submissions_group_business_number_required
  check (
    production_type::text not in ('회사출품', '단체출품')
    or business_registration_number ~ '^[0-9]{10}$'
  );

comment on column public.submissions.age_group is
  '신규 접수값: 청소년부, 성인부, 단체출품. 기존 연령부문 값은 과거 데이터 호환용.';
comment on column public.submissions.production_type is
  '신규 접수값: 개인출품 또는 단체출품. 회사출품 등 기존 값은 과거 데이터 호환용.';
comment on column public.submissions.business_registration_number is
  '단체출품 시 필수인 숫자 10자리 사업자등록번호.';
