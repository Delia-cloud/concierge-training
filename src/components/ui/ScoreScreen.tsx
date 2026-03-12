"use client";

interface ScoreScreenProps {
  score: number;
  total: number;
  label: string;
  onBack: () => void;
}

export default function ScoreScreen({ score, total, label, onBack }: ScoreScreenProps) {
  const pct = Math.round((score / total) * 100);
  const great = pct >= 80;

  return (
    <div className="p-4 pb-32">
      <div className="text-center pt-6 pb-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center flex-col mx-auto mb-4"
          style={{
            background: great ? "#F1F8E9" : "#FFF8ED",
            border: `3px solid ${great ? "#4CAF50" : "#F5A623"}`,
          }}
        >
          <div
            className="text-3xl font-bold"
            style={{ color: great ? "#2E7D32" : "#E8960A" }}
          >
            {score}/{total}
          </div>
          <div className="text-[11px] text-brand-text-light">correct</div>
        </div>
        <div className="text-lg font-bold text-brand-text mb-1.5">
          {great ? "Great work!" : "Good effort — keep practising"}
        </div>
        <div className="text-[13px] text-[#777] leading-relaxed max-w-[260px] mx-auto mb-6">
          {great
            ? "You're building solid knowledge. Come back any time."
            : "The scenarios are here whenever you want another go."}
        </div>
        <button
          onClick={onBack}
          className="w-full max-w-[240px] py-3.5 rounded-xl bg-brand-orange text-white border-none text-sm font-semibold"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
