'use client'

export function LoreFooter() {
  return (
    <footer className="relative py-16 bg-foreground text-background">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div>
            <div className="text-sm font-bold tracking-[0.3em] uppercase text-background mb-3">
              SKOGAI
            </div>
            <p className="text-xs text-background/40 leading-relaxed max-w-xs">
              A digital forest — layered, interconnected, and always growing.
              Lore preserves the magic while protecting the future.
            </p>
          </div>

          {/* Meta */}
          <div className="text-right">
            <p className="text-[10px] text-background/25 tracking-[0.2em] uppercase mb-2">
              Lore Repository
            </p>
            <p className="text-xs text-background/40">
              7 categories · 21 entries · Always growing
            </p>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-background/20 tracking-wider uppercase">
              © 2025 SkogAI. Every frame matters.
            </span>
            <span className="text-[10px] text-background/20 tracking-wider uppercase">
              Built with intention
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
