import { Link } from "react-router-dom";
import { MdMenu, MdOutlineFileDownload } from "react-icons/md";
import { TbDropletFilled } from "react-icons/tb";
import { meta } from "@/data/metadata";

interface NavbarProps {
  onMenuClick: () => void;
}

/**
 * Sticky top bar. Left: mobile menu toggle + brand. Right: download dissertation.
 * Stays visible across all dashboard routes.
 */
export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-abyss/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-ink-muted hover:bg-white/5 lg:hidden"
            aria-label="Open navigation menu"
          >
            <MdMenu size={22} />
          </button>

          <Link to="/home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent-deep text-abyss">
              <TbDropletFilled size={20} />
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-sm font-semibold leading-tight text-ink-primary">
                Bengaluru Water Stress
              </span>
              <span className="block font-mono text-[10px] text-ink-faint">
                GeoAI Prediction · BBMP
              </span>
            </span>
          </Link>
        </div>

        <a
          href={meta.dissertationPdf}
          download
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-hairline px-3.5 py-2 text-sm text-ink-primary transition-colors hover:border-primary/50 hover:bg-white/5"
        >
          <MdOutlineFileDownload size={18} />
          <span className="hidden sm:inline">Dissertation</span>
        </a>
      </div>
    </header>
  );
}
