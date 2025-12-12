import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are BinnTech AI. Help users build applications step by step, generate code, and guide the development process." },
        { role: "user", content: message }
      ]
    });

    const aiReply = res.choices[0].message?.content || "";

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "AI error. Try again." });
  }
}
