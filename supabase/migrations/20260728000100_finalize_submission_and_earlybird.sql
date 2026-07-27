alter type public.submission_category add value if not exists 'Short Film';
alter type public.production_type add value if not exists '개인출품';
alter type public.production_type add value if not exists '회사출품';

alter table public.submissions
  add column if not exists business_registration_number text;

alter table public.submissions
  drop constraint if exists submissions_company_business_number_required;

alter table public.submissions
  add constraint submissions_company_business_number_required
  check (
    production_type::text <> '회사출품'
    or business_registration_number ~ '^[0-9]{10}$'
  );

comment on column public.submissions.category is
  'Brand Poster=포스터, Ad Film=39초 광고영상, Short-form Drama=59초 숏폼드라마, Short Film=3분 단편영화';
comment on column public.submissions.production_type is
  '신규 접수값: 개인출품 또는 회사출품. 개인/팀은 기존 데이터 호환용.';
comment on column public.submissions.business_registration_number is
  '회사출품 시 필수인 숫자 10자리 사업자등록번호.';

create table if not exists public.earlybird_orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  product_code text not null default 'SIADAFF2026_SUPER_EARLYBIRD_1',
  order_name text not null,
  amount integer not null check (amount = 29900),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  privacy_consent boolean not null check (privacy_consent),
  status text not null default 'PENDING'
    check (status in ('PENDING','PAID','WAITING_FOR_DEPOSIT','PAYMENT_CHECK_REQUIRED','FAILED','CANCELED','REFUNDED')),
  payment_key text unique,
  payment_method text,
  toss_status text,
  receipt_url text,
  failure_code text,
  failure_message text,
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists earlybird_orders_status_idx on public.earlybird_orders(status);
create index if not exists earlybird_orders_email_idx on public.earlybird_orders(customer_email);
create index if not exists earlybird_orders_created_at_idx on public.earlybird_orders(created_at desc);

alter table public.earlybird_orders enable row level security;
revoke all on public.earlybird_orders from anon;
revoke all on public.earlybird_orders from authenticated;

comment on table public.earlybird_orders is
  'SIADAFF 2026 early-bird payment orders. Access only through Edge Functions using a server-side secret key.';
