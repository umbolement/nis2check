import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | NIS2Check",
  description: "Impressum und Anbieterkennzeichnung von NIS2Check.",
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
