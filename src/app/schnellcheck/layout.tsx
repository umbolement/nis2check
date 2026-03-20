import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NIS2 Schnellcheck — Betroffenheit in 2 Minuten prüfen | NIS2Check",
  description:
    "Kostenloser NIS2-Schnellcheck: 5 Fragen zu Branche, Unternehmensgröße und digitalen Diensten. Sofortige Einschätzung Ihrer NIS2-Betroffenheit.",
};

export default function SchnellcheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
