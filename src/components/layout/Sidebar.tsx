import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { navItems } from "@/data/navigation";

interface SidebarProps {
  /** Mobile drawer open state (ignored on desktop where sidebar is always shown). */
  open: boolean;
  onClose: () => void;
}

/**
 * Left navigation. On desktop it is a fixed rail; on mobile it slides in as a
 * drawer over a scrim. Active route is highlighted. Source of links: navItems.
 */
export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile scrim */}
      <div
        className={`fixed inset-0 z-30 bg-abyss/70 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed z-40 flex h-[100dvh] w-64 flex-col border-r border-hairline bg-surface/80 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between px-5 py-4 lg:hidden">
          <span className="font-display text-sm font-semibold text-ink-primary">Navigation</span>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-muted hover:bg-white/5" aria-label="Close menu">
            <MdClose size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-all duration-200 ${
                  isActive
                    ? "bg-primary/12 font-semibold text-primary shadow-glow-soft"
                    : "text-ink-muted hover:translate-x-0.5 hover:bg-white/5 hover:text-ink-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <item.icon
                    size={19}
                    className={`transition-colors ${isActive ? "text-primary" : "text-ink-faint group-hover:text-primary"}`}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-hairline px-5 py-3">
          <p className="font-mono text-[10px] text-ink-faint">GeoAI · 2025 To 2035</p>
        </div>
      </aside>
    </>
  );
}
