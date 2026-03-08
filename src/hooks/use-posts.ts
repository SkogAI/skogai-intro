import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string | null
  category: string
  image_url: string | null
  metadata: Record<string, any>
  sort_order: number
  parent_post_id: string | null
  published: boolean | null
  created_at: string
}

export function usePostsByCategory(category: string) {
  return useQuery({
    queryKey: ['posts', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (error) throw error
      return (data ?? []) as Post[]
    },
  })
}
