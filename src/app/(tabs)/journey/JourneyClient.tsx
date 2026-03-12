"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import type { JourneyStage, Module } from "@/lib/types";

interface Props {
  stages: JourneyStage[];
  modules: Module[];
}

export default function JourneyClient({ stages, modules }: Props) {
  const moduleMap = Object.fromEntries(modules.map((m) => [m.moduleId, m]));

  return (
    <>
      <Header title="Concierge Training" subtitle="The Good Company People" icon="🎓" />
      <div className="p-4 pb-32">
        <h2 className="text-[21px] font-bold text-[#2C3E50] mb-1">Your Training Journey</h2>
        <p className="text-[13px] text-brand-text-light leading-relaxed mb-4">
          Follow the stages as you progress — or jump to any module in Practice at any time.
        </p>

        {stages.map((stage) => (
          <div
            key={stage.stageId}
            className="bg-white rounded-xl border border-brand-border p-3.5 mb-3"
          >
            <div className="flex items-start gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-[11px] bg-[#FFF8ED] border-[1.5px] border-[#F5D89A] flex items-center justify-center text-xl shrink-0">
                {stage.icon}
              </div>
              <div>
                <div className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">
                  {stage.title}
                </div>
                <div className="text-[15px] font-bold text-brand-text">{stage.subtitle}</div>
                <div className="text-xs text-[#777] leading-[1.45] mt-0.5">
                  {stage.description}
                </div>
              </div>
            </div>

            <div className="border-t border-[#F0EEEB] pt-2.5">
              {stage.moduleIds.map((mid) => {
                const m = moduleMap[mid];
                if (!m) return null;
                return (
                  <Link
                    key={mid}
                    href={`/practice/${mid}`}
                    className="flex items-center gap-2 py-2 w-full border-b border-[#F8F6F3] last:border-b-0 no-underline"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                      style={{ background: `${m.color}18` }}
                    >
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-[#333]">{m.title}</div>
                      <div className="text-[11px] text-[#999]">{m.description}</div>
                    </div>
                    <div className="text-xs text-[#bbb]">→</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
