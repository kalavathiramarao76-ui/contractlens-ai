import { NextRequest } from "next/server";
import { checkAndIncrementUsage, isAuthenticated } from "@/lib/rate-limit";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    const authed = await isAuthenticated(ip);

    if (!authed) {
      const { allowed, count } = await checkAndIncrementUsage(ip);
      if (!allowed) {
        return Response.json(
          {
            error: "FREE_LIMIT_REACHED",
            message: `Free trial complete. You've used ${count} of 3 free generations. Sign in with Google to continue.`,
            count,
            remaining: 0,
          },
          { status: 429 }
        );
      }
    }

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "prompt is required" }, { status: 400 });
    }

    const res = await fetch("https://sai.sharedllm.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-oss:120b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4096,
        temperature: 0.3,
        stream: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json(
        { error: "LLM API error", detail: text },
        { status: 502 }
      );
    }

    // Stream the response
    return new Response(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
