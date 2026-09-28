# FlexUni v6 — Security & Admin Foundation

Added:
- Moderation report model and RLS baseline
- Report submission screen
- Admin/moderator dashboard shell
- Server-safe account deletion boundary
- Supabase Storage profile-image upload helper
- Security documentation

Before production:
- Define the authoritative role model in the database.
- Add server-side admin/moderator policies; never trust a client role check.
- Create storage buckets with appropriate policies and signed/private URLs where needed.
- Add rate limits, abuse detection, block/mute, content filtering and audit logs.
- Implement account deletion with a protected Edge Function/backend.
