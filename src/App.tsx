import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoreHero } from './components/LoreHero'
import { LoreTimeline } from './components/LoreTimeline'
import { LoreFooter } from './components/LoreFooter'
import PostDetail from './pages/PostDetail'

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <section id="hero" aria-label="Hero section">
          <LoreHero />
        </section>
        <section id="timeline" aria-label="Lore timeline">
          <LoreTimeline />
        </section>
      </main>
      <LoreFooter />
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
