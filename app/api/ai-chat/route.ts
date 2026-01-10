import OpenAI from "openai";

export const runtime = "edge"; // 🔥 REQUIRED FOR STREAMING

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const stream = await client.responses.stream({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are BinnAI, a senior software engineer. Respond clearly, step-by-step, using markdown.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (event.type === "response.output_text.delta") {
                controller.enqueue(
                  encoder.encode(event.delta)
                );
              }
            }
          } catch (err) {
            controller.enqueue(
              encoder.encode("\n\n❌ AI stream error.")
            );
          } finally {
            controller.close(); // 🔥 ALWAYS CLOSE
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      }
    );
  } catch (err) {
    return new Response("❌ AI failed to start.", { status: 500 });
  }
}
