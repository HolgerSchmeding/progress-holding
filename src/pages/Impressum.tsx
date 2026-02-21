import { Link } from 'react-router-dom'
import '../App.css'
import { useTranslation } from '../i18n'

function Impressum() {
  const t = useTranslation()
  
  return (
    <div className="legal-page">
      <nav className="legal-nav">
        <Link to="/" className="back-link">
          <span className="back-arrow">←</span>
          <div className="logo">
            <span className="logo-pro">pro</span>
            <span className="logo-dot">.</span>
            <span className="logo-gress">gress</span>
          </div>
        </Link>
      </nav>

      <main className="legal-content">
        <div className="container">
          <h1>{t.impressum.title}</h1>

          <section className="legal-section">
            <p>
              <strong>pro.gress Holding GmbH</strong><br />
              Lange Straße 75<br />
              76530 Baden-Baden<br />
              Deutschland
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.representedBy}</h2>
            <p>
              {t.impressum.managingDirector}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.contactTitle}</h2>
            <p>
              {t.impressum.phone}: +49 152 34186900<br />
              E-Mail: <a href="mailto:contact@progress-holding.de">contact@progress-holding.de</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.registerTitle}</h2>
            <p>
              {t.impressum.registerText}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.vatTitle}</h2>
            <p>
              {t.impressum.vatText}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.responsibleTitle}</h2>
            <p>
              Holger Schmeding<br />
              Lange Straße 75<br />
              76530 Baden-Baden
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.disputeTitle}</h2>
            <p>
              {t.impressum.disputeText}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.liabilityContentTitle}</h2>
            <p>
              {t.impressum.liabilityContentText}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.liabilityLinksTitle}</h2>
            <p>
              {t.impressum.liabilityLinksText}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.impressum.copyrightTitle}</h2>
            <p>
              {t.impressum.copyrightText}
            </p>
          </section>

          <div className="legal-footer">
            <p>{t.impressum.asOf}</p>
            <Link to="/datenschutz" className="legal-link">{t.impressum.toPrivacyPolicy}</Link>
          </div>
        </div>
      </main>

      <footer className="legal-page-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} pro.gress Holding GmbH. {t.impressum.allRightsReserved}</p>
        </div>
      </footer>
    </div>
  )
}

export default Impressum
