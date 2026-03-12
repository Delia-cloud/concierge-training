"use client";

import { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ScoreScreen from "@/components/ui/ScoreScreen";
import { ABUSE_TYPES } from "@/lib/constants";
import type { PracticeScenario } from "@/lib/types";

interface Props {
  scenarios: PracticeScenario[];
  onBack: () => void;
}

export default function SafeguardingPractice({ scenarios, onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"type" | "action">("type");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const sc = scenarios[idx];
  if (!sc) return null;

  const pickType = (type: string) => {
    if (selectedType !== null) return;
    setSelectedType(type);
    if (type === sc.typeLabel) setScore((s) => s + 1);
  };

  const pickAction = (i: number) => {
    if (selectedAction !== null) return;
    setSelectedAction(i);
    if (sc.options[i]?.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (phase === "type") {
      setPhase("action");
      setSelectedType(null);
      return;
    }
    if (idx + 1 >= scenarios.length) { setDone(true); return; }
    setIdx((i) => i + 1);
    setPhase("type");
    setSelectedType(null);
    setSelectedAction(null);
  };

  if (done) {
    const total = scenarios.length * 2;
    return <ScoreScreen score={score} total={total} onBack={onBack} label="Safeguarding Practice" />;
  }

  return (
    <div className="p-4 pb-32">
      <ProgressBar current={idx + 1} total={scenarios.length} color="#9C27B0" />

      <div className="bg-white rounded-xl border border-brand-border p-3.5 mb-3.5">
        <div className="text-[13px] font-bold text-[#9C27B0] mb-2">🛡️ {sc.title}</div>
        {sc.quote && (
          <div className="bg-[#F3E5F9] rounded-lg p-3 mb-2 text-[13px] italic text-[#6A1B9A] leading-[1.65]">
            &ldquo;{sc.quote}&rdquo;
          </div>
        )}
        <p className="text-[13px] text-[#444] leading-[1.65]">{sc.scenarioText}</p>
        {sc.signs && (
          <div className="mt-2 text-[12px] text-[#777] leading-[1.6]">
            <span className="font-semibold">Signs noticed:</span> {sc.signs}
          </div>
        )}
      </div>

      {phase === "type" && (
        <>
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">
            What type of concern is this?
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ABUSE_TYPES.map((type) => {
              const isCorrect = type === sc.typeLabel;
              const showResult = selectedType !== null;
              return (
                <button
                  key={type}
                  disabled={selectedType !== null}
                  onClick={() => pickType(type)}
                  className="py-2.5 px-3 rounded-[10px] border-[1.5px] text-[12px] font-medium transition-all"
                  style={{
                    borderColor: showResult && isCorrect ? "#4CAF50" : showResult && selectedType === type ? "#f44336" : "#E0E0E0",
                    background: showResult && isCorrect ? "#F1F8E9" : showResult && selectedType === type ? "#FFEBEE" : "#FAFAFA",
                    color: showResult && isCorrect ? "#2E7D32" : showResult && selectedType === type ? "#C62828" : "#444",
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
          {selectedType !== null && (
            <>
              <div className={`rounded-[10px] p-3.5 text-[13px] leading-relaxed mt-3 ${
                selectedType === sc.typeLabel
                  ? "bg-[#F1F8E9] border-[1.5px] border-[#A5D6A7] text-[#2E7D32]"
                  : "bg-[#FFEBEE] border-[1.5px] border-[#EF9A9A] text-[#C62828]"
              }`}>
                <div className="font-bold mb-1">
                  {selectedType === sc.typeLabel ? "✓ Correct!" : `✗ This is ${sc.typeLabel}`}
                </div>
                {sc.explanation}
              </div>
              <button onClick={next} className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold mt-3">
                Now choose the right action →
              </button>
            </>
          )}
        </>
      )}

      {phase === "action" && (
        <>
          <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">
            What should you do?
          </div>
          {sc.options.map((opt, i) => (
            <button
              key={i}
              disabled={selectedAction !== null}
              onClick={() => pickAction(i)}
              className="w-full py-3 px-3.5 rounded-[10px] border-[1.5px] text-left text-[13px] leading-[1.45] mb-2 block transition-all"
              style={{
                borderColor: selectedAction !== null && opt.correct ? "#4CAF50" : selectedAction === i ? "#f44336" : "#E0E0E0",
                background: selectedAction !== null && opt.correct ? "#F1F8E9" : selectedAction === i ? "#FFEBEE" : "#FAFAFA",
                color: selectedAction !== null && opt.correct ? "#2E7D32" : selectedAction === i ? "#C62828" : "#444",
              }}
            >
              {opt.text}
            </button>
          ))}
          {selectedAction !== null && (
            <>
              <div className={`rounded-[10px] p-3.5 text-[13px] leading-relaxed mt-3 ${
                sc.options[selectedAction]?.correct
                  ? "bg-[#F1F8E9] border-[1.5px] border-[#A5D6A7] text-[#2E7D32]"
                  : "bg-[#FFEBEE] border-[1.5px] border-[#EF9A9A] text-[#C62828]"
              }`}>
                <div className="font-bold mb-1">
                  {sc.options[selectedAction]?.correct ? "✓ Right action" : "✗ Not the best action"}
                </div>
                {sc.options[selectedAction]?.feedback}
              </div>
              {!sc.options[selectedAction]?.correct && (
                <div className="rounded-[10px] p-3.5 text-[13px] leading-relaxed mt-2 bg-[#F1F8E9] border-[1.5px] border-[#A5D6A7] text-[#2E7D32]">
                  <div className="font-bold mb-1">✓ The right action:</div>
                  {sc.options.find((o) => o.correct)?.feedback}
                </div>
              )}
              <button onClick={next} className="w-full py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold mt-3">
                {idx + 1 >= scenarios.length ? "See my score →" : "Next scenario →"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
