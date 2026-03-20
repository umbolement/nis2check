import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NIS2 Vollanalyse — 25-Fragen Compliance Assessment | NIS2Check",
  description:
    "Detaillierte NIS2-Betroffenheitsanalyse mit 25 Fragen über 7 Kategorien. Compliance-Score, Gap-Analyse, Maßnahmenplan und Kostenabschätzung — kostenlos.",
};

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
