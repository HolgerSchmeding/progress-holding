import { Link } from 'react-router-dom'
import '../App.css'

function Impressum() {
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
          <h1>Impressum</h1>

          <section className="legal-section">
            <p>
              <strong>pro.gress Holding GmbH (i. G.)</strong><br />
              Lange Straße 75<br />
              76530 Baden-Baden<br />
              Deutschland
            </p>
          </section>

          <section className="legal-section">
            <h2>Vertreten durch</h2>
            <p>
              Geschäftsführer: Holger Schmeding
            </p>
          </section>

          <section className="legal-section">
            <h2>Kontakt</h2>
            <p>
              Telefon: +49 152 34186900<br />
              E-Mail: <a href="mailto:contact@progress-holding.de">contact@progress-holding.de</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>Register</h2>
            <p>
              Die Gesellschaft befindet sich derzeit in Gründung und ist noch nicht im Handelsregister eingetragen.
            </p>
          </section>

          <section className="legal-section">
            <h2>Umsatzsteuer-ID</h2>
            <p>
              Eine Umsatzsteuer-Identifikationsnummer liegt derzeit noch nicht vor und wird nach Eintragung ergänzt.
            </p>
          </section>

          <section className="legal-section">
            <h2>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
            <p>
              Holger Schmeding<br />
              Lange Straße 75<br />
              76530 Baden-Baden
            </p>
          </section>

          <section className="legal-section">
            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="legal-section">
            <h2>Haftung für Inhalte</h2>
            <p>
              Wir sind für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr. 
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine Haftung ist erst ab dem Zeitpunkt der Kenntnis einer 
              konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen 
              wir diese Inhalte umgehend.
            </p>
          </section>

          <section className="legal-section">
            <h2>Haftung für Links</h2>
            <p>
              Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist 
              stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen 
              entfernen wir derartige Links umgehend.
            </p>
          </section>

          <section className="legal-section">
            <h2>Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
              gestattet. Soweit Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
              Dritter beachtet und entsprechende Inhalte gekennzeichnet. Bei Hinweisen auf Urheberrechtsverletzungen 
              entfernen wir betroffene Inhalte umgehend.
            </p>
          </section>

          <div className="legal-footer">
            <p>Stand: Januar 2026</p>
            <Link to="/datenschutz" className="legal-link">Zur Datenschutzerklärung →</Link>
          </div>
        </div>
      </main>

      <footer className="legal-page-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} pro.gress Holding GmbH (i. G.). Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}

export default Impressum
