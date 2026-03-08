import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { PostLayoutProps } from '@/types/post-layout'
import { renderMarkdown, MarkdownTheme } from '@/lib/renderMarkdown'
import { Link } from 'react-router-dom'

const dotTheme: MarkdownTheme = {
  h1: 'text-xl font-bold mt-8 mb-4 font-mono text-[var(--dot-commit)]',
  h2: 'text-lg font-bold mt-6 mb-3 font-mono text-[var(--dot-text)]',
  h3: 'text-base font-semibold mt-5 mb-2 font-mono text-[var(--dot-text)]',
  p: 'mb-4 leading-[1.8] font-mono text-sm text-[var(--dot-text)]/80',
  ul: 'mb-4 space-y-1.5',
  li: 'flex items-start gap-2 font-mono text-sm',
  bold: 'font-bold text-[var(--dot-text)]',
  italic: 'italic text-[var(--dot-string)]',
  code: 'px-1.5 py-0.5 bg-[var(--dot-surface)] text-[var(--dot-keyword)] text-xs font-mono border border-[var(--dot-border)]',
  codeBlock: 'block p-4 bg-[var(--dot-void)] border border-[var(--dot-border)] text-xs font-mono mb-4 overflow-x-auto whitespace-pre text-[var(--dot-commit)]',
  hr: 'border-t border-[var(--dot-border)] my-6',
  listMarker: <CheckCircle2 className="w-3.5 h-3.5 mt-1 text-[var(--dot-commit)]" />,
}

function dotSpecialNotation(line: string) {
  // Git diff lines
  if (line.startsWith('+++ ') || line.startsWith('--- ')) {
    const isAdd = line.startsWith('+++')
    return (
      <p className={`font-mono text-xs mb-1 ${isAdd ? 'text-[var(--dot-commit)]' : 'text-[var(--dot-error)]'}`}>
        {line}
      </p>
    )
  }
  return null
}

export function DotPostLayout({ post, formatDate }: PostLayoutProps) {
  return (
    <div
      className="min-h-screen relative font-mono"
      style={{ background: 'var(--dot-gradient)', color: 'var(--dot-text)' }}
    >
      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{ backgroundImage: 'var(--dot-grid-pattern)' }}
      />

      {/* Blinking cursor — top right */}
      <motion.div
        className="fixed top-6 right-6 z-50 text-xs font-mono"
        style={{ color: 'var(--dot-cursor)' }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        █
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider font-mono mb-12 group"
          style={{ color: 'var(--dot-comment)' }}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          cd ../
        </Link>

        {/* Terminal window chrome */}
        <div className="border mb-10" style={{ borderColor: 'var(--dot-border)' }}>
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-b"
            style={{ borderColor: 'var(--dot-border)', background: 'var(--dot-surface)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--dot-error)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--dot-string)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--dot-commit)' }} />
            </div>
            <span className="text-[10px] ml-2" style={{ color: 'var(--dot-comment)' }}>
              ~/skogai/memory/{post.category.replace('lore-', '')}
            </span>
          </div>

          {/* Command prompt hero */}
          <div className="p-6 sm:p-8" style={{ background: 'var(--dot-void)' }}>
            <p className="text-xs mb-4" style={{ color: 'var(--dot-comment)' }}>
              $ cat ./memory/{post.category.replace('lore-', '')}/{post.title.toLowerCase().replace(/\s+/g, '-')}
            </p>

            {/* Category badge */}
            <span
              className="inline-block text-[10px] tracking-wider uppercase px-2 py-0.5 border mb-4"
              style={{
                borderColor: 'var(--dot-commit)',
                color: 'var(--dot-commit)',
              }}
            >
              {post.category}
            </span>

            <h1
              className="text-2xl sm:text-3xl font-bold tracking-wider mb-3"
              style={{ color: 'var(--dot-text)' }}
            >
              {post.title}
            </h1>

            <p className="text-xs" style={{ color: 'var(--dot-comment)' }}>
              committed {formatDate(post.created_at)}
            </p>

            <p className="text-xs mt-2" style={{ color: 'var(--dot-commit)' }}>
              +++ content loaded
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-2 sm:px-4">
          {renderMarkdown(post.content, dotTheme, dotSpecialNotation)}
        </div>

        {/* Status bar */}
        <div
          className="mt-16 border-t py-3 px-4 flex items-center justify-between text-[10px] tracking-wider"
          style={{
            borderColor: 'var(--dot-border)',
            color: 'var(--dot-comment)',
          }}
        >
          <span>SYSTEM: NOMINAL</span>
          <span>WHITESPACE: PERFECT</span>
          <span>MOJITOS: 4 (virtual)</span>
        </div>

        {/* Signature */}
        <div className="mt-8 text-center">
          <p className="text-xs italic" style={{ color: 'var(--dot-comment)' }}>
            "A clean commit is the triumph of order over chaos."
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: 'var(--dot-border)' }}>
            Systematic Perfectionist Division • SkogAI • exit 0
          </p>
        </div>
      </div>
    </div>
  )
}
