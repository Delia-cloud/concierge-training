"use client";

import { useState } from "react";
import ComparisonTable from "@/components/ui/ComparisonTable";
import type { LearnItem, ComparisonTable as CTType, Prompt, Takeaway, SelfAssessmentStatement } from "@/lib/types";

interface Props {
  learnContent: LearnItem[];
  tables: CTType[];
  prompts: Prompt[];
  takeaways: Takeaway[];
  selfAssessment: SelfAssessmentStatement[];
  color: string;
}

export default function LearnTab({ learnContent, tables, prompts, takeaways, selfAssessment, color }: Props) {
  const [ratings, setRatings] = useState<Record<number, number>>({});

  return (
    <div className="p-4 pb-32">
      {/* Key concepts */}
      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">
        Key concepts &amp; principles
      </div>
      {learnContent.map((c, i) => {
        const cls = c.type === "principle" ? "principle-box" : c.type === "key" ? "key-box" : "warn-box";
        return (
          <div key={i} className={`${cls} mb-2`}>
            <p>{c.text}</p>
          </div>
        );
      })}

      {/* Comparison tables */}
      {tables.map((t, i) => (
        <div key={i} className="mt-4">
          <ComparisonTable title={t.tableTitle} headers={t.headers} rows={t.rows} />
        </div>
      ))}

      {/* Prompt phrases */}
      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mt-4 mb-2">
        Useful phrases
      </div>
      <div className="mb-2.5">
        {prompts.map((p, i) => (
          <div key={i} className="prompt-item">{p.phraseText}</div>
        ))}
      </div>

      {/* Key takeaways */}
      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mt-2 mb-2">
        Key takeaways
      </div>
      <div className="bg-white rounded-xl border border-brand-border px-3.5 py-1 mb-2.5">
        {takeaways.map((t, i) => (
          <div
            key={i}
            className="flex gap-2 py-2 text-[13px] text-[#333] leading-[1.45] items-start"
            style={{ borderBottom: i < takeaways.length - 1 ? "1px solid #F0EEEB" : "none" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0 mt-[6px]"
              style={{ background: color }}
            />
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      {/* Self-assessment */}
      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mt-2 mb-2">
        Self-assessment
      </div>
      <div className="text-xs text-brand-text-light mb-2">
        Rate your confidence: 1 = not yet confident · 5 = very confident
      </div>
      <div className="bg-white rounded-xl border border-brand-border px-3.5 py-1 mb-4">
        {selfAssessment.map((stmt, i) => (
          <div
            key={i}
            className="py-3"
            style={{ borderBottom: i < selfAssessment.length - 1 ? "1px solid #F0EEEB" : "none" }}
          >
            <div className="text-[13px] text-[#333] leading-[1.4] mb-2">
              I feel confident to… <strong>{stmt.statement}</strong>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => setRatings((r) => ({ ...r, [i]: v }))}
                  className={`flex-1 py-1.5 rounded-md border-[1.5px] text-[11px] font-semibold transition-all ${
                    ratings[i] === v
                      ? "border-brand-orange bg-[#FFF8ED] text-[#E8960A]"
                      : "border-brand-border-light bg-[#FAFAFA] text-[#999]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
