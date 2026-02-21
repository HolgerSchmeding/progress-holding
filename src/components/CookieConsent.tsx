import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.css'
import { useTranslation } from '../i18n'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslation()

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
            <h3>{t.cookie.title}</h3>
            <p>{t.cookie.description}</p>
            
            {showDetails && (
              <div className="cookie-details">
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <span className="cookie-category-icon">✓</span>
                    <strong>{t.cookie.essentialTitle}</strong>
                    <span className="cookie-badge essential">{t.cookie.essentialBadge}</span>
                  </div>
                  <p>{t.cookie.essentialDescription}</p>
                </div>
                
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <span className="cookie-category-icon">📊</span>
                    <strong>{t.cookie.analyticsTitle}</strong>
                    <span className="cookie-badge optional">{t.cookie.analyticsBadge}</span>
                  </div>
                  <p>{t.cookie.analyticsDescription}</p>
                </div>
              </div>
            )}
            
            <p className="cookie-legal-link">
              {t.cookie.moreInfo}{' '}
              <Link to="/datenschutz">{t.cookie.privacyPolicy}</Link>.
            </p>
          </div>
        </div>
        
        <div className="cookie-consent-actions">
          <button 
            className="cookie-btn cookie-btn-details"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? t.cookie.hideDetails : t.cookie.showDetails}
          </button>
          
          <div className="cookie-btn-group">
            <button 
              className="cookie-btn cookie-btn-decline"
              onClick={declineAll}
            >
              {t.cookie.declineAll}
            </button>
            <button 
              className="cookie-btn cookie-btn-essential"
              onClick={acceptEssential}
            >
              {t.cookie.essentialOnly}
            </button>
            <button 
              className="cookie-btn cookie-btn-accept"
              onClick={acceptAll}
            >
              {t.cookie.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
