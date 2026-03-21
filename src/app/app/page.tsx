import Link from "next/link";

export default function AppHome() {
  const tools = [
    {
      href: "/app/analyze",
      title: "Contract Analyzer",
      desc: "Paste a contract to get risk scores, red flag alerts, risky clause highlights, and improvement suggestions.",
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
      color: "var(--color-accent)",
    },
    {
      href: "/app/compare",
      title: "Contract Comparison",
      desc: "Paste two contracts side-by-side and AI highlights the key differences, advantages, and risks of each.",
      icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
      color: "#3b82f6",
    },
    {
      href: "/app/explain",
      title: "Clause Explainer",
      desc: "Paste any legal clause and AI explains exactly what it means for you in plain, simple English.",
      icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z",
      color: "#a855f7",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Contract Tools
        </h1>
        <p className="text-[var(--color-muted)] text-lg">
          Choose a tool to analyze, compare, or understand your contracts.
        </p>
      </div>

      <div className="grid gap-4">
        {tools.map((tool, i) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group flex items-start gap-5 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/40 transition-all duration-200 hover:scale-[1.01] animate-fade-in delay-${(i + 1) * 100}`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${tool.color}15` }}
            >
              <svg
                className="w-6 h-6"
                style={{ color: tool.color }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={tool.icon}
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1 group-hover:text-[var(--color-accent-light)] transition-colors">
                {tool.title}
              </h2>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
