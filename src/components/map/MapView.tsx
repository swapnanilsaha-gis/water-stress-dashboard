import { useRef, useState, useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { basemaps, overlays, BBMP_CENTER, BBMP_BOUNDS, type OverlayId } from "@/data/mapLayers";
import WardsLayer from "./layers/WardsLayer";
import BorewellsLayer from "./layers/BorewellsLayer";
import { PointLayer, WaterlinesLayer } from "./layers/VectorLayers";
import LayerPanel from "./controls/LayerPanel";
import MapTools from "./controls/MapTools";
import WardSearch from "./controls/WardSearch";
import "./map.css";

interface MapViewProps {
  /** Tailwind height utility; the map fills its container. */
  className?: string;
  /** Override which overlays start visible (e.g. emphasise borewells on Prediction). */
  defaultLayers?: Partial<Record<OverlayId, boolean>>;
}

const initialVisibility = (override?: Partial<Record<OverlayId, boolean>>): Record<OverlayId, boolean> =>
  overlays.reduce(
    (acc, o) => ({ ...acc, [o.id]: override?.[o.id] ?? o.defaultOn }),
    {} as Record<OverlayId, boolean>
  );

/**
 * The interactive Web GIS. Real BBMP ward boundaries (choropleth by 2011
 * population), BWSSB borewells (clustered), pumping stations and the pipeline
 * network, with a compact, presentation-friendly control set.
 */
export default function MapView({ className = "h-[70vh]", defaultLayers }: MapViewProps) {
  const [basemapId, setBasemapId] = useState("dark");
  const [visibility, setVisibility] = useState<Record<OverlayId, boolean>>(() => initialVisibility(defaultLayers));
  const [popMeta, setPopMeta] = useState<{ breaks: number[]; min: number; max: number } | null>(null);
  const searchFn = useRef<((name: string) => boolean) | null>(null);

  const base = basemaps.find((b) => b.id === basemapId) ?? basemaps[0];
  const toggle = (id: OverlayId) => setVisibility((v) => ({ ...v, [id]: !v[id] }));
  const runSearch = useCallback((q: string) => searchFn.current?.(q) ?? false, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-hairline ${className}`}>
      <MapContainer
        center={BBMP_CENTER}
        zoom={11}
        bounds={BBMP_BOUNDS}
        zoomControl={true}
        className="h-full w-full bg-abyss"
      >
        <TileLayer key={base.id} url={base.url} attribution={base.attribution} maxZoom={base.maxZoom ?? 19} crossOrigin="" />

        <WardsLayer
          visible={visibility.wards}
          onMeta={setPopMeta}
          registerSearch={(fn) => (searchFn.current = fn)}
        />
        <BorewellsLayer visible={visibility.borewells} />
        <PointLayer visible={visibility.pumps} src="/assets/geo/pumping-stations.geojson" color="#FBBF24" label="Pumping Station" />
        <WaterlinesLayer visible={visibility.waterlines} src="/assets/geo/waterlines.geojson" />

        <MapTools />
        <WardSearch onSearch={runSearch} />
        <LayerPanel
          basemapId={basemapId}
          onBasemap={setBasemapId}
          visibility={visibility}
          onToggle={toggle}
          popMeta={popMeta}
        />
      </MapContainer>
    </div>
  );
}
