"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "role", icon: "💛", label: "The Role", href: "/role" },
  { id: "journey", icon: "🗺️", label: "Journey", href: "/journey" },
  { id: "practice", icon: "🏋️", label: "Practice", href: "/practice" },
  { id: "feedback", icon: "📋", label: "Feedback", href: "/feedback" },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/practice") return pathname.startsWith("/practice");
    if (href === "/feedback") return pathname.startsWith("/feedback");
    return pathname === href;
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] sm:max-w-[540px] bg-white rounded-t-2xl flex py-2 pb-[max(10px,env(safe-area-inset-bottom))] z-50" style={{ boxShadow: "0 -2px 12px rgba(0,0,0,0.08)" }}>
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 no-underline
              ${active ? "" : "opacity-45"}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span
              className={`text-[10px] ${
                active
                  ? "font-bold text-brand-orange"
                  : "font-medium text-[#999]"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
