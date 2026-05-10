import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "./data";

interface TopBarProps {
  section: Section;
}

export default function TopBar({ section }: TopBarProps) {
  return (
    <div
      className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
      style={{ background: "hsl(20 10% 6%)", borderBottom: "1px solid hsl(20 8% 13%)" }}
    >
      <div>
        <h1 className="font-display text-2xl font-medium" style={{ color: "hsl(40 20% 88%)" }}>
          {NAV_ITEMS.find((n) => n.id === section)?.label}
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "hsl(40 10% 45%)" }}>
          10 мая 2026 г.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors"
          style={{ background: "hsl(38 60% 65%)", color: "hsl(20 10% 6%)", fontWeight: 500 }}
        >
          <Icon name="Plus" size={14} />
          Добавить
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
          style={{ background: "hsl(20 8% 16%)", color: "hsl(38 60% 65%)", border: "1px solid hsl(20 8% 20%)" }}
        >
          АД
        </div>
      </div>
    </div>
  );
}
