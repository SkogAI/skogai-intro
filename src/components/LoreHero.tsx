'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function LoreHero() {
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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-foreground">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.4)' }}
        autoPlay muted loop playsInline
      >
        <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
      </video>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '3px 3px',
      }} />

      {/* Sound toggle — top right */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-50 p-2 border border-white/20 text-white/60 hover:text-white gentle-animation cursor-pointer"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        <p className="text-[10px] text-white/30 tracking-[0.5em] uppercase mb-6">
          The Memory System
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-[0.15em] leading-none mb-4">
          SKOGAI
        </h1>
        <div className="w-16 h-px bg-white/20 mb-4" />
        <h2 className="text-lg sm:text-xl text-white/50 tracking-[0.3em] uppercase font-light">
          Lore Repository
        </h2>
        <p className="mt-8 text-xs text-white/30 max-w-md text-center leading-relaxed tracking-wide">
          The beating heart of SkogAI's memory system — stories, experiments,
          brilliant failures, and evolutionary leaps.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </div>
  )
}
