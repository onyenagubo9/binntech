import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, role } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set("binntech_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  res.cookies.set("binntech_role", role, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
