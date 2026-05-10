import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "./data";

interface SidebarProps {
  section: Section;
  sidebarOpen: boolean;
  onSectionChange: (s: Section) => void;
  onToggle: () => void;
}

export default function Sidebar({ section, sidebarOpen, onSectionChange, onToggle }: SidebarProps) {
  return (
    <aside
      className="flex flex-col flex-shrink-0 transition-all duration-300"
      style={{
        width: sidebarOpen ? 220 : 64,
        background: "hsl(20 10% 5%)",
        borderRight: "1px solid hsl(20 8% 13%)",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid hsl(20 8% 13%)" }}>
        <div
          className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "hsl(38 60% 65% / 0.15)", border: "1px solid hsl(38 60% 65% / 0.3)" }}
        >
          <span className="font-display text-gold text-sm font-semibold">М</span>
        </div>
        {sidebarOpen && (
          <div className="animate-fade-in overflow-hidden">
            <p className="font-display text-gold text-base leading-tight tracking-wide">Мемориал</p>
            <p className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>Управление</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`nav-item ${section === item.id ? "active" : ""}`}
            style={section === item.id ? { borderLeft: "2px solid hsl(38 60% 65%)", paddingLeft: "14px" } : {}}
          >
            <Icon name={item.icon} size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="animate-fade-in whitespace-nowrap">{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Toggle */}
      <div className="px-2 pb-4">
        <button onClick={onToggle} className="nav-item w-full justify-center">
          <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={16} />
        </button>
      </div>
    </aside>
  );
}
