"use client";

import { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ScoreScreen from "@/components/ui/ScoreScreen";
import type { PracticeScenario, Circle } from "@/lib/types";

interface Props {
  scenarios: PracticeScenario[];
  circles: Circle[];
  onBack: () => void;
}

export default function CirclesPractice({ scenarios, circles, onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const sc = scenarios[idx];
  if (!sc) return null;

  const pick = (id: number) => {
    if (selected !== null) return;
    setSelected(id);
    if (id === sc.correctAnswer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= scenarios.length) { setDone(true); return; }
    setIdx((i) => i + 1);
    setSelected(null);
  };

  if (done) return <ScoreScreen score={score} total={scenarios.length} onBack={onBack} label="Circles Practice" />;

  const correct = selected === sc.correctAnswer;

  return (
    <div className="p-4 pb-32">
      <ProgressBar current={idx + 1} total={scenarios.length} color="#4CAF50" />
      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
        <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1.5">
          Read the scenario
        </div>
        <p className="text-[13px] text-[#444] leading-[1.65] mb-2.5">{sc.scenarioText}</p>
        {sc.quote && (
          <div className="bg-[#FFF8ED] rounded-lg p-2.5 border-l-[3px] border-brand-orange">
            <p className="text-[13px] italic text-[#6B4C00]">{sc.quote}</p>
          </div>
        )}
      </div>

      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">
        Which Circle is this person in?
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3.5">
        {circles.map((c) => {
          const isAnswer = c.circleId === sc.correctAnswer;
          const isSelected = selected === c.circleId;
          let border = "1.5px solid #E0E0E0";
          let bg = "#FAFAFA";
          if (selected !== null) {
            if (isAnswer) { border = `2px solid ${c.color}`; bg = `${c.color}18`; }
            else if (isSelected) { border = "2px solid #f44336"; bg = "#FFEBEE"; }
          }
          return (
            <button
              key={c.circleId}
              onClick={() => pick(c.circleId)}
              disabled={selected !== null}
              className="p-2.5 rounded-[10px] text-left transition-all"
              style={{ border, background: bg }}
            >
              <div className="text-[11px] font-bold" style={{ color: selected !== null && isAnswer ? c.color : "#444" }}>
                {c.shortName}
              </div>
              <div className="text-[10px] text-brand-text-light mt-0.5 leading-[1.3]">{c.tagline}</div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          <div className={`rounded-[10px] p-3.5 text-[13px] leading-relaxed mt-3 ${
            correct
              ? "bg-[#F1F8E9] border-[1.5px] border-[#A5D6A7] text-[#2E7D32]"
              : "bg-[#FFEBEE] border-[1.5px] border-[#EF9A9A] text-[#C62828]"
          }`}>
            <div className="font-bold mb-1">
              {correct ? "✓ Correct" : `✗ That's ${circles.find((c) => c.circleId === sc.correctAnswer)?.name}`}
            </div>
            {sc.explanation}
          </div>
          <button
            onClick={next}
            className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold mt-3"
          >
            {idx + 1 >= scenarios.length ? "See my score →" : "Next scenario →"}
          </button>
        </>
      )}
    </div>
  );
}
