-- LumiAffirm Database Setup
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor

-- Create affirmations table
create table if not exists affirmations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  prompt text not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table affirmations enable row level security;

-- Drop existing policies if they exist (for re-running this script)
drop policy if exists "Users can view own affirmations" on affirmations;
drop policy if exists "Users can insert own affirmations" on affirmations;
drop policy if exists "Users can delete own affirmations" on affirmations;

-- Policy: Users can only view their own affirmations
create policy "Users can view own affirmations"
  on affirmations for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own affirmations
create policy "Users can insert own affirmations"
  on affirmations for insert
  with check (auth.uid() = user_id);

-- Policy: Users can delete their own affirmations
create policy "Users can delete own affirmations"
  on affirmations for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists affirmations_user_id_idx on affirmations(user_id);
create index if not exists affirmations_created_at_idx on affirmations(created_at desc);
