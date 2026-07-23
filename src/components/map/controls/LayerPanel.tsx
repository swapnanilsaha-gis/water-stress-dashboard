import { useState } from "react";
import { MdLayers, MdClose, MdMap } from "react-icons/md";
import ControlPane from "./ControlPane";
import { basemaps, overlays, popRamp, type OverlayId } from "@/data/mapLayers";

interface LayerPanelProps {
  basemapId: string;
  onBasemap: (id: string) => void;
  visibility: Record<OverlayId, boolean>;
  onToggle: (id: OverlayId) => void;
  popMeta: { breaks: number[]; min: number; max: number } | null;
}

const fmt = (n: number) => n.toLocaleString("en-IN");

/**
 * Layer control: basemap switcher, overlay toggles and a legend for the
 * population choropleth. Kept deliberately simple for presentation.
 */
export default function LayerPanel({ basemapId, onBasemap, visibility, onToggle, popMeta }: LayerPanelProps) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <ControlPane className="right-3 top-3">
        <button
          onClick={() => setOpen(true)}
          className="glass grid h-10 w-10 place-items-center rounded-xl text-primary"
          aria-label="Open layers panel"
        >
          <MdLayers size={20} />
        </button>
      </ControlPane>
    );
  }

  return (
    <ControlPane className="right-3 top-3 w-[240px] max-w-[calc(100vw-1.5rem)] sm:w-[262px]">
      <div className="glass rounded-2xl p-3.5 text-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-sm font-semibold text-ink-primary">
            <MdLayers size={17} className="text-primary" /> Layers
          </span>
          <button onClick={() => setOpen(false)} className="text-ink-muted hover:text-ink-primary" aria-label="Collapse">
            <MdClose size={18} />
          </button>
        </div>

        {/* Basemap */}
        <p className="eyebrow mb-1.5 flex items-center gap-1">
          <MdMap size={12} /> Basemap
        </p>
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {basemaps.map((b) => (
            <button
              key={b.id}
              onClick={() => onBasemap(b.id)}
              className={`rounded-lg border px-1 py-1.5 text-[11px] transition-colors ${
                basemapId === b.id
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-hairline text-ink-muted hover:border-primary/30"
              }`}
            >
              <span className="mx-auto mb-1 block h-3 w-full rounded" style={{ background: b.swatch }} />
              {b.label}
            </button>
          ))}
        </div>

        {/* Overlays */}
        <p className="eyebrow mb-1.5">Data layers</p>
        <div className="space-y-2.5">
          {overlays.map((o) => (
            <label key={o.id} className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={visibility[o.id]}
                onChange={() => onToggle(o.id)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
              />
              <span>
                <span className="flex items-center gap-1.5 text-ink-primary">
                  <span className="inline-block h-3 w-3 shrink-0 rounded-[4px] ring-1 ring-white/20" style={{ background: o.color }} />
                  {o.label}
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-faint">{o.blurb}</span>
              </span>
            </label>
          ))}
        </div>

        {/* Legend for the population choropleth */}
        {visibility.wards && popMeta && (
          <div className="mt-3 border-t border-hairline pt-3">
            <p className="eyebrow mb-1.5">Ward population · 2011 census</p>
            <div className="flex h-3 overflow-hidden rounded" role="img" aria-label="Population color scale">
              {popRamp.map((c) => (
                <span key={c} className="flex-1" style={{ background: c }} />
              ))}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-faint">
              <span>{fmt(popMeta.min)}</span>
              <span>{fmt(popMeta.max)}</span>
            </div>
          </div>
        )}
      </div>
    </ControlPane>
  );
}
