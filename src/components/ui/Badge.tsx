import type { ReactNode } from "react";

type Tone = "primary" | "secondary" | "low" | "moderate" | "high" | "neutral";

const toneMap: Record<Tone, string> = {
  primary: "bg-primary/15 text-primary border-primary/30",
  secondary: "bg-secondary/15 text-secondary border-secondary/30",
  low: "bg-stress-low/15 text-stress-low border-stress-low/30",
  moderate: "bg-stress-moderate/15 text-stress-moderate border-stress-moderate/30",
  high: "bg-stress-high/15 text-stress-high border-stress-high/30",
  neutral: "bg-white/5 text-ink-muted border-hairline",
};

export default function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}
