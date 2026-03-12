"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackLanding() {
  const router = useRouter();
  const [mode, setMode] = useState<"choose" | "join" | "create">("choose");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [facilitator, setFacilitator] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (code.length !== 6) { setError("Please enter a 6-character code"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback/session/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Session not found"); setLoading(false); return; }

      sessionStorage.setItem("ct_sessionCode", data.sessionCode);
      if (name) sessionStorage.setItem("ct_participantName", name);
      sessionStorage.setItem("ct_isFacilitator", "false");
      router.push(`/feedback/session/${data.sessionCode}`);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          location,
          facilitator,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to create session"); setLoading(false); return; }

      sessionStorage.setItem("ct_sessionCode", data.sessionCode);
      if (facilitator) sessionStorage.setItem("ct_participantName", facilitator);
      sessionStorage.setItem("ct_isFacilitator", "true");
      router.push(`/feedback/session/${data.sessionCode}`);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  if (mode === "join") {
    return (
      <div className="p-4 pb-32">
        <div className="bg-white rounded-xl border border-brand-border p-4 mb-4">
          <div className="text-[15px] font-bold text-brand-text mb-1">Join a Session</div>
          <p className="text-[13px] text-[#777] mb-4">Enter the code shared by your facilitator</p>

          <label className="text-[12px] font-semibold text-[#999] uppercase tracking-wider block mb-1">Session Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="ABC123"
            className="w-full py-3 px-3.5 rounded-xl border-[1.5px] border-[#E0E0E0] bg-[#FAFAFA] text-center text-lg font-bold tracking-[0.3em] mb-3 focus:outline-none focus:border-brand-orange"
          />

          <label className="text-[12px] font-semibold text-[#999] uppercase tracking-wider block mb-1">Your Name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full py-3 px-3.5 rounded-xl border-[1.5px] border-[#E0E0E0] bg-[#FAFAFA] text-[13px] mb-3 focus:outline-none focus:border-brand-orange"
          />

          {error && <div className="text-[12px] text-red-500 mb-2">{error}</div>}

          <button
            onClick={handleJoin}
            disabled={loading || code.length !== 6}
            className="w-full py-3.5 rounded-xl bg-brand-orange text-white text-sm font-semibold disabled:opacity-40"
          >
            {loading ? "Joining..." : "Join Session"}
          </button>
          <button onClick={() => { setMode("choose"); setError(""); }} className="w-full py-3 text-[13px] text-[#999] mt-2">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="p-4 pb-32">
        <div className="bg-white rounded-xl border border-brand-border p-4 mb-4">
          <div className="text-[15px] font-bold text-brand-text mb-1">Create a Session</div>
          <p className="text-[13px] text-[#777] mb-4">Start a new training feedback session</p>

          <label className="text-[12px] font-semibold text-[#999] uppercase tracking-wider block mb-1">Facilitator Name</label>
          <input
            type="text"
            value={facilitator}
            onChange={(e) => setFacilitator(e.target.value)}
            placeholder="Your name"
            className="w-full py-3 px-3.5 rounded-xl border-[1.5px] border-[#E0E0E0] bg-[#FAFAFA] text-[13px] mb-3 focus:outline-none focus:border-brand-orange"
          />

          <label className="text-[12px] font-semibold text-[#999] uppercase tracking-wider block mb-1">Location (optional)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Community Centre"
            className="w-full py-3 px-3.5 rounded-xl border-[1.5px] border-[#E0E0E0] bg-[#FAFAFA] text-[13px] mb-3 focus:outline-none focus:border-brand-orange"
          />

          {error && <div className="text-[12px] text-red-500 mb-2">{error}</div>}

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-orange text-white text-sm font-semibold disabled:opacity-40"
          >
            {loading ? "Creating..." : "Create Session"}
          </button>
          <button onClick={() => { setMode("choose"); setError(""); }} className="w-full py-3 text-[13px] text-[#999] mt-2">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-32">
      <div className="text-center py-6">
        <div className="text-3xl mb-2">💬</div>
        <div className="text-[17px] font-bold text-brand-text mb-1">Training Feedback</div>
        <p className="text-[13px] text-[#777]">Share your thoughts and help us improve</p>
      </div>

      <button
        onClick={() => setMode("join")}
        className="w-full bg-white rounded-xl border border-brand-border p-4 mb-3 text-left flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center text-lg">🔑</div>
        <div>
          <div className="text-[14px] font-semibold text-brand-text">Join a Session</div>
          <div className="text-[12px] text-[#999]">Enter a code from your facilitator</div>
        </div>
      </button>

      <button
        onClick={() => setMode("create")}
        className="w-full bg-white rounded-xl border border-brand-border p-4 mb-3 text-left flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-lg">➕</div>
        <div>
          <div className="text-[14px] font-semibold text-brand-text">Create a Session</div>
          <div className="text-[12px] text-[#999]">Start a new training feedback session</div>
        </div>
      </button>
    </div>
  );
}
