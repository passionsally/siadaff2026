# SIADAFF Supabase Setup

This page documents the production data path for the SIADAFF landing page.

## Architecture

- `index.html` renders the landing page and submission form.
- `assets/app.js` validates the form and sends JSON to the submit API.
- `supabase/functions/submit-entry/index.ts` validates and stores the entry.
- `supabase/migrations/202605190001_create_submissions.sql` creates the `submissions` table.
- Admin review can start in Supabase Studio by editing the `status` column.

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
supabase secrets set ALLOWED_ORIGINS=https://YOUR_DOMAIN.com,http://localhost:8080
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are reserved Supabase runtime values and are provided to deployed Edge Functions by Supabase. Do not paste secret keys into `assets/config.js`.

## Deploy Function

```bash
supabase functions deploy submit-entry --no-verify-jwt
```

The function URL will look like this:

```text
https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-entry
```

## Connect Frontend

Copy the example config:

```bash
cp assets/config.example.js assets/config.js
```

Then update `assets/config.js`:

```js
window.SIADAFF_CONFIG = {
  submitEndpoint: "https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-entry"
};
```

This URL is safe to expose. The secret key stays inside Supabase Edge Function secrets.

## Admin Workflow

Open Supabase Studio, then use the `submissions` table.

Allowed `status` values:

- `접수완료`
- `검토중`
- `수상확정`
- `내년에 재도전 응원해요`

## Privacy Retention

The table includes `purge_expired_submissions()`.

Run it manually after one year or wire it to a scheduled job:

```sql
select public.purge_expired_submissions();
```

This deletes entries older than one year according to the stated privacy policy.
