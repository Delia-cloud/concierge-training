"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import type { Module } from "@/lib/types";

interface Props {
  modules: Module[];
}

export default function PracticeClient({ modules }: Props) {
  return (
    <>
      <Header title="Concierge Training" subtitle="The Good Company People" icon="🎓" />
      <div className="p-4 pb-24">
        <h2 className="text-[21px] font-bold text-[#2C3E50] mb-1">Practice Modules</h2>
        <p className="text-[13px] text-brand-text-light leading-relaxed mb-4">
          All six modules, any time. Each has a Learn tab and a Practice tab.
        </p>

        {modules.map((m) => (
          <Link
            key={m.moduleId}
            href={`/practice/${m.moduleId}`}
            className="w-full bg-white rounded-xl border border-brand-border p-3.5 text-left flex items-center gap-3 mb-2 no-underline"
          >
            <div
              className="w-[42px] h-[42px] rounded-[11px] border-[1.5px] flex items-center justify-center text-xl shrink-0"
              style={{
                background: `${m.color}18`,
                borderColor: `${m.color}40`,
              }}
            >
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-brand-text mb-0.5">{m.title}</div>
              <div className="text-xs text-brand-text-light">{m.description}</div>
            </div>
            <div
              className="px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0"
              style={{ background: `${m.color}18`, color: m.color }}
            >
              {m.tag}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
