"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import type { RoleSection, Module } from "@/lib/types";

interface Props {
  sections: RoleSection[];
  modules: Module[];
}

export default function RoleClient({ sections }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <>
      <Header title="Concierge Training" subtitle="The Good Company People" icon="🎓" />
      <div className="p-4 pb-24">
        <h2 className="text-[21px] font-bold text-[#2C3E50] mb-1">The Concierge Role</h2>
        <p className="text-[13px] text-brand-text-light leading-relaxed mb-4">
          What defines the role, our values, and the key messages that guide everything we do.
        </p>

        {sections.map((s) => (
          <div key={s.sectionId}>
            <button
              onClick={() => toggle(s.sectionId)}
              className={`w-full rounded-xl px-3.5 py-3 text-left flex items-center gap-2.5 mb-2 transition-all ${
                openSection === s.sectionId
                  ? "bg-[#FFF8ED] border-[1.5px] border-brand-orange"
                  : "bg-white border border-brand-border"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0 transition-all ${
                  openSection === s.sectionId
                    ? "bg-brand-orange text-white"
                    : "bg-[#FFF8ED]"
                }`}
              >
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-brand-text">{s.title}</div>
                <div className="text-[11px] text-brand-text-light">{s.subtitle}</div>
              </div>
              <span
                className="text-sm text-[#ccc] transition-transform"
                style={{
                  transform: openSection === s.sectionId ? "rotate(180deg)" : "none",
                }}
              >
                ▾
              </span>
            </button>

            {openSection === s.sectionId && (
              <div className="mb-3">
                <RoleSectionContent section={s} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function RoleSectionContent({ section }: { section: RoleSection }) {
  const content = section.content as Record<string, unknown>;

  if (section.sectionId === "whatIs" || section.sectionId === "fromHost") {
    const paragraphs = content.paragraphs as string[];
    return (
      <div className="bg-white rounded-xl border border-brand-border p-3.5">
        {section.introText && (
          <p className="text-[13px] text-brand-text-mid leading-relaxed mb-2.5">
            {section.introText}
          </p>
        )}
        {paragraphs?.map((p, i) => (
          <p key={i} className="text-[13px] text-[#444] leading-[1.65] mb-2.5">
            {p}
          </p>
        ))}
        {section.keyLine && (
          <div className={section.sectionId === "whatIs" ? "principle-box mt-1.5" : "key-box"}>
            <p className={section.sectionId === "whatIs" ? "font-bold text-sm text-center" : "italic"}>
              {section.keyLine}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (section.sectionId === "isIsNot") {
    const rows = content.rows as { isNot: string; is: string }[];
    return (
      <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
        <table className="cmp-table">
          <thead>
            <tr>
              <th style={{ background: "#FFF8ED", color: "#6B4C00" }}>Concierge is NOT...</th>
              <th style={{ background: "#E8F5E9", color: "#1B5E20" }}>Concierge IS...</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((r, i) => (
              <tr key={i}>
                <td style={{ background: "#FFFDF8", color: "#C0392B" }}>{r.isNot}</td>
                <td style={{ background: "#F9FFF9", color: "#27AE60" }}>{r.is}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (section.sectionId === "doesDoesNot") {
    const rows = content.rows as { does: string; doesNot: string }[];
    return (
      <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
        <table className="cmp-table">
          <thead>
            <tr>
              <th style={{ background: "#E8F5E9", color: "#1B5E20" }}>Good Company Does...</th>
              <th style={{ background: "#FFF8ED", color: "#6B4C00" }}>Good Company Does Not...</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((r, i) => (
              <tr key={i}>
                <td style={{ background: "#F9FFF9" }}>{r.does}</td>
                <td style={{ background: "#FFFDF8" }}>{r.doesNot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (section.sectionId === "conciergeWay") {
    const rows = content.rows as { typical: string; concierge: string }[];
    return (
      <div>
        {section.introText && (
          <p className="text-[13px] text-brand-text-mid leading-relaxed mb-2.5">
            {section.introText}
          </p>
        )}
        <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
          <table className="cmp-table">
            <thead>
              <tr>
                <th style={{ background: "#FFF8ED", color: "#6B4C00" }}>Typical Approach</th>
                <th style={{ background: "#E8F5E9", color: "#1B5E20" }}>The Concierge Way</th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((r, i) => (
                <tr key={i}>
                  <td style={{ background: "#FFFDF8" }}>{r.typical}</td>
                  <td style={{ background: "#F9FFF9" }}>{r.concierge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (section.sectionId === "values") {
    const items = content.items as { value: string; meaning: string; color: string }[];
    return (
      <div>
        {section.introText && (
          <p className="text-[13px] text-brand-text-mid leading-relaxed mb-2.5">
            {section.introText}
          </p>
        )}
        {items?.map((v, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-brand-border p-3.5 mb-2"
            style={{ borderLeft: `3px solid ${v.color}` }}
          >
            <div className="text-sm font-bold mb-1" style={{ color: v.color }}>
              {v.value}
            </div>
            <p className="text-[13px] text-[#444] leading-[1.55]">{v.meaning}</p>
          </div>
        ))}
      </div>
    );
  }

  if (section.sectionId === "keyMessages") {
    const items = content.items as {
      num: number;
      message: string;
      practice: string;
      phrase: string;
    }[];
    return (
      <div>
        {section.introText && (
          <p className="text-[13px] text-brand-text-mid leading-relaxed mb-2.5">
            {section.introText}
          </p>
        )}
        {items?.map((m, i) => (
          <div key={i} className="bg-white rounded-xl border border-brand-border p-3.5 mb-2">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center text-[13px] font-bold shrink-0">
                {m.num}
              </div>
              <div className="text-sm font-bold text-[#2C3E50]">{m.message}</div>
            </div>
            <p className="text-xs text-brand-text-mid leading-[1.55] mb-2">{m.practice}</p>
            <div className="bg-[#FFF8ED] rounded-lg px-3 py-2 border-l-[3px] border-brand-orange">
              <span className="text-[13px] font-semibold text-[#6B4C00] italic">
                {m.phrase}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
