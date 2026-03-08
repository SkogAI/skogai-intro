import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { AmyPostLayout } from '@/components/posts/AmyPostLayout'
import { DotPostLayout } from '@/components/posts/DotPostLayout'
import { DefaultPostLayout } from '@/components/posts/DefaultPostLayout'
import type { PostLayoutProps } from '@/types/post-layout'

const layoutRegistry: Record<string, React.ComponentType<PostLayoutProps>> = {
  amy: AmyPostLayout,
  dot: DotPostLayout,
}

function detectLayout(category: string): React.ComponentType<PostLayoutProps> {
  for (const [key, Component] of Object.entries(layoutRegistry)) {
    if (category.includes(key)) return Component
  }
  return DefaultPostLayout
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xs text-foreground/30 tracking-[0.3em] uppercase animate-pulse">
          Loading...
        </div>
      </div>
    )
  }

  if (error || !post) {
    return <Navigate to="/" replace />
  }

  const Layout = detectLayout(post.category)

  return (
    <Layout
      post={{
        ...post,
        metadata: (post.metadata as Record<string, any>) ?? {},
      }}
      formatDate={formatDate}
    />
  )
}
