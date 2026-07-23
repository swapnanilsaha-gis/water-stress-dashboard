import { motion } from "framer-motion";

export interface BarItem {
  label: string;
  value: number;
  color: string;
  note?: string;
}

interface BarListProps {
  items: BarItem[];
  /** Upper bound of the scale. Defaults to the largest value. */
  max?: number;
  format?: (v: number) => string;
}

/**
 * A lightweight horizontal bar chart. Bars grow into place when scrolled into
 * view and highlight on hover. No charting library needed.
 */
export default function BarList({ items, max, format = (v) => `${v}` }: BarListProps) {
  const scale = max ?? Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-3.5">
      {items.map((it, i) => (
        <div key={it.label} className="group">
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="text-[14.5px] font-medium text-ink-primary transition-colors group-hover:text-white">
              {it.label}
            </span>
            <span className="tnum shrink-0 text-[14.5px] font-semibold" style={{ color: it.color }}>
              {format(it.value)}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(100, (it.value / scale) * 100)}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full transition-all duration-300 group-hover:brightness-125"
              style={{ background: it.color }}
            />
          </div>
          {it.note && <p className="mt-1.5 text-[13px] leading-snug text-ink-faint">{it.note}</p>}
        </div>
      ))}
    </div>
  );
}
