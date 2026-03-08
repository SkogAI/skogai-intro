'use client'

import { usePostsByCategory } from '@/hooks/use-posts'
import { ImageWithFallback } from './figma/ImageWithFallback'

import marcusPhoto from '../assets/team-member-1.png'
import sofiaPhoto from '../assets/team-member-2.png'
import jakePhoto from '../assets/team-member-3.png'
import mayaPhoto from '../assets/team-member-4.png'
import connorPhoto from '../assets/team-member-5.png'
import zaraPhoto from '../assets/team-member-6.png'
import leoPhoto from '../assets/team-member-7.png'

const fallbackImages = [marcusPhoto, sofiaPhoto, jakePhoto, mayaPhoto, connorPhoto, zaraPhoto, leoPhoto]

export function Team() {
  const { data: teamMembers = [], isLoading } = usePostsByCategory('team')

  const wantedCriminals = teamMembers.map((member, index) => ({
    name: member.title,
    crime: member.excerpt || '',
    bounty: member.metadata?.bounty || '$0',
    description: member.content,
    image: member.image_url || fallbackImages[index % fallbackImages.length],
  }))

  if (isLoading) {
    return (
      <div className="relative py-32 bg-background w-full flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative py-32 bg-background w-full" style={{ overflow: 'visible', height: 'auto', minHeight: '0', maxHeight: 'none' }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12" style={{ overflow: 'visible', height: 'auto', minHeight: '0', maxHeight: 'none' }}>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/40 block mb-6">
            Meet the Outlaws
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-foreground tracking-[0.04em]">
            <span className="block mb-2">These people are</span>
            <span className="block">WANTED</span>
          </h2>
          
          <p className="text-sm text-foreground/60 max-w-4xl mx-auto leading-relaxed">
            Highly skilled and creatively dangerous
          </p>
        </div>

        {/* Wanted Board */}
        <div className="max-w-7xl mx-auto" style={{ overflow: 'visible' }}>
          <div className="relative" style={{ overflow: 'visible' }}>
            
            {/* Board Frame */}
            <div className="bg-foreground p-6 relative border border-foreground/80" style={{ overflow: 'visible' }}>
              
              {/* Board Surface */}
              <div className="bg-card p-6 relative border border-foreground/10" style={{ overflow: 'visible' }}>

                {/* Posters Grid */}
                <div className="relative z-10" style={{ overflow: 'visible' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6" style={{ overflow: 'visible' }}>
                    {wantedCriminals.slice(0, 4).map((criminal) => (
                      <WantedPoster key={criminal.name} criminal={criminal} />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ overflow: 'visible' }}>
                    {wantedCriminals.slice(4).map((criminal) => (
                      <WantedPoster key={criminal.name} criminal={criminal} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WantedPoster({ criminal }: { criminal: { name: string; bounty: string; description: string; image: string } }) {
  return (
    <div
      className="group hover:-translate-y-1 transition-transform duration-300"
      style={{ overflow: 'visible' }}
    >
      <div className="bg-background border border-foreground/20 relative" style={{ overflow: 'visible' }}>
        
        {/* Push pins */}
        <div className="absolute -top-1.5 left-3 w-3 h-3 bg-foreground/60" />
        <div className="absolute -top-1.5 right-3 w-3 h-3 bg-foreground/60" />

        <div className="p-5 text-center relative z-10">
          
          {/* WANTED Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-2 tracking-[0.15em]">
              WANTED
            </h3>
            <div className="w-full h-px bg-foreground" />
          </div>

          {/* Photo */}
          <div className="relative mb-4 mx-auto w-28 h-28 border border-foreground/30 bg-card" style={{ overflow: 'visible' }}>
            <ImageWithFallback
              src={criminal.image}
              alt={criminal.name}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) sepia(20%) contrast(1.1) brightness(0.95)' }}
            />
          </div>

          {/* Details */}
          <div className="text-left space-y-2">
            <div className="font-bold text-sm text-foreground tracking-wider uppercase">{criminal.name}</div>
            <div className="font-bold text-xs tracking-wider uppercase" style={{ color: 'var(--darkroom-red)' }}>
              Bounty: {criminal.bounty}
            </div>
            <div className="text-xs text-foreground/60 leading-relaxed border-l-2 border-foreground/20 pl-3">
              {criminal.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
