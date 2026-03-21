"use client";

import Link from "next/link";

const tools = [
  {
    href: "/app/analyze",
    title: "Contract Analyzer",
    tag: "scan()",
    desc: "Paste a contract to get risk scores, red flag alerts, risky clause highlights, and improvement suggestions.",
    severity: "high",
  },
  {
    href: "/app/compare",
    title: "Contract Comparison",
    tag: "diff()",
    desc: "Paste two contracts side-by-side and AI highlights the key differences, advantages, and risks of each.",
    severity: "medium",
  },
  {
    href: "/app/explain",
    title: "Clause Explainer",
    tag: "explain()",
    desc: "Paste any legal clause and AI explains exactly what it means for you in plain, simple English.",
    severity: "low",
  },
];

const severityColor: Record<string, { dot: string; border: string; bg: string }> = {
  high: { dot: "bg-rose-500", border: "border-rose-500/20", bg: "bg-rose-500/6" },
  medium: { dot: "bg-amber-500", border: "border-amber-500/20", bg: "bg-amber-500/6" },
  low: { dot: "bg-emerald-500", border: "border-emerald-500/20", bg: "bg-emerald-500/6" },
};

export default function AppHome() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      {/* Header */}
      <div className="mb-16 animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Legal Studio
          </h1>
          <span className="px-3 py-1 text-[10px] font-semibold font-mono tracking-[0.2em] uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
            Workspace
          </span>
        </div>
        <p className="text-[var(--color-muted)] text-base max-w-md leading-relaxed">
          Analyze, compare, and understand your contracts with AI.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { label: "Contracts Analyzed", value: "1,284", sub: "all time" },
          { label: "Avg Risk Score", value: "6.3", sub: "out of 10" },
          { label: "Clauses Flagged", value: "847", sub: "high severity" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] animate-fade-in`}
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            <p className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider mb-3">
              {stat.label}
            </p>
            <p className="text-5xl font-mono font-bold text-white tracking-tight leading-none mb-2">
              {stat.value}
            </p>
            <p className="text-xs text-[var(--color-muted)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Tool rows */}
      <div className="space-y-3">
        {tools.map((tool, i) => {
          const sev = severityColor[tool.severity];
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group flex items-center gap-6 px-6 py-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/30 transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${(i + 4) * 100}ms` }}
            >
              {/* Row number */}
              <span className="text-[11px] font-mono text-[var(--color-muted)] tabular-nums w-5 shrink-0 opacity-40">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Severity dot */}
              <div className={`w-2 h-2 rounded-full ${sev.dot} shrink-0`} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[15px] font-semibold text-white group-hover:text-[var(--color-accent-light)] transition-colors">
                    {tool.title}
                  </h2>
                  <span className="text-[11px] font-mono text-rose-400/70 bg-rose-500/6 px-2 py-0.5 rounded-md border border-rose-500/10">
                    {tool.tag}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed truncate">
                  {tool.desc}
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-[var(--color-muted)] opacity-30 group-hover:opacity-100 group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-300 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
