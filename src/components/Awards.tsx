'use client'

import { usePostsByCategory } from '@/hooks/use-posts'
import minimalBestFilm from '../assets/minimal-best-film.png'
import minimalAudienceChoice from '../assets/minimal-audience-choice.png'
import minimalInnovation from '../assets/minimal-innovation.png'
import minimalDirectorsChoice from '../assets/minimal-directors-choice.png'
import minimalExcellence from '../assets/minimal-excellence.png'
import minimalRisingTalent from '../assets/minimal-rising-talent.png'

const fallbackImages = [minimalBestFilm, minimalAudienceChoice, minimalInnovation, minimalDirectorsChoice, minimalExcellence, minimalRisingTalent]

export function Awards() {
  const { data: awardPosts = [], isLoading } = usePostsByCategory('award')

  const awards = awardPosts.map((post, index) => ({
    image: post.image_url || fallbackImages[index % fallbackImages.length],
    variant: post.metadata?.variant || 'light',
  }))

  if (isLoading) {
    return (
      <section className="relative py-20 bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground animate-spin" />
      </section>
    )
  }

  return (
    <section id="awards" className="relative py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/40 block mb-6">
            Recognition & Achievement
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground tracking-[0.04em]">
            Awards
          </h2>
          
          <p className="text-sm text-foreground/60 leading-relaxed max-w-3xl mx-auto">
            Celebrated excellence in AI-powered film production
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className={`relative p-6 border transition-all duration-300 hover:border-foreground/20 ${
                    award.variant === 'dark' 
                      ? 'bg-foreground/5 border-foreground/10' 
                      : 'bg-background border-foreground/10'
                  }`}>
                    <img 
                      src={award.image}
                      alt="Film Festival Award Laurel"
                      className="w-full h-auto max-w-48 mx-auto"
                      style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
