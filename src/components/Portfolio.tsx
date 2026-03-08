'use client'

import { usePostsByCategory } from '@/hooks/use-posts'

export function Portfolio() {
  const { data: portfolioPosts = [], isLoading } = usePostsByCategory('portfolio')
  const featured = portfolioPosts[0]

  if (isLoading) {
    return (
      <section className="relative py-32 bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground animate-spin" />
      </section>
    )
  }

  if (!featured) return null

  const metadata = featured.metadata || {}
  const details = metadata.details || {}

  return (
    <section id="portfolio" className="relative py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/40 block mb-6">
            Featured Work
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-foreground tracking-[0.04em]">
            Creative Productions
          </h2>
          
          <p className="text-base text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            {featured.excerpt}
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-card border border-foreground/10 overflow-hidden">
            <div className="relative">
              <div className="aspect-video">
                <iframe
                  src={metadata.video_url}
                  title={featured.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              
              <div className="absolute top-4 right-4">
                <span className="bg-foreground/80 px-3 py-1.5 text-xs font-medium tracking-[0.15em] uppercase text-background">
                  Latest Project
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {metadata.tag && (
                    <span className="border border-foreground/20 text-foreground/60 px-3 py-1 text-xs font-medium tracking-[0.1em] uppercase">
                      {metadata.tag}
                    </span>
                  )}
                  {metadata.client && (
                    <span className="text-xs text-foreground/40 tracking-wider uppercase">
                      Client: {metadata.client}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 tracking-wide">
                  {featured.title}
                </h3>
                
                <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                  {featured.content}
                </p>
                
                {details && Object.keys(details).length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs border-t border-foreground/10 pt-6">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-foreground/40 block capitalize tracking-wider uppercase mb-1">{key}</span>
                        <span className="font-medium text-foreground/80">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
