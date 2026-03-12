import { NextResponse } from "next/server";
import { submitDotVote } from "@/lib/airtable-write";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await submitDotVote({
      sessionCode: data.sessionCode,
      moduleId: data.moduleId,
      participantName: data.participantName,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Dot vote error:", err);
    return NextResponse.json({ error: "Failed to submit vote" }, { status: 500 });
  }
}
