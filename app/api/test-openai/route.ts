import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function GET() {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "Say Hello BinnTech!" },
      ],
    });

    return NextResponse.json({
      message: result.choices[0].message.content,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
