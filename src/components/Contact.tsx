'use client'

import { useEffect } from 'react'

export function Contact() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contact" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/40 block mb-6">
            Let's Create Together
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-foreground tracking-[0.04em]">
            Ready to Start?
          </h2>
          
          <p className="text-sm text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Book a discovery call to discuss your project and see how we can bring your vision to cinematic reality
          </p>
        </div>

        {/* Calendly Widget */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-background border border-foreground/10 overflow-hidden">
            {/* Widget Header */}
            <div className="bg-card/50 px-8 py-6 border-b border-foreground/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1 tracking-wider uppercase">
                    MOJJU Discovery Call
                  </h3>
                  <p className="text-xs text-foreground/40 tracking-wide">
                    30 minutes · Video call · Free consultation
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-foreground/40" />
                  <span className="text-xs text-foreground/40 tracking-wider uppercase">Available</span>
                </div>
              </div>
            </div>
            
            {/* Calendly */}
            <div className="p-0 bg-white">
              <div 
                className="calendly-inline-widget"
                data-url="https://calendly.com/d/cvb4-btv-mxp/introduction-with-zeroqode"
                style={{ width: '100%', height: '660px', overflow: 'hidden' }} 
              />
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Project Discussion', desc: 'Share your vision and requirements with our team' },
              { title: 'Custom Strategy', desc: 'Get a tailored approach for your unique project' },
              { title: 'Next Steps', desc: 'Clear timeline and roadmap to bring your idea to life' },
            ].map((item) => (
              <div key={item.title} className="bg-background border border-foreground/10 p-6">
                <h4 className="font-bold text-xs text-foreground mb-2 tracking-wider uppercase">{item.title}</h4>
                <p className="text-xs text-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
