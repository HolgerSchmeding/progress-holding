import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
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
    status: 'In Entwicklung'
  },
  {
    id: 'check-my-price',
    name: 'Check my price',
    tagline: 'Der intelligente AI-Agent für den besten Reisepreis',
    description: 'Check my price revolutioniert den Reise-Preisvergleich durch künstliche Intelligenz. Nutzer laden ihr Flug- oder Hotelangebot einfach als Foto oder PDF hoch – unser AI-Agent prüft in Echtzeit, ob es günstigere Alternativen gibt. Das System validiert den Bestpreis und liefert sofort buchbare, kosteneffiziente Gegenangebote.',
    color: '#ec4899',
    icon: '🔍',
    status: 'Ideenphase'
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
          <span className="hero-subtitle-inline"> Holding GmbH (i. G.)</span>
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

// News-Daten
interface NewsItem {
  id: number
  date: string
  title: string
  excerpt: string
  category: string
  fullContent?: string
}

const newsData: NewsItem[] = [
  {
    id: 5,
    date: 'Januar 2026',
    title: 'pro.gress Holding unterstützt „24h-Gründung" – GovTech-Offensive für den Standort Deutschland',
    excerpt: 'Die Modernisierung der deutschen Verwaltung nimmt Fahrt auf. Die pro.gress Holding GmbH positioniert sich mit ihrer Initiative startup24h als zentraler Akteur, um den bürokratischen Quantensprung zur 24-Stunden-Gründung operativ umzusetzen.',
    category: 'GovTech',
    fullContent: `Baden-Baden, Januar 2026 – Die Modernisierung der deutschen Verwaltung nimmt Fahrt auf. Das Bundesministerium für Digitales und Staatsmodernisierung (BMDS) unter Minister Karsten Wildberger (CDU) hat die digitale Unternehmensgründung innerhalb von 24 Stunden zu einem Leuchtturmprojekt erklärt. Die pro.gress Holding GmbH positioniert sich mit ihrer Initiative startup24h als zentraler Akteur, um diesen bürokratischen Quantensprung operativ umzusetzen.

**Antwort auf den bürokratischen Reformdruck**

Deutschland steht aktuell vor einer massiven Hürde: Während internationale Vorbilder wie Estland Gründungen in Rekordzeit ermöglichen, dauert der Prozess hierzulande im Schnitt vier bis sechs Wochen. Drei Viertel aller Gründer:innen sehen im Abbau dieser Bürokratie die wichtigste politische Priorität.

Das geplante Gründungsbeschleunigungsgesetz soll nun den rechtlichen Rahmen schaffen, um die langwierigen, fragmentierten Prozesse durch eine teilautomatisierte, digitale Lösung zu ersetzen.

**startup24h: Die Brücke zur 24-Stunden-Gründung**

Die Initiative startup24h der pro.gress Holding greift die Ziele des Ministeriums direkt auf. Als „AI-First"-Plattform ist sie darauf ausgelegt, die föderale Verantwortungsteilung zwischen Bund, Ländern und Kommunen technisch zu überbrücken.

**Orchestrierung statt Silos:** Die Plattform nutzt einen „Dachantrag", der alle relevanten Verfahren – vom Notartermin bis zur Gewerbeanmeldung – parallel anstößt.

**Automatisierung durch KI:** Durch den Einsatz von Künstlicher Intelligenz werden strukturierte Daten geschaffen, die vollautomatisierte Antragsprozesse erst ermöglichen.

**Once-Only-Prinzip:** Durch die Anbindung an das Nationale Once-Only-Technical-System (NOOTS) müssen Nachweise nur noch einmal eingereicht werden.

**Europäische Dimension: EUDI-Wallet und Binnenmarkt**

Die deutsche Initiative bettet sich in ein größeres europäisches Bestreben ein. Ziel ist es, die Hürden im Binnenmarkt abzubauen und langfristig eine EU-weite Unternehmensgründung innerhalb kürzester Zeit zu ermöglichen. Die Nutzung der EUDI-Wallet (European Digital Identity) spielt hierbei eine Schlüsselrolle, um Identitätsprüfungen und digitale Signaturen grenzüberschreitend sicherzustellen.

**Fazit**

Für die pro.gress Holding ist startup24h mehr als ein Geschäftsmodell – es ist ein aktiver Beitrag zur Staatsmodernisierung. Durch die Verknüpfung von moderner GovTech-Infrastruktur mit den politischen Zielen des BMDS wird die Vision einer „Gründung in 24 Stunden" von der Theorie in die Praxis überführt.

*Das pro.gress Team*`
  },
  {
    id: 1,
    date: 'Januar 2026',
    title: 'pro.gress Holding startet ins neue Jahr: 2026 wird das Jahr der Realisierung',
    excerpt: 'Mit vier spannenden Projekten im Portfolio blicken wir optimistisch auf 2026. Unsere Strategie der diversifizierten Beteiligungen nimmt Form an – jetzt gehen wir von der Planung in die Umsetzung.',
    category: 'Unternehmen',
    fullContent: `Baden-Baden, Januar 2026 – Das Jahr 2025 stand ganz im Zeichen der Fundamentlegung. Wir haben Konzepte geschärft, das Team aufgestellt und die technologische Basis geschaffen. Jetzt, zum Start des Jahres 2026, beginnt eine neue Phase. Die pro.gress Holding startet fokussiert in das Geschäftsjahr: Wir verwalten nicht nur Ideen, wir überführen sie jetzt in funktionierende Geschäftsmodelle.

**Unser Portfolio: Fokus auf Proof of Concept**

Unser Ansatz „Qualität vor Quantität" bedeutet für 2026 ganz konkret: Wir wollen beweisen, dass unsere Lösungen im Markt funktionieren. Für drei unserer Ventures steht der Proof of Concept (PoC) und der Go-Live in diesem Jahr fest auf der Agenda:

**BenchTrust (SaaS / Procurement):** Unser Fokus-Projekt für den B2B-Einkauf bereitet sich intensiv auf den Marktstart vor. Ziel für 2026 ist der erfolgreiche Live-Gang, um erste echte Transaktionen abzuwickeln und zu beweisen, dass Transparenz im Dienstleistungsmarkt einen echten Mehrwert bietet.

**startup24h (GovTech):** Hier arbeiten wir an der digitalen Infrastruktur, um das politische Ziel der „Gründung in 24 Stunden" technisch möglich zu machen. 2026 wird zeigen, wie wir bürokratische Hürden durch intelligente Softwarestrecken ersetzen können.

**VAT Reclaim (FinTech):** Auch hier steht der Proof of Concept für 2026 an. Wir wollen validieren, wie wir durch automatisierte Prozesse Cashflow-Vorteile für Unternehmen bei der Steuerrückforderung realisieren können.

**WEG Community (PropTech):** Unser Projekt für die Immobilienwirtschaft zielt darauf ab, die Verwaltung von Wohneigentumsgemeinschaften zu digitalisieren. Der geplante Go-Live in 2026 soll die Effizienzgewinne in der Praxis unter Beweis stellen.

**Starke Basis: Synergien im Hintergrund**

Was uns die nötige Ruhe für diese Launches gibt, ist unser „Shared Services"-Modell in der Holding. Unsere Ventures müssen das Rad nicht neu erfinden, sondern greifen auf gemeinsame Ressourcen zu:

**Zentrale Technologie:** Wir nutzen bewährte Architektur-Bausteine für alle Projekte, um die „Time-to-Market" für die PoCs zu verkürzen.

**SME-Expertenpool:** Unsere Fachleute für Recht, Technik und Vertrieb unterstützen genau dort, wo ein Projekt gerade in die heiße Phase geht.

**Ausblick: Validierung im echten Markt**

Für 2026 lautet die Devise: Marktvalidierung. Wir verlassen die Konzeptphase. Es geht in diesem Jahr darum, mit echten Nutzern und echten Daten zu arbeiten, um unsere Annahmen zu bestätigen und die Geschäftsmodelle nachhaltig aufzubauen.

Wir danken unserem Team und unseren Partnern für die akribische Vorarbeit in 2025. Die Weichen sind gestellt – jetzt bringen wir die Projekte auf die Straße.

Auf ein erfolgreiches Jahr 2026!

*Holger Schmeding & das pro.gress Team*`
  },
  {
    id: 2,
    date: 'Januar 2026',
    title: 'BenchTrust Development Update: Der Countdown für die smarte Beschaffung läuft',
    excerpt: 'Die KI-gestützte Einkaufsplattform BenchTrust hat einen entscheidenden Entwicklungsmeilenstein erreicht. Das technische Fundament steht – der Startschuss für den operativen Pilotbetrieb fällt in Kürze.',
    category: 'Projekte',
    fullContent: `Baden-Baden, Januar 2026 – BenchTrust ist angetreten, um mehr zu sein als nur ein Vergleichsportal. Wir bauen das Betriebssystem für den modernen B2B-Einkauf. Nach monatelanger intensiver Entwicklungsarbeit an unserer Core-Engine können wir heute bestätigen: Die Architektur für unsere ganzheitliche Einkaufsplattform ist bereit für den Einsatz.

**Vom Suchen zum Finden: Die „Procurement Engine" steht**

Unser Entwicklerteam hat in den letzten Wochen den komplexesten Teil der Plattform fertiggestellt: Den AI-Sourcing Core. Damit sind wir nun technisch in der Lage, den gesamten Beschaffungsprozess digital abzubilden – von der Bedarfsermittlung bis zum perfekten Match. Das Versprechen „Daten schlagen Bauchgefühl" wurde erfolgreich in Code übersetzt. BenchTrust ist damit bereit, Unternehmen nicht nur Informationen zu zeigen, sondern sie aktiv durch den Entscheidungsprozess zu navigieren.

Die kommenden Wochen nutzen wir für den finalen Feinschliff an der User Experience (UX) und die Integration der Schnittstellen für unsere Pilotpartner.

**Was die Beta-Phase bietet**

Der anstehende Start des Proof of Concept (PoC) wird ausgewählten Nutzern erstmals Zugang zu den leistungsstarken Werkzeugen der Plattform geben:

**Der Sourcing Copilot:** KI-gestützte Erstellung von professionellen Ausschreibungsunterlagen (RFPs) in Minuten statt Wochen.

**Smart Analytics:** Datenbasierte Entscheidungshilfen, die Angebote objektiv vergleichbar machen.

**Intelligentes Matching:** Der Algorithmus verbindet Unternehmen nicht nur mit „irgendeinem" Anbieter, sondern mit dem Partner, der exakt zum Anforderungsprofil passt.

**Call for Pilots: Gestalten Sie den Standard von morgen**

Der Pilotbetrieb startet in Kürze und ist auf eine limitierte Anzahl an Unternehmen beschränkt, um eine enge Betreuung und direktes Feedback zu gewährleisten. Wir suchen Einkaufsentscheider und Geschäftsführer, die ihre Beschaffungsprozesse radikal vereinfachen und digitalisieren wollen.

Interessiert an einem exklusiven Zugang? Setzen Sie sich jetzt auf die Warteliste für den Start im April.`
  },
  {
    id: 3,
    date: 'Januar 2026',
    title: 'Internes Projektmanagement optimiert: Transparenz als Wachstumsmotor',
    excerpt: 'Mit der Einführung unseres neuen zentralen Kanban-Boards für Partner und Team-Mitglieder heben wir die interne Projektsteuerung auf ein neues Level. Schluss mit E-Mail-Pingpong – wir setzen auf radikale Transparenz und asynchrone Kommunikation.',
    category: 'Updates',
    fullContent: `Baden-Baden, Januar 2026 – Ein Venture Studio zu steuern, ist ein komplexes Unterfangen. Mit vier parallelen Projekten (BenchTrust, startup24h, VAT Reclaim, WEG Community) und einem wachsenden Pool an Experten (SMEs) stoßen klassische Management-Methoden schnell an ihre Grenzen. Um unsere ehrgeizigen Ziele für 2026 zu erreichen, haben wir unsere interne Arbeitsweise neu organisiert.

**Die Herausforderung: Multi-Projekt-Steuerung**

In unserem Modell teilen sich die Ventures zentrale Ressourcen. Ein Rechtsexperte prüft heute Verträge für die Holding und morgen AGBs für BenchTrust. Ein Entwickler springt zwischen API-Integration und Frontend-Design. Um hier Reibungsverluste zu vermeiden, haben wir eine zentrale Plattform für Collaboration & Execution implementiert.

**Das neue Kanban-System: Single Source of Truth**

Unser neu eingeführtes Kanban-Board ist ab sofort das zentrale Nervensystem der pro.gress Holding. Es bietet allen Beteiligten – vom Gesellschafter über den Freelancer bis zum strategischen Partner – einen Echtzeit-Einblick in den Status Quo:

**Venture-Übergreifende Sicht:** Wir sehen auf einen Blick, welche Ressourcen in welches Projekt fließen.

**Klarer Fokus:** Durch „Work-in-Progress"-Limits (WIP) verhindern wir Verzettelung. Es wird nur daran gearbeitet, was den größten Wertbeitrag liefert.

**SME-Integration:** Unsere externen Experten können sich nahtlos einklinken, Aufgaben ziehen und Ergebnisse liefern, ohne in endlosen Abstimmungsmeetings zu sitzen.

**Kulturwandel: Asynchrone Effizienz**

Dieses Tool ist mehr als nur Software – es ist ein Ausdruck unserer Unternehmenskultur. Wir glauben an „Deep Work" und Ergebnisse. Das neue Board ermöglicht es uns, Kommunikationswege zu verkürzen und Meeting-Zeiten drastisch zu reduzieren. Jeder Partner weiß zu jeder Zeit: Was ist fertig? Wo gibt es Blocker? Was ist der nächste Schritt?

Damit ist das operative Fundament gelegt, um die Skalierung unserer Ventures im Jahr 2026 effizient zu bewältigen.`
  },
  {
    id: 4,
    date: 'Januar 2026',
    title: '„No-Touch-Finance": Wie KI unsere Buchhaltung revolutioniert',
    excerpt: 'Innovation endet oft dort, wo die Bürokratie beginnt. Nicht bei uns. Mit einer neuen „Best-of-Breed"-Finanzarchitektur automatisieren wir die Buchhaltung unserer Ventures nahezu vollständig – und schaffen so Skalierbarkeit auf Knopfdruck.',
    category: 'Updates',
    fullContent: `Baden-Baden, Januar 2026 – Wer schnell wachsen will, darf sich nicht von administrativen Hürden bremsen lassen. Für die pro.gress Holding und ihre Beteiligungen (BenchTrust, VAT Reclaim, WEG Community) haben wir deshalb eine zentrale Entscheidung getroffen: Wir verabschieden uns von manueller Belegerfassung und setzen auf eine voll integrierte „Automated SaaS Finance"-Lösung.

**Der Motor: Stripe trifft BuchhaltungsButler**

Unser neues Setup verbindet drei leistungsstarke Systeme zu einer nahtlosen Einheit:

**Die Finanz-Maschine:** Stripe übernimmt nicht nur das Payment, sondern fungiert als intelligente Debitorenbuchhaltung inkl. automatischem Steuer-Management (Stripe Tax) für komplexe B2B-Fälle.

**Die Zentrale:** BuchhaltungsButler dient als KI-gestützter Hub, der Zahlungsdaten und Belege via API in Echtzeit abgleicht.

**Das Banking:** Unsere Geschäftskonten sind direkt angebunden, sodass Geldflüsse (Transit) automatisch erkannt werden.

Das Ergebnis ist eine „No-Touch"-Buchhaltung: Wenn ein Kunde bei BenchTrust ein Abo bucht, wird die Rechnung erstellt, die Steuer berechnet, die Zahlung verbucht und der Buchungssatz gebildet – ohne dass ein Mensch eingreifen muss.

**Blueprint für Skalierung**

Der wahre Vorteil liegt in der Struktur. Wir nutzen dieses Setup als Standard-Blaupause für alle Ventures der Holding. Ob wir morgen startup24h starten oder eine neue Tochtergesellschaft gründen: Das Finanz-System ist sofort einsatzbereit. Wir legen lediglich einen neuen Mandanten an, doch die Prozesse bleiben identisch.

**Sicherheit und Transparenz**

Trotz der Automatisierung behalten wir durch eine saubere Trennung der Accounts die volle Kontrolle. Jedes Venture agiert operativ eigenständig („Firewall-Prinzip"), während die Holding über zentrale Dashboards die Liquidität steuert.

Mit dieser Infrastruktur reduzieren wir unsere administrativen Fixkosten drastisch und stellen sicher, dass jeder investierte Euro in Produkt und Vertrieb fließt – nicht in die Verwaltung.`
  }
]

// News Detail Modal
function NewsModal({ news, onClose }: { news: NewsItem; onClose: () => void }) {
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
      // Abschnittsüberschriften
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
        <button className="news-modal-back" onClick={onClose}>← Zurück</button>
        <button className="news-modal-close" onClick={onClose}>×</button>
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
  
  return (
    <>
      <section id="news" className="news">
        <div className="container">
          <h2 className="section-title">News & Blog</h2>
          <div ref={ref} className={`news-grid ${isVisible ? 'animate-in' : ''}`}>
            {newsData.map(item => (
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
                  Weiterlesen →
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
            <a href="mailto:contact@progress-holding.de" className="btn btn-primary btn-large">
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
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p>contact@progress-holding.de</p>
            <p>www.progress-holding.de</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} pro.gress Holding GmbH (i. G.). Alle Rechte vorbehalten.</p>
          <div className="footer-legal">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
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
