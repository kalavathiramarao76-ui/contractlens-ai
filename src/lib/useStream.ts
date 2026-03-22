import { useState, useCallback } from "react";

export function useStream() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async (prompt: string) => {
    setResult("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (res.status === 429) {
        const errorData = await res.json();
        if (errorData.error === "FREE_LIMIT_REACHED") {
          window.dispatchEvent(new CustomEvent("usage-changed", { detail: errorData.count }));
          return;
        }
      }

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setResult(accumulated);
            }
          } catch {
            // skip malformed JSON chunks
          }
        }
      }
    } catch (err) {
      console.error(err);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, generate, setResult };
}
