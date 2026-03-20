import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | NIS2Check",
  description: "Datenschutzerklärung von NIS2Check — Informationen zur Datenverarbeitung gemäß DSGVO.",
};

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return children;
}
