import Link from "next/link";

function Shield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

export function Footer({ variant = "full" }: { variant?: "full" | "minimal" }) {
  if (variant === "minimal") {
    return (
      <footer className="border-t border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-text-secondary">
          <Link href="/" className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-accent transition-colors">
            <Shield />
            NIS2<span className="text-accent">Check</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-text transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-text transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-bg-dark text-text-on-dark/60 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-text-on-dark">
            <Shield />
            <span className="font-semibold">NIS2<span className="text-accent-light">Check</span></span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/impressum" className="hover:text-text-on-dark transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-text-on-dark transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
