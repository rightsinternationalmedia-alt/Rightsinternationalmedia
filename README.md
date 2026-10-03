# Rights International Media

Production-ready Next.js App Router website for music distribution, YouTube rights protection and artist/label services. Enquiries are validated on the client and server and stored in PostgreSQL through Drizzle ORM.

## Publish with your GoDaddy domain

Read **[the step-by-step Hindi/Hinglish publishing guide](docs/PUBLISH-HI.md)**.

Recommended setup:
- Website: Vercel Pro (commercial business use).
- Database: hosted Neon PostgreSQL.
- Domain and DNS: keep at GoDaddy.

The existing preview is not a substitute for permanent hosting. This repository does not contain your GoDaddy credentials, a hosted database password or customer enquiry records.

## Environment

Copy `.env.example` to `.env.local` for local work, or set its variables in your hosting dashboard. Never upload `.env` or `.env.local` to GitHub.

- `SITE_URL`: your primary HTTPS domain. Controls SEO metadata, canonical links, structured data and the sitemap.
- `DATABASE_URL`: runtime PostgreSQL connection. Use a hosted pooled connection for Vercel.
- `DATABASE_URL_UNPOOLED`: optional direct PostgreSQL connection for migrations; falls back to `DATABASE_URL`.
- `SITE_INDEXING`: set `false` for staging. Vercel preview deployments are automatically excluded from indexing.

## Database setup

The `drizzle/` directory contains the initial versioned migration for a **new, empty database**. `npx drizzle-kit migrate` applies unapplied migrations. The checked-in `vercel.json` runs migrations before `npm run build` during Vercel deployment.

For local development, use `npx drizzle-kit push` to sync a development database. Do not run the initial migration blindly against an existing database whose tables were already created with `push`; back up the data and establish a migration baseline first. Do not use automatic `push --force` on a production database.

## Development and verification

Install dependencies with `npm install`, then start development with `npm run dev`.

Required production checks:
1. `npx next typegen`
2. `npm exec tsc -- --noEmit --pretty false`
3. `npm run build`

Browser tests: `npx playwright install --with-deps chromium`, then `npx playwright test` against a running app at `http://127.0.0.1:3000`.

The tests submit enquiries using `website-qa-...@example.com` and remove only those test records afterwards. Never run destructive development schema changes against your production database.

## Launch checks

- Primary domain and `www` redirect both work over HTTPS.
- `/api/health` returns HTTP 200 with `ok: true`.
- A real test enquiry produces a reference and is visible in the database's `enquiries` table.
- `/sitemap.xml`, canonical links and social metadata use your primary domain.
- Your email's MX, SPF, DKIM and DMARC records remain intact.

## Private admin workspace — Option A

The workspace and sign-in/setup screens use the light Option A identity: cream surfaces, forest-green text and buttons, gold accents and the complete Option A company logo. Admin authentication and stored records are unchanged by this theme.

Read **[the Hindi admin guide](docs/ADMIN-HI.md)**.

- `/admin` provides real enquiry statistics, recent conversations and a seven-day chart.
- `/admin/enquiries` supports search, filters, status changes, internal notes, pagination and protected CSV export.
- `/admin/settings` updates public contact information, social links and homepage/about copy.
- `/admin/account` changes the password and revokes previous sessions.

For the first administrator only, set a private `ADMIN_SETUP_TOKEN` (generate with `node scripts/admin-security.mjs setup-key`), redeploy and visit `/admin/setup`. Choose your own admin email/password. Remove the setup token from hosting after account creation. There are no default credentials or public registration. Sessions expire in 8 hours; passwords use salted scrypt hashing. Every private API checks the database-backed session, and mutations reject cross-origin requests.

Never include setup tokens, passwords, admin session cookies or real database credentials in source downloads/GitHub. Use the trusted operator reset script documented in the admin guide for password recovery.

Enquiries are stored in the database; automatic email delivery is not currently configured. Blank social settings keep company-search links; add verified profile URLs through the admin editor.
