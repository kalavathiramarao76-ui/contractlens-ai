export const maxDuration = 60;

export async function POST(request: Request) {
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
}
