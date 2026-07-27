alter table public.submissions
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists submissions_user_id_idx
  on public.submissions(user_id);

comment on column public.submissions.user_id is
  '신규 출품 신청과 연결된 Supabase Auth 회원 ID. 기존 접수 데이터는 null 허용.';
