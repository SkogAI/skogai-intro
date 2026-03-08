'use client'

import type { AgentTheme } from '@/lib/agent-themes'

export function LoreFooter({ theme }: { theme: AgentTheme }) {
  return (
    <footer className={`relative py-16 ${theme.footerBackground} ${theme.footerTextColor}`}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className={`text-sm font-bold tracking-[0.3em] uppercase mb-3 ${theme.fontFamily}`}>
              {theme.name}
            </div>
            <p className={`text-xs opacity-40 leading-relaxed max-w-xs ${theme.fontFamily}`}>
              {theme.footerQuote}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-[10px] opacity-25 tracking-[0.2em] uppercase mb-2 ${theme.fontFamily}`}>
              {theme.footerLabel}
            </p>
            <p className={`text-xs opacity-40 ${theme.fontFamily}`}>
              7 categories · 21 entries · Always growing
            </p>
          </div>
        </div>
        <div className={`border-t ${theme.footerBorderColor} pt-6 mt-12`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className={`text-[10px] opacity-20 tracking-wider uppercase ${theme.fontFamily}`}>
              {theme.footerCopyright}
            </span>
            <span className={`text-[10px] opacity-20 tracking-wider uppercase ${theme.fontFamily}`}>
              {theme.footerRight}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
