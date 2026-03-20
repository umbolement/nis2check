import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NIS2 Bußgeldrechner — Maximales Bußgeld berechnen | NIS2Check",
  description:
    "Berechnen Sie das maximale NIS2-Bußgeld für Ihr Unternehmen. Bis zu €10 Mio. oder 2% des Jahresumsatzes für wesentliche Einrichtungen. Kostenlos und ohne Registrierung.",
  keywords: ["NIS2 Bußgeld", "NIS2 Strafe", "NIS2 Sanktionen", "NIS2 Penalty", "Cybersicherheit Bußgeld"],
};

export default function BussgeldLayout({ children }: { children: React.ReactNode }) {
  return children;
}
