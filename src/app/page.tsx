import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-sm text-[var(--color-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            AI-Powered Contract Analysis
          </span>
        </div>

        {/* Hero text */}
        <h1 className="text-7xl sm:text-8xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] animate-slide-up">
          Read between
          <br />
          <span className="text-[var(--color-accent)]">the lines.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--color-muted)] animate-fade-in delay-200">
          Paste your contract. AI instantly highlights risky clauses, scores
          danger levels, explains legal jargon in plain English, and tells you
          exactly what to negotiate.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
          <Link
            href="/app/analyze"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold rounded-xl text-lg transition-all duration-200 hover:scale-[1.02]"
          >
            Analyze a Contract
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="/app/compare"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-muted)] hover:text-white font-semibold rounded-xl text-lg transition-all duration-200"
          >
            Compare Contracts
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 animate-fade-in delay-400">
          {[
            {
              icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z",
              title: "Red Flag Alerts",
              desc: "Top 5 things to negotiate before signing",
            },
            {
              icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
              title: "Risk Scoring",
              desc: "0-100 score across payment, IP, liability, more",
            },
            {
              icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
              title: "Plain English",
              desc: "Click any clause for a human-readable explanation",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/30 transition-colors"
            >
              <svg
                className="w-8 h-8 text-[var(--color-accent)] mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={f.icon}
                />
              </svg>
              <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-[var(--color-muted)]">
        ContractLens AI &mdash; Built for freelancers who read the fine print.
      </footer>
    </main>
  );
}
