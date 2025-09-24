'use client'

import { useEffect, useState } from 'react'
import onirosAward from 'figma:asset/ffc713ded6036e9803a00d96c2ece233713f9cec.png'
import nyifaAward from 'figma:asset/92b2d610bd96256b5079962592ac1f15594e4fd4.png'
import beyondBorderAward from 'figma:asset/cd2da3306d63160d609bfc5befcbe8be253a5d86.png'
import topShortsAward from 'figma:asset/cebce68c98ff3bfa0f987711ba68fde4f577d48d.png'
import newLaurelAward from 'figma:asset/b095cae5249ec434b914d95680ddc16b2a0ccd94.png'
import veniceAiAward from 'figma:asset/e5a54b457bd04dc493b7517427186142234c4695.png'

export function Awards() {
  const awards = [
    {
      image: onirosAward,
      delay: "0s"
    },
    {
      image: beyondBorderAward,
      delay: "0.5s"
    },
    {
      image: topShortsAward,
      delay: "1s"
    },
    {
      image: newLaurelAward,
      delay: "1.5s"
    },
    {
      image: nyifaAward,
      delay: "2s"
    },
    {
      image: veniceAiAward,
      delay: "2.5s"
    }
  ]

  return (
    <section id="awards" className="relative py-20 bg-background overflow-hidden">
      
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      


      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Recognition & Achievement
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">
            Awards & Recognition
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Celebrated excellence in AI-powered film production
          </p>
        </div>

        {/* Awards Display */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Awards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {awards.map((award, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
                style={{ animationDelay: award.delay }}
              >
                
                {/* Award Pedestal */}
                <div className="relative mb-6">
                  
                  {/* Floating Award Display */}
                  <div className={`relative p-6 rounded-2xl border shadow-md transition-all duration-500 hover:scale-105 ${
                    index === 2 || index === 3 ? 'bg-gray-800 border-gray-700' : 'bg-background border-border'
                  }`}
                       style={{ 
                         boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                       }}>
                    
                    {/* Award Image */}
                    <img 
                      src={award.image}
                      alt="Film Festival Award Laurel"
                      className="w-full h-auto max-w-48 mx-auto"
                      style={{
                        filter: 'contrast(1.02) saturate(1.1)',
                      }}
                    />
                    

                  </div>
                  
                  {/* Floating Animation */}
                  <div className="float-gentle absolute inset-0 pointer-events-none" />
                </div>

              </div>
            ))}
          </div>

        </div>


      </div>
      
    </section>
  )
}