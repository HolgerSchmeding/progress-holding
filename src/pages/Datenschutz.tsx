import { Link } from 'react-router-dom'
import '../App.css'
import { useTranslation } from '../i18n'

function Datenschutz() {
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
          <h1>{t.datenschutz.title}</h1>
          <p className="legal-stand">{t.datenschutz.asOf}</p>

          <section className="legal-section">
            <h2>{t.datenschutz.section1Title}</h2>
            <p>
              <strong>pro.gress Holding GmbH</strong><br />
              Lange Straße 75<br />
              76530 Baden-Baden<br />
              Deutschland
            </p>
            <p>
              {t.impressum.phone}: +49 152 34186900<br />
              E-Mail: <a href="mailto:contact@progress-holding.de">contact@progress-holding.de</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section2Title}</h2>
            <p>{t.datenschutz.section2Text1}</p>
            <p>{t.datenschutz.section2Text2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section3Title}</h2>
            <p>{t.datenschutz.section3Intro}</p>
            <p><strong>IONOS SE</strong>, {t.datenschutz.section3Provider}</p>
            <p>{t.datenschutz.section3Text1}</p>
            <p><strong>{t.datenschutz.section3Legal}</strong></p>
            <p>{t.datenschutz.section3Contract}</p>
            <p><strong>{t.datenschutz.section3Location}</strong></p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section4Title}</h2>
            <p>{t.datenschutz.section4Text}</p>
            <ul>
              {t.datenschutz.section4Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>{t.datenschutz.section4NoMerge}</p>
            <p>
              <strong>{t.datenschutz.section4Purpose}</strong><br />
              <strong>{t.datenschutz.section4LegalBasis}</strong><br />
              <strong>{t.datenschutz.section4Retention}</strong>
            </p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section5Title}</h2>
            <p>{t.datenschutz.section5Text}</p>
            <p><strong>{t.datenschutz.section5Legal}</strong></p>
            <ul>
              {t.datenschutz.section5LegalItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p><strong>{t.datenschutz.section5Retention}</strong></p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section6Title}</h2>
            <h3>{t.datenschutz.section6_1Title}</h3>
            <p>{t.datenschutz.section6_1Text}</p>
            
            <h3>{t.datenschutz.section6_2Title}</h3>
            <p>{t.datenschutz.section6_2Text}</p>
            <p><strong>{t.datenschutz.section6_2Revoke}</strong></p>
            
            <h3>{t.datenschutz.section6_3Title}</h3>
            <p>{t.datenschutz.section6_3Text}</p>
            <p><strong>{t.datenschutz.section6_3Scope}</strong></p>
            <ul>
              {t.datenschutz.section6_3Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p><strong>{t.datenschutz.section6_3Purpose}</strong></p>
            <p><strong>{t.datenschutz.section6_3Legal}</strong></p>
            <p><strong>{t.datenschutz.section6_3Retention}</strong></p>
            <p>
              <strong>{t.datenschutz.section6_3Transfer}</strong>{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                {t.datenschutz.section6_3GooglePrivacy}
              </a>.
            </p>
            <p><strong>{t.datenschutz.section6_3MeasurementId}</strong></p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section7Title}</h2>
            <p>{t.datenschutz.section7Text}</p>
          </section>

          <section className="legal-section">
            <h2>{t.datenschutz.section8Title}</h2>
            <p>{t.datenschutz.section8Text}</p>
            <p>
              <strong>{t.datenschutz.section8Authority}</strong><br />
              Heilbronner Straße 35<br />
              70191 Stuttgart
            </p>
          </section>

          <div className="legal-footer">
            <Link to="/impressum" className="legal-link">{t.datenschutz.toImprint}</Link>
          </div>
        </div>
      </main>

      <footer className="legal-page-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} pro.gress Holding GmbH. {t.datenschutz.allRightsReserved}</p>
        </div>
      </footer>
    </div>
  )
}

export default Datenschutz
