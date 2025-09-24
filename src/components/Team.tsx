'use client'

import { ImageWithFallback } from './figma/ImageWithFallback'
import alexPhoto from 'figma:asset/fd59eeb2647148baf49eca9874abae100a8f6b96.png'
import nataliaPhoto from 'figma:asset/7ee2e0cf6894311503fee51eb64b2bf77f851925.png'
import newAlexPhoto from 'figma:asset/a88ae54c016aa084b50d6cd2afa2f676b458ad08.png'
import ivanPhoto from 'figma:asset/a964204796806138739e8ae0cda4dfd448f87da3.png'
import eugenePhoto from 'figma:asset/51926ade2f0715bb61504fbbfa95338e2b90fac1.png'
import marinaPhoto from 'figma:asset/010950f5d7d23266ac6f364c9a64c278329bf809.png'
import vitoPhoto from 'figma:asset/854fbbba468f00d40174eed6f122ba93c1b9758d.png'

export function Team() {
  const wantedCriminals = [
    {
      name: "Alex 'The Director'",
      crime: "ARMED ARTISTIC ROBBERY",
      bounty: "$10,000",
      description: "Notorious for stealing bland concepts and transforming them into cinematic gold. Approach with caution - carries dangerous levels of creative vision.",
      image: newAlexPhoto,
      rotation: 'rotate-3',
      mustacheStyle: "artistic"
    },
    {
      name: "Natalia 'The Strategist'",
      crime: "GRAND THEFT OF DEADLINES",
      bounty: "$5,000",
      description: "Wanted for stealing impossible timelines and turning them into perfectly executed masterpieces. Armed with spreadsheets and dangerous levels of organization.",
      image: nataliaPhoto,
      rotation: 'rotate-2',
      mustacheStyle: "handlebar"
    },
    {
      name: "Eugene 'The Neural Kingpin'",
      crime: "MASTERMINDING ALGORITHMIC HEISTS",
      bounty: "$12,000",
      description: "Ringleader of AI crimes, orchestrating elaborate neural network operations. Wanted for leading sophisticated video generation schemes that defy conventional filmmaking.",
      image: eugenePhoto,
      rotation: 'rotate-2',
      mustacheStyle: "thick"
    },
    {
      name: "Ivan 'The Algorithm Gunslinger'",
      crime: "DIGITAL SORCERY & NEURAL WIZARDRY",
      bounty: "$8,000",
      description: "Wanted for conjuring impossible visuals from thin air using forbidden AI algorithms. Known to transform simple prompts into cinematic masterpieces with dark technological magic.",
      image: ivanPhoto,
      rotation: '-rotate-2',
      mustacheStyle: "curly"
    },
    {
      name: "Levon 'The Visionary'",
      crime: "FOUNDING WITH INTENT TO DISRUPT",
      bounty: "$15,000",
      description: "Mastermind behind the entire MOJLI operation. Wanted for revolutionizing video production and making traditional methods obsolete.",
      image: alexPhoto, // Using the swapped photo from before
      rotation: 'rotate-1',
      mustacheStyle: "villainous"
    },
    {
      name: "Marina 'The Frame Forger'",
      crime: "PIXEL MANIPULATION & FRAME FORGERY",
      bounty: "$7,500",
      description: "Notorious for crafting synthetic realities so convincing they blur the line between real and artificial. Armed with generative models and a dangerous eye for detail.",
      image: marinaPhoto,
      rotation: '-rotate-1',
      mustacheStyle: "artistic"
    },
    {
      name: "Vito 'The Digital Drifter'",
      crime: "WANDERING VIDEO SYNTHESIS SCHEMES",
      bounty: "$9,500",
      description: "A nomadic AI outlaw who drifts from project to project, leaving behind a trail of stunning visuals and impossible video effects. Known for his ability to vanish into the digital frontier.",
      image: vitoPhoto,
      rotation: 'rotate-3',
      mustacheStyle: "handlebar"
    }
  ]

  const Mustache = ({ style, className }: { style: string, className?: string }) => {
    const mustaches = {
      handlebar: "M12 16c-2 0-3-1-4-1s-2 1-4 1c0-1 1-2 4-2s4 1 4 2z M12 16c2 0 3-1 4-1s2 1 4 1c0-1-1-2-4-2s-4 1-4 2z",
      thick: "M6 16c0-1 2-2 6-2s6 1 6 2c0 1-2 1-6 1s-6 0-6-1z",
      villainous: "M8 15c-1 0-2 1-2 2s1 1 2 0c1-1 2-1 4-1s3 0 4 1c1 1 2 0 2-1s-1-2-2-2c-2 0-4 1-8 1z",
      curly: "M6 16c0-2 1-2 2-1s1 1 2 0 1-1 2 0 1-1 2 0 2-1 2 1c0 1-1 1-2 1s-2 0-4 0-4 0-4-1z",
      artistic: "M7 15c-1 1-1 2 0 2s2-1 3-1h4c1 0 2 1 3 1s1-1 0-2c-1-1-2-1-5-1s-4 0-5 1z"
    }
    
    return (
      <svg 
        className={`absolute ${className}`}
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
      >
        <path 
          d={mustaches[style as keyof typeof mustaches]} 
          fill="#2D1810" 
          stroke="#1A0F08" 
          strokeWidth="0.5"
        />
      </svg>
    )
  }

  return (
    <div className="relative py-32 bg-background w-full" style={{ 
      overflow: 'visible', 
      height: 'auto', 
      minHeight: '0', 
      maxHeight: 'none' 
    }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12" style={{ 
        overflow: 'visible', 
        height: 'auto', 
        minHeight: '0', 
        maxHeight: 'none' 
      }}>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Meet the Outlaws
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8 text-foreground">
            <span className="block mb-2">These people are</span>
            <span className="block text-foreground">WANTED</span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Highly skilled and creatively dangerous
          </p>
        </div>

        {/* Framed Wanted Board */}
        <div className="max-w-7xl mx-auto" style={{ 
          overflow: 'visible', 
          height: 'auto', 
          minHeight: '0', 
          maxHeight: 'none' 
        }}>
          <div className="relative" style={{ 
            overflow: 'visible', 
            height: 'auto', 
            minHeight: '0', 
            maxHeight: 'none' 
          }}>
            
            {/* Black Frame */}
            <div className="bg-gradient-to-br from-black via-gray-900 to-black p-8 rounded-2xl shadow-2xl relative border border-gray-800/50" style={{ 
              overflow: 'visible', 
              height: 'auto', 
              minHeight: '0', 
              maxHeight: 'none' 
            }}>
              
              {/* Black frame texture */}
              <div className="absolute inset-0 opacity-15"
                   style={{
                     backgroundImage: `
                       linear-gradient(135deg, rgba(55, 65, 81, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%),
                       radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.15) 0%, transparent 50%)
                     `,
                     backgroundSize: '60px 60px, 100px 100px, 80px 80px'
                   }} />
              
              {/* Modern Board Background */}
              <div className="bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 rounded-xl p-8 relative border border-slate-300/50" style={{ 
                overflow: 'visible', 
                height: 'auto', 
                minHeight: '0', 
                maxHeight: 'none' 
              }}>
                
                {/* Modern subtle texture */}
                <div className="absolute inset-0 opacity-30"
                     style={{
                       backgroundImage: `
                         radial-gradient(circle at 30% 30%, rgba(71, 85, 105, 0.03) 1px, transparent 1px),
                         radial-gradient(circle at 70% 70%, rgba(148, 163, 184, 0.02) 1px, transparent 1px),
                         linear-gradient(135deg, rgba(226, 232, 240, 0.1) 0%, transparent 50%, rgba(241, 245, 249, 0.1) 100%)
                       `,
                       backgroundSize: '30px 30px, 45px 45px, 100% 100%'
                     }} />

                {/* Wanted Posters Grid */}
                <div className="relative z-10" style={{ 
                  overflow: 'visible', 
                  height: 'auto', 
                  minHeight: '0', 
                  maxHeight: 'none' 
                }}>
                  {/* First row - 4 posters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8" style={{ 
                    overflow: 'visible', 
                    height: 'auto', 
                    minHeight: '0', 
                    maxHeight: 'none' 
                  }}>
                    {wantedCriminals.slice(0, 4).map((criminal, index) => (
                      <div
                        key={criminal.name}
                        className={`group transform ${criminal.rotation} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                        style={{
                          filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
                          overflow: 'visible',
                          height: 'auto',
                          minHeight: '0',
                          maxHeight: 'none'
                        }}
                      >
                        
                        {/* Black Framed Wanted Poster */}
                        <div className="bg-gradient-to-b from-white to-gray-50 border-4 border-black relative shadow-lg" style={{ 
                          overflow: 'visible', 
                          height: 'auto', 
                          minHeight: '0', 
                          maxHeight: 'none' 
                        }}>
                          
                          {/* Modern push pins */}
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg border border-red-700" />
                          <div className="absolute -top-2 right-4 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg border border-red-700" />
                          
                          {/* Subtle modern paper effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-gray-100/20" />
                          <div className="absolute top-4 right-4 w-6 h-6 bg-slate-200/40 rounded-full" />
                          <div className="absolute bottom-6 left-4 w-4 h-4 bg-gray-300/30 rounded-full" />

                          <div className="p-6 text-center relative z-10">
                            
                            {/* WANTED Header */}
                            <div className="mb-4">
                              <h3 className="text-3xl font-black text-black mb-2"
                                  style={{ 
                                    fontFamily: 'serif',
                                    letterSpacing: '0.1em'
                                  }}>
                                WANTED
                              </h3>
                              <div className="w-full h-0.5 bg-black mb-2" />
                            </div>

                            {/* Photo */}
                            <div className="relative mb-4 mx-auto w-32 h-32 border-2 border-black bg-gray-100 rounded-sm" style={{ 
                              overflow: 'visible' 
                            }}>
                              <ImageWithFallback
                                src={criminal.image}
                                alt={criminal.name}
                                className="w-full h-full object-cover rounded-sm"
                                style={{
                                  filter: 'sepia(20%) contrast(105%) brightness(100%) hue-rotate(5deg) saturate(90%)'
                                }}
                              />
                              
                              {/* Subtle modern overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/10 to-transparent rounded-sm" />
                              
                              {/* Mustache */}
                              <Mustache 
                                style={criminal.mustacheStyle} 
                                className="bottom-4 left-1/2 -translate-x-1/2 opacity-80" 
                              />
                            </div>

                            {/* Details */}
                            <div className="text-left space-y-2" style={{ fontFamily: 'serif' }}>
                              <div className="font-black text-lg text-black">{criminal.name}</div>
                              <div className="font-bold text-red-600 text-base">BOUNTY: {criminal.bounty}</div>
                              <div className="text-sm text-gray-800 leading-relaxed bg-gray-50/50 p-3 border-l-2 border-black">
                                {criminal.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Second row - 3 posters centered */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-5xl mx-auto" style={{ 
                    overflow: 'visible', 
                    height: 'auto', 
                    minHeight: '0', 
                    maxHeight: 'none' 
                  }}>
                    {wantedCriminals.slice(4, 7).map((criminal, index) => (
                      <div
                        key={criminal.name}
                        className={`group transform ${criminal.rotation} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                        style={{
                          filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
                          overflow: 'visible',
                          height: 'auto',
                          minHeight: '0',
                          maxHeight: 'none'
                        }}
                      >
                        
                        {/* Black Framed Wanted Poster */}
                        <div className="bg-gradient-to-b from-white to-gray-50 border-4 border-black relative shadow-lg" style={{ 
                          overflow: 'visible', 
                          height: 'auto', 
                          minHeight: '0', 
                          maxHeight: 'none' 
                        }}>
                          
                          {/* Modern push pins */}
                          <div className="absolute -top-2 left-4 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg border border-red-700" />
                          <div className="absolute -top-2 right-4 w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg border border-red-700" />
                          
                          {/* Subtle modern paper effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-gray-100/20" />
                          <div className="absolute top-4 right-4 w-6 h-6 bg-slate-200/40 rounded-full" />
                          <div className="absolute bottom-6 left-4 w-4 h-4 bg-gray-300/30 rounded-full" />

                          <div className="p-6 text-center relative z-10">
                            
                            {/* WANTED Header */}
                            <div className="mb-4">
                              <h3 className="text-3xl font-black text-black mb-2"
                                  style={{ 
                                    fontFamily: 'serif',
                                    letterSpacing: '0.1em'
                                  }}>
                                WANTED
                              </h3>
                              <div className="w-full h-0.5 bg-black mb-2" />
                            </div>

                            {/* Photo */}
                            <div className="relative mb-4 mx-auto w-32 h-32 border-2 border-black bg-gray-100 rounded-sm" style={{ 
                              overflow: 'visible' 
                            }}>
                              <ImageWithFallback
                                src={criminal.image}
                                alt={criminal.name}
                                className="w-full h-full object-cover rounded-sm"
                                style={{
                                  filter: 'sepia(20%) contrast(105%) brightness(100%) hue-rotate(5deg) saturate(90%)'
                                }}
                              />
                              
                              {/* Subtle modern overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/10 to-transparent rounded-sm" />
                              
                              {/* Mustache */}
                              <Mustache 
                                style={criminal.mustacheStyle} 
                                className="bottom-4 left-1/2 -translate-x-1/2 opacity-80" 
                              />
                            </div>

                            {/* Details */}
                            <div className="text-left space-y-2" style={{ fontFamily: 'serif' }}>
                              <div className="font-black text-lg text-black">{criminal.name}</div>
                              <div className="font-bold text-red-600 text-base">BOUNTY: {criminal.bounty}</div>
                              <div className="text-sm text-gray-800 leading-relaxed bg-gray-50/50 p-3 border-l-2 border-black">
                                {criminal.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Black frame shadow */}
            <div className="absolute -inset-4 bg-black/30 rounded-2xl -z-10 blur-xl" />
          </div>
        </div>

      </div>
    </div>
  )
}