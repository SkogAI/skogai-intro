import { LoreHero } from './components/LoreHero'
import { LoreTimeline } from './components/LoreTimeline'
import { LoreFooter } from './components/LoreFooter'

export default function App() {
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
