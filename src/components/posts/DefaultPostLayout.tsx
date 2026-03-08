import { ArrowLeft } from 'lucide-react'
import { PostLayoutProps } from '@/types/post-layout'
import { renderMarkdown } from '@/lib/renderMarkdown'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export function DefaultPostLayout({ post, formatDate }: PostLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground/70 mb-12 group gentle-animation"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to archive
        </Link>

        <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
          {post.category}
        </Badge>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-[0.06em] mb-4">
          {post.title}
        </h1>

        <p className="text-xs text-foreground/40 tracking-wider mb-12">
          Published {formatDate(post.created_at)}
        </p>

        <div className="prose-sm">
          {renderMarkdown(post.content)}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/5 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/20">
            SkogAI Lore Repository
          </p>
        </div>
      </div>
    </div>
  )
}
