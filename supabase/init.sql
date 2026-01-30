-- Create posts table for blog
create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  author text,
  content text,
  tags text[] default array[]::text[],
  image text,
  published boolean default false,
  date timestamptz default now()
);

-- Add a sample post
insert into public.posts (slug, title, description, author, content, tags, image, published)
values ('welcome', 'Welcome to the blog', 'Initial post', 'ModanTech', 'This is the first post.', array['welcome','blog'], '', true)
on conflict do nothing;

-- Enable row level security and policies
alter table public.posts enable row level security;

-- Allow public to select published posts, and authenticated users to select all
create policy "public_select_published_or_authenticated" on public.posts
  for select
  using (published = true or auth.role() = 'authenticated');

-- Allow authenticated users to insert, update and delete posts
create policy "authenticated_modify" on public.posts
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
