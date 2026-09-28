# FlexUni v5 — Platform Layer

Added:
- Supabase-backed notifications with realtime subscription foundation
- Supabase-backed messages with realtime subscription foundation
- Send-message service
- Study Hub loading real courses/resources
- Global search entry point
- Marketplace and Community real CRUD screens from v4
- Saved-opportunity action from v4

Production hardening still required:
- Verify actual column names in your Supabase schema before running all screens.
- Add storage buckets and signed/private file policies.
- Add full conversation model (threads/participants) rather than recipient-ID composition.
- Add push notification provider and device-token registration.
- Add moderation/report/block flows.
- Test RLS using separate student, moderator and admin accounts.
- Add analytics, crash monitoring and automated integration tests.
