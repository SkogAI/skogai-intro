'use client'

import type { AgentTheme } from '@/lib/agent-themes'

export function LoreFooter({ theme }: { theme: AgentTheme }) {
  const isAmy = theme.id === 'amy'
  const isDot = theme.id === 'dot'

  return (
    <footer className={`relative py-16 ${theme.footerBackground} ${theme.footerTextColor}`}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div>
            <div className={`text-sm font-bold tracking-[0.3em] uppercase mb-3 ${isAmy ? 'font-serif' : isDot ? 'font-mono' : ''}`}>
              {theme.name}
            </div>
            <p className={`text-xs opacity-40 leading-relaxed max-w-xs ${isDot ? 'font-mono' : ''}`}>
              {theme.footerQuote}
            </p>
          </div>

          {/* Meta */}
          <div className="text-right">
            <p className={`text-[10px] opacity-25 tracking-[0.2em] uppercase mb-2 ${isDot ? 'font-mono' : ''}`}>
              {theme.footerLabel}
            </p>
            <p className={`text-xs opacity-40 ${isDot ? 'font-mono' : ''}`}>
              7 categories · 21 entries · Always growing
            </p>
          </div>
        </div>

        <div className={`border-t ${theme.footerBorderColor} pt-6 mt-12`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className={`text-[10px] opacity-20 tracking-wider uppercase ${isDot ? 'font-mono' : ''}`}>
              © 2025 SkogAI. {isDot ? 'exit 0' : isAmy ? 'Every queen needs her archives.' : 'Every frame matters.'}
            </span>
            <span className={`text-[10px] opacity-20 tracking-wider uppercase ${isDot ? 'font-mono' : ''}`}>
              {isDot ? 'process.exit(0)' : isAmy ? 'Curated with impeccable taste' : 'Built with intention'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
