-- LumiAffirm Database Setup
-- Copy everything below this line into Supabase SQL Editor

create table if not exists affirmations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  prompt text not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table affirmations enable row level security;

drop policy if exists "Users can view own affirmations" on affirmations;
drop policy if exists "Users can insert own affirmations" on affirmations;
drop policy if exists "Users can delete own affirmations" on affirmations;

create policy "Users can view own affirmations"
  on affirmations for select
  using (auth.uid() = user_id);

create policy "Users can insert own affirmations"
  on affirmations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own affirmations"
  on affirmations for delete
  using (auth.uid() = user_id);

create index if not exists affirmations_user_id_idx on affirmations(user_id);
create index if not exists affirmations_created_at_idx on affirmations(created_at desc);
