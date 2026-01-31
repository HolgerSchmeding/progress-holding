import { Link } from 'react-router-dom'
import '../App.css'

function Datenschutz() {
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
          <h1>Datenschutzerklärung</h1>
          <p className="legal-stand">Stand: Januar 2026</p>

          <section className="legal-section">
            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>pro.gress Holding GmbH (i. G.)</strong><br />
              Lange Straße 75<br />
              76530 Baden-Baden<br />
              Deutschland
            </p>
            <p>
              Telefon: +49 152 34186900<br />
              E-Mail: <a href="mailto:contact@progress-holding.de">contact@progress-holding.de</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Datenschutz auf einen Blick</h2>
            <p>
              Beim Besuch dieser Website werden technische Daten verarbeitet, die zur Bereitstellung und Sicherheit 
              der Website erforderlich sind (Server-Logfiles). Mit Ihrer Einwilligung setzen wir zudem Google Analytics 
              zur Analyse des Nutzungsverhaltens ein.
            </p>
            <p>
              Vor dem Einsatz von Analyse-Cookies holen wir Ihre ausdrückliche Einwilligung über unseren 
              Cookie-Consent-Banner ein. Sie können Ihre Einwilligung jederzeit widerrufen.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Hosting</h2>
            <p>Wir hosten die Inhalte unserer Website bei:</p>
            <p>
              <strong>IONOS SE</strong>, Elgendorfer Str. 57, 56410 Montabaur, Deutschland („IONOS").
            </p>
            <p>
              Beim Aufruf der Website verarbeitet IONOS technische Zugriffsdaten (Server-Logfiles), insbesondere 
              IP-Adresse und weitere technische Informationen (siehe Abschnitt 4). Die Verarbeitung erfolgt zur 
              sicheren und stabilen Bereitstellung der Website.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb, 
              Sicherheit und Fehleranalyse).
            </p>
            <p>
              Wir haben mit IONOS einen Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO abgeschlossen. 
              Weitere Informationen stellt IONOS in seinen Datenschutzinformationen bereit.
            </p>
            <p>
              <strong>Ort der Verarbeitung:</strong> IONOS ist ein deutscher Anbieter. Die Datenverarbeitung erfolgt 
              primär/in der Regel innerhalb der Europäischen Union. Details ergeben sich aus den 
              Datenschutzinformationen und dem Auftragsverarbeitungsvertrag von IONOS.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Server-Logfiles</h2>
            <p>
              Der Hostinganbieter erhebt und speichert automatisch Informationen in Server-Logfiles, die Ihr 
              Browser übermittelt. Dies können sein:
            </p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer-URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.</p>
            <p>
              <strong>Zweck:</strong> technische Bereitstellung, Sicherheit (z. B. Angriffserkennung), Fehleranalyse.<br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.<br />
              <strong>Speicherdauer:</strong> nach den Vorgaben des Hosters; Löschung, sobald die Daten für den 
              Zweck nicht mehr erforderlich sind.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Kontaktaufnahme per E-Mail</h2>
            <p>
              Wenn Sie uns per E-Mail an <a href="mailto:contact@progress-holding.de">contact@progress-holding.de</a> kontaktieren, 
              verarbeiten wir die von Ihnen übermittelten Daten (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht) 
              zur Bearbeitung Ihrer Anfrage.
            </p>
            <p><strong>Rechtsgrundlage:</strong></p>
            <ul>
              <li>Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage der Vertragsanbahnung oder Vertragserfüllung dient,</li>
              <li>ansonsten Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Bearbeitung von Anfragen).</li>
            </ul>
            <p>
              <strong>Speicherdauer:</strong> Wir löschen Anfragen, sobald diese abschließend bearbeitet sind, 
              sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Cookies und Google Analytics</h2>
            <h3>6.1 Cookies allgemein</h3>
            <p>
              Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert 
              werden. Einige Cookies sind technisch notwendig (essenzielle Cookies), andere dienen der Analyse 
              Ihres Nutzungsverhaltens (Analyse-Cookies).
            </p>
            
            <h3>6.2 Cookie-Consent</h3>
            <p>
              Beim ersten Besuch unserer Website zeigen wir Ihnen einen Cookie-Consent-Banner. Dort können Sie 
              entscheiden, ob Sie nur essenzielle Cookies oder auch Analyse-Cookies zulassen möchten. Ihre 
              Entscheidung wird in Ihrem Browser gespeichert, sodass Sie den Banner bei späteren Besuchen 
              nicht erneut sehen.
            </p>
            <p>
              <strong>Widerruf Ihrer Einwilligung:</strong> Sie können Ihre Einwilligung jederzeit widerrufen, 
              indem Sie die Cookies in Ihren Browsereinstellungen löschen oder den localStorage-Eintrag 
              „cookie-consent" entfernen. Beim nächsten Besuch wird der Cookie-Banner erneut angezeigt.
            </p>
            
            <h3>6.3 Google Analytics 4</h3>
            <p>
              Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited 
              („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p><strong>Umfang der Verarbeitung:</strong></p>
            <ul>
              <li>Wir haben die IP-Anonymisierung aktiviert. Ihre IP-Adresse wird innerhalb von Mitgliedstaaten 
              der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen 
              Wirtschaftsraum gekürzt.</li>
              <li>Google Analytics 4 verwendet Cookies, die eine Analyse der Benutzung der Website ermöglichen.</li>
              <li>Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der 
              Regel an einen Server von Google in den USA übertragen und dort gespeichert.</li>
            </ul>
            <p><strong>Zweck:</strong> Analyse des Nutzungsverhaltens zur Verbesserung unserer Website.</p>
            <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über Cookie-Banner).</p>
            <p><strong>Speicherdauer:</strong> Die von uns gesendeten und mit Cookies verknüpften Daten werden 
            nach 14 Monaten automatisch gelöscht.</p>
            <p>
              <strong>Drittlandübermittlung:</strong> Google ist unter dem EU-US Data Privacy Framework zertifiziert, 
              was ein angemessenes Datenschutzniveau gewährleistet. Weitere Informationen finden Sie in der 
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Datenschutzerklärung von Google
              </a>.
            </p>
            <p>
              <strong>Measurement ID:</strong> G-VB7PN37QE7
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Ihre Rechte</h2>
            <p>
              Sie haben nach Maßgabe der gesetzlichen Bestimmungen das Recht auf Auskunft, Berichtigung, Löschung, 
              Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen auf 
              Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO).
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Beschwerderecht bei der Aufsichtsbehörde</h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig für 
              Baden-Württemberg ist:
            </p>
            <p>
              <strong>Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI BW)</strong><br />
              Heilbronner Straße 35<br />
              70191 Stuttgart
            </p>
          </section>

          <div className="legal-footer">
            <Link to="/impressum" className="legal-link">Zum Impressum →</Link>
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

export default Datenschutz
