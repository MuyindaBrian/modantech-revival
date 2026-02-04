-- Add views column to posts and create an increment function

alter table if exists public.posts
  add column if not exists views integer default 0;

-- Create an RPC to increment views safely (security definer)
create or replace function public.increment_post_views(p_uuid uuid)
returns void language sql security definer as $$
  update public.posts set views = coalesce(views, 0) + 1 where id = p_uuid;
$$;

-- Grant execute to public so anonymous visitors can call the RPC
grant execute on function public.increment_post_views(uuid) to public;
