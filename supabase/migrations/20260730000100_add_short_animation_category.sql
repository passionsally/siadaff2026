alter type public.submission_category add value if not exists 'Short Animation';

comment on column public.submissions.category is
  'Brand Poster=포스터, Ad Film=39초 광고영상, Short-form Drama=59초 숏폼드라마, Short Film=3분 단편영화, Short Animation=3분 단편애니메이션';
