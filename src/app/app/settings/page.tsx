"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const models = [
  { id: "", label: "Default (auto)" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini (fast)" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (budget)" },
];

const STORAGE_KEYS = {
  endpoint: "contractlens-api-endpoint",
  model: "contractlens-model",
};

export default function SettingsPage() {
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("");
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setEndpoint(localStorage.getItem(STORAGE_KEYS.endpoint) || "");
      setModel(localStorage.getItem(STORAGE_KEYS.model) || "");
    } catch {}
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.endpoint, endpoint);
      localStorage.setItem(STORAGE_KEYS.model, model);
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearData = () => {
    if (!confirm("Clear all ContractLens AI local data? This includes favorites and settings. This cannot be undone.")) return;
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith("contractlens"));
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {}
    setEndpoint("");
    setModel("");
    setCleared(true);
    setTimeout(() => {
      setCleared(false);
      window.location.reload();
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-[var(--color-muted)]">
          Configure your ContractLens AI experience.
        </p>
      </div>

      <div className="space-y-8 animate-fade-in delay-100">
        {/* Theme */}
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold mb-1">Appearance</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Switch between dark, light, and system themes.
          </p>
          <ThemeToggle />
        </section>

        {/* API Endpoint */}
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold mb-1">API Endpoint</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Custom OpenAI-compatible endpoint URL. Leave blank for default.
          </p>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="w-full p-3 rounded-xl text-sm font-mono"
          />
        </section>

        {/* Model */}
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold mb-1">AI Model</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Choose the model for contract analysis.
          </p>
          <div className="space-y-2">
            {models.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  model === m.id
                    ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5"
                    : "border-[var(--color-border)] bg-transparent hover:border-[var(--color-muted)]/30"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    model === m.id ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-[var(--color-border)]"
                  }`}
                >
                  {model === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-sm">{m.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Save */}
        <button
          onClick={save}
          className="px-6 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold transition-colors"
        >
          {saved ? "Saved!" : "Save Settings"}
        </button>

        {/* Danger Zone */}
        <section className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-1">Danger Zone</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Clear all locally stored data including favorites, onboarding, and settings.
          </p>
          <button
            onClick={clearData}
            className="px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
          >
            {cleared ? "Cleared!" : "Clear All Data"}
          </button>
        </section>
      </div>
    </div>
  );
}
