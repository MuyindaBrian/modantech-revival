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

-- -------------------------------------------------------
-- Profiles (user roles / admin flag)
-- -------------------------------------------------------

-- Create profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_admin boolean default false
);

-- Create a trigger to insert a profile when a new auth user is created
create function public.create_profile() returns trigger language plpgsql as $$
begin
  insert into public.profiles (id, email)
    values (new.id, new.email)
    on conflict (id) do nothing;
  return new;
end;
$$;

create trigger create_profile_trigger
  after insert on auth.users
  for each row
  execute procedure public.create_profile();

alter table public.profiles enable row level security;

-- Allow users to select their own profile, and admins to select any
create policy "profiles_select" on public.profiles
  for select
  using (
    auth.uid() = id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- Allow users to update their own profile, and admins to update any profile
create policy "profiles_update" on public.profiles
  for update
  using (
    auth.uid() = id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  )
  with check (
    auth.uid() = id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- Allow authenticated users to insert their own profile (trigger covers most cases)
create policy "profiles_insert_self" on public.profiles
  for insert
  with check (auth.uid() = id);

-- Instruction: promote an account to admin by running:
--   update public.profiles set is_admin = true where email = 'you@domain.com';
-- or run via Supabase dashboard.


