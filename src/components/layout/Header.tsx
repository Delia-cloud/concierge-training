"use client";

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onBack?: () => void;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

export default function Header({
  title,
  subtitle,
  icon,
  onBack,
  tabs,
  activeTab,
  onTabChange,
}: HeaderProps) {
  return (
    <div
      className="sticky top-0 z-50 px-4 pt-3.5"
      style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8960A 100%)" }}
    >
      <div className="flex items-center gap-2.5 pb-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg bg-white/20 border-none text-white flex items-center justify-center text-base shrink-0"
          >
            ←
          </button>
        )}
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-white/25 flex items-center justify-center text-lg shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="text-[15px] font-bold text-white leading-tight">{title}</div>
          {subtitle && (
            <div className="text-[10px] text-white/80">{subtitle}</div>
          )}
        </div>
      </div>
      {tabs && tabs.length > 0 && (
        <div className="flex border-t border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex-1 py-2.5 bg-transparent border-none text-xs font-semibold transition-all
                ${activeTab === tab.id
                  ? "text-white border-b-[3px] border-b-white"
                  : "text-white/70 border-b-[3px] border-b-transparent"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
