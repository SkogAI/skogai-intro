import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import { LoreHero } from './components/LoreHero'
import { LoreTimeline } from './components/LoreTimeline'
import { LoreFooter } from './components/LoreFooter'
import PostDetail from './pages/PostDetail'
import { getAgentTheme } from './lib/agent-themes'

function HomePage() {
  const [searchParams] = useSearchParams()
  const agent = searchParams.get('agent')
  const theme = getAgentTheme(agent)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <section id="hero" aria-label="Hero section">
          <LoreHero theme={theme} />
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
