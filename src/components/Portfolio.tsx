'use client'

import { usePostsByCategory } from '@/hooks/use-posts'
import { Button } from './ui/button'

export function Portfolio() {
  const { data: portfolioPosts = [], isLoading } = usePostsByCategory('portfolio')

  const featured = portfolioPosts[0]

  if (isLoading) {
    return (
      <section className="relative py-32 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
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
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Featured Work
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <span className="block mb-2">Creative Productions</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {featured.excerpt}
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-card clean-border rounded-3xl overflow-hidden elevated-shadow">
            <div className="relative">
              <div className="aspect-video">
                <iframe
                  src={metadata.video_url}
                  title={featured.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-t-3xl"
                />
              </div>
              
              <div className="absolute top-6 right-6">
                <span className="glass-effect rounded-xl px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  Latest Project
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {metadata.tag && (
                    <span className="bg-accent-purple/10 text-accent-purple px-3 py-1 rounded-full text-sm font-medium">
                      {metadata.tag}
                    </span>
                  )}
                  {metadata.client && (
                    <span className="text-sm text-muted-foreground">
                      Client: {metadata.client}
                    </span>
                  )}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {featured.title}
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {featured.content}
                </p>
                
                {details && Object.keys(details).length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-muted-foreground block capitalize">{key}</span>
                        <span className="font-medium">{value as string}</span>
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
