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
      className="sticky top-0 z-50 px-4 pt-4 rounded-b-2xl shadow-md"
      style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8960A 100%)" }}
    >
      <div className="relative flex items-center justify-center pb-3.5">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-0 w-8 h-8 rounded-lg bg-white/20 border-none text-white flex items-center justify-center text-base shrink-0"
          >
            ←
          </button>
        )}
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center text-xl shrink-0">
              {icon}
            </div>
          )}
          <div className="text-center">
            <div className="text-[17px] font-bold text-white leading-tight">{title}</div>
            {subtitle && (
              <div className="text-[11px] text-white/90 font-medium">{subtitle}</div>
            )}
          </div>
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
