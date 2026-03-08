import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import { LoreHero } from './components/LoreHero'
import { LoreTimeline } from './components/LoreTimeline'
import { LoreTerminal } from './components/LoreTerminal'
import { LoreFooter } from './components/LoreFooter'
import PostDetail from './pages/PostDetail'
import { getAgentTheme } from './lib/agent-themes'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const agent = searchParams.get('agent')
  const theme = getAgentTheme(agent)

  const handleAgentChange = (agentId: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (!agentId || agentId === 'default') {
      next.delete('agent')
    } else {
      next.set('agent', agentId)
    }
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <section id="hero" aria-label="Hero section">
          <LoreHero theme={theme} onAgentChange={handleAgentChange} />
        </section>
        <section id="timeline" aria-label="Lore timeline">
          <LoreTimeline theme={theme} />
        </section>
      </main>
      <LoreFooter theme={theme} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
