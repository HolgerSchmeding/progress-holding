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
            <h2>Angaben gemäß § 5 TMG</h2>
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
            <h2>Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: [Amtsgericht]<br />
              Registernummer: HRB [Nummer]<br />
              <em>(Hinweis: Die Gesellschaft befindet sich derzeit in Gründung)</em>
            </p>
          </section>

          <section className="legal-section">
            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE [Nummer]<br />
              <em>(wird nach Eintragung ergänzt)</em>
            </p>
          </section>

          <section className="legal-section">
            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Holger Schmeding<br />
              Lange Straße 75, 76530 Baden-Baden
            </p>
          </section>

          <section className="legal-section">
            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </section>

          <section className="legal-section">
            <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="legal-section">
            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section className="legal-section">
            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
              verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
              einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Links umgehend entfernen.
            </p>
          </section>

          <section className="legal-section">
            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
              der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch
              gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
              auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
              Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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
