export interface PostLayoutProps {
  post: {
    id: string
    title: string
    content: string
    category: string
    featured: boolean | null
    created_at: string
    excerpt: string | null
    image_url: string | null
    metadata: Record<string, any>
  }
  formatDate: (date: string) => string
}
