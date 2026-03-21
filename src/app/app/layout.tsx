"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import OnboardingTour from "@/components/OnboardingTour";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getFavoritesCount } from "@/components/FavoriteButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    setFavCount(getFavoritesCount());
    const handler = () => setFavCount(getFavoritesCount());
    window.addEventListener("favorites-changed", handler);
    return () => window.removeEventListener("favorites-changed", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingTour />
      {/* Nav */}
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold">
              CL
            </span>
            ContractLens
          </Link>
          <div className="flex items-center gap-1">
            {[
              { href: "/app/analyze", label: "Analyze" },
              { href: "/app/compare", label: "Compare" },
              { href: "/app/explain", label: "Explain" },
              { href: "/app/settings", label: "Settings" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-elevated)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {favCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm">
                <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0}>
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <span className="px-1.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {favCount}
                </span>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
}
