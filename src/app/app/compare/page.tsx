"use client";

import { useState, useEffect, useRef } from "react";
import { useStream } from "@/lib/useStream";
import FavoriteButton from "@/components/FavoriteButton";
import ExportMenu from "@/components/ExportMenu";
import { useToast } from "@/components/ToastProvider";

export default function ComparePage() {
  const [contractA, setContractA] = useState("");
  const [contractB, setContractB] = useState("");
  const { result, loading, generate } = useStream();
  const { addToast } = useToast();
  const prevLoading = useRef<boolean>(false);

  useEffect(() => {
    if (prevLoading.current && !loading) {
      if (result && !result.startsWith("An error")) {
        addToast({ title: "Contracts compared", variant: "success" });
      } else if (result.startsWith("An error")) {
        addToast({ title: "Comparison failed", variant: "error" });
      }
    }
    prevLoading.current = loading;
  }, [loading, result, addToast]);

  const compare = () => {
    if (!contractA.trim() || !contractB.trim()) return;
    generate(`You are ContractLens AI, an expert contract comparison tool for freelancers.

Compare these two contracts and provide a detailed comparison report:

## Overall Verdict
Which contract is better for the freelancer and why (2-3 sentences).

## Key Differences
For each significant difference found:

### [Area of Difference]
- **Contract A**: What it says
- **Contract B**: What it says
- **Better for You**: A or B, and why
- **Risk Impact**: How this difference affects your risk

## Side-by-Side Risk Scores
| Category | Contract A | Contract B |
|----------|-----------|-----------|
| Payment Terms | X/100 | X/100 |
| IP Ownership | X/100 | X/100 |
| Liability | X/100 | X/100 |
| Termination | X/100 | X/100 |
| Non-Compete | X/100 | X/100 |
| **Overall** | X/100 | X/100 |

## 🚩 Unique Red Flags
### Only in Contract A:
- ...
### Only in Contract B:
- ...

## Recommendation
Which to sign (or neither), and what to negotiate in the chosen contract.

CONTRACT A:
${contractA}

CONTRACT B:
${contractB}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Contract Comparison
        </h1>
        <p className="text-[var(--color-muted)]">
          Paste two contracts side-by-side. AI highlights differences and tells
          you which is safer.
        </p>
      </div>

      {/* Two contract inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 animate-fade-in delay-100">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-muted)]">
            Contract A
          </label>
          <textarea
            value={contractA}
            onChange={(e) => setContractA(e.target.value)}
            placeholder="Paste first contract..."
            aria-label="Contract A text input"
            className="w-full h-[300px] p-4 rounded-xl text-sm font-mono leading-relaxed"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-muted)]">
            Contract B
          </label>
          <textarea
            value={contractB}
            onChange={(e) => setContractB(e.target.value)}
            placeholder="Paste second contract..."
            aria-label="Contract B text input"
            className="w-full h-[300px] p-4 rounded-xl text-sm font-mono leading-relaxed"
          />
        </div>
      </div>

      <button
        onClick={compare}
        disabled={loading || !contractA.trim() || !contractB.trim()}
        aria-label={loading ? "Comparing contracts" : "Compare contracts"}
        className="w-full py-3.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2 mb-8 animate-fade-in delay-200"
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
            Comparing...
          </>
        ) : (
          "Compare Contracts"
        )}
      </button>

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <FavoriteButton
              itemId="contractlens-comparison"
              itemLabel="Contract Comparison"
              size="sm"
            />
            <ExportMenu content={result} title="Contract Comparison" />
            <span className="text-xs text-[var(--color-muted)]">Comparison Result</span>
          </div>
          <div
            className="prose-contract whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(result) }}
          />
        </div>
      )}
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
        const cells = match.split("|").filter(Boolean).map((c) => c.trim());
        if (cells.every((c) => /^[-:]+$/.test(c))) return "";
        return `<div class="grid grid-cols-3 gap-2 py-1.5 px-2 border-b border-[var(--color-border)] text-sm">${cells.map((c) => `<span>${c}</span>`).join("")}</div>`;
      }
    )
    .replace(/\n/g, "<br/>");
}
