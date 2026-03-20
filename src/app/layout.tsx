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
        {children}
      </body>
    </html>
  );
}
