"use client";

import { useState } from "react";
import type { FeedbackConfig } from "@/lib/types";

interface Props {
  noteModel?: FeedbackConfig;
  noteChecklist?: FeedbackConfig;
  onBack: () => void;
}

export default function NotesPractice({ noteModel, noteChecklist, onBack }: Props) {
  const [phase, setPhase] = useState<"write" | "compare">("write");
  const [note, setNote] = useState("");

  const scenario = `After visiting Jean, you need to write up your notes. Jean is 78, lives alone, and you visited her at home. She seemed cheerful but mentioned she hadn't been out in a week because of her hip. The kitchen looked tidy but the fridge had very little food. She talked about her daughter who lives in Canada and calls every Sunday. She asked if there was a local lunch club she could attend.`;

  const checklist = noteChecklist?.description
    ? noteChecklist.description.split(/[,;]|\n/).map((s) => s.trim()).filter(Boolean)
    : [
        "Date and time of visit",
        "Person's name and basic details",
        "How they seemed (mood, appearance)",
        "What they said (key concerns)",
        "What you observed (environment)",
        "Any actions needed or referrals",
        "Factual and non-judgemental language",
      ];

  if (phase === "compare") {
    return (
      <div className="p-4 pb-24">
        <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
          <div className="text-[13px] font-bold text-[#FF9800] mb-2">📝 Your Notes</div>
          <div className="bg-[#FFF8E1] rounded-lg p-3 text-[13px] text-[#444] leading-[1.65] whitespace-pre-wrap">
            {note || "(No notes written)"}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
          <div className="text-[13px] font-bold text-[#4CAF50] mb-2">✓ Model Notes</div>
          <div className="bg-[#F1F8E9] rounded-lg p-3 text-[13px] text-[#2E7D32] leading-[1.65] whitespace-pre-wrap">
            {noteModel?.description || "No model notes available."}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
          <div className="text-[13px] font-bold text-[#2196F3] mb-2">📋 Good Notes Checklist</div>
          <div className="space-y-1.5">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-[#444] leading-[1.5]">
                <span className="text-[#2196F3] mt-0.5">☐</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setPhase("write"); setNote(""); }}
          className="w-full py-3.5 rounded-xl bg-white border-[1.5px] border-brand-orange text-brand-orange text-sm font-semibold mb-2"
        >
          Try again
        </button>
        <button onClick={onBack} className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold">
          Back to Practice →
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
        <div className="text-[13px] font-bold text-[#FF9800] mb-2">📝 Scenario</div>
        <p className="text-[13px] text-[#444] leading-[1.65]">{scenario}</p>
      </div>

      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">
        Write your visit notes below
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here..."
        rows={8}
        className="w-full p-3.5 rounded-xl border-[1.5px] border-[#E0E0E0] bg-white text-[13px] text-[#444] leading-[1.65] resize-none focus:outline-none focus:border-brand-orange mb-3"
      />

      <button
        onClick={() => setPhase("compare")}
        disabled={note.trim().length < 10}
        className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold disabled:opacity-40"
      >
        Compare with model notes →
      </button>
    </div>
  );
}
