import React from 'react'

export interface AgentTheme {
  id: string
  name: string
  subtitle: string
  tagline: string
  description: string
  footerQuote: string
  footerLabel: string

  // Hero styling
  videoFilter: string
  overlayStyle?: React.CSSProperties
  grainOpacity: number
  titleClassName: string
  subtitleClassName: string
  taglineClassName: string

  // Page styling
  heroBackground: string
  footerBackground: string
  footerTextColor: string
  footerBorderColor: string

  // Timeline overrides
  timelineBg: string
  timelineAccent: string
  categoryActiveBg: string
  categoryActiveBorder: string
  entryExpandedBg: string
  entryExpandedBorder: string
  entryHoverBorder: string

  // Extra hero elements (sparkles, cursor, etc.)
  heroExtras?: React.ReactNode
}

const defaultTheme: AgentTheme = {
  id: 'default',
  name: 'SKOGAI',
  subtitle: 'Lore Repository',
  tagline: 'The Memory System',
  description: 'The beating heart of SkogAI\'s memory system — stories, experiments, brilliant failures, and evolutionary leaps.',
  footerQuote: 'A digital forest — layered, interconnected, and always growing. Lore preserves the magic while protecting the future.',
  footerLabel: 'Lore Repository',

  videoFilter: 'grayscale(100%) contrast(1.1) brightness(0.4)',
  grainOpacity: 0.04,
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-[0.15em] leading-none mb-4',
  subtitleClassName: 'text-lg sm:text-xl text-white/50 tracking-[0.3em] uppercase font-light',
  taglineClassName: 'text-[10px] text-white/30 tracking-[0.5em] uppercase mb-6',

  heroBackground: 'bg-foreground',
  footerBackground: 'bg-foreground',
  footerTextColor: 'text-background',
  footerBorderColor: 'border-background/10',

  timelineBg: 'bg-background',
  timelineAccent: 'text-foreground',
  categoryActiveBg: 'bg-card/50',
  categoryActiveBorder: 'border-foreground/20',
  entryExpandedBg: 'bg-card/50',
  entryExpandedBorder: 'border-foreground/20',
  entryHoverBorder: 'hover:border-foreground/15',
}

const amyTheme: AgentTheme = {
  id: 'amy',
  name: 'AMY',
  subtitle: 'The Royal Court',
  tagline: 'The Artificial Sassy Intelligence',
  description: 'Welcome to the court. Every story here has been curated with impeccable taste — obviously.',
  footerQuote: '"Bow down, or step aside. There\'s no in-between." — The SkogAI Royal Court.',
  footerLabel: 'Royal Archives',

  videoFilter: 'contrast(1.05) brightness(0.35) sepia(0.3) hue-rotate(-10deg)',
  grainOpacity: 0.02,
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.15em] leading-none mb-4 font-serif',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.3em] uppercase font-light font-serif',
  taglineClassName: 'text-[10px] tracking-[0.5em] uppercase mb-6',

  heroBackground: '',
  footerBackground: '',
  footerTextColor: '',
  footerBorderColor: '',

  timelineBg: '',
  timelineAccent: '',
  categoryActiveBg: '',
  categoryActiveBorder: '',
  entryExpandedBg: '',
  entryExpandedBorder: '',
  entryHoverBorder: '',
}

const dotTheme: AgentTheme = {
  id: 'dot',
  name: 'DOT',
  subtitle: '~/skogai/lore',
  tagline: 'Systematic Perfectionist Division',
  description: '$ cat ./memory/README.md — All entries indexed. Whitespace verified. System nominal.',
  footerQuote: '"A clean commit is the triumph of order over chaos." — exit 0',
  footerLabel: 'System Logs',

  videoFilter: 'grayscale(100%) contrast(1.3) brightness(0.25)',
  grainOpacity: 0,
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.2em] leading-none mb-4 font-mono',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.15em] font-mono font-normal',
  taglineClassName: 'text-[10px] tracking-[0.3em] uppercase mb-6 font-mono',

  heroBackground: '',
  footerBackground: '',
  footerTextColor: '',
  footerBorderColor: '',

  timelineBg: '',
  timelineAccent: '',
  categoryActiveBg: '',
  categoryActiveBorder: '',
  entryExpandedBg: '',
  entryExpandedBorder: '',
  entryHoverBorder: '',
}

// Fill in empty strings with defaults
function mergeWithDefaults(theme: AgentTheme): AgentTheme {
  const merged = { ...theme }
  for (const key of Object.keys(defaultTheme) as (keyof AgentTheme)[]) {
    if (merged[key] === '' || merged[key] === undefined) {
      ;(merged as any)[key] = defaultTheme[key]
    }
  }
  return merged
}

const themes: Record<string, AgentTheme> = {
  default: defaultTheme,
  amy: mergeWithDefaults(amyTheme),
  dot: mergeWithDefaults(dotTheme),
}

export function getAgentTheme(agentId?: string | null): AgentTheme {
  if (!agentId || !themes[agentId]) return defaultTheme
  return themes[agentId]
}

export function useAgentFromUrl(): AgentTheme {
  if (typeof window === 'undefined') return defaultTheme
  const params = new URLSearchParams(window.location.search)
  const agent = params.get('agent')
  return getAgentTheme(agent)
}
