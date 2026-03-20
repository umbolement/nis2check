import Link from "next/link";

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent shrink-0 mt-0.5">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}

const stats = [
  { value: "~30.000", label: "Betroffene Unternehmen in DE" },
  { value: "€10 Mio.", label: "Maximales Bußgeld" },
  { value: "18", label: "Regulierte Sektoren" },
  { value: "24h", label: "Meldefrist bei Vorfällen" },
];

const steps = [
  {
    num: "01",
    title: "Branche & Größe angeben",
    desc: "5 kurze Fragen zu Ihrem Unternehmen — Sektor, Mitarbeiterzahl, Umsatz und digitale Dienste.",
  },
  {
    num: "02",
    title: "Sofortige Auswertung",
    desc: "Unser Algorithmus prüft Ihre Angaben gegen die offiziellen NIS2-Kriterien der EU und des BSI.",
  },
  {
    num: "03",
    title: "Klares Ergebnis",
    desc: "Sie erhalten eine Einschätzung mit konkreten Pflichten, Fristen und empfohlenen nächsten Schritten.",
  },
];

const sectorGroups = [
  {
    title: "Hohe Kritikalität (Anhang I)",
    sectors: [
      "Energie",
      "Verkehr",
      "Bankwesen",
      "Finanzmarkt",
      "Gesundheit",
      "Trinkwasser",
      "Abwasser",
      "Digitale Infrastruktur",
      "IKT-Dienste (B2B)",
      "Öffentliche Verwaltung",
      "Weltraum",
    ],
  },
  {
    title: "Sonstige kritische Sektoren (Anhang II)",
    sectors: [
      "Post & Kurier",
      "Abfallwirtschaft",
      "Chemie",
      "Lebensmittel",
      "Verarbeitendes Gewerbe",
      "Digitale Dienste",
      "Forschung",
    ],
  },
];

const faqs = [
  {
    q: "Was ist NIS2?",
    a: "Die NIS2-Richtlinie (EU 2022/2555) ist die überarbeitete EU-Regulierung für Cybersicherheit. Sie erweitert den Kreis betroffener Unternehmen massiv und verschärft die Anforderungen an Risikomanagement, Incident-Reporting und Geschäftsleitungs-Haftung.",
  },
  {
    q: "Ab wann gilt NIS2 in Deutschland?",
    a: "Die EU-Frist zur Umsetzung war Oktober 2024. Deutschland setzt die Richtlinie durch das NIS2-Umsetzungs- und Cybersicherheitsstärkungsgesetz (NIS2UmsuCG) um. Unternehmen sollten sich jetzt vorbereiten, da die Enforcement-Mechanismen anlaufen.",
  },
  {
    q: "Wer ist betroffen?",
    a: "Unternehmen mit mindestens 50 Mitarbeitern ODER €10 Mio. Jahresumsatz in einem der 18 regulierten Sektoren. Bestimmte digitale Dienste (DNS, TLD, qualifizierte Vertrauensdienste) sind unabhängig von der Größe betroffen.",
  },
  {
    q: "Was passiert bei Nicht-Einhaltung?",
    a: "Bußgelder bis zu €10 Mio. oder 2% des weltweiten Jahresumsatzes für wesentliche Einrichtungen. Zudem haftet die Geschäftsleitung persönlich — ein Novum in der EU-Cybersicherheitsregulierung.",
  },
  {
    q: "Wie genau ist dieser Schnellcheck?",
    a: "Der Schnellcheck basiert auf den offiziellen EU-Kriterien und gibt eine erste Einschätzung. Für eine rechtlich belastbare Bewertung empfehlen wir die vollständige Betroffenheitsanalyse oder die Konsultation eines spezialisierten Beraters.",
  },
  {
    q: "Ist der Schnellcheck wirklich kostenlos?",
    a: "Ja, der 5-Fragen-Schnellcheck ist vollständig kostenlos. Für eine detaillierte Analyse mit Maßnahmenplan bieten wir die Vollständige Betroffenheitsanalyse an.",
  },
];

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold text-lg">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-text-secondary">
            <a href="#so-funktioniert-es" className="hover:text-text transition-colors">So funktioniert&apos;s</a>
            <a href="#sektoren" className="hover:text-text transition-colors">Sektoren</a>
            <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
          </nav>
          <Link
            href="/schnellcheck"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Jetzt prüfen
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary to-primary-light text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 text-accent-light text-sm px-3 py-1 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse" />
                Enforcement läuft — Jetzt handeln
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Ist Ihr Unternehmen{" "}
                <span className="text-accent-light">NIS2-pflichtig?</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-text-on-dark/80 leading-relaxed max-w-2xl">
                ~30.000 Unternehmen in Deutschland müssen die NIS2-Richtlinie umsetzen.
                Prüfen Sie in 2 Minuten kostenlos, ob Sie dazugehören.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/schnellcheck"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-colors"
                >
                  Kostenloser Schnellcheck
                  <Arrow />
                </Link>
                <a
                  href="#so-funktioniert-es"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 rounded-lg text-base font-medium transition-colors"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</div>
                  <div className="text-sm text-text-secondary mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="so-funktioniert-es" className="bg-bg-alt">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">So funktioniert&apos;s</h2>
              <p className="mt-3 text-text-secondary max-w-xl mx-auto">
                In drei Schritten zur Klarheit — kostenlos und ohne Registrierung.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-xl p-6 sm:p-8 border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="text-accent font-mono text-sm font-bold mb-4">{step.num}</div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section id="sektoren" className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">18 regulierte Sektoren</h2>
              <p className="mt-3 text-text-secondary max-w-xl mx-auto">
                NIS2 unterscheidet zwischen Sektoren hoher Kritikalität und sonstigen kritischen Sektoren.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {sectorGroups.map((group) => (
                <div key={group.title} className="bg-bg-alt rounded-xl p-6 sm:p-8">
                  <h3 className="font-semibold text-primary mb-4">{group.title}</h3>
                  <ul className="space-y-2.5">
                    {group.sectors.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Check />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Penalties / Urgency */}
        <section className="bg-primary text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Persönliche Haftung der Geschäftsleitung
                </h2>
                <p className="mt-4 text-text-on-dark/80 leading-relaxed">
                  NIS2 bringt ein Novum in der EU-Cybersicherheitsregulierung: Die Geschäftsleitung
                  haftet persönlich für die Einhaltung der Cybersicherheitspflichten. Unwissenheit
                  schützt nicht vor Strafe.
                </p>
                <Link
                  href="/schnellcheck"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg font-semibold mt-6 transition-colors"
                >
                  Betroffenheit jetzt prüfen
                  <Arrow />
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Wesentliche Einrichtungen", penalty: "€10 Mio. oder 2% Umsatz" },
                  { label: "Wichtige Einrichtungen", penalty: "€7 Mio. oder 1,4% Umsatz" },
                  { label: "Erstmeldung bei Vorfällen", penalty: "Innerhalb von 24 Stunden" },
                  { label: "Geschäftsleitung", penalty: "Persönlich haftbar" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10"
                  >
                    <div className="text-sm text-text-on-dark/60">{item.label}</div>
                    <div className="text-lg font-semibold text-accent-light mt-1">{item.penalty}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="bg-bg-alt">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">Zwei Wege zur Klarheit</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="text-sm font-medium text-accent uppercase tracking-wider">Kostenlos</div>
                <div className="mt-2 text-3xl font-bold text-primary">Schnellcheck</div>
                <p className="mt-3 text-text-secondary text-sm">
                  Erste Einschätzung in 2 Minuten
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "5 Fragen zu Ihrem Unternehmen",
                    "Sofortige Betroffenheits-Einschätzung",
                    "Übersicht der wichtigsten Pflichten",
                    "Empfohlene nächste Schritte",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/schnellcheck"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Jetzt kostenlos prüfen
                </Link>
              </div>

              {/* Paid */}
              <div className="bg-white rounded-xl p-8 border-2 border-accent relative">
                <div className="absolute -top-3 left-6 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Empfohlen
                </div>
                <div className="text-sm font-medium text-accent uppercase tracking-wider">Einmalig €29</div>
                <div className="mt-2 text-3xl font-bold text-primary">Vollanalyse</div>
                <p className="mt-3 text-text-secondary text-sm">
                  Detaillierte Betroffenheitsanalyse mit Maßnahmenplan
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "25+ Fragen über alle NIS2-Bereiche",
                    "Detaillierter Compliance-Score",
                    "Gap-Analyse: Ist vs. Soll",
                    "Priorisierter Maßnahmenplan",
                    "PDF-Report zum Download",
                    "Kostenabschätzung für Umsetzung",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-lg font-semibold cursor-default">
                  Bald verfügbar
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
              Häufige Fragen
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-border pb-6">
                  <h3 className="font-semibold text-primary text-lg">{faq.q}</h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-b from-primary to-primary-light text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Warten Sie nicht auf das Bußgeld.
            </h2>
            <p className="mt-4 text-text-on-dark/80 text-lg">
              Der kostenlose Schnellcheck dauert nur 2 Minuten.
            </p>
            <Link
              href="/schnellcheck"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-lg text-lg font-semibold mt-8 transition-colors"
            >
              Schnellcheck starten
              <Arrow />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-dark text-text-on-dark/60 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-text-on-dark">
              <Shield />
              <span className="font-semibold">NIS2<span className="text-accent-light">Check</span></span>
            </div>
            <div className="text-sm">
              Basierend auf EU-Richtlinie 2022/2555 und NIS2UmsuCG
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
