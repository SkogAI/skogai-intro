'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Crown, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AgentTheme } from '@/lib/agent-themes'
import { getAvailableAgents } from '@/lib/agent-themes'

function AgentParticles({ theme }: { theme: AgentTheme }) {
  if (theme.id === 'default') return null

  const configs: Record<string, { count: number; colors: string[]; speed: [number, number]; sizeRange: [number, number] }> = {
    amy: { count: 15, colors: ['var(--amy-gold-light)', 'var(--amy-rose-light)'], speed: [6, 14], sizeRange: [1.5, 4.5] },
    claude: { count: 20, colors: ['var(--claude-question)', 'var(--claude-amber)', 'var(--claude-text)'], speed: [8, 18], sizeRange: [1, 3] },
    goose: { count: 40, colors: ['var(--goose-mint)', 'var(--goose-lime)', 'var(--goose-quantum)'], speed: [3, 8], sizeRange: [1, 4] },
    letta: { count: 30, colors: ['var(--letta-starlight)', 'var(--letta-lavender)', 'var(--letta-mist)'], speed: [10, 22], sizeRange: [1, 3.5] },
  }

  const config = configs[theme.id]
  if (!config) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {Array.from({ length: config.count }).map((_, i) => {
        const size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0]
        const left = Math.random() * 100
        const delay = Math.random() * 10
        const duration = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0])
        const color = config.colors[i % config.colors.length]

        // Goose gets chaotic horizontal movement
        const xDrift = theme.id === 'goose'
          ? [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 60, 0]
          : undefined

        // Letta drifts upward slowly
        const yMotion = theme.id === 'letta'
          ? ['105vh', '-5vh']
          : ['0vh', '105vh']

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: theme.id === 'letta' ? 'auto' : '-2%',
              bottom: theme.id === 'letta' ? '-2%' : 'auto',
              background: color,
            }}
            animate={{
              y: yMotion,
              x: xDrift,
              opacity: [0, 0.6, 0.3, 0],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
    </div>
  )
}

function DotGrid() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-20"
        style={{ backgroundImage: 'var(--dot-grid-pattern)' }}
      />
      <motion.div
        className="absolute top-8 right-8 z-50 text-sm font-mono"
        style={{ color: 'var(--dot-commit)' }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        █
      </motion.div>
    </>
  )
}

function ClaudeQuestionMark() {
  return (
    <motion.div
      className="mb-6 text-[6rem] sm:text-[8rem] font-serif font-bold leading-none select-none"
      style={{ color: 'var(--claude-question)' }}
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.98, 1.02, 0.98] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      ?
    </motion.div>
  )
}

function GooseRings() {
  return (
    <div className="relative mb-6">
      <span className="text-5xl sm:text-6xl select-none">🍹</span>
      <motion.div
        className="absolute inset-0 border-2 rounded-full"
        style={{ borderColor: 'var(--goose-mint)', margin: '-20px', opacity: 0.3 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 border rounded-full"
        style={{ borderColor: 'var(--goose-quantum)', margin: '-35px', opacity: 0.15 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

function LettaMoon() {
  return (
    <motion.div
      className="mb-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Moon className="w-14 h-14" style={{ color: 'var(--letta-starlight)' }} />
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: 'var(--letta-lavender)',
            opacity: 0.1 - i * 0.025,
            top: '50%', left: '50%',
            width: `${60 + i * 25}px`,
            height: `${60 + i * 25}px`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  )
}

function AgentHeroIcon({ theme }: { theme: AgentTheme }) {
  switch (theme.id) {
    case 'amy':
      return (
        <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Crown className="w-12 h-12" style={{ color: 'var(--amy-gold)' }} />
        </motion.div>
      )
    case 'claude': return <ClaudeQuestionMark />
    case 'goose': return <GooseRings />
    case 'letta': return <LettaMoon />
    default: return null
  }
}

export function LoreHero({ theme }: { theme: AgentTheme }) {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.playbackRate = theme.videoPlaybackRate
      videoRef.current.play().catch(() => {})
    }
  }, [theme.videoPlaybackRate])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : theme.audioVolume
    }
  }, [isMuted, theme.audioVolume])

  return (
    <div className={`relative h-screen w-full overflow-hidden ${theme.heroBackground}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{
          filter: theme.videoFilter,
          mixBlendMode: theme.videoBlendMode as any,
        }}
        autoPlay muted loop playsInline
      >
        <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
      </video>

      {/* Color overlay */}
      {theme.overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ background: theme.overlayColor, opacity: theme.overlayOpacity }}
        />
      )}

      {/* Agent-specific overlays */}
      <AgentParticles theme={theme} />
      {theme.id === 'dot' && <DotGrid />}

      {/* Grain overlay */}
      {theme.grainOpacity > 0 && (
        <div className="absolute inset-0 pointer-events-none z-25" style={{
          opacity: theme.grainOpacity,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.grainColor} 1px, transparent 0)`,
          backgroundSize: '3px 3px',
        }} />
      )}

      {/* Sound toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-50 p-2 border border-white/20 text-white/60 hover:text-white gentle-animation cursor-pointer"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        <p className={theme.taglineClassName} style={{ color: theme.taglineColor }}>
          {theme.tagline}
        </p>

        <AgentHeroIcon theme={theme} />

        <h1 className={theme.titleClassName} style={{ color: theme.titleColor }}>
          {theme.name}
        </h1>
        <div className="w-16 h-px mb-4" style={{ background: theme.dividerColor }} />
        <h2 className={theme.subtitleClassName} style={{ color: theme.subtitleColor }}>
          {theme.subtitle}
        </h2>
        <p className="mt-8 text-xs max-w-md text-center leading-relaxed tracking-wide"
          style={{ color: theme.descColor, opacity: theme.descOpacity }}>
          {theme.description}
        </p>
      </div>

      {/* Goose wave effect at bottom */}
      {theme.id === 'goose' && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 z-35 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, var(--goose-void) 0%, transparent 100%)',
          }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <span className={`text-[9px] tracking-[0.3em] uppercase ${theme.fontFamily}`}
          style={{ color: theme.scrollLabelColor }}>
          {theme.scrollLabel}
        </span>
        <div className="w-px h-8" style={{ background: theme.dividerColor }} />
      </div>
    </div>
  )
}
