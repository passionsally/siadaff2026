alter table public.submissions
  add column if not exists team_participation_consent boolean;

comment on column public.submissions.team_participation_consent is 'Entrant confirmed team participation restrictions: representative age group, no multi-team membership, personal entry allowed separately.';
