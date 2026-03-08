'use client'

import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.addEventListener('play', () => {
        if (videoRef.current) {
          videoRef.current.muted = isMuted
          videoRef.current.volume = isMuted ? 0 : 0.7
        }
      })
      videoRef.current.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleScroll = () => setIsMobileMenuOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '#portfolio', label: 'Work' },
    { href: '#about', label: 'Process' },
    { href: '#services', label: 'Capabilities' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-foreground">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        autoPlay muted loop playsInline
      >
        <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full z-[110]">
        <div className={`w-full px-6 sm:px-8 lg:px-12 py-5 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-sm border-b border-foreground/10' 
            : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className={`text-sm font-bold tracking-[0.3em] uppercase ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                MOJJU
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium tracking-[0.2em] uppercase gentle-animation ${
                    isScrolled 
                      ? 'text-foreground/60 hover:text-foreground' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 border gentle-animation cursor-pointer ${
                  isScrolled 
                    ? 'border-foreground/20 text-foreground hover:bg-foreground/5' 
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              
              {isMuted && (
                <span className={`hidden sm:inline text-xs tracking-widest uppercase ${isScrolled ? 'text-foreground/40' : 'text-white/50'}`}>
                  Sound on ↗
                </span>
              )}

              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`hidden sm:block text-xs font-semibold tracking-[0.15em] uppercase px-5 py-2.5 gentle-animation cursor-pointer ${
                  isScrolled
                    ? 'bg-foreground text-background hover:bg-foreground/90'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                Book a Call
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 border gentle-animation cursor-pointer z-[120] relative ${
                  isScrolled 
                    ? 'border-foreground/20 text-foreground' 
                    : 'border-white/20 text-white'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-[80] cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-background border-l border-foreground/10 z-[90] mobile-menu-panel transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 border border-foreground/20 text-foreground gentle-animation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            <div className="flex flex-col space-y-1 text-foreground">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-xs font-medium tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground hover:bg-foreground/5 gentle-animation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                setIsMobileMenuOpen(false)
              }}
              className="bg-foreground text-background text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3 hover:bg-foreground/90 gentle-animation mt-8 cursor-pointer"
            >
              Book a Call
            </button>
          </div>
        </div>
      </div>

      {/* Hero Title — Lower Left */}
      <div className="absolute bottom-12 left-6 sm:left-8 lg:left-12 z-40">
        <div className="max-w-2xl">
          <p className="text-xs text-white/50 tracking-[0.3em] uppercase mb-4">
            AI Film Production Studio
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] text-white tracking-[0.04em]">
            <span className="block">AI FILM</span>
            <span className="block">PRODUCTION</span>
            <span className="block text-white/60">WITHOUT LIMITS</span>
          </h1>
        </div>
      </div>
    </div>
  )
}
