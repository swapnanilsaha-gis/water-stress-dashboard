import { MdCheckCircle, MdWarningAmber, MdSensors, MdMemory, MdScience, MdPublic } from "react-icons/md";
import type { IconType } from "react-icons";
import PageShell from "@/components/layout/PageShell";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import StatCounter from "@/components/ui/StatCounter";
import { conclusionPoints, limitations, futureScope } from "@/data/content";

const futureIcons: IconType[] = [MdSensors, MdMemory, MdScience, MdPublic];

const summary = [
  { value: 87.97, suffix: "%", decimals: 2, label: "Best model accuracy", tone: "text-primary" },
  { value: 97.3, suffix: "%", decimals: 1, label: "Built-up area by 2035", tone: "text-stress-high" },
  { value: 25.32, suffix: "%", decimals: 2, label: "High-stress area, 2035", tone: "text-stress-high" },
  { value: 68, label: "High-priority wards", tone: "text-stress-moderate" },
];

/** Conclusion: synthesis, limitations and future scope. */
export default function Conclusion() {
  return (
    <PageShell>
      <SectionTitle
        eyebrow="Conclusion"
        title="Synthesis, Limitations and Future Scope"
        subtitle="Synthesis, Limitations and Future Scope"
      />

      {/* Quantitative summary */}
      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s, i) => (
          <GlassCard index={i} key={s.label} hover className="card-interactive p-5 text-center">
            <p className={`text-3xl font-semibold ${s.tone}`}>
              <StatCounter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
            </p>
            <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold text-ink-primary">Key Conclusions</h3>
          {conclusionPoints.map((c, i) => (
            <GlassCard index={i} key={i} hover className="card-interactive flex gap-3 p-4">
              <MdCheckCircle className="mt-0.5 shrink-0 text-secondary" size={18} />
              <p className="prose-measure text-[16px] leading-[1.65] text-ink-muted">{c}</p>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-lg font-semibold text-ink-primary">Limitations</h3>
          {limitations.map((l, i) => (
            <GlassCard index={i} key={i} hover className="card-interactive flex gap-3 p-4">
              <MdWarningAmber className="mt-0.5 shrink-0 text-stress-moderate" size={18} />
              <p className="prose-measure text-[16px] leading-[1.65] text-ink-muted">{l}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Future scope */}
      <div className="section-gap">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink-primary">Future Scope</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {futureScope.map((f, i) => {
            const Icon = futureIcons[i % futureIcons.length];
            return (
              <GlassCard key={f.title} hover className="card-interactive p-5">
                <span className="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </span>
                <h4 className="font-display text-base font-semibold text-ink-primary">{f.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
