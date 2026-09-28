-- FlexUni v8 complete platform foundation.
-- Review existing schema before running. This migration intentionally avoids
-- service-role secrets and keeps authorization in PostgreSQL/RLS.

create table if not exists public.university_admins (
 id uuid primary key default gen_random_uuid(),
 university_id uuid not null references public.universities(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 role text not null default 'staff' check (role in ('owner','admin','staff')),
 created_at timestamptz not null default now(),
 unique(university_id,user_id)
);

create table if not exists public.announcements (
 id uuid primary key default gen_random_uuid(),
 university_id uuid not null references public.universities(id) on delete cascade,
 author_id uuid not null references auth.users(id),
 title text not null,
 body text not null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.campus_services (
 id uuid primary key default gen_random_uuid(),
 university_id uuid not null references public.universities(id) on delete cascade,
 name text not null,
 description text,
 category text,
 contact text,
 url text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create index if not exists courses_university_idx on public.courses(university_id);
create index if not exists announcements_university_idx on public.announcements(university_id);
create index if not exists events_university_idx on public.events(university_id);
create index if not exists services_university_idx on public.campus_services(university_id);

alter table public.university_admins enable row level security;
alter table public.announcements enable row level security;
alter table public.campus_services enable row level security;

create or replace function public.is_university_admin(target_university uuid)
returns boolean language sql security definer stable set search_path=public as $$
 select exists (
  select 1 from public.university_admins ua
  where ua.university_id=target_university and ua.user_id=auth.uid()
 );
$$;

drop policy if exists "Users read university membership" on public.university_admins;
create policy "Users read university membership" on public.university_admins
for select to authenticated using (user_id=auth.uid());

drop policy if exists "Authenticated users read announcements" on public.announcements;
create policy "Authenticated users read announcements" on public.announcements
for select to authenticated using (true);

drop policy if exists "University admins create announcements" on public.announcements;
create policy "University admins create announcements" on public.announcements
for insert to authenticated with check (
 author_id=auth.uid() and public.is_university_admin(university_id)
);

drop policy if exists "Authenticated users read services" on public.campus_services;
create policy "Authenticated users read services" on public.campus_services
for select to authenticated using (true);

drop policy if exists "University admins create services" on public.campus_services;
create policy "University admins create services" on public.campus_services
for insert to authenticated with check (public.is_university_admin(university_id));

-- Production deployment still requires auditing every existing table's RLS
-- policy, private storage buckets/signed URLs where appropriate, rate limits,
-- account deletion via trusted backend, and verified role assignment.
