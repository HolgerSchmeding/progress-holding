import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { useLanguage, type Language } from './context/LanguageContext'
import { useTranslation } from './i18n'

// Custom Hook fÃ¼r Scroll-Animationen
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
    description: 'BenchTrust ist die erste Plattform, die trusted data, peer insights und KI-gestÃ¼tzte Automatisierung kombiniert, um den gesamten Beschaffungsprozess in Unternehmen schneller, einfacher und smarter zu machen.',
    color: '#3b82f6',
    icon: 'ðŸ“Š',
    status: 'In Entwicklung'
  },
  {
    id: 'startup24h',
    name: 'startup24h',
    tagline: 'Wir bauen die digitale Ãœberholspur fÃ¼r GrÃ¼nder.',
    description: 'startup24h verwandelt den politischen Willen zur 24-Stunden-GrÃ¼ndung in RealitÃ¤t â€“ mit einer Plattform, die Wartezeiten abschafft: VollstÃ¤ndig digital, rechtssicher und startklar in nur 24 Stunden.',
    color: '#f59e0b',
    icon: 'ðŸš€',
    status: 'In Planung'
  },
  {
    id: 'vat-reclaim',
    name: 'VAT-Reclaim',
    tagline: 'Automatisierte MehrwertsteuerrÃ¼ckerstattung',
    description: 'VAT-Reclaim automatisiert den komplexen Prozess der MehrwertsteuerrÃ¼ckerstattung fÃ¼r Unternehmen. Durch intelligente Dokumentenverarbeitung und direkte BehÃ¶rdenschnittstellen werden Erstattungen schneller und effizienter abgewickelt.',
    color: '#10b981',
    icon: 'ðŸ’°',
    status: 'In Entwicklung'
  },
  {
    id: 'weg-community',
    name: 'WEG-Community',
    tagline: 'Digitale Plattform fÃ¼r WohnungseigentÃ¼mergemeinschaften',
    description: 'WEG-Community digitalisiert die Verwaltung und Kommunikation von WohnungseigentÃ¼mergemeinschaften. Die Plattform ermÃ¶glicht transparente Abstimmungen, Dokumentenverwaltung und effiziente Kommunikation zwischen EigentÃ¼mern und Verwaltern.',
    color: '#8b5cf6',
    icon: 'ðŸ ',
    status: 'In Entwicklung'
  },
  {
    id: 'check-my-price',
    name: 'Check my price',
    tagline: 'Der intelligente AI-Agent fÃ¼r den besten Reisepreis',
    description: 'Check my price revolutioniert den Reise-Preisvergleich durch kÃ¼nstliche Intelligenz. Nutzer laden ihr Flug- oder Hotelangebot einfach als Foto oder PDF hoch â€“ unser AI-Agent prÃ¼ft in Echtzeit, ob es gÃ¼nstigere Alternativen gibt. Das System validiert den Bestpreis und liefert sofort buchbare, kosteneffiziente Gegenangebote.',
    color: '#ec4899',
    icon: 'ðŸ”',
    status: 'Ideenphase'
  }
]

// Star Component fÃ¼r den animierten Sternenhimmel
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
  const animationRef = useRef<number | undefined>(undefined)
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

      // Projekt-Sterne (grÃ¶ÃŸere, hellere Sterne) - in einem Kreis angeordnet
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.22

      projectStarsRef.current = projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2
        return {
          id: index + 1000,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: 4,
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
          star.x, star.y, star.size * 6
        )
        gradient.addColorStop(0, color + '99')
        gradient.addColorStop(0.5, color + '33')
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 6 * pulse, 0, Math.PI * 2)
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
          <span className="tooltip-hint"></span>
        </div>
      )}
    </>
  )
}

// Language Switcher Component
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const languages: { code: Language; label: string }[] = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ]

  return (
    <div className="language-switcher">
      {languages.map((lang, i) => (
        <span key={lang.code}>
          <button
            className={`lang-btn ${language === lang.code ? 'active' : ''}`}
            onClick={() => setLanguage(lang.code)}
            aria-label={lang.label}
          >
            {lang.label}
          </button>
          {i < languages.length - 1 && <span className="lang-separator">|</span>}
        </span>
      ))}
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslation()

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
          aria-label={t.nav.menuAriaLabel}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.home}</a></li>
          <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a></li>
          <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.projects}</a></li>
          <li><a href="#news" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.news}</a></li>
          <li className="nav-lang-item"><LanguageSwitcher /></li>
        </ul>
        <div className="nav-lang-desktop"><LanguageSwitcher /></div>
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const t = useTranslation()
  
  return (
    <section id="home" className="hero">
      <StarField />
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="logo-pro">pro</span>
          <span className="logo-dot">.</span>
          <span className="logo-gress">gress</span>
          <span className="hero-subtitle-inline">{t.hero.holdingGmbH}</span>
        </h1>
        <p className="hero-tagline">
          {t.hero.tagline}
        </p>
        <p className="hero-description">
          {t.hero.description}
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">{t.projects.sectionTitle}</a>
          <a href="#about" className="btn btn-secondary">{t.hero.ctaSecondary}</a>
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
        <span>{t.hero.scroll}</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()
  const t = useTranslation()
  
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">{t.about.sectionTitle} <span className="logo-pro">pro</span><span className="logo-dot">.</span><span className="logo-gress">gress</span></h2>
        <div ref={ref} className={`about-grid ${isVisible ? 'animate-in' : ''}`}>
          <div className="about-card">
            <div className="about-icon">ðŸŽ¯</div>
            <h3>{t.about.vision}</h3>
            <p>{t.about.visionText}</p>
          </div>
          <div className="about-card">
            <div className="about-icon">ðŸš€</div>
            <h3>{t.about.strategy}</h3>
            <p>{t.about.strategyText}</p>
          </div>
          <div className="about-card">
            <div className="about-icon">ðŸ¤</div>
            <h3>{t.about.values}</h3>
            <p>{t.about.valuesText}</p>
          </div>
          <div className="about-card">
            <div className="about-icon">âš¡</div>
            <h3>{t.about.agility}</h3>
            <p>{t.about.agilityText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper to get translated project details
function useProjectTranslations() {
  const t = useTranslation()
  const statusMap: Record<string, string> = {
    'In Entwicklung': t.projects.statusInDevelopment,
    'In Planung': t.projects.statusPlanning,
    'Ideenphase': t.projects.statusIdea,
  }
  const detailsMap: Record<string, { tagline: string; description: string }> = {
    'benchtrust': t.projectDetails.benchtrust,
    'startup24h': t.projectDetails.startup24h,
    'vat-reclaim': t.projectDetails.vatReclaim,
    'weg-community': t.projectDetails.wegCommunity,
    'check-my-price': t.projectDetails.checkMyPrice,
  }
  return { statusMap, detailsMap }
}

// Projects Section
function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()
  const t = useTranslation()
  const { statusMap, detailsMap } = useProjectTranslations()
  
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">{t.projects.sectionTitle}</h2>
        <p className="section-subtitle">
          {t.projects.sectionSubtitle}
        </p>
        <div ref={ref} className={`projects-grid ${isVisible ? 'animate-in' : ''}`}>
          {projects.map((project, index) => {
            const details = detailsMap[project.id]
            return (
              <div 
                key={project.id} 
                data-project-id={project.id}
                className="project-card" 
                style={{ '--project-color': project.color, '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="project-header">
                  <span className="project-icon">{project.icon}</span>
                  <span className="project-status">{statusMap[project.status] || project.status}</span>
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tagline">{details?.tagline || project.tagline}</p>
                <p className="project-description">{details?.description || project.description}</p>
                <div className="project-star-indicator" style={{ backgroundColor: project.color }}></div>
              </div>
            )
          })}
        </div>
        <div className="projects-cta">
          <p>{t.projects.ctaText}</p>
        </div>
      </div>
    </section>
  )
}

// News-Daten
interface NewsItem {
  id: number
  date: string
  title: string
  excerpt: string
  category: string
  fullContent?: string
}

// News Detail Modal
function NewsModal({ news, onClose }: { news: NewsItem; onClose: () => void }) {
  const t = useTranslation()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Projekt-Beschreibungen (fett markiert mit ** am Anfang und : danach)
      if (paragraph.startsWith('**') && paragraph.includes(':**')) {
        const colonIndex = paragraph.indexOf(':**')
        const title = paragraph.substring(2, colonIndex)
        const text = paragraph.substring(colonIndex + 3).replace(/\*\*/g, '')
        return (
          <div key={index} className="news-detail-block">
            <h4 className="news-detail-subtitle">{title}</h4>
            {text && <p>{text}</p>}
          </div>
        )
      }
      // AbschnittsÃ¼berschriften
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <h3 key={index} className="news-detail-heading">{paragraph.replace(/\*\*/g, '')}</h3>
      }
      // Kursiv (Signatur)
      if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
        return <p key={index} className="news-detail-signature">{paragraph.replace(/\*/g, '')}</p>
      }
      // Normaler Paragraph
      return <p key={index}>{paragraph}</p>
    })
  }

  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal" onClick={e => e.stopPropagation()}>
        <button className="news-modal-back" onClick={onClose}>{t.news.back}</button>
        <button className="news-modal-close" onClick={onClose}>Ã—</button>
        <div className="news-modal-content">
          <div className="news-modal-meta">
            <span className="news-category">{news.category}</span>
            <span className="news-date">{news.date}</span>
          </div>
          <h2 className="news-modal-title">{news.title}</h2>
          <div className="news-modal-body">
            {news.fullContent ? renderContent(news.fullContent) : <p>{news.excerpt}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

// News Section
function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const { ref, isVisible } = useScrollAnimation()
  const t = useTranslation()
  
  return (
    <>
      <section id="news" className="news">
        <div className="container">
          <h2 className="section-title">{t.news.sectionTitle}</h2>
          <div ref={ref} className={`news-grid ${isVisible ? 'animate-in' : ''}`}>
            {t.news.articles.map(item => (
              <article key={item.id} className="news-card">
                <div className="news-meta">
                  <span className="news-category">{item.category}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <button 
                  className="news-link" 
                  onClick={() => setSelectedNews(item)}
                >
                  {t.news.readMore}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </>
  )
}

// CTA Section
function CTASection() {
  const { ref, isVisible } = useScrollAnimation()
  const t = useTranslation()
  
  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div ref={ref} className={`cta-content ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="cta-title">{t.cta.title}</h2>
          <p className="cta-description">
            {t.cta.description}
          </p>
          <div className="cta-buttons">
            <a href="mailto:contact@progress-holding.de" className="btn btn-primary btn-large">
              <span className="btn-icon">âœ‰ï¸</span>
              {t.cta.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const t = useTranslation()

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
            <p>{t.footer.holdingGmbH}</p>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <h4>{t.footer.navigation}</h4>
            <ul>
              <li><a href="#home">{t.nav.home}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#projects">{t.nav.projects}</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>{t.footer.contact}</h4>
            <p>contact@progress-holding.de</p>
            <p>www.progress-holding.de</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} pro.gress Holding GmbH. {t.footer.allRightsReserved}</p>
          <div className="footer-legal">
            <Link to="/impressum">{t.footer.impressum}</Link>
            <Link to="/datenschutz">{t.footer.datenschutz}</Link>
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
