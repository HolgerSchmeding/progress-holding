import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.css'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Prüfe ob bereits eine Entscheidung getroffen wurde
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Zeige Banner nach kurzer Verzögerung
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const loadGoogleAnalytics = () => {
    // Lade GA4 Script dynamisch
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VB7PN37QE7'
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', 'G-VB7PN37QE7', {
        'anonymize_ip': true
      })
    }
  }

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    loadGoogleAnalytics()
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsVisible(false)
  }

  const declineAll = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-consent-overlay">
      <div className={`cookie-consent-banner ${showDetails ? 'expanded' : ''}`}>
        <div className="cookie-consent-content">
          <div className="cookie-icon">🍪</div>
          <div className="cookie-text">
            <h3>Wir respektieren Ihre Privatsphäre</h3>
            <p>
              Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
              Einige Cookies sind für den Betrieb der Website unerlässlich, während andere 
              uns helfen, die Website zu analysieren und zu verbessern.
            </p>
            
            {showDetails && (
              <div className="cookie-details">
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <span className="cookie-category-icon">✓</span>
                    <strong>Essenzielle Cookies</strong>
                    <span className="cookie-badge essential">Immer aktiv</span>
                  </div>
                  <p>
                    Diese Cookies sind für das Funktionieren der Website unerlässlich 
                    und können nicht deaktiviert werden. Sie speichern keine persönlichen Daten.
                  </p>
                </div>
                
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <span className="cookie-category-icon">📊</span>
                    <strong>Analyse-Cookies (Google Analytics)</strong>
                    <span className="cookie-badge optional">Optional</span>
                  </div>
                  <p>
                    Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website 
                    interagieren. Alle Daten werden anonymisiert erfasst. Wir verwenden 
                    Google Analytics 4 mit IP-Anonymisierung.
                  </p>
                </div>
              </div>
            )}
            
            <p className="cookie-legal-link">
              Mehr Informationen finden Sie in unserer{' '}
              <Link to="/datenschutz">Datenschutzerklärung</Link>.
            </p>
          </div>
        </div>
        
        <div className="cookie-consent-actions">
          <button 
            className="cookie-btn cookie-btn-details"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Weniger anzeigen' : 'Details anzeigen'}
          </button>
          
          <div className="cookie-btn-group">
            <button 
              className="cookie-btn cookie-btn-decline"
              onClick={declineAll}
            >
              Alle ablehnen
            </button>
            <button 
              className="cookie-btn cookie-btn-essential"
              onClick={acceptEssential}
            >
              Nur essenzielle
            </button>
            <button 
              className="cookie-btn cookie-btn-accept"
              onClick={acceptAll}
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
