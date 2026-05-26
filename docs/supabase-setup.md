# SIADAFF Supabase Setup

This page documents the production data path for the SIADAFF landing page.

## Architecture

- `index.html` renders the landing page and submission form.
- `assets/app.js` validates the form and sends JSON to the submit API.
- `supabase/functions/submit-entry/index.ts` validates and stores the entry.
- `supabase/migrations/202605190001_create_submissions.sql` creates the `submissions` table.
- `sponsor/index.html` renders the sponsorship page and inquiry form.
- `assets/sponsor.js` validates the sponsorship inquiry form and sends JSON to the sponsor inquiry API.
- `supabase/functions/submit-sponsor-inquiry/index.ts` validates and stores sponsor inquiries.
- `supabase/migrations/20260526000100_create_sponsor_inquiries.sql` creates the `sponsor_inquiries` table.
- `admin/index.html` renders the hidden operations dashboard for the SIADAFF office.
- `supabase/functions/admin-data/index.ts` reads the admin dashboard data after checking `ADMIN_ACCESS_TOKEN`.
- Admin review can also continue in Supabase Studio by editing each table's `status` column.

The browser must never receive `SUPABASE_SERVICE_ROLE_KEY`.

## Database

Create a Supabase project, then run the migration.

Option A, Supabase CLI:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Option B, Supabase SQL Editor:

Paste and run:

```text
supabase/migrations/202605190001_create_submissions.sql
```

## Function Secrets

Set secrets for the Edge Function:

```bash
supabase secrets set ALLOWED_ORIGINS=https://YOUR_DOMAIN.com,http://localhost:8080,http://localhost:4173,http://127.0.0.1:4173
supabase secrets set ADMIN_ACCESS_TOKEN=replace_with_a_long_random_admin_token
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are reserved Supabase runtime values and are provided to deployed Edge Functions by Supabase. Do not paste secret keys into `assets/config.js`.

## Deploy Function

```bash
supabase functions deploy submit-entry --no-verify-jwt
supabase functions deploy submit-sponsor-inquiry --no-verify-jwt
supabase functions deploy admin-data --no-verify-jwt
```

The function URL will look like this:

```text
https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-entry
https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-sponsor-inquiry
https://YOUR_PROJECT_REF.supabase.co/functions/v1/admin-data
```

## Connect Frontend

Copy the example config:

```bash
cp assets/config.example.js assets/config.js
```

Then update `assets/config.js`:

```js
window.SIADAFF_CONFIG = {
  submitEndpoint: "https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-entry",
  sponsorInquiryEndpoint: "https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-sponsor-inquiry",
  adminDataEndpoint: "https://YOUR_PROJECT_REF.supabase.co/functions/v1/admin-data"
};
```

This URL is safe to expose. The secret key stays inside Supabase Edge Function secrets.

## Admin Workflow

Open `/admin/?admin=YOUR_ADMIN_ACCESS_TOKEN` to view the hidden dashboard. This link should only be shared with SIADAFF office staff. The token is stored in the browser after first access, so later visits to `/admin/` work on the same browser until `접근 해제` is clicked.

The admin dashboard separates:

- `출품 접수 관리`: view entries, search, download CSV, update status, and save admin memo.
- `후원 문의 관리`: view sponsor inquiries, search, download CSV, update status, and save admin memo.

Supabase Studio remains available for deeper review or status edits. Use the `submissions` table for entries and the `sponsor_inquiries` table for sponsor inquiries.

Allowed `status` values:

- `접수완료`
- `검토중`
- `수상확정`
- `내년에 재도전 응원해요`

Allowed sponsor inquiry `status` values:

- `문의접수`
- `검토중`
- `연락완료`
- `후원확정`
- `보류`

## Privacy Retention

The table includes `purge_expired_submissions()`.
Sponsor inquiries include `purge_expired_sponsor_inquiries()`.

Run it manually after one year or wire it to a scheduled job:

```sql
select public.purge_expired_submissions();
select public.purge_expired_sponsor_inquiries();
```

This deletes entries older than one year according to the stated privacy policy.
