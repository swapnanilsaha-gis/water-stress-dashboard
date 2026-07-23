import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import PageShell from "@/components/layout/PageShell";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import KpiCard from "@/components/ui/KpiCard";
import StatCounter from "@/components/ui/StatCounter";
import { meta } from "@/data/metadata";
import { headlineKpis, crisisFacts, abstractFull } from "@/data/kpis";

const quickLinks = [
  { to: "/methodology", label: "Methodology", desc: "The GeoAI workflow" },
  { to: "/study-area", label: "Study Area", desc: "BBMP Jurisdiction" },
  { to: "/prediction", label: "Prediction", desc: "2035 water-stress map" },
  { to: "/infrastructure", label: "Infrastructure", desc: "Decentralised siting" },
];

/** Home, the dashboard's overview: headline results, abstract and crisis context. */
export default function Home() {
  return (
    <PageShell>
      <SectionTitle
        eyebrow="Overview"
        title={
          <>
            Predictive Urban <span className="text-gradient">Water Stress</span>, {meta.years.baseline} to {meta.years.projection}
          </>
        }
        subtitle="A GeoAI Decision-Support Framework for Urban Water Stress"
      />

      {/* Headline KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {headlineKpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Abstract */}
      <div className="section-gap-sm grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GlassCard hover className="card-interactive p-6 lg:col-span-2">
          <h3 className="mb-3 font-display text-lg font-semibold text-ink-primary">Abstract</h3>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            {abstractFull.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </GlassCard>

        {/* Quick navigation */}
        <div className="space-y-3">
          {quickLinks.map((q) => (
            <Link key={q.to} to={q.to}>
              <GlassCard hover className="card-interactive flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-ink-primary">{q.label}</p>
                  <p className="text-xs text-ink-muted">{q.desc}</p>
                </div>
                <MdArrowForward className="text-primary" size={18} />
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Crisis context */}
      <div className="mt-8">
        <h3 className="mb-1 font-display text-lg font-semibold text-ink-primary">The Scale of the Crisis</h3>
        <p className="mb-4 text-sm text-ink-muted">
          Key indicators of Bengaluru's growing urban water stress.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {crisisFacts.map((f, i) => (
            <GlassCard index={i} key={f.label} hover className="card-interactive p-4">
              <p className={`text-2xl font-semibold ${f.tone === "high" ? "text-stress-high" : "text-stress-moderate"}`}>
                <StatCounter value={f.value} decimals={f.decimals ?? 0} suffix={f.suffix} />
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-muted">{f.label}</p>
              {f.sublabel && <p className="text-[11px] text-ink-faint">{f.sublabel}</p>}
            </GlassCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
