import PageShell from "@/components/layout/PageShell";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import BarList from "@/components/charts/BarList";
import { methodology } from "@/data/methodology";
import { predictors, categoryColor, ahpConsistencyRatio } from "@/data/variables";

/** Methodology: the six-stage GeoAI workflow and the weighted input variables. */
export default function Methodology() {
  return (
    <PageShell>
      <SectionTitle
        eyebrow="Methodology"
        title="A Six-Stage GeoAI Workflow"
        subtitle="From Land Cover Classification to Infrastructure Siting"
      />

      {/* Pipeline stages */}
      <div className="space-y-3">
        {methodology.map((s, i) => (
          <GlassCard index={i} key={s.step} className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex items-center gap-3 md:w-64 md:shrink-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 font-mono text-lg font-semibold text-primary">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-primary">{s.title}</h3>
                  {s.model && <p className="font-mono text-[11px] text-secondary">{s.model}</p>}
                </div>
              </div>
              <div className="flex-1">
                <p className="prose-measure text-[16px] leading-[1.65] text-ink-muted">{s.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.outputs.map((o) => (
                    <Badge key={o} tone="neutral">
                      {o}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Input variables and AHP weights */}
      <div className="section-gap">
        <h3 className="mb-1 font-display text-xl font-semibold text-ink-primary">Input Variables and AHP Weights</h3>
        <p className="mb-4 text-sm text-ink-muted">
          Eleven predictors were weighted by an Analytical Hierarchy Process to build the water-stress index. Weights
          sum to 100% at a consistency ratio of {ahpConsistencyRatio}.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <GlassCard hover className="card-interactive p-6 lg:col-span-2">
            <BarList
              items={predictors.map((p) => ({
                label: p.name,
                value: p.weight,
                color: categoryColor[p.category],
                note: p.note,
              }))}
              format={(v) => `${v.toFixed(2)}%`}
            />
          </GlassCard>
          <div className="space-y-4">
            <GlassCard className="card-interactive p-5">
              <p className="eyebrow mb-2">Consistency</p>
              <p className="font-mono text-3xl font-semibold text-secondary">CR = {ahpConsistencyRatio}</p>
              <p className="mt-1 text-[13.5px] text-ink-muted">Well within the acceptable 0.10 threshold (Saaty).</p>
            </GlassCard>
            <GlassCard className="card-interactive p-5">
              <p className="eyebrow mb-3">Variable categories</p>
              <div className="space-y-2">
                {Object.entries(categoryColor).map(([cat, col]) => (
                  <div key={cat} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="h-3 w-3 rounded-sm" style={{ background: col }} />
                    {cat}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
