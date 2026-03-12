import { NextResponse } from "next/server";
import { submitFeedbackResponse } from "@/lib/airtable-write";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await submitFeedbackResponse({
      sessionCode: data.sessionCode,
      participantName: data.participantName,
      questionType: data.questionType,
      questionIndex: data.questionIndex,
      questionText: data.questionText,
      response: data.response,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback response error:", err);
    return NextResponse.json({ error: "Failed to submit response" }, { status: 500 });
  }
}
