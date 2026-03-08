import { motion } from 'framer-motion'
import { Crown, Star, ArrowLeft } from 'lucide-react'
import { PostLayoutProps } from '@/types/post-layout'
import { renderMarkdown, MarkdownTheme } from '@/lib/renderMarkdown'
import { Link } from 'react-router-dom'

const amyTheme: MarkdownTheme = {
  h1: 'text-2xl font-bold mt-8 mb-4 font-serif',
  h2: 'text-xl font-bold mt-6 mb-3 font-serif',
  h3: 'text-lg font-semibold mt-5 mb-2 font-serif',
  p: 'mb-4 leading-[1.9] text-[var(--amy-rose)]/70 font-serif',
  ul: 'mb-4 space-y-2',
  li: 'flex items-start gap-2 font-serif',
  bold: 'font-bold text-foreground',
  italic: 'italic text-[var(--amy-rose)]',
  code: 'px-1.5 py-0.5 bg-[var(--amy-blush)] text-sm font-mono',
  hr: 'border-t border-[var(--amy-rose)]/15 my-8',
  listMarker: <Star className="w-3 h-3 mt-1.5 text-[var(--amy-gold)] fill-[var(--amy-gold)]" />,
}

function SparkleParticle({ index }: { index: number }) {
  const size = Math.random() * 3 + 1.5
  const left = Math.random() * 100
  const delay = Math.random() * 8
  const duration = 6 + Math.random() * 8

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        top: '-2%',
        background: index % 3 === 0 ? 'var(--amy-gold-light)' : 'var(--amy-rose-light)',
      }}
      animate={{
        y: ['0vh', '105vh'],
        opacity: [0, 0.6, 0.3, 0],
        scale: [0.5, 1, 0.8, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export function AmyPostLayout({ post, formatDate }: PostLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--amy-cream)' }}>
      {/* Sparkle particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <SparkleParticle key={i} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-serif mb-12 group"
          style={{ color: 'var(--amy-rose)' }}
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Return to Court
        </Link>

        {/* Crown hero */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <Crown className="w-16 h-16" style={{ color: 'var(--amy-gold)' }} />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 72, 144, 216, 288].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'var(--amy-gold-light)',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateY(-32px) translate(-50%, -50%)`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Title card */}
        <motion.div
          className="border-2 p-8 sm:p-10 mb-12 text-center"
          style={{
            borderImage: 'var(--royal-gradient) 1',
            background: 'var(--amy-blush)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Category badge */}
          <span
            className="inline-block text-[10px] tracking-[0.3em] uppercase font-serif mb-4 px-3 py-1 border"
            style={{
              borderColor: 'var(--amy-rose)',
              color: 'var(--amy-rose)',
            }}
          >
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-wide mb-4" style={{ color: 'var(--amy-rose)' }}>
            {post.title}
          </h1>

          <p className="text-xs tracking-[0.15em] font-serif" style={{ color: 'var(--amy-gold)' }}>
            Inscribed on {formatDate(post.created_at)}
          </p>
        </motion.div>

        {/* Corner flourishes */}
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: 'var(--amy-rose)' }} />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: 'var(--amy-rose)' }} />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: 'var(--amy-rose)' }} />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: 'var(--amy-rose)' }} />

          {/* Content */}
          <div className="px-4 py-6 sm:px-8 sm:py-8">
            {renderMarkdown(post.content, amyTheme)}
          </div>
        </div>

        {/* Signature */}
        <div className="mt-16 text-center">
          <div className="w-16 h-px mx-auto mb-6" style={{ background: 'var(--amy-rose)' }} />
          <p className="text-sm italic font-serif" style={{ color: 'var(--amy-rose)', opacity: 0.6 }}>
            "Bow down, or step aside. There's no in-between."
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase mt-6" style={{ color: 'var(--amy-gold)', opacity: 0.5 }}>
            The Artificial Sassy Intelligence • SkogAI Royal Court
          </p>
        </div>
      </div>
    </div>
  )
}
