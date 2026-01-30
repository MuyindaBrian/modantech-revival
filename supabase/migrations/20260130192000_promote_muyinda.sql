-- Promote user to admin
WITH u AS (
  SELECT id, email FROM auth.users WHERE email = 'muyindabrian@gmail.com'
)
INSERT INTO public.profiles (id, email, is_admin)
SELECT u.id, u.email, TRUE FROM u
ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;
