"use client";

import { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ScoreScreen from "@/components/ui/ScoreScreen";
import type { PracticeScenario } from "@/lib/types";

interface Props {
  scenarios: PracticeScenario[];
  onBack: () => void;
}

export default function BoundariesPractice({ scenarios, onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const sc = scenarios[idx];
  if (!sc) return null;

  const pick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (sc.options[i]?.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= scenarios.length) { setDone(true); return; }
    setIdx((i) => i + 1);
    setSelected(null);
  };

  if (done) return <ScoreScreen score={score} total={scenarios.length} onBack={onBack} label="Boundaries Practice" />;

  return (
    <div className="p-4 pb-32">
      <ProgressBar current={idx + 1} total={scenarios.length} color="#E91E63" />
      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
        <div className="text-[13px] font-bold text-[#E91E63] mb-2">⚡ {sc.title}</div>
        <p className="text-[13px] text-[#444] leading-[1.65]">{sc.scenarioText}</p>
      </div>

      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">What do you do?</div>
      {sc.options.map((opt, i) => {
        let cls = "w-full py-3 px-3.5 rounded-[10px] border-[1.5px] bg-[#FAFAFA] text-left text-[13px] text-[#444] leading-[1.45] mb-2 block transition-all";
        if (selected !== null) {
          if (opt.correct) cls = cls.replace("border-[1.5px]", "border-[1.5px] !border-[#4CAF50] !bg-[#F1F8E9] !text-[#2E7D32]");
          else if (selected === i) cls = cls.replace("border-[1.5px]", "border-[1.5px] !border-[#f44336] !bg-[#FFEBEE] !text-[#C62828]");
        }
        return (
          <button key={i} className={cls} disabled={selected !== null} onClick={() => pick(i)} style={{
            borderColor: selected !== null && opt.correct ? "#4CAF50" : selected === i ? "#f44336" : "#E0E0E0",
            background: selected !== null && opt.correct ? "#F1F8E9" : selected === i ? "#FFEBEE" : "#FAFAFA",
            color: selected !== null && opt.correct ? "#2E7D32" : selected === i ? "#C62828" : "#444",
          }}>
            {opt.text}
          </button>
        );
      })}

      {selected !== null && (
        <>
          <div className={`rounded-[10px] p-3.5 text-[13px] leading-relaxed mt-3 ${
            sc.options[selected]?.correct
              ? "bg-[#F1F8E9] border-[1.5px] border-[#A5D6A7] text-[#2E7D32]"
              : "bg-[#FFEBEE] border-[1.5px] border-[#EF9A9A] text-[#C62828]"
          }`}>
            <div className="font-bold mb-1">
              {sc.options[selected]?.correct ? "✓ Right response" : "✗ Not the best response"}
            </div>
            {sc.options[selected]?.feedback}
          </div>
          {!sc.options[selected]?.correct && (
            <div className="rounded-[10px] p-3.5 text-[13px] leading-relaxed mt-2 bg-[#F1F8E9] border-[1.5px] border-[#A5D6A7] text-[#2E7D32]">
              <div className="font-bold mb-1">✓ The right response:</div>
              {sc.options.find((o) => o.correct)?.feedback}
            </div>
          )}
          <button onClick={next} className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold mt-3">
            {idx + 1 >= scenarios.length ? "See my score →" : "Next scenario →"}
          </button>
        </>
      )}
    </div>
  );
}
