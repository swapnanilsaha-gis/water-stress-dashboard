import PageShell from "@/components/layout/PageShell";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import BarList from "@/components/charts/BarList";
import ZoneMap from "@/components/map/ZoneMap";
import { infraClusters, infraLegend } from "@/data/predictions";

function infraPopup(p: any) {
  return `<div class="map-popup">
    <h4>${p.name ?? "Ward"}</h4>
    <table>
      <tr><td>Suited To</td><td>${p.infra ?? "-"}</td></tr>
      <tr><td>Predicted Stress</td><td>${p.dominant}</td></tr>
    </table>
  </div>`;
}

export default function Infrastructure() {
  return (
    <PageShell>
      <SectionTitle
        eyebrow="Infrastructure"
        title="Decentralised Infrastructure Siting"
        subtitle="K-Means Planning Zones for Decentralised Interventions"
      />

      <ZoneMap zonesUrl="/assets/geo/infra-zones.geojson" legend={infraLegend} legendTitle="Recommended Intervention" wardPopup={infraPopup} className="h-[58vh] sm:h-[64vh] lg:h-[72vh]" />

      <p className="prose-measure mt-3 text-[15px] leading-relaxed text-ink-muted">
        A K-Means clustering of the 2035 conditions splits the city into three planning zones, each matched to the
        intervention it is best suited for. Click any ward for its recommendation.
      </p>

      {/* Area share */}
      <GlassCard hover className="card-interactive mt-6 p-6">
        <h3 className="mb-3 font-display text-lg font-semibold text-ink-primary">Planning-Zone Area Share</h3>
        <BarList
          items={infraClusters.map((c) => ({ label: c.type, value: c.sharePct, color: c.color }))}
          max={50}
          format={(v) => `${v.toFixed(1)}%`}
        />
      </GlassCard>

      {/* The three interventions */}
      <div className="section-gap-sm grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {infraClusters.map((c, i) => (
          <GlassCard index={i} key={c.type} hover className="card-interactive p-6">
            <span className="mb-3 inline-block h-3 w-10 rounded" style={{ background: c.color }} />
            <h3 className="font-display text-base font-semibold text-ink-primary">{c.type}</h3>
            <p className="mt-1 font-mono text-2xl font-semibold" style={{ color: c.color }}>
              {c.sharePct}%
            </p>
            <p className="mt-1 text-xs text-ink-faint">{c.where}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.rationale}</p>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
