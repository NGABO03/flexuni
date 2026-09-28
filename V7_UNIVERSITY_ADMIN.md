# FlexUni v7 — University Administration

This build adds a university administration workspace.

Capabilities:
- University admin access gate
- Overview dashboard
- Course listing
- Announcement listing
- Event listing
- Publish announcement
- Create event
- Supabase-backed university admin service layer

Security note:
Authorization must be enforced in PostgreSQL RLS or a trusted backend. The UI role check is only a user-experience guard.

Next:
- University staff invitation/approval
- Course CRUD
- Resource/file management
- Timetable management
- Student announcements with targeting
- Campus-service management
- University verification workflow
