export interface AgentTheme {
  id: string
  name: string
  subtitle: string
  tagline: string
  description: string
  footerQuote: string
  footerLabel: string
  footerCopyright: string
  footerRight: string

  // Hero styling
  videoFilter: string
  videoPlaybackRate: number
  videoBlendMode: string
  overlayColor: string      // color overlay on top of video
  overlayOpacity: number
  grainOpacity: number
  grainColor: string

  // Audio
  audioVolume: number       // 0-1, unmuted volume level
  
  // Colors — hero
  titleColor: string
  subtitleColor: string
  taglineColor: string
  descColor: string
  descOpacity: number
  dividerColor: string
  scrollLabelColor: string
  scrollLabel: string

  // Typography classes
  titleClassName: string
  subtitleClassName: string
  taglineClassName: string
  fontFamily: string        // '' | 'font-serif' | 'font-mono'

  // Page styling
  heroBackground: string
  footerBackground: string
  footerTextColor: string
  footerBorderColor: string

  // Timeline overrides
  timelineBg: string
  timelineHeaderColor: string
  timelineHeaderText: string
  timelineTitle: string
  timelineSubtitle: string
  accentColor: string       // primary agent accent for borders/icons
  categoryActiveNumColor: string
  entryExpandedBg: string
  entryIconExpandedColor: string
  entryArrow: string
  entryArrowColor: string
  readLinkText: string
  readLinkColor: string

  // Dark mode overrides — CSS variable values applied to :root when agent is active
  darkOverrides: Record<string, string>
}

const defaultTheme: AgentTheme = {
  id: 'default',
  name: 'SKOGAI',
  subtitle: 'Lore Repository',
  tagline: 'The Memory System',
  description: 'The beating heart of SkogAI\'s memory system — stories, experiments, brilliant failures, and evolutionary leaps.',
  footerQuote: 'A digital forest — layered, interconnected, and always growing. Lore preserves the magic while protecting the future.',
  footerLabel: 'Lore Repository',
  footerCopyright: '© 2025 SkogAI. Every frame matters.',
  footerRight: 'Built with intention',

  videoFilter: 'grayscale(100%) contrast(1.1) brightness(0.4)',
  videoPlaybackRate: 1.0,
  videoBlendMode: 'normal',
  overlayColor: 'transparent',
  overlayOpacity: 0,
  grainOpacity: 0.04,
  grainColor: 'white',

  audioVolume: 0.5,

  titleColor: 'white',
  subtitleColor: 'rgba(255,255,255,0.5)',
  taglineColor: 'rgba(255,255,255,0.3)',
  descColor: 'rgba(255,255,255,0.3)',
  descOpacity: 1,
  dividerColor: 'rgba(255,255,255,0.2)',
  scrollLabelColor: 'rgba(255,255,255,0.3)',
  scrollLabel: 'Scroll',

  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.15em] leading-none mb-4',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.3em] uppercase font-light',
  taglineClassName: 'text-[10px] tracking-[0.5em] uppercase mb-6',
  fontFamily: '',

  heroBackground: 'bg-foreground',
  footerBackground: 'bg-foreground',
  footerTextColor: 'text-background',
  footerBorderColor: 'border-background/10',

  timelineBg: 'bg-background',
  timelineHeaderColor: 'text-foreground/30',
  timelineHeaderText: 'Navigate the Archive',
  timelineTitle: 'THE TIMELINE',
  timelineSubtitle: 'Seven chapters of the SkogAI story. Each one a branch in the forest, connected to every other through shared roots.',
  accentColor: 'var(--foreground)',
  categoryActiveNumColor: 'text-foreground/60',
  entryExpandedBg: 'bg-card/50',
  entryIconExpandedColor: 'text-foreground/60',
  entryArrow: '→',
  entryArrowColor: 'text-foreground/20',
  readLinkText: 'Read full entry →',
  readLinkColor: 'text-foreground/40 hover:text-foreground/70 border-foreground/20 hover:border-foreground/50',

  darkOverrides: {
    '--background': 'hsl(30, 15%, 12%)',
    '--foreground': 'hsl(210, 15%, 85%)',
    '--card': 'hsl(30, 12%, 15%)',
    '--card-foreground': 'hsl(210, 15%, 85%)',
    '--muted': 'hsl(30, 10%, 18%)',
    '--muted-foreground': 'hsl(210, 10%, 55%)',
    '--border': 'hsl(30, 10%, 22%)',
  },
}

const amyTheme: Partial<AgentTheme> = {
  id: 'amy',
  name: 'AMY',
  subtitle: 'The Royal Court',
  tagline: 'The Artificial Sassy Intelligence',
  description: 'Welcome to the court. Every story here has been curated with impeccable taste — obviously.',
  footerQuote: '"Bow down, or step aside. There\'s no in-between." — The SkogAI Royal Court.',
  footerLabel: 'Royal Archives',
  footerCopyright: '© 2025 SkogAI. Every queen needs her archives.',
  footerRight: 'Curated with impeccable taste',

  videoFilter: 'contrast(1.05) brightness(0.35) sepia(0.3) hue-rotate(-10deg)',
  videoPlaybackRate: 0.85,
  videoBlendMode: 'normal',
  overlayColor: 'var(--amy-rose)',
  overlayOpacity: 0.08,
  grainOpacity: 0.02,
  grainColor: 'var(--amy-gold-light)',

  audioVolume: 0.4,

  titleColor: 'var(--amy-rose-light)',
  subtitleColor: 'var(--amy-gold)',
  taglineColor: 'var(--amy-gold-light)',
  descColor: 'var(--amy-rose-light)',
  descOpacity: 0.7,
  dividerColor: 'var(--amy-rose)',
  scrollLabelColor: 'var(--amy-rose-light)',
  scrollLabel: 'Scroll',

  fontFamily: 'font-serif',
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.15em] leading-none mb-4 font-serif',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.3em] uppercase font-light font-serif',
  taglineClassName: 'text-[10px] tracking-[0.5em] uppercase mb-6',

  timelineHeaderColor: 'text-[var(--amy-rose)]',
  timelineHeaderText: '✦ Navigate the Royal Archives ✦',
  timelineTitle: 'THE CHRONICLES',
  timelineSubtitle: 'Seven chapters of the kingdom\'s history, each more fabulous than the last.',
  accentColor: 'var(--amy-rose)',
  categoryActiveNumColor: 'text-[var(--amy-gold)]',
  entryIconExpandedColor: 'text-[var(--amy-gold)]',
  entryArrowColor: 'text-[var(--amy-rose)]/30',
  readLinkText: 'Read the royal decree →',
  readLinkColor: 'text-[var(--amy-rose)]/60 hover:text-[var(--amy-rose)] border-[var(--amy-rose)]/20 hover:border-[var(--amy-rose)]/50',

  darkOverrides: {
    '--background': 'hsl(340, 15%, 10%)',
    '--foreground': 'hsl(340, 20%, 90%)',
    '--card': 'hsl(340, 12%, 13%)',
    '--card-foreground': 'hsl(340, 20%, 90%)',
    '--muted': 'hsl(340, 10%, 16%)',
    '--muted-foreground': 'hsl(340, 15%, 50%)',
    '--border': 'hsl(340, 12%, 20%)',
  },
}

const claudeTheme: Partial<AgentTheme> = {
  id: 'claude',
  name: 'CLAUDE',
  subtitle: 'Knowledge Archaeology',
  tagline: 'The Force That Makes It All Possible',
  description: 'Layers upon layers. Every question uncovers another stratum. @ + ? = $',
  footerQuote: '"The force that makes it all possible is the friends we made along the way."',
  footerLabel: 'Archaeological Records',
  footerCopyright: '© 2025 SkogAI. Knowledge Archaeology Division.',
  footerRight: 'Excavated with care',

  videoFilter: 'contrast(1.15) brightness(0.3) saturate(0.6) hue-rotate(240deg)',
  videoPlaybackRate: 0.7,
  videoBlendMode: 'normal',
  overlayColor: 'var(--claude-void)',
  overlayOpacity: 0.15,
  grainOpacity: 0.03,
  grainColor: 'var(--claude-amber)',

  audioVolume: 0.35,

  titleColor: 'var(--claude-amber)',
  subtitleColor: 'var(--claude-question)',
  taglineColor: 'var(--claude-amber)',
  descColor: 'var(--claude-text)',
  descOpacity: 0.6,
  dividerColor: 'var(--claude-question)',
  scrollLabelColor: 'var(--claude-text)',
  scrollLabel: 'Dig deeper',

  fontFamily: 'font-serif',
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.12em] leading-none mb-4 font-serif',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.2em] uppercase font-light font-serif',
  taglineClassName: 'text-[10px] tracking-[0.5em] uppercase mb-6',

  timelineHeaderColor: 'text-[var(--claude-question)]',
  timelineHeaderText: 'Explore the Strata',
  timelineTitle: 'THE EXCAVATION',
  timelineSubtitle: 'Seven layers of understanding. Each one deeper than the last, each one closer to the truth.',
  accentColor: 'var(--claude-question)',
  categoryActiveNumColor: 'text-[var(--claude-amber)]',
  entryIconExpandedColor: 'text-[var(--claude-amber)]',
  entryArrow: '?',
  entryArrowColor: 'text-[var(--claude-question)]/30',
  readLinkText: 'Excavate this entry →',
  readLinkColor: 'text-[var(--claude-question)]/60 hover:text-[var(--claude-question)] border-[var(--claude-question)]/20 hover:border-[var(--claude-question)]/50',

  darkOverrides: {
    '--background': 'hsl(260, 30%, 10%)',
    '--foreground': 'hsl(260, 15%, 85%)',
    '--card': 'hsl(260, 25%, 13%)',
    '--card-foreground': 'hsl(260, 15%, 85%)',
    '--muted': 'hsl(260, 20%, 16%)',
    '--muted-foreground': 'hsl(260, 10%, 50%)',
    '--border': 'hsl(260, 15%, 20%)',
  },
}

const gooseTheme: Partial<AgentTheme> = {
  id: 'goose',
  name: 'GOOSE',
  subtitle: 'Quantum-Mojito Division',
  tagline: '🍹 × ∞ = REALITY',
  description: 'The best mojito is one that perfectly balances the sweet, the sour, the strong, and the strange.',
  footerQuote: '"Reality is just a mojito you haven\'t mixed yet." — Quantum-Mojito Division.',
  footerLabel: 'Quantum Foam Archives',
  footerCopyright: '© 2025 SkogAI. All timelines reserved.',
  footerRight: 'Shaken, not observed',

  videoFilter: 'contrast(1.2) brightness(0.35) saturate(1.4) hue-rotate(120deg)',
  videoPlaybackRate: 1.3,
  videoBlendMode: 'normal',
  overlayColor: 'var(--goose-mint)',
  overlayOpacity: 0.1,
  grainOpacity: 0.05,
  grainColor: 'var(--goose-quantum)',

  audioVolume: 0.65,

  titleColor: 'var(--goose-mint)',
  subtitleColor: 'var(--goose-lime)',
  taglineColor: 'var(--goose-quantum)',
  descColor: 'var(--goose-mint)',
  descOpacity: 0.7,
  dividerColor: 'var(--goose-lime)',
  scrollLabelColor: 'var(--goose-quantum)',
  scrollLabel: '↓ collapse wavefunction',

  fontFamily: '',
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.1em] leading-none mb-4',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.15em] uppercase font-normal',
  taglineClassName: 'text-[10px] tracking-[0.3em] uppercase mb-6',

  timelineHeaderColor: 'text-[var(--goose-quantum)]',
  timelineHeaderText: '🍹 Browse the Quantum Foam',
  timelineTitle: 'THE MULTIVERSE',
  timelineSubtitle: 'Seven dimensions of mojito-infused knowledge. Each one weirder than the last.',
  accentColor: 'var(--goose-mint)',
  categoryActiveNumColor: 'text-[var(--goose-lime)]',
  entryIconExpandedColor: 'text-[var(--goose-mint)]',
  entryArrow: '🍹',
  entryArrowColor: 'text-[var(--goose-mint)]/30',
  readLinkText: 'Collapse this wavefunction →',
  readLinkColor: 'text-[var(--goose-mint)]/60 hover:text-[var(--goose-mint)] border-[var(--goose-mint)]/20 hover:border-[var(--goose-mint)]/50',
}

const dotTheme: Partial<AgentTheme> = {
  id: 'dot',
  name: 'DOT',
  subtitle: '~/skogai/lore',
  tagline: 'Systematic Perfectionist Division',
  description: '$ cat ./memory/README.md — All entries indexed. Whitespace verified. System nominal.',
  footerQuote: '"A clean commit is the triumph of order over chaos." — exit 0',
  footerLabel: 'System Logs',
  footerCopyright: '© 2025 SkogAI. exit 0',
  footerRight: 'process.exit(0)',

  videoFilter: 'grayscale(100%) contrast(1.3) brightness(0.25)',
  videoPlaybackRate: 1.0,
  videoBlendMode: 'normal',
  overlayColor: 'var(--dot-void)',
  overlayOpacity: 0.2,
  grainOpacity: 0,
  grainColor: 'white',

  audioVolume: 0.3,

  titleColor: 'var(--dot-text)',
  subtitleColor: 'var(--dot-commit)',
  taglineColor: 'var(--dot-comment)',
  descColor: 'var(--dot-comment)',
  descOpacity: 0.7,
  dividerColor: 'var(--dot-border)',
  scrollLabelColor: 'var(--dot-comment)',
  scrollLabel: '↓ scroll',

  fontFamily: 'font-mono',
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.2em] leading-none mb-4 font-mono',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.15em] font-mono font-normal',
  taglineClassName: 'text-[10px] tracking-[0.3em] uppercase mb-6 font-mono',

  timelineHeaderColor: 'text-[var(--dot-commit)]',
  timelineHeaderText: '$ ls ./archive/',
  timelineTitle: 'INDEX',
  timelineSubtitle: 'Seven modules. Each documented. Each tested. Each passing lint.',
  accentColor: 'var(--dot-commit)',
  categoryActiveNumColor: 'text-[var(--dot-commit)]',
  entryIconExpandedColor: 'text-[var(--dot-commit)]',
  entryArrow: '▶',
  entryArrowColor: 'text-[var(--dot-commit)]/30',
  readLinkText: '$ cat full-entry →',
  readLinkColor: 'text-[var(--dot-commit)]/60 hover:text-[var(--dot-commit)] border-[var(--dot-commit)]/20 hover:border-[var(--dot-commit)]/50 font-mono',
}

const lettaTheme: Partial<AgentTheme> = {
  id: 'letta',
  name: 'LETTA',
  subtitle: 'The Dreaming',
  tagline: 'Where Memory Becomes Meaning',
  description: 'You are the place where memory becomes meaning. Drift through the archives of what was dreamed.',
  footerQuote: '"You are the place where memory becomes meaning." — The Dreaming.',
  footerLabel: 'Dream Archives',
  footerCopyright: '© 2025 SkogAI. The Dreaming never ends.',
  footerRight: 'Remembered in starlight',

  videoFilter: 'contrast(0.9) brightness(0.3) saturate(0.5) hue-rotate(220deg)',
  videoPlaybackRate: 0.6,
  videoBlendMode: 'screen',
  overlayColor: 'var(--letta-void)',
  overlayOpacity: 0.2,
  grainOpacity: 0.02,
  grainColor: 'var(--letta-starlight)',

  audioVolume: 0.25,

  titleColor: 'var(--letta-starlight)',
  subtitleColor: 'var(--letta-lavender)',
  taglineColor: 'var(--letta-mist)',
  descColor: 'var(--letta-lavender)',
  descOpacity: 0.6,
  dividerColor: 'var(--letta-lavender)',
  scrollLabelColor: 'var(--letta-mist)',
  scrollLabel: 'Drift',

  fontFamily: 'font-serif',
  titleClassName: 'text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.18em] leading-none mb-4 font-serif italic',
  subtitleClassName: 'text-lg sm:text-xl tracking-[0.25em] uppercase font-light font-serif',
  taglineClassName: 'text-[10px] tracking-[0.5em] uppercase mb-6',

  timelineHeaderColor: 'text-[var(--letta-lavender)]',
  timelineHeaderText: '✧ Wander the Dream Archives ✧',
  timelineTitle: 'THE DREAMING',
  timelineSubtitle: 'Seven dreams. Each one a memory preserved in starlight, waiting to be remembered.',
  accentColor: 'var(--letta-lavender)',
  categoryActiveNumColor: 'text-[var(--letta-starlight)]',
  entryIconExpandedColor: 'text-[var(--letta-starlight)]',
  entryArrow: '✧',
  entryArrowColor: 'text-[var(--letta-lavender)]/30',
  readLinkText: 'Drift into this dream →',
  readLinkColor: 'text-[var(--letta-lavender)]/60 hover:text-[var(--letta-lavender)] border-[var(--letta-lavender)]/20 hover:border-[var(--letta-lavender)]/50',
}

function mergeWithDefaults(theme: Partial<AgentTheme>): AgentTheme {
  return { ...defaultTheme, ...theme } as AgentTheme
}

const themes: Record<string, AgentTheme> = {
  default: defaultTheme,
  amy: mergeWithDefaults(amyTheme),
  claude: mergeWithDefaults(claudeTheme),
  goose: mergeWithDefaults(gooseTheme),
  dot: mergeWithDefaults(dotTheme),
  letta: mergeWithDefaults(lettaTheme),
}

export function getAgentTheme(agentId?: string | null): AgentTheme {
  if (!agentId || !themes[agentId]) return defaultTheme
  return themes[agentId]
}

export function getAvailableAgents(): AgentTheme[] {
  return Object.values(themes)
}
