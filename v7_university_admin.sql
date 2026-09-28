-- FlexUni v7 university administration foundation.
-- Run only after confirming these tables/columns match your existing schema.

alter table if exists public.announcements enable row level security;
alter table if exists public.events enable row level security;

-- Students can read university announcements/events.
drop policy if exists "Authenticated users read announcements" on public.announcements;
create policy "Authenticated users read announcements" on public.announcements
for select to authenticated using (true);

drop policy if exists "Authenticated users read events" on public.events;
create policy "Authenticated users read events" on public.events
for select to authenticated using (true);

-- Inserts/updates for university admins should be granted through a secure
-- database role/authorization function tied to profiles.role and university_id.
-- Do not rely on the mobile client alone for authorization.
