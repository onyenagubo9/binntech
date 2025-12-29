import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, voice } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // ✅ Correct OpenAI TTS call (NO `format`)
    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: voice ?? "alloy",
      input: text,
    });

    // Convert to buffer
    const audioBuffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=binnai-tts.mp3",
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);

    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
