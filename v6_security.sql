-- FlexUni v6 security and moderation foundation.
create table if not exists public.reports (
 id uuid primary key default gen_random_uuid(),
 reporter_id uuid not null references auth.users(id) on delete cascade,
 target_type text not null,
 target_id text not null,
 reason text not null,
 details text,
 status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

alter table public.reports enable row level security;

drop policy if exists "Users create reports" on public.reports;
create policy "Users create reports" on public.reports
for insert to authenticated with check (reporter_id = auth.uid());

drop policy if exists "Users read their own reports" on public.reports;
create policy "Users read their own reports" on public.reports
for select to authenticated using (reporter_id = auth.uid());

-- Admin/moderator SELECT/UPDATE policies should be created after your final
-- role model is confirmed. Do not grant moderation access based only on a
-- client-side role check.
