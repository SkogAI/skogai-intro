
-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.posts;

CREATE POLICY "Anyone can read published posts"
ON public.posts
FOR SELECT
USING (published = true);
