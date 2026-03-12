import { NextResponse } from "next/server";
import { submitSelfAssessmentRating } from "@/lib/airtable-write";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await submitSelfAssessmentRating({
      sessionCode: data.sessionCode,
      moduleId: data.moduleId,
      statement: data.statement,
      rating: data.rating,
      participantName: data.participantName,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Self assessment error:", err);
    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 });
  }
}
