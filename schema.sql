-- Supabase schema for Revti Digital
-- Run this in your Supabase SQL Editor

create table if not exists enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  services    text[] not null default '{}',
  message     text,
  status      text not null default 'new'
);

-- Enable Row Level Security
alter table enquiries enable row level security;

-- Allow anonymous inserts (for the contact form)
create policy "Allow anonymous insert" on enquiries
  for insert to anon with check (true);

-- Only authenticated users can read enquiries
create policy "Allow authenticated read" on enquiries
  for select to authenticated using (true);
