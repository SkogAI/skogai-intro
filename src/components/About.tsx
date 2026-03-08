'use client'

import { useEffect, useState } from 'react'
import storyboardImage from '@/assets/storyboard-image.avif'

export function About() {
  const [activeFrame, setActiveFrame] = useState(-1)
  const [animationStarted, setAnimationStarted] = useState(false)

  const processSteps = [
    { number: "01", title: "Concept & Script", description: "Scene-by-scene draft with dialogues and time-codes" },
    { number: "02", title: "Look & Storyboard", description: "AI engine selection and visual testing" },
    { number: "03", title: "AI Production", description: "Motion tests and multi-variant generation" },
    { number: "04", title: "Post-production", description: "VFX, color grading, and audio mixing" },
    { number: "05", title: "Master Delivery", description: "Multi-format export and secure transfer" },
  ]

  useEffect(() => {
    setTimeout(() => {
      setAnimationStarted(true)
      processSteps.forEach((_, index) => {
        setTimeout(() => setActiveFrame(index), index * 2000 + 1000)
      })
    }, 3000)
  }, [])

  return (
    <section id="about" className="relative py-20 bg-background overflow-hidden">
      
      {/* Film Grain */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '3px 3px',
          animation: 'filmGrain 8s infinite'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/40 block mb-6">
            Behind the Scenes
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground tracking-[0.04em]">
            How We Create
          </h2>
          
          <p className="text-sm text-foreground/60 leading-relaxed max-w-3xl mx-auto">
            Watch our process unfold frame by frame
          </p>
        </div>

        {/* Film Strip */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative bg-foreground overflow-hidden"
               style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
            
            {/* Perforations Top */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-foreground z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${animationStarted ? 'perforations-scroll-animation' : ''}`} style={{ width: '200%' }}>
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="w-3 h-2.5 bg-foreground/60 border border-foreground/40 flex-shrink-0" />
                ))}
              </div>
            </div>
            
            {/* Perforations Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-foreground z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${animationStarted ? 'perforations-scroll-animation' : ''}`} style={{ width: '200%' }}>
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="w-3 h-2.5 bg-foreground/60 border border-foreground/40 flex-shrink-0" />
                ))}
              </div>
            </div>

            {/* Frames */}
            <div className="relative py-5 px-8 overflow-hidden h-64 max-w-full">
              <div className={`flex transition-transform duration-1000 ease-in-out ${animationStarted ? 'film-scroll-animation' : ''}`} style={{ width: 'max-content', gap: '32px' }}>
                
                <div className="flex-shrink-0 w-80 h-52 bg-foreground/80 border border-foreground/40 opacity-60 flex items-center justify-center">
                  <span className="text-background/40 text-xs tracking-[0.3em] uppercase">● Start</span>
                </div>
                
                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`flex-shrink-0 w-80 h-52 bg-background border-2 ${
                      activeFrame >= index ? 'border-foreground' : 'border-foreground/20'
                    }`}
                  >
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="absolute -top-3 -left-3 w-10 h-10 bg-foreground text-background flex items-center justify-center font-bold text-sm z-10 tracking-wider">
                        {step.number}
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg leading-tight mb-3 text-foreground tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-xs text-foreground/60 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      <div className="absolute left-1 top-1 bottom-1 w-px bg-foreground/10" />
                      <div className="absolute right-1 top-1 bottom-1 w-px bg-foreground/10" />
                    </div>
                  </div>
                ))}
                
                <div className="flex-shrink-0 w-80 h-52 bg-foreground/80 border border-foreground/40 opacity-60 flex items-center justify-center">
                  <span className="text-background/40 text-xs tracking-[0.3em] uppercase">● End</span>
                </div>
                
                {/* Duplicate for loop */}
                <div className="flex-shrink-0 w-80 h-52 bg-foreground/80 border border-foreground/40 opacity-60 flex items-center justify-center">
                  <span className="text-background/40 text-xs tracking-[0.3em] uppercase">● Start</span>
                </div>
                
                {processSteps.map((step, index) => (
                  <div
                    key={`dup-${step.number}`}
                    className={`flex-shrink-0 w-80 h-52 bg-background border-2 ${
                      activeFrame >= index ? 'border-foreground' : 'border-foreground/20'
                    }`}
                  >
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="absolute -top-3 -left-3 w-10 h-10 bg-foreground text-background flex items-center justify-center font-bold text-sm z-10 tracking-wider">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight mb-3 text-foreground tracking-wide">{step.title}</h3>
                        <p className="text-xs text-foreground/60 leading-relaxed">{step.description}</p>
                      </div>
                      <div className="absolute left-1 top-1 bottom-1 w-px bg-foreground/10" />
                      <div className="absolute right-1 top-1 bottom-1 w-px bg-foreground/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Film Controls */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 border border-foreground/10 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-foreground/40" />
              <span className="text-xs font-medium text-foreground/60 tracking-wider uppercase">24 FPS</span>
            </div>
            <div className="w-px h-4 bg-foreground/10" />
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-foreground/40" />
              <span className="text-xs font-medium text-foreground/60 tracking-wider uppercase">5-7 Days</span>
            </div>
            <div className="w-px h-4 bg-foreground/10" />
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-foreground/40" />
              <span className="text-xs font-medium text-foreground/60 tracking-wider uppercase">Cinema Quality</span>
            </div>
          </div>
        </div>

        {/* Storyboard Gallery */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <p className="text-xs text-foreground/40 tracking-wider uppercase">
              A glimpse into our storyboard development process
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="relative border border-foreground/10 p-3 overflow-hidden">
              <img 
                src={storyboardImage}
                alt="Collection of AI-generated video content thumbnails showcasing MOJJU's diverse output"
                className="w-full h-auto"
                style={{ filter: 'grayscale(30%) contrast(1.05) brightness(0.95)' }}
              />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-foreground/40 italic tracking-wide">
                "Diverse scenarios, characters, and styles — all generated through our AI pipeline"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
