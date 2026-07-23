import { MdOutlineMap, MdInfoOutline } from "react-icons/md";
import { TbMountain, TbTemperature, TbGridDots } from "react-icons/tb";
import PageShell from "@/components/layout/PageShell";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import MapView from "@/components/map/MapView";
import { studyArea } from "@/data/studyArea";

const facts = [
  { icon: MdOutlineMap, label: "Area", value: `${studyArea.areaKm2} km²`, sub: studyArea.name.split(" (")[0] },
  { icon: TbMountain, label: "Mean elevation", value: `${studyArea.elevationMeanM} m`, sub: studyArea.elevationRange },
  { icon: TbTemperature, label: "Mean temp.", value: `${studyArea.meanTempC} °C`, sub: studyArea.climate },
  { icon: TbGridDots, label: "Wards mapped", value: `${studyArea.wardCount}`, sub: "BBMP jurisdiction" },
];

/**
 * Study Area page, frames the BBMP jurisdiction and hosts the interactive
 * Web GIS. The map carries real ward boundaries and BWSSB infrastructure;
 * the surrounding text is drawn from the dissertation.
 */
export default function StudyArea() {
  return (
    <PageShell>
      <SectionTitle
        eyebrow="Study Area"
        title="Bengaluru, BBMP Jurisdiction"
        subtitle={`${studyArea.extentLat}, ${studyArea.extentLng} · ${studyArea.state}`}
      />

      {/* Quick facts */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {facts.map((f, i) => (
          <GlassCard index={i} key={f.label} hover className="p-4">
            <f.icon className="mb-2 text-primary" size={20} />
            <p className="font-mono text-xl font-semibold text-ink-primary">{f.value}</p>
            <p className="text-sm text-ink-primary">{f.label}</p>
            <p className="text-[13.5px] text-ink-faint">{f.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Interactive map */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone="primary">Interactive</Badge>
        <Badge tone="neutral">225 wards</Badge>
        <Badge tone="high">7,438 borewells</Badge>
        <Badge tone="moderate">30 pumping stations</Badge>
        <Badge tone="secondary">Pipeline network</Badge>
      </div>

      <MapView className="h-[58vh] sm:h-[66vh] lg:h-[74vh]" />

      <GlassCard className="mt-4 flex gap-3 p-4">
        <MdInfoOutline className="mt-0.5 shrink-0 text-primary" size={18} />
        <p className="prose-measure text-[16px] leading-[1.65] text-ink-muted">
          Wards are shaded by <span className="text-ink-primary">2011-census ward population</span>, one of the
          study's eleven predictor variables (matching Figure 22). Click any ward for its census profile, toggle the
          BWSSB borewell, pumping-station and pipeline layers from the panel, switch basemaps, or search a ward by
          name up top.
        </p>
      </GlassCard>

      {/* Study-area narrative */}
      <div className="section-gap-sm grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <h3 className="mb-2 font-display text-lg font-semibold text-ink-primary">Setting and Justification</h3>
          <p className="prose-measure text-[16px] leading-[1.65] text-ink-muted">{studyArea.description}</p>
        </GlassCard>
        <GlassCard className="card-interactive p-5">
          <h3 className="mb-3 font-display text-lg font-semibold text-ink-primary">Hydrological Context</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-ink-faint">Climate</dt>
              <dd className="text-ink-primary">{studyArea.climate}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Annual rainfall</dt>
              <dd className="text-ink-primary">{studyArea.rainfallRange}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Principal valleys</dt>
              <dd className="text-ink-primary">{studyArea.valleys.join(" · ")}</dd>
            </div>
          </dl>
        </GlassCard>
      </div>
    </PageShell>
  );
}
