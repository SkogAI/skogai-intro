'use client'

import { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { usePostsByCategory } from '@/hooks/use-posts'

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null)
  const { data: servicePosts = [], isLoading } = usePostsByCategory('service')

  const services = servicePosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.content,
    image: post.image_url || '',
  }))

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section className="relative py-20 flex items-center justify-center" style={{ background: 'hsl(30, 15%, 12%)' }}>
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 animate-spin" />
      </section>
    )
  }

  const renderClothesline = () => (
    <div className="absolute top-8 left-0 right-0 h-[2px] rope-sway bg-white/20" />
  )

  const renderClothespin = () => (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="w-3 h-8 bg-white/20 border border-white/10" />
    </div>
  )

  const renderServicePhoto = (service: typeof services[0], index: number) => (
    <div
      key={service.id}
      className={`transform transition-all duration-500 ${
        hoveredPhoto === service.id ? '-translate-y-1' : ''
      } ${
        index % 3 === 0 ? 'photo-sway-1' : index % 3 === 1 ? 'photo-sway-2' : 'photo-sway-3'
      }`}
      onMouseEnter={() => setHoveredPhoto(service.id)}
      onMouseLeave={() => setHoveredPhoto(null)}
    >
      {renderClothespin()}
      
      <div className="relative bg-white/5 border border-white/10 p-4 pb-8 cursor-pointer w-[260px] sm:w-[280px] max-w-[90vw]"
           style={{
             filter: hoveredPhoto === service.id ? 'brightness(1.05)' : 'brightness(1)',
           }}>
        
        <div className="h-48 mb-6 relative">
          <ImageWithFallback
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%) sepia(15%) contrast(1.1) brightness(0.9)' }}
          />
        </div>
        
        <div className="relative">
          <h3 className="font-bold text-sm text-white/90 mb-2 leading-tight tracking-wider uppercase">{service.title}</h3>
          <p className="text-xs text-white/50 leading-relaxed">{service.description}</p>
        </div>
        
        <div className="absolute bottom-2 right-3 text-[10px] text-white/20 tracking-[0.2em] uppercase">MOJJU Lab</div>
      </div>
    </div>
  )

  return (
    <section id="services" className="relative py-20" style={{
      background: 'linear-gradient(135deg, hsl(30, 15%, 14%) 0%, hsl(30, 12%, 10%) 50%, hsl(30, 15%, 12%) 100%)',
      overflow: 'visible'
    }}>
      
      {/* Subtle darkroom glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsla(0, 60%, 30%, 0.08)' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-2xl" style={{ background: 'hsla(30, 40%, 20%, 0.06)' }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-white/30 block mb-6">
              Fresh from the Darkroom
            </span>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white/90 tracking-[0.04em] transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            What We Develop
          </h2>
          
          <p className={`text-sm text-white/40 leading-relaxed max-w-3xl mx-auto transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Developed with precision, delivered with passion
          </p>
        </div>

        {/* Clotheslines */}
        <div className={`w-full transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ overflow: 'visible' }}>
          
          <div className="relative mb-24" style={{ overflow: 'visible' }}>
            {renderClothesline()}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-16 pt-20 max-w-7xl mx-auto px-4">
              {services.slice(0, 3).map((service, index) => renderServicePhoto(service, index))}
            </div>
          </div>

          <div className="relative" style={{ overflow: 'visible' }}>
            {renderClothesline()}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-16 pt-20 max-w-7xl mx-auto px-4">
              {services.slice(3, 6).map((service, index) => renderServicePhoto(service, index + 3))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xs text-white/25 leading-relaxed max-w-2xl mx-auto tracking-wide">
              Each piece is carefully developed in our creative darkroom, ensuring every detail captures the essence of your vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
