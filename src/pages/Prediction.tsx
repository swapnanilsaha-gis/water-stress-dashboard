import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import BarList from "@/components/charts/BarList";
import ZoneMap from "@/components/map/ZoneMap";
import { stressModels, stressLegend, stressShare2035, wardPriority } from "@/data/predictions";

function stressPopup(p: any) {
  return `<div class="map-popup">
    <h4>${p.name ?? "Ward"}</h4>
    <table>
      <tr><td>Dominant Class</td><td>${p.dominant} Stress</td></tr>
      <tr><td>High-Stress Area</td><td>${p.highPct}%</td></tr>
      <tr><td>Moderate</td><td>${p.modPct}%</td></tr>
      <tr><td>Low</td><td>${p.lowPct}%</td></tr>
    </table>
  </div>`;
}

export default function Prediction() {
  const [modelId, setModelId] = useState("xgb");
  const model = stressModels.find((m) => m.id === modelId)!;

  return (
    <PageShell>
      <SectionTitle
        eyebrow="Prediction"
        title="Predicted Urban Water Stress, 2035"
        subtitle="Machine Learning Stress Surfaces for 2035"
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl border border-hairline p-1">
          {stressModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setModelId(m.id)}
              className={`rounded-lg px-4 py-2 text-[15px] font-medium transition-all duration-250 ${
                modelId === m.id
                  ? "bg-primary/15 text-primary shadow-glow-soft"
                  : "text-ink-muted hover:bg-white/5 hover:text-ink-primary"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
        <Badge tone="primary">Accuracy {model.accuracy}%</Badge>
        <Badge tone="neutral">Kappa {model.kappa}</Badge>
      </div>

      <ZoneMap key={model.id} zonesUrl={model.zonesUrl} legend={stressLegend} legendTitle="Water Stress Level" wardPopup={stressPopup} className="h-[58vh] sm:h-[64vh] lg:h-[72vh]" />

      <p className="prose-measure mt-3 text-[15px] leading-relaxed text-ink-muted">
        {model.note} Toggle between models above, and click any ward to read its predicted profile.
      </p>

      <div className="section-gap-sm grid gap-4 lg:grid-cols-2">
        <GlassCard className="card-interactive p-6">
          <h3 className="mb-1 font-display text-lg font-semibold text-ink-primary">How the Models Performed</h3>
          <p className="prose-measure text-[16px] leading-[1.65] text-ink-muted">
            Both classifiers were trained on eleven weighted predictors. XGBoost was the stronger model, reaching{" "}
            <span className="text-ink-primary">87.97% overall accuracy</span> (Kappa 0.82) for 2035, against Random
            Forest at 85.08% (Kappa 0.78). The two produce spatially consistent patterns; XGBoost draws sharper
            high-stress boundaries. Confusion-matrix and ROC diagnostics from the study confirmed strong, balanced
            class separation, so they are summarised here rather than charted.
          </p>
        </GlassCard>
        <GlassCard className="card-interactive p-6">
          <h3 className="mb-3 font-display text-lg font-semibold text-ink-primary">2035 stress-class share</h3>
          <BarList
            items={stressShare2035.map((s) => ({ label: `${s.level} stress`, value: s.pct, color: s.color }))}
            max={60}
            format={(v) => `${v.toFixed(2)}%`}
          />
          <p className="mt-3 text-xs text-ink-faint">
            By 2035 the moderate band widens to just over half the city while high stress rises to about a quarter.
          </p>
        </GlassCard>
      </div>

      <div className="section-gap-sm grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GlassCard hover className="card-interactive p-6 lg:col-span-2">
          <h3 className="mb-1 font-display text-lg font-semibold text-ink-primary">Which Wards Are Most Stressed</h3>
          <p className="prose-measure mb-4 text-[16px] leading-[1.65] text-ink-muted">
            The high-stress corridor runs through the dense central, western and parts of the eastern city. Wards such
            as T. Dasarahalli, Nagavara, Rayapuram, Attiguppe, Hosakerehalli and Devaraj Urs Nagar fall almost entirely
            within the predicted high-stress zone. Click any ward on the map to see its exact predicted breakdown.
          </p>
          <BarList
            items={wardPriority.map((w) => ({ label: `${w.level} (${w.count} wards)`, value: w.pct, color: w.color }))}
            format={(v) => `${v.toFixed(1)}%`}
          />
        </GlassCard>
        <GlassCard className="card-interactive flex flex-col justify-center p-6 text-center">
          <p className="text-5xl font-semibold text-stress-high">68</p>
          <p className="mt-2 text-sm text-ink-primary">wards ranked High or Very-High priority</p>
          <p className="mt-1 text-[13.5px] text-ink-muted">out of 224, nearly a third of the city needing near-term intervention</p>
        </GlassCard>
      </div>
    </PageShell>
  );
}
