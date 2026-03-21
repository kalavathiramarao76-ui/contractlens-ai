"use client";

import { useState, useEffect } from "react";

const steps = [
  {
    title: "Welcome to ContractLens",
    desc: "Your AI-powered legal assistant. Analyze contracts, spot risks, and understand complex clauses in seconds.",
    emoji: "shield",
  },
  {
    title: "Paste a Contract",
    desc: "Copy and paste any contract, agreement, or legal clause into the analyzer. Our AI reads every line for you.",
    emoji: "document",
  },
  {
    title: "Understand Risks",
    desc: "Get risk scores, red flag alerts, and plain-English explanations. Negotiate smarter with AI-backed insights.",
    emoji: "check",
  },
];

const icons: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  document: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  check: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  ),
};

export default function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("contractlens-onboarded");
    if (!seen) setVisible(true);
  }, []);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setConfetti(true);
      setTimeout(() => {
        localStorage.setItem("contractlens-onboarded", "true");
        setVisible(false);
      }, 1500);
    }
  };

  const skip = () => {
    localStorage.setItem("contractlens-onboarded", "true");
    setVisible(false);
  };

  if (!visible) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={skip} />

      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[101]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                backgroundColor: ["#f43f5e", "#fb7185", "#fda4af", "#10b981", "#fbbf24", "#818cf8"][i % 6],
                animation: `confetti-fall ${1.5 + Math.random() * 1.5}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card */}
      <div
        className="relative z-[102] max-w-md w-full mx-4 rounded-2xl border border-[var(--color-border)] p-8 text-center"
        style={{
          background: "rgba(var(--glass-rgb, 17,17,17), 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-rose-500" : i < step ? "w-4 bg-rose-500/40" : "w-4 bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-5 text-rose-400">
          {icons[current.emoji]}
        </div>

        <h2 className="text-xl font-bold mb-3 text-[var(--color-foreground)]">{current.title}</h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-8">{current.desc}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={skip}
            className="text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            Skip tour
          </button>
          <button
            onClick={next}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          >
            {step === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
