import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "Say Hello BinnTech!" },
      ],
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });

  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
