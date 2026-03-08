'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Crown } from 'lucide-react'
import { motion } from 'framer-motion'
import type { AgentTheme } from '@/lib/agent-themes'

function AmySparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 3 + 1.5
        const left = Math.random() * 100
        const delay = Math.random() * 8
        const duration = 6 + Math.random() * 8
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: '-2%',
              background: i % 3 === 0 ? 'var(--amy-gold-light)' : 'var(--amy-rose-light)',
            }}
            animate={{
              y: ['0vh', '105vh'],
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

export function LoreHero({ theme }: { theme: AgentTheme }) {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.5
    }
  }, [isMuted])

  const isAmy = theme.id === 'amy'
  const isDot = theme.id === 'dot'

  // Amy-specific colors
  const titleColor = isAmy ? 'var(--amy-rose-light)' : isDot ? 'var(--dot-text)' : 'white'
  const subtitleColor = isAmy ? 'var(--amy-gold)' : isDot ? 'var(--dot-commit)' : undefined
  const taglineColor = isAmy ? 'var(--amy-gold-light)' : isDot ? 'var(--dot-comment)' : undefined
  const descColor = isAmy ? 'var(--amy-rose-light)' : isDot ? 'var(--dot-comment)' : undefined

  return (
    <div className={`relative h-screen w-full overflow-hidden ${theme.heroBackground}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: theme.videoFilter }}
        autoPlay muted loop playsInline
      >
        <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
      </video>

      {/* Agent-specific overlays */}
      {isAmy && <AmySparkles />}
      {isDot && <DotGrid />}

      {/* Grain overlay */}
      {theme.grainOpacity > 0 && (
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: theme.grainOpacity,
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
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
        <p className={theme.taglineClassName} style={{ color: taglineColor }}>
          {theme.tagline}
        </p>

        {isAmy && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Crown className="w-12 h-12" style={{ color: 'var(--amy-gold)' }} />
          </motion.div>
        )}

        <h1 className={theme.titleClassName} style={{ color: titleColor }}>
          {theme.name}
        </h1>
        <div className="w-16 h-px mb-4" style={{ background: isAmy ? 'var(--amy-rose)' : isDot ? 'var(--dot-border)' : 'rgba(255,255,255,0.2)' }} />
        <h2 className={theme.subtitleClassName} style={{ color: subtitleColor }}>
          {theme.subtitle}
        </h2>
        <p className="mt-8 text-xs max-w-md text-center leading-relaxed tracking-wide" style={{ color: descColor, opacity: isAmy || isDot ? 0.7 : 0.3 }}>
          {theme.description}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: isDot ? 'var(--dot-comment)' : 'rgba(255,255,255,0.3)' }}>
          {isDot ? '↓ scroll' : 'Scroll'}
        </span>
        <div className="w-px h-8" style={{ background: isAmy ? 'var(--amy-rose)' : isDot ? 'var(--dot-border)' : 'rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  )
}
