import Link from "next/link";

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

export default function Impressum() {
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
            <h1 className="text-2xl font-bold text-primary mb-6">Impressum</h1>
            <div className="prose prose-sm text-text-secondary space-y-4">
              <h2 className="text-lg font-semibold text-primary">Angaben gem. &sect; 5 TMG</h2>
              <p>
                NIS2Check<br />
                [Name / Firma wird ergänzt]<br />
                [Adresse wird ergänzt]<br />
                [PLZ Ort wird ergänzt]
              </p>

              <h2 className="text-lg font-semibold text-primary">Kontakt</h2>
              <p>
                E-Mail: info@nis2check.de
              </p>

              <h2 className="text-lg font-semibold text-primary">Haftungsausschluss</h2>
              <p>
                Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
                Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit
                und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte der Website
                erfolgt auf eigene Gefahr des Nutzers.
              </p>
              <p>
                Der NIS2-Schnellcheck und die Vollanalyse dienen der Orientierung und ersetzen
                keine rechtliche Beratung. Für eine verbindliche Bewertung konsultieren Sie
                bitte einen spezialisierten Rechtsanwalt oder IT-Sicherheitsberater.
              </p>

              <h2 className="text-lg font-semibold text-primary">Urheberrecht</h2>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
