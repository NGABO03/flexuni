# FlexUni production checklist

## Implemented in this build
- Expo/React Native mobile application structure
- Supabase authentication helpers
- Student onboarding/profile persistence
- University search backed by Supabase
- Core Home, Study, Opportunities, Marketplace, Community, Schedule, Messages, Services and Profile screens
- Database service layer
- Starter university seed data
- GitHub Actions typecheck workflow

## Still required before public launch
1. Create a production Supabase project.
2. Run `supabase/schema.sql` and `supabase/seed.sql`.
3. Review and complete RLS policies for every table.
4. Add production university/admin management.
5. Connect all list/detail/create/edit/delete UI actions to Supabase.
6. Implement realtime chat and push notifications.
7. Add file/image uploads with private storage policies.
8. Add reporting, moderation, blocking and account deletion.
9. Add proper error, loading and empty states throughout the app.
10. Test on physical Android and iOS devices.
11. Configure EAS signing and app-store metadata.
12. Publish to Google Play/App Store after store review.

Do not put Supabase service-role keys or other private credentials in the mobile app.
