"use client";

import { useState } from "react";
import { useStream } from "@/lib/useStream";
import FavoriteButton from "@/components/FavoriteButton";

const SAMPLE_CONTRACT = `FREELANCE SERVICE AGREEMENT

This Agreement is entered into between Client Corp ("Client") and Freelancer ("Contractor").

1. SCOPE OF WORK: Contractor shall provide web development services as directed by Client. Client may modify the scope at any time without additional compensation.

2. PAYMENT: Contractor will be paid $5,000 upon completion of ALL deliverables to Client's satisfaction. No milestone payments. Payment within 90 days of invoice.

3. INTELLECTUAL PROPERTY: All work product, including any pre-existing tools, frameworks, or code libraries used by Contractor, shall become the exclusive property of Client.

4. NON-COMPETE: Contractor agrees not to provide similar services to any of Client's competitors for a period of 2 years following termination.

5. LIABILITY: Contractor assumes full liability for any damages arising from the work, including consequential damages, lost profits, and third-party claims, without any cap.

6. TERMINATION: Client may terminate this agreement at any time without cause and without payment for work completed. Contractor must provide 60 days written notice.

7. CONFIDENTIALITY: Contractor shall not disclose any information related to Client's business for a period of 10 years, including the existence of this agreement.

8. DISPUTE RESOLUTION: All disputes shall be resolved in Client's home jurisdiction at Contractor's expense.`;

export default function AnalyzePage() {
  const [contract, setContract] = useState("");
  const { result, loading, generate } = useStream();
  const [activeTab, setActiveTab] = useState<"analysis" | "raw">("analysis");

  const analyze = () => {
    if (!contract.trim()) return;
    generate(`You are ContractLens AI, an expert contract analyzer for freelancers.

Analyze this contract and provide a comprehensive report in the following format:

## Risk Score: [0-100]/100
(Brief overall assessment)

## Risk Breakdown
| Category | Score | Assessment |
|----------|-------|------------|
| Payment Terms | X/100 | brief note |
| IP Ownership | X/100 | brief note |
| Liability | X/100 | brief note |
| Termination | X/100 | brief note |
| Non-Compete | X/100 | brief note |

## 🚩 Red Flag Alerts (Top 5)
1. **[Flag name]**: Explanation of why this is dangerous
2. ...

## Risky Clauses
For each risky clause found:
- **Clause**: Quote the exact text
- **Risk Level**: High/Medium/Low
- **Why It's Risky**: Plain English explanation
- **Suggested Improvement**: Better alternative language

## Missing Protections
List any standard protections that are MISSING from this contract.

## Bottom Line
2-3 sentence summary of whether to sign this contract and what to negotiate first.

CONTRACT:
${contract}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Contract Analyzer
        </h1>
        <p className="text-[var(--color-muted)]">
          Paste your contract below. AI will score risk, flag dangers, and
          suggest improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4 animate-fade-in delay-100">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--color-muted)]">
              Contract Text
            </label>
            <button
              onClick={() => setContract(SAMPLE_CONTRACT)}
              className="text-xs text-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors"
            >
              Load sample contract
            </button>
          </div>
          <textarea
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            placeholder="Paste your contract text here..."
            className="w-full h-[500px] p-4 rounded-xl text-sm font-mono leading-relaxed"
          />
          <button
            onClick={analyze}
            disabled={loading || !contract.trim()}
            className="w-full py-3.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze Contract"
            )}
          </button>
        </div>

        {/* Output */}
        <div className="animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-4">
            {result && (
              <FavoriteButton
                itemId="contractlens-analysis"
                itemLabel="Contract Analysis"
                size="sm"
              />
            )}
            {(["analysis", "raw"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[var(--color-elevated)] text-white"
                    : "text-[var(--color-muted)] hover:text-white"
                }`}
              >
                {tab === "analysis" ? "Analysis" : "Raw"}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 min-h-[500px] overflow-auto">
            {result ? (
              activeTab === "analysis" ? (
                <div
                  className="prose-contract whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(result),
                  }}
                />
              ) : (
                <pre className="text-sm font-mono whitespace-pre-wrap text-[var(--color-muted)]">
                  {result}
                </pre>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-[var(--color-muted)]">
                <svg
                  className="w-16 h-16 mb-4 opacity-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <p className="text-sm">
                  Paste a contract and click Analyze to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-[var(--color-accent-light)]">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-2 list-decimal">$1</li>')
    .replace(
      /\|(.+)\|/g,
      (match) => {
        const cells = match
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim());
        if (cells.every((c) => /^[-:]+$/.test(c))) return "";
        return `<div class="grid grid-cols-3 gap-2 py-1.5 px-2 border-b border-[var(--color-border)] text-sm">${cells.map((c) => `<span>${c}</span>`).join("")}</div>`;
      }
    )
    .replace(/\n/g, "<br/>");
}
