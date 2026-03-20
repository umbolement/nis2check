import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nis2check.de"),
  title: "NIS2 Check — Ist Ihr Unternehmen betroffen?",
  description:
    "Kostenloser NIS2-Schnellcheck: Prüfen Sie in 2 Minuten, ob Ihr Unternehmen unter die NIS2-Richtlinie fällt. Basierend auf den offiziellen EU- und BSI-Kriterien.",
  keywords: [
    "NIS2",
    "NIS2 Check",
    "NIS2 Betroffenheit",
    "NIS2UmsuCG",
    "Cybersicherheit",
    "BSI",
    "NIS2 Pflichten",
    "NIS2 Bußgeld",
  ],
  openGraph: {
    title: "NIS2 Check — Ist Ihr Unternehmen betroffen?",
    description:
      "Kostenloser Schnellcheck: In 2 Minuten wissen Sie, ob NIS2 für Sie gilt.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  name: "NIS2Check",
                  url: "https://nis2check.de",
                  description: "Kostenloser NIS2-Schnellcheck und Vollanalyse für Unternehmen in Deutschland.",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
                  inLanguage: "de",
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Was ist NIS2?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Die NIS2-Richtlinie (EU 2022/2555) ist die überarbeitete EU-Regulierung für Cybersicherheit. Sie erweitert den Kreis betroffener Unternehmen massiv und verschärft die Anforderungen an Risikomanagement, Incident-Reporting und Geschäftsleitungs-Haftung.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Wer ist von NIS2 betroffen?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Unternehmen mit mindestens 50 Mitarbeitern ODER €10 Mio. Jahresumsatz in einem der 18 regulierten Sektoren. Bestimmte digitale Dienste sind unabhängig von der Größe betroffen.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Was passiert bei Nicht-Einhaltung von NIS2?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Bußgelder bis zu €10 Mio. oder 2% des weltweiten Jahresumsatzes. Zudem haftet die Geschäftsleitung persönlich.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
