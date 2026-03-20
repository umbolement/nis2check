"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

type EntityType = "essential" | "important" | "unknown";

interface PenaltyResult {
  entityType: EntityType;
  entityLabel: string;
  maxPenaltyPercent: string;
  maxPenaltyAbsolute: string;
  calculatedPenalty: string;
  applicablePenalty: string;
  personalLiability: boolean;
  details: string[];
}

function formatEuro(num: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(num);
}

function calculatePenalty(entityType: EntityType, revenue: number): PenaltyResult {
  const isEssential = entityType === "essential";
  const percent = isEssential ? 0.02 : 0.014;
  const absoluteMax = isEssential ? 10_000_000 : 7_000_000;
  const calculatedFromRevenue = revenue * percent;
  const applicable = Math.max(calculatedFromRevenue, absoluteMax);

  const details: string[] = [];

  if (isEssential) {
    details.push("Als wesentliche Einrichtung gilt der höhere Wert von: €10 Mio. oder 2% des weltweiten Jahresumsatzes.");
    details.push("Wesentliche Einrichtungen unterliegen proaktiver Aufsicht durch das BSI.");
    details.push("Die Geschäftsleitung haftet persönlich für die Einhaltung der Cybersicherheitsmaßnahmen.");
  } else {
    details.push("Als wichtige Einrichtung gilt der höhere Wert von: €7 Mio. oder 1,4% des weltweiten Jahresumsatzes.");
    details.push("Wichtige Einrichtungen unterliegen reaktiver Aufsicht (Prüfung bei konkretem Anlass).");
    details.push("Die Geschäftsleitung haftet persönlich für die Einhaltung der Cybersicherheitsmaßnahmen.");
  }

  if (calculatedFromRevenue > absoluteMax) {
    details.push(`Bei Ihrem Umsatz übersteigt die umsatzbasierte Berechnung (${formatEuro(calculatedFromRevenue)}) das absolute Maximum (${formatEuro(absoluteMax)}).`);
  }

  return {
    entityType,
    entityLabel: isEssential ? "Wesentliche Einrichtung" : "Wichtige Einrichtung",
    maxPenaltyPercent: isEssential ? "2% des Jahresumsatzes" : "1,4% des Jahresumsatzes",
    maxPenaltyAbsolute: formatEuro(absoluteMax),
    calculatedPenalty: formatEuro(calculatedFromRevenue),
    applicablePenalty: formatEuro(applicable),
    personalLiability: true,
    details,
  };
}

export default function BussgeldrechnerPage() {
  const [entityType, setEntityType] = useState<EntityType>("unknown");
  const [revenue, setRevenue] = useState<string>("");
  const [result, setResult] = useState<PenaltyResult | null>(null);

  function handleCalculate() {
    if (entityType === "unknown" || !revenue) return;
    const rev = parseFloat(revenue.replace(/[^\d]/g, ""));
    if (isNaN(rev) || rev <= 0) return;
    setResult(calculatePenalty(entityType, rev));
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
          <Link
            href="/schnellcheck"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Schnellcheck
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              NIS2 Bußgeldrechner
            </h1>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Berechnen Sie das maximale Bußgeld bei Nicht-Einhaltung der NIS2-Richtlinie
              für Ihr Unternehmen.
            </p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <div className="space-y-6">
              {/* Entity Type */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-3">
                  Einrichtungstyp
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEntityType("essential")}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      entityType === "essential"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <div className="text-sm font-medium text-primary">Wesentlich</div>
                    <div className="text-xs text-text-secondary mt-1">Anhang I Sektoren</div>
                  </button>
                  <button
                    onClick={() => setEntityType("important")}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      entityType === "important"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <div className="text-sm font-medium text-primary">Wichtig</div>
                    <div className="text-xs text-text-secondary mt-1">Anhang II Sektoren</div>
                  </button>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Nicht sicher? <Link href="/schnellcheck" className="text-accent hover:underline">Schnellcheck machen</Link>
                </p>
              </div>

              {/* Revenue */}
              <div>
                <label htmlFor="revenue" className="block text-sm font-semibold text-primary mb-2">
                  Weltweiter Jahresumsatz (in Euro)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm">€</span>
                  <input
                    id="revenue"
                    type="text"
                    inputMode="numeric"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    placeholder="z.B. 50000000"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Calculate */}
              <button
                onClick={handleCalculate}
                disabled={entityType === "unknown" || !revenue}
                className={`w-full py-3 rounded-lg text-sm font-semibold transition-all ${
                  entityType !== "unknown" && revenue
                    ? "bg-accent hover:bg-accent/90 text-white"
                    : "bg-border text-text-secondary cursor-not-allowed"
                }`}
              >
                Bußgeld berechnen
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-6 space-y-4">
              {/* Main Result */}
              <div className="bg-white rounded-xl border-2 border-red-200 bg-red-50 p-6 sm:p-8">
                <div className="text-center">
                  <div className="text-sm text-text-secondary mb-1">Maximales Bußgeld</div>
                  <div className="text-4xl sm:text-5xl font-bold text-red-700">
                    {result.applicablePenalty}
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
                      {result.entityLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
                <h2 className="text-lg font-bold text-primary mb-4">Berechnungsgrundlage</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-text-secondary">Einrichtungstyp</span>
                    <span className="text-sm font-medium text-primary">{result.entityLabel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-text-secondary">Umsatzbasierte Berechnung</span>
                    <span className="text-sm font-medium text-primary">{result.maxPenaltyPercent}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-text-secondary">Ergebnis umsatzbasiert</span>
                    <span className="text-sm font-medium text-primary">{result.calculatedPenalty}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-text-secondary">Absolutes Minimum</span>
                    <span className="text-sm font-medium text-primary">{result.maxPenaltyAbsolute}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-semibold text-primary">Anwendbar (höherer Wert)</span>
                    <span className="text-sm font-bold text-red-700">{result.applicablePenalty}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
                <h2 className="text-lg font-bold text-primary mb-3">Wichtige Hinweise</h2>
                <ul className="space-y-2">
                  {result.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personal Liability */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    !
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-800">Persönliche Haftung der Geschäftsleitung</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Unabhängig vom Bußgeld haftet die Geschäftsleitung persönlich für die Einhaltung
                      der NIS2-Maßnahmen. Dies ist ein Novum in der EU-Cybersicherheitsregulierung.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-6 text-white text-center">
                <h2 className="text-lg font-bold">Sind Sie NIS2-konform?</h2>
                <p className="mt-2 text-text-on-dark/70 text-sm">
                  Prüfen Sie jetzt Ihren Compliance-Stand mit unserer kostenlosen Vollanalyse.
                </p>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg font-semibold mt-4 transition-colors"
                >
                  Vollanalyse starten
                </Link>
              </div>
            </div>
          )}

          {/* Info section (visible before calculation) */}
          {!result && (
            <div className="mt-8 space-y-6">
              <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
                <h2 className="text-lg font-bold text-primary mb-4">So berechnet sich das Bußgeld</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="text-xs text-red-600 font-medium uppercase tracking-wider">Wesentliche Einrichtungen</div>
                      <div className="text-lg font-bold text-red-700 mt-1">€10 Mio.</div>
                      <div className="text-xs text-red-600 mt-1">oder 2% des Umsatzes</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="text-xs text-amber-600 font-medium uppercase tracking-wider">Wichtige Einrichtungen</div>
                      <div className="text-lg font-bold text-amber-700 mt-1">€7 Mio.</div>
                      <div className="text-xs text-amber-600 mt-1">oder 1,4% des Umsatzes</div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Es gilt immer der <strong>höhere Wert</strong>. Bei einem Unternehmen mit €500 Mio.
                    Umsatz als wesentliche Einrichtung wären das €10 Mio. (2% = €10 Mio., also gleich).
                    Bei €1 Mrd. Umsatz wären es €20 Mio. (2% = €20 Mio., übersteigt €10 Mio. Minimum).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}
