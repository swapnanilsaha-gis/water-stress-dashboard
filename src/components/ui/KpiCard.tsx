import type { IconType } from "react-icons";
import GlassCard from "./GlassCard";
import StatCounter from "./StatCounter";
import type { Kpi } from "@/types";

const toneRing: Record<NonNullable<Kpi["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  low: "text-stress-low",
  moderate: "text-stress-moderate",
  high: "text-stress-high",
};

interface KpiCardProps extends Kpi {
  icon?: IconType;
  index?: number;
}

/** A single headline statistic. The number counts up when scrolled into view. */
export default function KpiCard({
  value,
  suffix,
  prefix,
  label,
  sublabel,
  decimals = 0,
  tone = "primary",
  icon: Icon,
  index,
}: KpiCardProps) {
  return (
    <GlassCard hover index={index} className="group p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`tnum text-[2rem] font-bold leading-tight tracking-tight ${toneRing[tone]}`}>
            <StatCounter value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
          </p>
          <p className="mt-1.5 text-[15px] font-semibold text-ink-primary">{label}</p>
          {sublabel && <p className="mt-1 text-[13.5px] leading-snug text-ink-muted">{sublabel}</p>}
        </div>
        {Icon && (
          <span
            className={`shrink-0 rounded-xl bg-white/5 p-2.5 transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105 ${toneRing[tone]}`}
          >
            <Icon size={20} />
          </span>
        )}
      </div>
    </GlassCard>
  );
}
