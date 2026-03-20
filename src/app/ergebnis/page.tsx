"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { evaluateQuickCheck, type QuickCheckAnswers, type AssessmentResult, type RiskLevel } from "@/lib/nis2-data";

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

const riskConfig: Record<RiskLevel, { color: string; bg: string; border: string; icon: string; barWidth: string }> = {
  high: {
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "!",
    barWidth: "w-full",
  },
  medium: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "?",
    barWidth: "w-2/3",
  },
  low: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "~",
    barWidth: "w-1/3",
  },
  none: {
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "✓",
    barWidth: "w-0",
  },
};

const riskBarColors: Record<RiskLevel, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-blue-500",
  none: "bg-green-500",
};

function ResultContent() {
  const params = useSearchParams();

  const answers: QuickCheckAnswers = {
    sector: params.get("s") || "none",
    employees: params.get("e") || "0-49",
    revenue: params.get("r") || "0-10m",
    digitalServices: (params.get("d") || "keine").split(",").filter(Boolean),
    kritisSupplier: params.get("k") || "nein",
  };

  const result: AssessmentResult = evaluateQuickCheck(answers);
  const config = riskConfig[result.riskLevel];

  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
          <Link href="/schnellcheck" className="text-sm text-accent hover:text-accent/80 font-medium">
            Erneut prüfen
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Result Card */}
          <div className={`rounded-xl border-2 ${config.border} ${config.bg} p-6 sm:p-8`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full ${config.border} border-2 flex items-center justify-center text-xl font-bold ${config.color} shrink-0`}>
                {config.icon}
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${config.color}`}>
                  {result.title}
                </h1>
                {result.entityType !== "not_applicable" && (
                  <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
                    {result.entityType === "essential" ? "Wesentliche Einrichtung" : "Wichtige Einrichtung"}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {result.description}
            </p>

            {/* Risk Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Risikoeinstufung</span>
                <span className={`font-medium ${config.color}`}>
                  {result.riskLevel === "high" ? "Hoch" :
                   result.riskLevel === "medium" ? "Mittel" :
                   result.riskLevel === "low" ? "Gering" : "Kein Risiko"}
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className={`h-full ${riskBarColors[result.riskLevel]} ${config.barWidth} rounded-full transition-all duration-700`} />
              </div>
            </div>

            {result.penaltyRange && result.riskLevel !== "none" && (
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <div className="text-xs text-text-secondary">Mögliche Bußgelder</div>
                <div className={`text-sm font-semibold ${config.color} mt-0.5`}>{result.penaltyRange}</div>
              </div>
            )}
          </div>

          {/* Obligations */}
          {result.obligations.length > 0 && (
            <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-lg font-bold text-primary">Ihre Pflichten unter NIS2</h2>
              <ul className="mt-4 space-y-3">
                {result.obligations.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <h2 className="text-lg font-bold text-primary">Empfohlene nächste Schritte</h2>
            <ul className="mt-4 space-y-3">
              {result.nextSteps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-text-secondary">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA: Full Assessment */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-6 sm:p-8 text-white">
            <h2 className="text-lg font-bold">Detaillierte Betroffenheitsanalyse</h2>
            <p className="mt-2 text-text-on-dark/70 text-sm leading-relaxed">
              Der Schnellcheck gibt eine erste Einschätzung. Für eine umfassende Analyse mit
              Compliance-Score, Gap-Analyse und priorisiertem Maßnahmenplan empfehlen wir die
              vollständige Betroffenheitsanalyse.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "25+ Fragen über alle NIS2-Bereiche",
                "Detaillierter Compliance-Score",
                "Gap-Analyse mit Maßnahmenplan",
                "PDF-Report zum Download",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-text-on-dark/80">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 text-white/80 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-default">
              Bald verfügbar — Einmalig €29
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-text-secondary text-center leading-relaxed px-4">
            Diese Einschätzung basiert auf den offiziellen EU-Kriterien der NIS2-Richtlinie (EU 2022/2555)
            und dient der Orientierung. Sie ersetzt keine rechtliche Beratung. Für eine verbindliche
            Bewertung konsultieren Sie bitte einen spezialisierten Rechtsanwalt oder IT-Sicherheitsberater.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 pb-8">
            <Link
              href="/schnellcheck"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-white transition-colors"
            >
              Erneut prüfen
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-white transition-colors"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ErgebnisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-alt">
        <div className="text-text-secondary">Ergebnis wird berechnet...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
