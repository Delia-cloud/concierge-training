import { NextResponse } from "next/server";
import { submitSwemwbsResponse } from "@/lib/airtable-write";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await submitSwemwbsResponse({
      sessionCode: data.sessionCode,
      participantName: data.participantName,
      rawScore: data.rawScore,
      metricScore: data.metricScore,
      answers: data.answers,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SWEMWBS error:", err);
    return NextResponse.json({ error: "Failed to submit SWEMWBS" }, { status: 500 });
  }
}
