"use client";

import { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import type { DiscoveryStep } from "@/lib/types";

interface Props {
  steps: DiscoveryStep[];
  onBack: () => void;
}

export default function DiscoveryPractice({ steps, onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [exp, setExp] = useState({ why: false, jean: false });

  const step = steps[idx];
  const done = idx >= steps.length;

  const toggle = (k: "why" | "jean") => setExp((e) => ({ ...e, [k]: !e[k] }));
  const next = () => { setIdx((i) => i + 1); setExp({ why: false, jean: false }); };
  const prev = () => { setIdx((i) => Math.max(0, i - 1)); setExp({ why: false, jean: false }); };

  if (done) {
    return (
      <div className="p-4 pb-32 text-center pt-6">
        <div className="text-5xl mb-3">🤝</div>
        <div className="text-lg font-bold mb-2">Discovery complete</div>
        <div className="text-[13px] text-[#777] leading-relaxed mb-6 max-w-[280px] mx-auto">
          You&apos;ve walked through all 14 steps with Jean and David. Your first real Discovery will be with a mentor — you&apos;re not expected to do this alone.
        </div>
        <div className="tip-box text-left mb-4">
          <strong>The golden rule:</strong> You don&apos;t need to be perfect. You need to be present.
        </div>
        <button onClick={onBack} className="w-full max-w-[240px] py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-32">
      <ProgressBar current={step.stepNumber} total={14} color="#F5A623" />
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="w-11 h-11 rounded-xl bg-[#FFF8ED] border-[1.5px] border-[#F5D89A] flex items-center justify-center text-[22px] shrink-0">
          {step.icon}
        </div>
        <div>
          <div className="text-[11px] text-brand-orange font-bold uppercase tracking-wider">
            Step {step.stepNumber}
          </div>
          <div className="text-[17px] font-bold text-brand-text">{step.title}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-2">
        <p className="text-[13px] text-[#333] leading-[1.65]">{step.what}</p>
      </div>

      <button
        onClick={() => toggle("why")}
        className="w-full bg-[#EBF5FB] border-none rounded-[10px] px-3.5 py-2.5 text-left text-xs font-semibold text-[#1A3C5A] flex justify-between items-center mb-1.5"
      >
        <span>💡 Why this matters</span>
        <span>{exp.why ? "▲" : "▼"}</span>
      </button>
      {exp.why && (
        <div className="bg-[#EBF5FB] rounded-[10px] px-3 py-2.5 border border-[#AED6F1] text-xs text-[#1A3C5A] leading-relaxed mb-1.5">
          {step.why}
        </div>
      )}

      <button
        onClick={() => toggle("jean")}
        className="w-full bg-[#F0FFF4] border-none rounded-[10px] px-3.5 py-2.5 text-left text-xs font-semibold text-[#1E4D2B] flex justify-between items-center mb-2.5"
      >
        <span>👥 With Jean &amp; David</span>
        <span>{exp.jean ? "▲" : "▼"}</span>
      </button>
      {exp.jean && (
        <div className="bg-[#F0FFF4] rounded-[10px] px-3 py-2.5 border border-[#A9DFBF] text-xs text-[#1E4D2B] leading-relaxed mb-2.5">
          {step.jeanStory}
        </div>
      )}

      <div className="tip-box">
        <strong>Prompt:</strong> {step.tip}
      </div>

      <div className="flex gap-2 mt-4">
        {idx > 0 && (
          <button onClick={prev} className="flex-1 py-3 rounded-xl bg-white border-[1.5px] border-brand-border-light text-[13px] font-medium text-brand-text-mid">
            ← Back
          </button>
        )}
        <button onClick={next} className="flex-[2] py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold">
          {idx + 1 >= steps.length ? "Complete ✓" : `Next: ${steps[idx + 1]?.title} →`}
        </button>
      </div>
    </div>
  );
}
