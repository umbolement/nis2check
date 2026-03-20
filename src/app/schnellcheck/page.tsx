"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sectors, digitalServiceOptions } from "@/lib/nis2-data";

const totalSteps = 5;

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

export default function Schnellcheck() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    sector: "",
    employees: "",
    revenue: "",
    digitalServices: [] as string[],
    kritisSupplier: "",
  });

  const progress = (step / totalSteps) * 100;

  function canProceed(): boolean {
    switch (step) {
      case 1: return answers.sector !== "";
      case 2: return answers.employees !== "";
      case 3: return answers.revenue !== "";
      case 4: return answers.digitalServices.length > 0;
      case 5: return answers.kritisSupplier !== "";
      default: return false;
    }
  }

  function next() {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Navigate to results with encoded answers
      const params = new URLSearchParams({
        s: answers.sector,
        e: answers.employees,
        r: answers.revenue,
        d: answers.digitalServices.join(","),
        k: answers.kritisSupplier,
      });
      router.push(`/ergebnis?${params.toString()}`);
    }
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function toggleDigitalService(id: string) {
    setAnswers((prev) => {
      if (id === "keine") {
        return { ...prev, digitalServices: ["keine"] };
      }
      const filtered = prev.digitalServices.filter((s) => s !== "keine");
      if (filtered.includes(id)) {
        return { ...prev, digitalServices: filtered.filter((s) => s !== id) };
      }
      return { ...prev, digitalServices: [...filtered, id] };
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
          <span className="text-sm text-text-secondary">
            Frage {step} von {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-start justify-center py-8 sm:py-16">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-border p-6 sm:p-10">
            {/* Step 1: Sector */}
            {step === 1 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  In welchem Sektor ist Ihr Unternehmen tätig?
                </h2>
                <p className="mt-2 text-text-secondary text-sm">
                  Wählen Sie den Sektor, der am besten zu Ihrer Haupttätigkeit passt.
                </p>
                <div className="mt-6 space-y-2">
                  {sectors.map((s) => (
                    <label
                      key={s.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        answers.sector === s.id
                          ? "border-accent bg-accent/5 text-primary"
                          : "border-border hover:border-accent/30 text-text-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sector"
                        value={s.id}
                        checked={answers.sector === s.id}
                        onChange={() => setAnswers({ ...answers, sector: s.id })}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                          answers.sector === s.id ? "border-accent" : "border-border"
                        }`}
                      >
                        {answers.sector === s.id && (
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{s.name}</span>
                        <span className="text-xs text-text-secondary ml-2">
                          ({s.category === "annex1" ? "Anhang I" : "Anhang II"})
                        </span>
                      </div>
                    </label>
                  ))}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      answers.sector === "none"
                        ? "border-accent bg-accent/5 text-primary"
                        : "border-border hover:border-accent/30 text-text-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sector"
                      value="none"
                      checked={answers.sector === "none"}
                      onChange={() => setAnswers({ ...answers, sector: "none" })}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        answers.sector === "none" ? "border-accent" : "border-border"
                      }`}
                    >
                      {answers.sector === "none" && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <span className="text-sm font-medium">Keiner der genannten Sektoren</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Employees */}
            {step === 2 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  Wie viele Mitarbeiter hat Ihr Unternehmen?
                </h2>
                <p className="mt-2 text-text-secondary text-sm">
                  Zählen Sie alle Beschäftigten inklusive Teilzeit (umgerechnet in Vollzeitäquivalente).
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { value: "0-49", label: "Unter 50 Mitarbeiter", sub: "Kleinstunternehmen / Kleinunternehmen" },
                    { value: "50-249", label: "50 – 249 Mitarbeiter", sub: "Mittleres Unternehmen" },
                    { value: "250+", label: "250+ Mitarbeiter", sub: "Großunternehmen" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        answers.employees === opt.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="employees"
                        value={opt.value}
                        checked={answers.employees === opt.value}
                        onChange={() => setAnswers({ ...answers, employees: opt.value })}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                          answers.employees === opt.value ? "border-accent" : "border-border"
                        }`}
                      >
                        {answers.employees === opt.value && (
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{opt.label}</div>
                        <div className="text-xs text-text-secondary">{opt.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Revenue */}
            {step === 3 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  Wie hoch ist Ihr Jahresumsatz oder Ihre Bilanzsumme?
                </h2>
                <p className="mt-2 text-text-secondary text-sm">
                  Es zählt der höhere Wert von Jahresumsatz oder Jahresbilanzsumme.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { value: "0-10m", label: "Unter €10 Mio.", sub: "Kleinstunternehmen / Kleinunternehmen" },
                    { value: "10-50m", label: "€10 – 50 Mio.", sub: "Mittleres Unternehmen" },
                    { value: "50m+", label: "Über €50 Mio.", sub: "Großunternehmen" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        answers.revenue === opt.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="revenue"
                        value={opt.value}
                        checked={answers.revenue === opt.value}
                        onChange={() => setAnswers({ ...answers, revenue: opt.value })}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                          answers.revenue === opt.value ? "border-accent" : "border-border"
                        }`}
                      >
                        {answers.revenue === opt.value && (
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{opt.label}</div>
                        <div className="text-xs text-text-secondary">{opt.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Digital Services */}
            {step === 4 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  Bieten Sie eine dieser digitalen Dienstleistungen an?
                </h2>
                <p className="mt-2 text-text-secondary text-sm">
                  Bestimmte digitale Dienste fallen unabhängig von der Unternehmensgröße unter NIS2.
                  Mehrfachauswahl möglich.
                </p>
                <div className="mt-6 space-y-2">
                  {digitalServiceOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        answers.digitalServices.includes(opt.id)
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={answers.digitalServices.includes(opt.id)}
                        onChange={() => toggleDigitalService(opt.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center ${
                          answers.digitalServices.includes(opt.id)
                            ? "border-accent bg-accent"
                            : "border-border"
                        }`}
                      >
                        {answers.digitalServices.includes(opt.id) && (
                          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                            <path d="M3 6l2 2 4-4" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: KRITIS Supplier */}
            {step === 5 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  Sind Sie Zulieferer für kritische Infrastruktur?
                </h2>
                <p className="mt-2 text-text-secondary text-sm">
                  Auch Unternehmen in der Lieferkette von KRITIS-Betreibern können indirekt von
                  NIS2-Anforderungen betroffen sein.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { value: "ja", label: "Ja", sub: "Wir liefern Produkte/Dienste an KRITIS-Betreiber" },
                    { value: "nein", label: "Nein", sub: "Keine bekannte Zulieferer-Beziehung zu KRITIS" },
                    { value: "unsicher", label: "Unsicher", sub: "Nicht sicher, ob unsere Kunden KRITIS-Betreiber sind" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        answers.kritisSupplier === opt.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="kritis"
                        value={opt.value}
                        checked={answers.kritisSupplier === opt.value}
                        onChange={() => setAnswers({ ...answers, kritisSupplier: opt.value })}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                          answers.kritisSupplier === opt.value ? "border-accent" : "border-border"
                        }`}
                      >
                        {answers.kritisSupplier === opt.value && (
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{opt.label}</div>
                        <div className="text-xs text-text-secondary">{opt.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={back}
                disabled={step === 1}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  step === 1
                    ? "text-text-secondary/40 cursor-not-allowed"
                    : "text-text-secondary hover:text-text hover:bg-bg-alt"
                }`}
              >
                Zurück
              </button>
              <button
                onClick={next}
                disabled={!canProceed()}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  canProceed()
                    ? "bg-accent hover:bg-accent/90 text-white"
                    : "bg-border text-text-secondary cursor-not-allowed"
                }`}
              >
                {step === totalSteps ? "Ergebnis anzeigen" : "Weiter"}
              </button>
            </div>
          </div>

          {/* Trust note */}
          <p className="text-center text-xs text-text-secondary mt-6">
            Ihre Angaben werden nicht gespeichert. Die Auswertung erfolgt lokal in Ihrem Browser.
          </p>
        </div>
      </main>
    </div>
  );
}
