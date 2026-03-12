import { NextResponse } from "next/server";
import { createSession } from "@/lib/airtable-write";
import { generateUniqueCode } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { date, location, facilitator } = await req.json();
    const sessionCode = await generateUniqueCode();

    await createSession({
      sessionCode,
      date: date || new Date().toISOString().split("T")[0],
      location: location || "",
      facilitator: facilitator || "",
    });

    return NextResponse.json({ sessionCode });
  } catch (err) {
    console.error("Create session error:", err);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
