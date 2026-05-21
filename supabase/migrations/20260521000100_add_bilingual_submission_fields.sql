alter table public.submissions
  add column if not exists title_ko text,
  add column if not exists title_en text,
  add column if not exists synopsis_ko text,
  add column if not exists synopsis_en text;

comment on column public.submissions.title_ko is 'Submitted Korean title.';
comment on column public.submissions.title_en is 'Submitted English title.';
comment on column public.submissions.synopsis_ko is 'Submitted Korean synopsis.';
comment on column public.submissions.synopsis_en is 'Submitted English synopsis.';
