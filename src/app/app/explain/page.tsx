"use client";

import { useState } from "react";
import { useStream } from "@/lib/useStream";
import FavoriteButton from "@/components/FavoriteButton";
import ExportMenu from "@/components/ExportMenu";

const SAMPLE_CLAUSES = [
  {
    label: "IP Assignment",
    text: 'All work product, including any pre-existing tools, frameworks, or code libraries used by Contractor, shall become the exclusive property of Client upon creation, including all intellectual property rights therein.',
  },
  {
    label: "Non-Compete",
    text: 'Contractor agrees not to provide similar services to any of Client\'s competitors, direct or indirect, for a period of 2 years following termination of this agreement, within any geographic region where Client conducts business.',
  },
  {
    label: "Liability",
    text: 'Contractor shall indemnify, defend, and hold harmless Client from any and all claims, damages, losses, costs, and expenses, including reasonable attorney fees, arising from or related to Contractor\'s performance under this Agreement, without limitation.',
  },
];

export default function ExplainPage() {
  const [clause, setClause] = useState("");
  const { result, loading, generate } = useStream();

  const explain = () => {
    if (!clause.trim()) return;
    generate(`You are ContractLens AI, a legal clause explainer for freelancers.

Explain this contract clause in plain English. Be specific about what it means for a freelancer.

Format your response as:

## Plain English Translation
Explain what this clause actually means in simple, everyday language. No legal jargon.

## What This Means for You
Specifically how this affects you as a freelancer — your money, your work, your rights.

## Risk Level: [High/Medium/Low]
Why this risk level.

## Watch Out For
Specific dangers or traps hidden in this language.

## Better Alternative
Suggest fairer language that protects both parties. Provide the actual rewritten clause.

## Negotiation Tip
One concrete thing to say or do when negotiating this clause.

CLAUSE:
${clause}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Clause Explainer
        </h1>
        <p className="text-[var(--color-muted)]">
          Paste any legal clause. AI explains what it really means for you as a
          freelancer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4 animate-fade-in delay-100">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--color-muted)]">
              Clause Text
            </label>
          </div>
          <textarea
            value={clause}
            onChange={(e) => setClause(e.target.value)}
            placeholder="Paste a contract clause here..."
            className="w-full h-[250px] p-4 rounded-xl text-sm font-mono leading-relaxed"
          />

          {/* Sample clauses */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider font-medium">
              Try a sample clause
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_CLAUSES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setClause(s.text)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-xs text-[var(--color-muted)] hover:text-white hover:border-[var(--color-accent)] transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={explain}
            disabled={loading || !clause.trim()}
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
                Explaining...
              </>
            ) : (
              "Explain This Clause"
            )}
          </button>
        </div>

        {/* Output */}
        <div className="animate-fade-in delay-200">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 min-h-[400px] overflow-auto">
            {result ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <FavoriteButton
                    itemId="contractlens-explanation"
                    itemLabel="Clause Explanation"
                    size="sm"
                  />
                  <ExportMenu content={result} title="Clause Explanation" />
                  <span className="text-xs text-[var(--color-muted)]">Explanation</span>
                </div>
                <div
                  className="prose-contract whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(result) }}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-[var(--color-muted)]">
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
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <p className="text-sm">
                  Paste a clause and click Explain to get started
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
    .replace(/\n/g, "<br/>");
}
