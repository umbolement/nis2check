"use client";

import { useState } from "react";
import Link from "next/link";
import {
  assessmentQuestions,
  assessmentCategories,
  evaluateFullAssessment,
  type FullAssessmentResult,
  type CategoryScore,
} from "@/lib/assessment-questions";
import { Footer } from "@/components/footer";

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

const statusColors = {
  good: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", bar: "bg-green-500" },
  partial: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", bar: "bg-amber-500" },
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", bar: "bg-red-500" },
};

const statusLabels = { good: "Gut", partial: "Teilweise", critical: "Kritisch" };

function ResultView({ result }: { result: FullAssessmentResult }) {
  const levelConfig = {
    compliant: { color: "text-green-700", bg: "bg-green-50", border: "border-green-200", label: "Weitgehend konform" },
    partial: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", label: "Teilweise konform" },
    non_compliant: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", label: "Nicht konform" },
  };
  const cfg = levelConfig[result.complianceLevel];

  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      <header className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
            <Shield />
            <span>NIS2<span className="text-accent">Check</span></span>
          </Link>
          <span className="text-sm text-text-secondary">Vollanalyse — Ergebnis</span>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Overall Score */}
          <div className={`rounded-xl border-2 ${cfg.border} ${cfg.bg} p-6 sm:p-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${cfg.color}`}>{cfg.label}</h1>
                <p className="text-sm text-text-secondary mt-1">NIS2 Compliance Score</p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${cfg.color}`}>{result.percentage}%</div>
                <div className="text-xs text-text-secondary">{result.overallScore}/{result.maxScore} Punkte</div>
              </div>
            </div>
            <div className="mt-4 h-3 bg-white rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  result.complianceLevel === "compliant" ? "bg-green-500" :
                  result.complianceLevel === "partial" ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <h2 className="text-lg font-bold text-primary mb-6">Bewertung nach Bereichen</h2>
            <div className="space-y-4">
              {result.categories.map((cat: CategoryScore) => {
                const sc = statusColors[cat.status];
                return (
                  <div key={cat.category} className={`rounded-lg border ${sc.border} ${sc.bg} p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary">{cat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${sc.text}`}>
                          {statusLabels[cat.status]}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {cat.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sc.bar}`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    {cat.findings.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {cat.findings.map((f: string) => (
                          <li key={f} className="text-xs text-text-secondary flex items-start gap-1.5">
                            <span className={`${sc.text} shrink-0`}>!</span>
                            {f.replace("Kritisch: ", "")}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Priorities */}
          {result.topPriorities.length > 0 && (
            <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-lg font-bold text-primary">Prioritäre Maßnahmen</h2>
              <p className="text-sm text-text-secondary mt-1">Die wichtigsten Schritte zur NIS2-Konformität</p>
              <ol className="mt-4 space-y-3">
                {result.topPriorities.map((p: string, i: number) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-text-secondary">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Cost & Time Estimates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <div className="text-xs text-text-secondary uppercase tracking-wider">Geschätzte Kosten</div>
              <div className="text-xl font-bold text-primary mt-2">{result.estimatedCost}</div>
              <div className="text-xs text-text-secondary mt-1">für NIS2-Konformität</div>
            </div>
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <div className="text-xs text-text-secondary uppercase tracking-wider">Geschätzter Zeitrahmen</div>
              <div className="text-xl font-bold text-primary mt-2">{result.estimatedTime}</div>
              <div className="text-xs text-text-secondary mt-1">bis zur Umsetzung</div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-text-secondary text-center leading-relaxed px-4">
            Diese Analyse basiert auf den Anforderungen der NIS2-Richtlinie (EU 2022/2555) Art. 21 und dient
            der Orientierung. Kosten- und Zeitschätzungen sind Richtwerte basierend auf Branchendurchschnitten.
            Für eine verbindliche Bewertung konsultieren Sie einen spezialisierten Berater.
          </p>

          <div className="flex gap-3 justify-center pt-4 pb-8">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-white transition-colors"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<FullAssessmentResult | null>(null);

  const question = assessmentQuestions[currentQuestion];
  const totalQuestions = assessmentQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Find current category
  const currentCatIndex = assessmentCategories.findIndex((c) => c.id === question?.category);
  const currentCategory = assessmentCategories[currentCatIndex];

  function selectAnswer(value: number) {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setResult(evaluateFullAssessment(newAnswers));
      }
    }, 300);
  }

  if (result) {
    return <ResultView result={result} />;
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
            {currentQuestion + 1} / {totalQuestions}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
            <span className="font-medium text-primary">{currentCategory?.label}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Category dots */}
          <div className="flex gap-1 mt-2">
            {assessmentCategories.map((cat, i) => (
              <div
                key={cat.id}
                className={`h-1 flex-1 rounded-full ${
                  i < currentCatIndex ? "bg-accent" :
                  i === currentCatIndex ? "bg-accent/50" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-start justify-center py-8 sm:py-12">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-border p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-primary leading-snug">
              {question.question}
            </h2>
            {question.helpText && (
              <p className="mt-2 text-sm text-text-secondary">{question.helpText}</p>
            )}
            <div className="mt-6 space-y-2.5">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectAnswer(opt.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    answers[question.id] === opt.value
                      ? "border-accent bg-accent/5 text-primary"
                      : "border-border hover:border-accent/30 text-text-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      answers[question.id] === opt.value ? "border-accent" : "border-border"
                    }`}>
                      {answers[question.id] === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <span className="text-sm">{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  currentQuestion === 0
                    ? "text-text-secondary/40 cursor-not-allowed"
                    : "text-text-secondary hover:text-text hover:bg-bg-alt"
                }`}
              >
                Zurück
              </button>
              <span className="text-xs text-text-secondary">
                Klicken Sie eine Antwort um fortzufahren
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}
