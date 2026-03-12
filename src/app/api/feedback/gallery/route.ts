import { NextResponse } from "next/server";
import { submitGalleryNote } from "@/lib/airtable-write";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await submitGalleryNote({
      sessionCode: data.sessionCode,
      moduleId: data.moduleId,
      noteType: data.noteType,
      noteText: data.noteText,
      participantName: data.participantName,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Gallery note error:", err);
    return NextResponse.json({ error: "Failed to submit gallery note" }, { status: 500 });
  }
}
