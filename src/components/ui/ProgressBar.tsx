interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

export default function ProgressBar({ current, total, color = "#F5A623" }: ProgressBarProps) {
  return (
    <div className="flex gap-[3px] mb-3.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 rounded-sm transition-colors duration-300"
          style={{ background: i < current ? color : "#E8E6E3" }}
        />
      ))}
    </div>
  );
}
