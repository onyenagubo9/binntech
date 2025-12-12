import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {
          role: "user",
          content: `Generate clean, optimized ${language} code for: ${prompt}`,
        },
      ],
      temperature: 0.2,
    });

    const aiCode = response.choices[0].message?.content || "";

    return NextResponse.json({ code: aiCode });
  } catch (error) {
    console.error("AI Code Generator Error:", error);

    return NextResponse.json(
      { error: "Failed to generate code" },
      { status: 500 }
    );
  }
}
