"use client";

import { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import { SWEMWBS_LABELS, SWEMWBS_CONV } from "@/lib/constants";
import type { SwemwbsQuestion } from "@/lib/types";

interface Props {
  questions: SwemwbsQuestion[];
  onBack: () => void;
}

export default function SwemwbsPractice({ questions, onBack }: Props) {
  const [phase, setPhase] = useState<"intro" | "questions" | "result">("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [qIdx, setQIdx] = useState(0);

  const rawScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const metricScore = SWEMWBS_CONV[rawScore] || null;

  const interpret = (m: number) => {
    if (m < 16) return { label: "Low wellbeing", color: "#f44336", note: "Prioritise support and regular check-ins." };
    if (m < 22) return { label: "Moderate wellbeing", color: "#FF9800", note: "Regular contact is important. Look for what's helping." };
    if (m < 29) return { label: "Good wellbeing", color: "#4CAF50", note: "Things are broadly positive. Focus on sustaining connections." };
    return { label: "High wellbeing", color: "#009688", note: "Strong baseline. Celebrate and keep building." };
  };

  if (phase === "intro") {
    return (
      <div className="p-4 pb-24">
        <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3">
          <div className="text-[15px] font-bold mb-2">Practise scoring SWEMWBS</div>
          <p className="text-[13px] text-brand-text-mid leading-[1.65] mb-2.5">
            Answer the seven statements for yourself — as you are today. At the end you&apos;ll see how to score, convert, and interpret a result.
          </p>
        </div>
        <div className="key-box mb-3.5">
          <p><strong>Introduce it like this:</strong> &quot;I&apos;d like to ask you a few short questions about how you&apos;ve been feeling over the past couple of weeks. There are no right or wrong answers.&quot;</p>
        </div>
        <button onClick={() => { setPhase("questions"); setQIdx(0); }} className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold">
          Start the seven statements →
        </button>
      </div>
    );
  }

  if (phase === "questions") {
    const q = questions[qIdx];
    const cur = answers[qIdx];
    return (
      <div className="p-4 pb-24">
        <ProgressBar current={qIdx + 1} total={7} color="#2196F3" />
        <div className="italic text-xs text-brand-text-light mb-3">Over the past two weeks...</div>
        <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-4">
          <div className="text-base font-semibold text-brand-text leading-[1.45]">{q?.statement}</div>
        </div>
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {SWEMWBS_LABELS.map((lbl, i) => (
            <button
              key={i}
              onClick={() => setAnswers((a) => ({ ...a, [qIdx]: i + 1 }))}
              className={`flex-1 min-w-[18%] py-2 px-1 rounded-lg border-[1.5px] text-[11px] font-medium text-center leading-[1.3] transition-all ${
                cur === i + 1
                  ? "border-brand-orange bg-[#FFF8ED] text-[#E8960A] font-bold"
                  : "border-brand-border-light bg-[#FAFAFA] text-[#666]"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {qIdx > 0 && (
            <button onClick={() => setQIdx((i) => i - 1)} className="flex-1 py-3 rounded-xl bg-white border-[1.5px] border-brand-border-light text-[13px] font-medium text-brand-text-mid">
              ← Back
            </button>
          )}
          <button
            disabled={cur === undefined}
            onClick={() => { if (qIdx + 1 >= 7) setPhase("result"); else setQIdx((i) => i + 1); }}
            className="flex-[2] py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold disabled:bg-[#D0C8C0] disabled:cursor-not-allowed"
          >
            {qIdx + 1 >= 7 ? "See my score →" : "Next →"}
          </button>
        </div>
      </div>
    );
  }

  // Result phase
  const interp = interpret(metricScore || 0);
  return (
    <div className="p-4 pb-24">
      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3">
        <div className="flex gap-4 items-center mb-4">
          <div className="flex-1 text-center">
            <div className="text-4xl font-bold text-brand-orange">{rawScore}</div>
            <div className="text-[11px] text-brand-text-light">Raw score (7–35)</div>
          </div>
          <div className="text-2xl text-[#ddd]">→</div>
          <div className="flex-1 text-center">
            <div className="text-4xl font-bold" style={{ color: interp.color }}>{metricScore?.toFixed(2) || "—"}</div>
            <div className="text-[11px] text-brand-text-light">Metric score</div>
          </div>
        </div>
        <div className="rounded-[10px] p-3 border-l-[3px]" style={{ background: `${interp.color}18`, borderColor: interp.color }}>
          <div className="text-[13px] font-bold mb-1" style={{ color: interp.color }}>{interp.label}</div>
          <div className="text-xs text-[#444] leading-relaxed">{interp.note}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3">
        <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2.5">Your answers</div>
        {questions.map((q, i) => (
          <div key={i} className="flex justify-between items-start py-1.5" style={{ borderBottom: i < 6 ? "1px solid #F0EEEB" : "none" }}>
            <div className="text-xs text-brand-text-mid leading-[1.4] flex-1 mr-2.5">{q.statement}</div>
            <div className="text-xs font-bold text-brand-orange shrink-0">
              {answers[i]} — {SWEMWBS_LABELS[(answers[i] || 1) - 1]}
            </div>
          </div>
        ))}
      </div>

      <div className="tip-box mb-4">
        <strong>Record:</strong> date · raw score · metric score · baseline or follow-up · any relevant context.
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setAnswers({}); setQIdx(0); setPhase("questions"); }} className="flex-1 py-3 rounded-xl bg-white border-[1.5px] border-brand-border-light text-[13px] font-medium text-brand-text-mid">
          Try again
        </button>
        <button onClick={onBack} className="flex-1 py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold">
          ← Back
        </button>
      </div>
    </div>
  );
}
