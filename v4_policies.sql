-- FlexUni v4: baseline policies for student-created content.
-- Review these policies against your final schema before production launch.

alter table if exists public.listings enable row level security;
alter table if exists public.posts enable row level security;
alter table if exists public.saved_opportunities enable row level security;

drop policy if exists "Listings are public to signed-in users" on public.listings;
create policy "Listings are public to signed-in users" on public.listings
for select to authenticated using (true);

drop policy if exists "Users create their own listings" on public.listings;
create policy "Users create their own listings" on public.listings
for insert to authenticated with check (seller_id = auth.uid());

drop policy if exists "Users update their own listings" on public.listings;
create policy "Users update their own listings" on public.listings
for update to authenticated using (seller_id = auth.uid()) with check (seller_id = auth.uid());

drop policy if exists "Community posts are readable" on public.posts;
create policy "Community posts are readable" on public.posts
for select to authenticated using (true);

drop policy if exists "Users create their own posts" on public.posts;
create policy "Users create their own posts" on public.posts
for insert to authenticated with check (author_id = auth.uid());

drop policy if exists "Users update their own posts" on public.posts;
create policy "Users update their own posts" on public.posts
for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());

drop policy if exists "Users manage saved opportunities" on public.saved_opportunities;
create policy "Users manage saved opportunities" on public.saved_opportunities
for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Realtime for chat/content can be enabled in the Supabase dashboard after schema review.
