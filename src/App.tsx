import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

// Custom Hook für Scroll-Animationen
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Projekt-Daten
const projects = [
  {
    id: 'benchtrust',
    name: 'BenchTrust GmbH',
    tagline: 'BenchTrust ist eine digitale Market Intelligence Plattform',
    description: 'BenchTrust ist die erste Plattform, die trusted data, peer insights und KI-gestützte Automatisierung kombiniert, um den gesamten Beschaffungsprozess in Unternehmen schneller, einfacher und smarter zu machen.',
    color: '#3b82f6',
    icon: '📊',
    status: 'In Entwicklung'
  },
  {
    id: 'startup24h',
    name: 'startup24h',
    tagline: 'Wir bauen die digitale Überholspur für Gründer.',
    description: 'startup24h verwandelt den politischen Willen zur 24-Stunden-Gründung in Realität – mit einer Plattform, die Wartezeiten abschafft: Vollständig digital, rechtssicher und startklar in nur 24 Stunden.',
    color: '#f59e0b',
    icon: '🚀',
    status: 'In Planung'
  },
  {
    id: 'vat-reclaim',
    name: 'VAT-Reclaim',
    tagline: 'Automatisierte Mehrwertsteuerrückerstattung',
    description: 'VAT-Reclaim automatisiert den komplexen Prozess der Mehrwertsteuerrückerstattung für Unternehmen. Durch intelligente Dokumentenverarbeitung und direkte Behördenschnittstellen werden Erstattungen schneller und effizienter abgewickelt.',
    color: '#10b981',
    icon: '💰',
    status: 'In Entwicklung'
  },
  {
    id: 'weg-community',
    name: 'WEG-Community',
    tagline: 'Digitale Plattform für Wohnungseigentümergemeinschaften',
    description: 'WEG-Community digitalisiert die Verwaltung und Kommunikation von Wohnungseigentümergemeinschaften. Die Plattform ermöglicht transparente Abstimmungen, Dokumentenverwaltung und effiziente Kommunikation zwischen Eigentümern und Verwaltern.',
    color: '#8b5cf6',
    icon: '🏠',
    status: 'Konzeptphase'
  }
]

// Star Component für den animierten Sternenhimmel
interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  projectId?: string
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const projectStarsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()
  const [hoveredStar, setHoveredStar] = useState<string | null>(null)

  const scrollToProject = useCallback((projectId: string) => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
      // Highlight the specific project card after scrolling
      setTimeout(() => {
        const projectCard = document.querySelector(`[data-project-id="${projectId}"]`)
        if (projectCard) {
          projectCard.classList.add('highlight')
          setTimeout(() => projectCard.classList.remove('highlight'), 2000)
        }
      }, 800)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      // Hintergrund-Sterne (kleine, subtile Sterne)
      starsRef.current = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01
      }))

      // Projekt-Sterne (größere, hellere Sterne) - in einem Kreis angeordnet
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.22

      projectStarsRef.current = projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2
        return {
          id: index + 1000,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: 6,
          opacity: 0.9,
          twinkleSpeed: 0.025,
          projectId: project.id
        }
      })
    }

    const getProjectColor = (projectId?: string): string => {
      const project = projects.find(p => p.id === projectId)
      return project?.color || '#ffffff'
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Zeichne Hintergrund-Sterne
      starsRef.current.forEach(star => {
        star.opacity = 0.3 + Math.sin(Date.now() * star.twinkleSpeed) * 0.3
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      // Zeichne Projekt-Sterne mit Glow-Effekt
      projectStarsRef.current.forEach(star => {
        const color = getProjectColor(star.projectId)
        const pulse = 0.7 + Math.sin(Date.now() * star.twinkleSpeed) * 0.3

        // Outer glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 8
        )
        gradient.addColorStop(0, color + 'aa')
        gradient.addColorStop(0.5, color + '44')
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 8 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 20
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      for (const star of projectStarsRef.current) {
        const distance = Math.sqrt((x - star.x) ** 2 + (y - star.y) ** 2)
        if (distance < star.size * 4 && star.projectId) {
          scrollToProject(star.projectId)
          break
        }
      }
    }

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      let found = false

      for (const star of projectStarsRef.current) {
        const distance = Math.sqrt((x - star.x) ** 2 + (y - star.y) ** 2)
        if (distance < star.size * 4 && star.projectId) {
          setHoveredStar(star.projectId)
          canvas.style.cursor = 'pointer'
          found = true
          break
        }
      }

      if (!found) {
        setHoveredStar(null)
        canvas.style.cursor = 'default'
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('mousemove', handleCanvasMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('click', handleCanvasClick)
      canvas.removeEventListener('mousemove', handleCanvasMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [scrollToProject])

  return (
    <>
      <canvas ref={canvasRef} className="star-canvas" />
      {hoveredStar && (
        <div className="star-tooltip">
          {projects.find(p => p.id === hoveredStar)?.name}
          <span className="tooltip-hint">Klicken für Details</span>
        </div>
      )}
    </>
  )
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-pro">pro</span>
          <span className="logo-dot">.</span>
          <span className="logo-gress">gress</span>
        </a>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menü öffnen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Über uns</a></li>
          <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projekte</a></li>
          <li>
            <a href="https://kanban.progress-holding.de" target="_blank" rel="noopener noreferrer">
              Kanban-Board
            </a>
          </li>
          <li><a href="#news" onClick={() => setIsMobileMenuOpen(false)}>News & Blog</a></li>
        </ul>
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="hero">
      <StarField />
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="logo-pro">pro</span>
          <span className="logo-dot">.</span>
          <span className="logo-gress">gress</span>
          <span className="hero-subtitle-inline"> Holding GmbH (in Gründung)</span>
        </h1>
        <p className="hero-tagline">
          Strategische Beteiligungen für die Zukunft
        </p>
        <p className="hero-description">
          Wir investieren in innovative Ideen und begleiten Startups auf ihrem Weg zum Erfolg. 
          Jeder Stern am Himmel repräsentiert eines unserer Projekte – und das Universum wächst.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">Unsere Projekte</a>
          <a href="#about" className="btn btn-secondary">Mehr erfahren</a>
        </div>
        <div className="star-legend">
          {projects.map(project => (
            <div key={project.id} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: project.color }}></span>
              <span className="legend-name">{project.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Über <span className="logo-pro">pro</span><span className="logo-dot">.</span><span className="logo-gress">gress</span></h2>
        <div ref={ref} className={`about-grid ${isVisible ? 'animate-in' : ''}`}>
          <div className="about-card">
            <div className="about-icon">🎯</div>
            <h3>Vision</h3>
            <p>
              Wir glauben an die transformative Kraft innovativer Ideen. 
              pro.gress Holding identifiziert und fördert Startups und Projekte, 
              die das Potenzial haben, Branchen zu revolutionieren und nachhaltigen Mehrwert zu schaffen.
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon">🚀</div>
            <h3>Strategie</h3>
            <p>
              Unser Ansatz kombiniert strategische Beteiligungen mit operativer Unterstützung. 
              Wir bringen nicht nur Kapital, sondern auch Expertise, Netzwerk und 
              unternehmerische Erfahrung in unsere Portfoliounternehmen ein.
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon">🤝</div>
            <h3>Werte</h3>
            <p>
              Transparenz, Partnerschaftlichkeit und langfristiges Denken sind die Grundpfeiler 
              unserer Zusammenarbeit. Wir verstehen uns als aktive Partner, die gemeinsam 
              mit Gründern Erfolgsgeschichten schreiben.
            </p>
          </div>
          <div className="about-card">
            <div className="about-icon">⚡</div>
            <h3>Agilität</h3>
            <p>
              Wir leben agile Methodiken und passen uns schnell an veränderte Marktbedingungen an. 
              Iterative Entwicklung, kurze Feedbackzyklen und kontinuierliche Verbesserung 
              sind fest in unserer DNA verankert.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Unsere Projekte</h2>
        <p className="section-subtitle">
          Jedes Projekt ist ein Stern in unserem wachsenden Universum – 
          innovative Lösungen für echte Herausforderungen.
        </p>
        <div ref={ref} className={`projects-grid ${isVisible ? 'animate-in' : ''}`}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              data-project-id={project.id}
              className="project-card" 
              style={{ '--project-color': project.color, '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <span className="project-status">{project.status}</span>
              </div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-star-indicator" style={{ backgroundColor: project.color }}></div>
            </div>
          ))}
        </div>
        <div className="projects-cta">
          <p>Mehr Projekte sind in Planung. Bleiben Sie gespannt!</p>
        </div>
      </div>
    </section>
  )
}

// News Section
function NewsSection() {
  const news = [
    {
      id: 1,
      date: '15. Januar 2026',
      title: 'pro.gress Holding startet ins neue Jahr',
      excerpt: 'Mit vier spannenden Projekten im Portfolio blicken wir optimistisch auf 2026. Unsere Strategie der diversifizierten Beteiligungen zeigt erste Erfolge.',
      category: 'Unternehmen'
    },
    {
      id: 2,
      date: '10. Januar 2026',
      title: 'BenchTrust: Meilenstein in der Entwicklung erreicht',
      excerpt: 'Die KI-gestützte Bewertungsplattform BenchTrust hat einen wichtigen Entwicklungsmeilenstein erreicht. Der Betatest startet in Kürze.',
      category: 'Projekte'
    },
    {
      id: 3,
      date: '5. Januar 2026',
      title: 'Kanban-Board für Transparenz',
      excerpt: 'Ab sofort können Interessenten und Partner den Fortschritt unserer Projekte über unser öffentliches Kanban-Board verfolgen.',
      category: 'Updates'
    }
  ]

  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <section id="news" className="news">
      <div className="container">
        <h2 className="section-title">News & Blog</h2>
        <div ref={ref} className={`news-grid ${isVisible ? 'animate-in' : ''}`}>
          {news.map(item => (
            <article key={item.id} className="news-card">
              <div className="news-meta">
                <span className="news-category">{item.category}</span>
                <span className="news-date">{item.date}</span>
              </div>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-excerpt">{item.excerpt}</p>
              <a href="#" className="news-link">Weiterlesen →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div ref={ref} className={`cta-content ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="cta-title">Interesse geweckt?</h2>
          <p className="cta-description">
            Ob als Investor, potenzieller Partner oder mit einer innovativen Idee – 
            wir freuen uns auf den Austausch mit Ihnen.
          </p>
          <div className="cta-buttons">
            <a href="mailto:info@progress-holding.de" className="btn btn-primary btn-large">
              <span className="btn-icon">✉️</span>
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-pro">pro</span>
              <span className="logo-dot">.</span>
              <span className="logo-gress">gress</span>
            </div>
            <p>Holding GmbH</p>
            <p className="footer-tagline">Strategische Beteiligungen für die Zukunft</p>
          </div>
          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Über uns</a></li>
              <li><a href="#projects">Projekte</a></li>
              <li><a href="https://kanban.progress-holding.de" target="_blank" rel="noopener noreferrer">Kanban-Board</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p>info@progress-holding.de</p>
            <p>www.progress-holding.de</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} pro.gress Holding GmbH (in Gründung). Alle Rechte vorbehalten.</p>
          <div className="footer-legal">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
