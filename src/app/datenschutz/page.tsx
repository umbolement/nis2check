import Link from "next/link";

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      <header className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-border p-8 sm:p-12">
            <h1 className="text-2xl font-bold text-primary mb-6">Datenschutzerklärung</h1>
            <div className="prose prose-sm text-text-secondary space-y-4">

              <h2 className="text-lg font-semibold text-primary">1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
                NIS2Check — [Kontaktdaten werden ergänzt]
              </p>

              <h2 className="text-lg font-semibold text-primary">2. Datenverarbeitung auf dieser Website</h2>

              <h3 className="text-base font-semibold text-primary">a) NIS2-Schnellcheck</h3>
              <p>
                Die Angaben, die Sie im Schnellcheck machen (Branche, Unternehmensgröße, Umsatz),
                werden ausschließlich lokal in Ihrem Browser verarbeitet und <strong>nicht an unseren
                Server übermittelt</strong>. Es findet keine serverseitige Speicherung statt.
              </p>

              <h3 className="text-base font-semibold text-primary">b) Vollständige Betroffenheitsanalyse</h3>
              <p>
                Auch die Antworten der vollständigen Analyse werden lokal in Ihrem Browser
                ausgewertet. Es werden keine personenbezogenen Daten erhoben oder gespeichert.
              </p>

              <h3 className="text-base font-semibold text-primary">c) E-Mail-Benachrichtigung</h3>
              <p>
                Wenn Sie sich für NIS2-Updates anmelden, speichern wir Ihre E-Mail-Adresse
                zum Zweck der Benachrichtigung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung). Sie können sich jederzeit abmelden.
              </p>

              <h2 className="text-lg font-semibold text-primary">3. Hosting</h2>
              <p>
                Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Website werden
                automatisch Informationen (z.B. IP-Adresse, Zeitpunkt des Zugriffs) in
                Server-Logfiles gespeichert. Weitere Informationen finden Sie in der
                Datenschutzerklärung von Vercel.
              </p>

              <h2 className="text-lg font-semibold text-primary">4. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
                Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu
                an info@nis2check.de.
              </p>

              <h2 className="text-lg font-semibold text-primary">5. Cookies</h2>
              <p>
                Diese Website verwendet <strong>keine Cookies</strong> und kein Tracking.
                Es werden keine Analyse-Tools wie Google Analytics eingesetzt.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
