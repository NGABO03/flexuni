# FlexUni v4 — Real Data Layer

This build connects Marketplace, Community and Opportunities screens to Supabase and adds authenticated create/save actions.

## Setup
1. Configure `.env` from `.env.example`.
2. Run the existing schema.
3. Review and run `supabase/v4_policies.sql`.
4. Run the seed data.
5. `npm install`
6. `npx expo start`

## Important
The mobile client must only use the Supabase publishable/anon key. Never put a service-role key in the app.

Before public launch, test every RLS policy with separate student/admin accounts and add moderation, reporting, storage rules, account deletion and realtime/push infrastructure.
