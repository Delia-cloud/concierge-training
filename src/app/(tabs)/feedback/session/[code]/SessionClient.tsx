"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FeedbackConfig, Module } from "@/lib/types";

interface Props {
  sessionCode: string;
  config: FeedbackConfig[];
  modules: Module[];
}

const SUB_TABS = [
  { id: "ground-rules", label: "📋 Ground Rules", icon: "📋" },
  { id: "aims", label: "🎯 Aims", icon: "🎯" },
  { id: "toolkit", label: "🧰 Toolkit", icon: "🧰" },
  { id: "pulse", label: "💓 Pulse", icon: "💓" },
  { id: "gallery", label: "🖼️ Gallery", icon: "🖼️" },
  { id: "feedback", label: "💬 Feedback", icon: "💬" },
];

export default function SessionClient({ sessionCode, config, modules }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ground-rules");
  const [participantName, setParticipantName] = useState<string | null>(null);

  useEffect(() => {
    const name = sessionStorage.getItem("ct_participantName");
    setParticipantName(name);
  }, []);

  const getConfig = (section: string) => config.filter((c) => c.section === section);

  const leaveSession = () => {
    sessionStorage.removeItem("ct_sessionCode");
    sessionStorage.removeItem("ct_participantName");
    sessionStorage.removeItem("ct_isFacilitator");
    router.push("/feedback");
  };

  return (
    <div className="pb-32">
      {/* Session header */}
      <div className="bg-white border-b border-brand-border px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] text-[#999]">Session Code</div>
          <button onClick={leaveSession} className="text-[12px] text-[#f44336]">Leave</button>
        </div>
        <div className="text-xl font-bold tracking-[0.3em] text-brand-orange">{sessionCode}</div>
        {participantName && <div className="text-[12px] text-[#777] mt-0.5">Welcome, {participantName}</div>}
      </div>

      {/* Sub-tab bar */}
      <div className="flex overflow-x-auto gap-1 p-2 bg-[#F5F5F5] border-b border-brand-border">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 py-2 px-3 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-brand-orange text-white"
                : "bg-white text-[#777] border border-[#E0E0E0]"
            }`}
          >
            {tab.icon} {tab.label.split(" ").slice(1).join(" ")}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === "ground-rules" && <GroundRulesTab items={getConfig("ground_rules")} />}
        {activeTab === "aims" && <AimsTab items={getConfig("aims")} />}
        {activeTab === "toolkit" && <ToolkitTab items={getConfig("toolkit")} />}
        {activeTab === "pulse" && <PulseTab sessionCode={sessionCode} participantName={participantName} items={getConfig("pulse_checks")} />}
        {activeTab === "gallery" && <GalleryTab sessionCode={sessionCode} participantName={participantName} modules={modules} />}
        {activeTab === "feedback" && <FeedbackTab sessionCode={sessionCode} participantName={participantName} items={getConfig("your_feedback")} />}
      </div>
    </div>
  );
}

/* ---------- Ground Rules ---------- */
function GroundRulesTab({ items }: { items: FeedbackConfig[] }) {
  return (
    <div>
      <div className="text-[15px] font-bold text-brand-text mb-3">📋 Ground Rules</div>
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-brand-border p-3.5 mb-2 flex items-start gap-2.5">
            <span className="text-lg">{item.icon || "✓"}</span>
            <div>
              {item.title && <div className="text-[13px] font-semibold text-brand-text">{item.title}</div>}
              <div className="text-[13px] text-[#444] leading-[1.6]">{item.description}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl border border-brand-border p-4">
          <div className="space-y-2.5">
            {["Be respectful of each other", "Share honestly — there are no wrong answers",
              "What's shared here stays here", "Listen actively", "Put phones on silent"].map((rule, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#444]">
                <span className="text-[#4CAF50]">✓</span> {rule}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Aims ---------- */
function AimsTab({ items }: { items: FeedbackConfig[] }) {
  return (
    <div>
      <div className="text-[15px] font-bold text-brand-text mb-3">🎯 Session Aims</div>
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-brand-border p-3.5 mb-2 flex items-start gap-2.5">
            <span className="text-lg">{item.icon || "🎯"}</span>
            <div>
              {item.title && <div className="text-[13px] font-semibold text-brand-text">{item.title}</div>}
              <div className="text-[13px] text-[#444] leading-[1.6]">{item.description}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl border border-brand-border p-4">
          <div className="space-y-2.5">
            {["Understand the concierge role and responsibilities", "Learn practical skills for supporting people",
              "Build confidence in handling different situations", "Connect with fellow volunteers"].map((aim, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#444]">
                <span className="text-brand-orange">{i + 1}.</span> {aim}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Toolkit ---------- */
function ToolkitTab({ items }: { items: FeedbackConfig[] }) {
  return (
    <div>
      <div className="text-[15px] font-bold text-brand-text mb-3">🧰 Your Toolkit</div>
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-brand-border p-3.5 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{item.icon || "🔧"}</span>
              <span className="text-[13px] font-semibold text-brand-text">{item.title}</span>
            </div>
            <div className="text-[13px] text-[#444] leading-[1.6]">{item.description}</div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl border border-brand-border p-4 text-[13px] text-[#777]">
          Toolkit content will appear here once configured.
        </div>
      )}
    </div>
  );
}

/* ---------- Pulse Checks ---------- */
function PulseTab({
  sessionCode,
  participantName,
  items,
}: {
  sessionCode: string;
  participantName: string | null;
  items: FeedbackConfig[];
}) {
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());

  const questions = items.length > 0
    ? items.map((item) => item.description)
    : [
        "How confident do you feel about the concierge role right now?",
        "How clear are you on what a concierge does and doesn't do?",
        "How ready do you feel to support someone in need?",
      ];

  const emojis = ["😟", "😕", "😐", "🙂", "😊"];

  const submitPulse = async (qIdx: number, rating: number) => {
    if (submitted.has(qIdx)) return;
    try {
      await fetch("/api/feedback/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionCode,
          participantName,
          questionType: "pulse_check",
          questionIndex: qIdx,
          questionText: questions[qIdx],
          response: String(rating + 1),
        }),
      });
      setSubmitted((prev) => new Set(prev).add(qIdx));
    } catch { /* silent */ }
  };

  return (
    <div>
      <div className="text-[15px] font-bold text-brand-text mb-3">💓 Pulse Checks</div>
      <p className="text-[13px] text-[#777] mb-4">Tap an emoji to rate how you feel</p>
      {questions.map((q, qIdx) => (
        <div key={qIdx} className="bg-white rounded-xl border border-brand-border p-3.5 mb-3">
          <div className="text-[13px] text-[#444] mb-2.5">{q}</div>
          <div className="flex justify-between">
            {emojis.map((emoji, eIdx) => (
              <button
                key={eIdx}
                onClick={() => submitPulse(qIdx, eIdx)}
                disabled={submitted.has(qIdx)}
                className={`w-12 h-12 rounded-full text-xl transition-all ${
                  submitted.has(qIdx) ? "opacity-30" : "hover:bg-[#FFF3E0] active:scale-110"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          {submitted.has(qIdx) && (
            <div className="text-[11px] text-[#4CAF50] mt-1.5">✓ Submitted</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Gallery Walk ---------- */
function GalleryTab({
  sessionCode,
  participantName,
  modules,
}: {
  sessionCode: string;
  participantName: string | null;
  modules: Module[];
}) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [noteType, setNoteType] = useState<"liked" | "learned" | "apply">("liked");
  const [noteText, setNoteText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [votes, setVotes] = useState<string[]>([]);

  const submitNote = async () => {
    if (!selectedModule || !noteText.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/feedback/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionCode,
          moduleId: selectedModule,
          noteType,
          noteText: noteText.trim(),
          participantName,
        }),
      });
      setSubmitted((prev) => [...prev, `${selectedModule}-${noteType}`]);
      setNoteText("");
    } catch { /* silent */ }
    setSubmitting(false);
  };

  const submitVote = async (moduleId: string) => {
    if (votes.includes(moduleId)) return;
    try {
      await fetch("/api/feedback/dotvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionCode, moduleId, participantName }),
      });
      setVotes((prev) => [...prev, moduleId]);
    } catch { /* silent */ }
  };

  const noteTypes = [
    { id: "liked" as const, label: "❤️ Liked", color: "#E91E63" },
    { id: "learned" as const, label: "💡 Learned", color: "#FF9800" },
    { id: "apply" as const, label: "🎯 Will Apply", color: "#4CAF50" },
  ];

  return (
    <div>
      <div className="text-[15px] font-bold text-brand-text mb-3">🖼️ Gallery Walk</div>

      {/* Module selection */}
      <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Choose a module</div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {modules.map((mod) => (
          <button
            key={mod.moduleId}
            onClick={() => setSelectedModule(mod.moduleId)}
            className={`py-2.5 px-3 rounded-xl text-[12px] font-medium border-[1.5px] transition-all text-left ${
              selectedModule === mod.moduleId
                ? "border-brand-orange bg-[#FFF3E0] text-brand-orange"
                : "border-[#E0E0E0] bg-white text-[#444]"
            }`}
          >
            {mod.icon} {mod.title}
          </button>
        ))}
      </div>

      {selectedModule && (
        <>
          {/* Note type tabs */}
          <div className="flex gap-1.5 mb-3">
            {noteTypes.map((nt) => (
              <button
                key={nt.id}
                onClick={() => setNoteType(nt.id)}
                className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                  noteType === nt.id
                    ? "text-white"
                    : "bg-white border border-[#E0E0E0] text-[#777]"
                }`}
                style={noteType === nt.id ? { background: nt.color } : {}}
              >
                {nt.label}
              </button>
            ))}
          </div>

          {/* Note input */}
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note..."
            rows={3}
            className="w-full p-3 rounded-xl border-[1.5px] border-[#E0E0E0] bg-white text-[13px] resize-none focus:outline-none focus:border-brand-orange mb-2"
          />
          <button
            onClick={submitNote}
            disabled={!noteText.trim() || submitting}
            className="w-full py-3 rounded-xl bg-brand-orange text-white text-[13px] font-semibold disabled:opacity-40 mb-2"
          >
            {submitting ? "Saving..." : "Add Note"}
          </button>
          {submitted.length > 0 && (
            <div className="text-[11px] text-[#4CAF50] mb-3">✓ {submitted.length} note(s) submitted</div>
          )}
        </>
      )}

      {/* Dot voting */}
      <div className="mt-4">
        <div className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Dot Vote — most useful module</div>
        <div className="grid grid-cols-3 gap-2">
          {modules.map((mod) => (
            <button
              key={mod.moduleId}
              onClick={() => submitVote(mod.moduleId)}
              disabled={votes.includes(mod.moduleId)}
              className={`py-3 px-2 rounded-xl border-[1.5px] text-center transition-all ${
                votes.includes(mod.moduleId)
                  ? "border-[#4CAF50] bg-[#F1F8E9]"
                  : "border-[#E0E0E0] bg-white"
              }`}
            >
              <div className="text-xl mb-1">{mod.icon}</div>
              <div className="text-[10px] text-[#444] font-medium">{mod.title}</div>
              {votes.includes(mod.moduleId) && <div className="text-[10px] text-[#4CAF50] mt-0.5">✓ Voted</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Your Feedback ---------- */
function FeedbackTab({
  sessionCode,
  participantName,
  items,
}: {
  sessionCode: string;
  participantName: string | null;
  items: FeedbackConfig[];
}) {
  const questions = items.length > 0
    ? items.map((item) => item.description)
    : [
        "What was the most valuable thing you learned today?",
        "What would you like more time on?",
        "Any suggestions for improving this training?",
      ];

  const [answers, setAnswers] = useState<string[]>(questions.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await Promise.all(
        questions.map((q, i) =>
          answers[i].trim()
            ? fetch("/api/feedback/response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sessionCode,
                  participantName,
                  questionType: "open_feedback",
                  questionIndex: i,
                  questionText: q,
                  response: answers[i].trim(),
                }),
              })
            : Promise.resolve()
        )
      );
      setSubmitted(true);
    } catch { /* silent */ }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">🎉</div>
        <div className="text-[15px] font-bold text-brand-text mb-1">Thank you!</div>
        <p className="text-[13px] text-[#777]">Your feedback has been submitted</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-[15px] font-bold text-brand-text mb-3">💬 Your Feedback</div>
      {questions.map((q, i) => (
        <div key={i} className="bg-white rounded-xl border border-brand-border p-3.5 mb-3">
          <div className="text-[13px] font-medium text-[#444] mb-2">{q}</div>
          <textarea
            value={answers[i]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[i] = e.target.value;
              setAnswers(newAnswers);
            }}
            placeholder="Type your answer..."
            rows={3}
            className="w-full p-3 rounded-lg border-[1.5px] border-[#E0E0E0] bg-[#FAFAFA] text-[13px] resize-none focus:outline-none focus:border-brand-orange"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={submitting || answers.every((a) => !a.trim())}
        className="w-full py-3.5 rounded-xl bg-brand-orange text-white text-sm font-semibold disabled:opacity-40"
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}
