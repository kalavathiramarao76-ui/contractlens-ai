import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
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
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-[var(--color-muted)] hover:text-white hover:bg-[var(--color-elevated)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
