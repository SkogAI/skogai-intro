'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePostsByCategory } from '@/hooks/use-posts'
import { 
  Zap, TreePine, Terminal, Split, Frame, Sprout, 
  Layers, Network, Database, FlaskConical, Hammer, Contrast,
  Crown, BookOpen, Scissors, MessageSquare, Moon, Rocket,
  Code, Palette, Archive
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  spark: Zap, tree: TreePine, terminal: Terminal, split: Split,
  frame: Frame, growth: Sprout, layers: Layers, network: Network,
  database: Database, flask: FlaskConical, hammer: Hammer, contrast: Contrast,
  crown: Crown, book: BookOpen, scissors: Scissors, message: MessageSquare,
  moon: Moon, rocket: Rocket, code: Code, palette: Palette, archive: Archive,
}

interface LoreCategory {
  id: string
  label: string
  dbCategory: string
  description: string
}

const CATEGORIES: LoreCategory[] = [
  { id: 'origins', label: 'Origins', dbCategory: 'lore-origins', description: 'The genesis and early development' },
  { id: 'philosophy', label: 'Philosophy', dbCategory: 'lore-philosophy', description: 'Core principles that guide everything' },
  { id: 'architecture', label: 'Architecture', dbCategory: 'lore-architecture', description: 'Technical approaches and design patterns' },
  { id: 'evolution', label: 'Evolution', dbCategory: 'lore-evolution', description: 'How the system has changed over time' },
  { id: 'family', label: 'Family', dbCategory: 'lore-family', description: 'The specialized agents of the ecosystem' },
  { id: 'moments', label: 'Moments', dbCategory: 'lore-moments', description: 'Significant events and breakthroughs' },
  { id: 'artifacts', label: 'Artifacts', dbCategory: 'lore-artifacts', description: 'Notable creations and implementations' },
]

function CategorySection({ category }: { category: LoreCategory }) {
  const { data: posts, isLoading } = usePostsByCategory(category.dbCategory)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Entries */}
      <div className="space-y-4">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-foreground/5 p-5 animate-pulse">
                <div className="h-3 bg-foreground/5 w-1/3 mb-3" />
                <div className="h-2 bg-foreground/5 w-2/3" />
              </div>
            ))}
          </div>
        )}
        {posts?.map((post) => {
          const isExpanded = expandedPost === post.id
          const iconName = (post.metadata as Record<string, any>)?.icon
          const Icon = iconName ? ICON_MAP[iconName] : null

          return (
            <div
              key={post.id}
              className={`border gentle-animation cursor-pointer group ${
                isExpanded
                  ? 'border-foreground/20 bg-card/50'
                  : 'border-foreground/5 hover:border-foreground/15'
              }`}
              onClick={() => setExpandedPost(isExpanded ? null : post.id)}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  {Icon && (
                    <div className={`mt-0.5 flex-shrink-0 gentle-animation ${
                      isExpanded ? 'text-foreground/60' : 'text-foreground/20 group-hover:text-foreground/40'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-semibold tracking-wide gentle-animation ${
                      isExpanded ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground'
                    }`}>
                      {post.title}
                    </h4>
                    <p className="text-xs text-foreground/40 mt-1.5 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-foreground/5">
                        <p className="text-sm text-foreground/60 leading-[1.8] tracking-wide">
                          {post.content}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={`text-[10px] text-foreground/20 tracking-wider gentle-animation flex-shrink-0 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}>
                    →
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function LoreTimeline() {
  const [activeCategory, setActiveCategory] = useState<string>('origins')

  return (
    <section className="relative py-24 sm:py-32 bg-background">
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '3px 3px',
      }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[10px] text-foreground/30 tracking-[0.5em] uppercase block mb-4">
            Navigate the Archive
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.06em] mb-4">
            THE TIMELINE
          </h2>
          <p className="text-xs text-foreground/40 max-w-lg mx-auto leading-relaxed">
            Seven chapters of the SkogAI story. Each one a branch in the forest,
            connected to every other through shared roots.
          </p>
        </div>

        {/* Timeline layout: sidebar nav + content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Timeline navigation — vertical on desktop, horizontal scroll on mobile */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 lg:sticky lg:top-24">
              {CATEGORIES.map((cat, index) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-left gentle-animation cursor-pointer flex-shrink-0 lg:flex-shrink border group ${
                      isActive
                        ? 'border-foreground/20 bg-card/50'
                        : 'border-transparent hover:border-foreground/10'
                    }`}
                  >
                    <span className={`text-[10px] font-bold tracking-wider tabular-nums gentle-animation ${
                      isActive ? 'text-foreground/60' : 'text-foreground/20 group-hover:text-foreground/40'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className={`text-xs font-semibold tracking-[0.15em] uppercase block gentle-animation ${
                        isActive ? 'text-foreground' : 'text-foreground/40 group-hover:text-foreground/60'
                      }`}>
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-foreground/25 hidden lg:block mt-0.5">
                        {cat.description}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className={activeCategory === cat.id ? 'block' : 'hidden'}>
                {/* Category header */}
                <div className="mb-8 pb-6 border-b border-foreground/5">
                  <h3 className="text-xl font-bold tracking-[0.08em] uppercase mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-foreground/40 tracking-wide">
                    {cat.description}
                  </p>
                </div>

                <CategorySection category={cat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
