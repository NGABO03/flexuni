# FlexUni 🌍

**Your University Life, Simplified**

FlexUni is a multi-university student ecosystem for study, opportunities, marketplace, community and campus life.

## Stack
- Expo SDK 57 / React Native 0.86
- TypeScript
- Expo Router
- Supabase/PostgreSQL
- GitHub Actions ready

## Run locally
1. Install Node.js 22.13+.
2. `npm install`
3. Copy `.env.example` to `.env` and add your Supabase project URL + publishable key.
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. `npx expo start`

## Production
Use EAS Build for signed Android/iOS binaries. Configure secrets in the build environment; never commit private keys or service-role credentials.

Google Play new-app submissions from Aug 31 2026 require Android 16/API 36+.

## Functional v1 additions
- Real Supabase email/password sign-up and sign-in.
- University search backed by PostgreSQL.
- Global university seed starter dataset (expandable).
- Data access helpers for opportunities, listings and communities.
- GitHub Actions typecheck workflow.

Before launch: run `supabase/schema.sql` then `supabase/seed.sql`, configure `.env`, install dependencies and test on physical Android/iOS devices.

## Functional v2
- Core navigation screens: Schedule, Messages, Profile and Campus Services.
- Home quick-access dashboard linking the main FlexUni ecosystem.
- Supabase service helpers for courses, resources, events, messages, notifications and campus services.
- Authenticated listing/post creation helpers.


## Web / PWA
FlexUni can be launched as a mobile-first web app/PWA without requiring Play Store or App Store publication. See `WEB_LAUNCH.md`.
