import { NextResponse } from "next/server";
import { validateSessionCode } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string" || code.length !== 6) {
      return NextResponse.json({ error: "Invalid code format" }, { status: 400 });
    }

    const valid = await validateSessionCode(code.toUpperCase());
    if (!valid) {
      return NextResponse.json({ error: "Session not found or not active" }, { status: 404 });
    }

    return NextResponse.json({ valid: true, sessionCode: code.toUpperCase() });
  } catch (err) {
    console.error("Join session error:", err);
    return NextResponse.json({ error: "Failed to validate session" }, { status: 500 });
  }
}
