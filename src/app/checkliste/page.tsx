import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "NIS2 Checkliste 2025 — Vollständige Compliance-Checkliste für Unternehmen",
  description:
    "Kostenlose NIS2-Checkliste: Alle Anforderungen an Risikomanagement, Incident Response, Lieferkette und Governance. Mit Umsetzungstipps für jede Maßnahme.",
  keywords: ["NIS2 Checkliste", "NIS2 Anforderungen", "NIS2 Maßnahmen", "NIS2 Compliance", "Cybersicherheit Checkliste"],
};

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

const checklistSections = [
  {
    id: "risk",
    title: "1. Risikomanagement (Art. 21 Abs. 2a)",
    description: "Konzepte für Risikoanalyse und Sicherheit der Informationssysteme",
    items: [
      { text: "Cybersicherheitsstrategie dokumentiert und von der Geschäftsleitung genehmigt", priority: "hoch" },
      { text: "Regelmäßige Risikoanalysen (mindestens halbjährlich) mit dokumentierten Ergebnissen", priority: "hoch" },
      { text: "Geschäftsleitung aktiv eingebunden und an Schulungen teilnehmend", priority: "hoch" },
      { text: "Dediziertes Cybersicherheitsbudget definiert und ausreichend dimensioniert", priority: "mittel" },
      { text: "Asset-Register aller kritischen IT-Systeme und Daten gepflegt", priority: "mittel" },
    ],
  },
  {
    id: "incident",
    title: "2. Incident Management (Art. 21 Abs. 2b, Art. 23)",
    description: "Bewältigung von Sicherheitsvorfällen und Meldepflichten",
    items: [
      { text: "Dokumentierter Incident-Response-Plan, regelmäßig getestet und aktualisiert", priority: "hoch" },
      { text: "Fähigkeit zur Erstmeldung an BSI innerhalb von 24 Stunden", priority: "hoch" },
      { text: "Folgemeldung innerhalb von 72 Stunden mit Bewertung", priority: "hoch" },
      { text: "Abschlussmeldung innerhalb eines Monats", priority: "hoch" },
      { text: "SIEM/IDS/IPS oder Managed Detection & Response im Einsatz", priority: "mittel" },
      { text: "Systematische Dokumentation und Lessons-Learned-Prozess", priority: "mittel" },
    ],
  },
  {
    id: "continuity",
    title: "3. Business Continuity (Art. 21 Abs. 2c)",
    description: "Aufrechterhaltung des Betriebs und Krisenmanagement",
    items: [
      { text: "Business Continuity Plan (BCP) dokumentiert und regelmäßig getestet", priority: "hoch" },
      { text: "3-2-1 Backup-Strategie mit regelmäßigen Recovery-Tests", priority: "hoch" },
      { text: "Disaster-Recovery-Prozeduren mit definierten RTO/RPO", priority: "hoch" },
      { text: "Krisenmanagement-Team benannt und geschult", priority: "mittel" },
      { text: "Alternative Kommunikationswege für Krisenfälle definiert", priority: "mittel" },
    ],
  },
  {
    id: "supply",
    title: "4. Lieferkettensicherheit (Art. 21 Abs. 2d)",
    description: "Sicherheit in Lieferketten und Beziehung zu Dienstleistern",
    items: [
      { text: "Lieferanten-Risikomanagement mit regelmäßiger Überprüfung", priority: "hoch" },
      { text: "Cybersicherheitsanforderungen in allen relevanten Verträgen", priority: "hoch" },
      { text: "Vollständiges Asset-Management (CMDB) aller Software und Cloud-Dienste", priority: "mittel" },
      { text: "SLAs für Sicherheitsupdates und Incident-Meldungen mit Dienstleistern", priority: "mittel" },
      { text: "Regelmäßige Sicherheitsbewertung kritischer Lieferanten", priority: "mittel" },
    ],
  },
  {
    id: "network",
    title: "5. Netzwerk- und Informationssicherheit (Art. 21 Abs. 2e-j)",
    description: "Technische und organisatorische Sicherheitsmaßnahmen",
    items: [
      { text: "Umfassende Verschlüsselungsstrategie (at rest und in transit)", priority: "hoch" },
      { text: "Patch-Management mit definierten SLAs (kritische Patches innerhalb 48h)", priority: "hoch" },
      { text: "Netzwerksegmentierung / Zero-Trust-Architektur", priority: "hoch" },
      { text: "Regelmäßige Schwachstellenscans und jährliche Penetrationstests", priority: "mittel" },
      { text: "Sichere Softwareentwicklungsprozesse (Secure SDLC)", priority: "mittel" },
    ],
  },
  {
    id: "access",
    title: "6. Zugangsmanagement (Art. 21 Abs. 2i-j)",
    description: "Multi-Faktor-Authentifizierung und Zugangskontrolle",
    items: [
      { text: "Multi-Faktor-Authentifizierung (MFA) flächendeckend eingeführt", priority: "hoch" },
      { text: "Least-Privilege-Prinzip mit rollenbasiertem Berechtigungskonzept", priority: "hoch" },
      { text: "Privileged Access Management (PAM) für Admin-Accounts", priority: "hoch" },
      { text: "Regelmäßige Access Reviews (mindestens vierteljährlich)", priority: "mittel" },
      { text: "Sichere Authentifizierung und verschlüsselte Kommunikation", priority: "mittel" },
    ],
  },
  {
    id: "governance",
    title: "7. Governance und Meldepflichten (Art. 20, 23, 27)",
    description: "Organisatorische Verankerung und behördliche Pflichten",
    items: [
      { text: "Dedizierter CISO oder externer ISB mit direktem GL-Reporting", priority: "hoch" },
      { text: "Regelmäßige Cybersicherheitsschulungen für alle Mitarbeiter", priority: "hoch" },
      { text: "Registrierung beim BSI vorbereitet, Kontaktstelle benannt", priority: "hoch" },
      { text: "ISMS implementiert (ISO 27001 oder BSI IT-Grundschutz)", priority: "mittel" },
      { text: "Phishing-Simulationen und Awareness-Programm etabliert", priority: "mittel" },
      { text: "Cyberhygiene-Richtlinien für alle Mitarbeiter dokumentiert", priority: "mittel" },
    ],
  },
];

const priorityConfig = {
  hoch: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Hoch" },
  mittel: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Mittel" },
};

export default function ChecklistePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
          <Link
            href="/assessment"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Jetzt prüfen
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm px-3 py-1 rounded-full mb-4">
              Aktualisiert: März 2025
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
              NIS2 Compliance-Checkliste
            </h1>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Alle Anforderungen der NIS2-Richtlinie (Art. 21) in einer übersichtlichen Checkliste.
              Prüfen Sie Ihren aktuellen Stand und identifizieren Sie Handlungsbedarf.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-border p-4 text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-xs text-text-secondary mt-1">Bereiche</div>
            </div>
            <div className="bg-white rounded-xl border border-border p-4 text-center">
              <div className="text-2xl font-bold text-primary">37</div>
              <div className="text-xs text-text-secondary mt-1">Maßnahmen</div>
            </div>
            <div className="bg-white rounded-xl border border-border p-4 text-center">
              <div className="text-2xl font-bold text-accent">Kostenlos</div>
              <div className="text-xs text-text-secondary mt-1">Zum Ausdrucken</div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 mb-8 text-white text-center">
            <p className="text-sm text-text-on-dark/80">
              Wissen Sie schon, ob Ihr Unternehmen unter NIS2 fällt?
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/schnellcheck"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 hover:bg-white/15 rounded-lg text-sm font-medium transition-colors"
              >
                Schnellcheck (2 Min.)
              </Link>
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-accent hover:bg-accent-light rounded-lg text-sm font-semibold transition-colors"
              >
                Vollanalyse (25 Fragen)
              </Link>
            </div>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-6">
            {checklistSections.map((section) => (
              <div key={section.id} className="bg-white rounded-xl border border-border p-6 sm:p-8">
                <h2 className="text-lg font-bold text-primary">{section.title}</h2>
                <p className="text-sm text-text-secondary mt-1 mb-5">{section.description}</p>
                <ul className="space-y-3">
                  {section.items.map((item) => {
                    const pc = priorityConfig[item.priority as keyof typeof priorityConfig];
                    return (
                      <li key={item.text} className="flex items-start gap-3">
                        <Check />
                        <div className="flex-1">
                          <span className="text-sm text-text-secondary">{item.text}</span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pc.bg} ${pc.text} ${pc.border} border shrink-0`}>
                          {pc.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8 mt-6">
            <h2 className="text-lg font-bold text-primary mb-4">Wichtige Fristen</h2>
            <div className="space-y-4">
              {[
                { date: "Okt 2024", event: "Offizielle EU-Umsetzungsfrist", status: "abgelaufen" },
                { date: "2025", event: "NIS2UmsuCG-Verabschiedung in Deutschland erwartet", status: "aktuell" },
                { date: "Laufend", event: "BSI-Registrierungspflicht nach Inkrafttreten", status: "kommend" },
                { date: "24h / 72h", event: "Meldefristen bei Sicherheitsvorfällen", status: "permanent" },
              ].map((item) => (
                <div key={item.event} className="flex items-start gap-4">
                  <div className="w-20 shrink-0">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      item.status === "abgelaufen" ? "bg-red-50 text-red-700" :
                      item.status === "aktuell" ? "bg-amber-50 text-amber-700" :
                      item.status === "kommend" ? "bg-blue-50 text-blue-700" :
                      "bg-gray-50 text-gray-700"
                    }`}>
                      {item.date}
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-6 sm:p-8 text-white text-center mt-6">
            <h2 className="text-xl font-bold">Wo steht Ihr Unternehmen?</h2>
            <p className="mt-2 text-text-on-dark/70 text-sm">
              Unsere kostenlose Vollanalyse bewertet Ihren NIS2-Compliance-Stand
              mit einem detaillierten Score über alle 7 Bereiche.
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg font-semibold mt-4 transition-colors"
            >
              Vollanalyse starten
            </Link>
          </div>

          <p className="text-center text-xs text-text-secondary mt-6 mb-8">
            Tipp: Diese Seite lässt sich über Strg+P / Cmd+P als PDF speichern.
          </p>
        </div>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}
