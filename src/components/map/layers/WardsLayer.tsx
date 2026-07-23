import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { popRamp } from "@/data/mapLayers";

interface WardsLayerProps {
  visible: boolean;
  /** Quantile breaks + range, read from the GeoJSON `meta` block. */
  onMeta?: (meta: { breaks: number[]; min: number; max: number }) => void;
  /** Registers a search-by-name handler for the search box. */
  registerSearch?: (fn: (name: string) => boolean) => void;
}

/** Colour a ward by population against quantile breaks. */
function colorFor(pop: number, breaks: number[]): string {
  for (let i = 0; i < breaks.length; i++) if (pop <= breaks[i]) return popRamp[i];
  return popRamp[popRamp.length - 1];
}

const fmt = (n: number) => n.toLocaleString("en-IN");

/**
 * Renders the 225 BBMP wards as an interactive choropleth of 2011-census
 * ward population, matching Figure 22 of the dissertation. Hover highlights a
 * ward; click opens a popup with the ward's real attributes. No stress values
 * are invented here.
 */
export default function WardsLayer({ visible, onMeta, registerSearch }: WardsLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);
  const breaksRef = useRef<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/assets/geo/bbmp-wards.geojson")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const breaks: number[] = data.meta?.popBreaks ?? [];
        breaksRef.current = breaks;
        onMeta?.({ breaks, min: data.meta?.popMin ?? 0, max: data.meta?.popMax ?? 0 });

        const layer = L.geoJSON(data, {
          style: (f) => ({
            fillColor: colorFor(f?.properties.population ?? 0, breaks),
            weight: 0.9,
            color: "#0B1220",
            fillOpacity: 0.78,
            opacity: 0.9,
          }),
          onEachFeature: (feature, lyr) => {
            const p = feature.properties;
            lyr.bindPopup(
              `<div class="map-popup">
                 <h4>${p.name ?? "Ward " + p.id}</h4>
                 <table>
                   <tr><td>Ward ID</td><td>${p.id}</td></tr>
                   <tr><td>Population (2011)</td><td>${fmt(p.population ?? 0)}</td></tr>
                   <tr><td>Area</td><td>${p.area?.toFixed(2)} km²</td></tr>
                   <tr><td>Assembly</td><td>${p.assembly_constituency_name ?? "-"}</td></tr>
                   <tr><td>Parliament</td><td>${p.parliamentary_constituency_name ?? "-"}</td></tr>
                 </table>
               </div>`,
              { className: "map-popup-wrapper", maxWidth: 260 }
            );
            lyr.on({
              mouseover: (e) => {
                const t = e.target as L.Path;
                t.setStyle({ weight: 2.2, color: "#F8FAFC", fillOpacity: 0.92 });
                t.bringToFront();
              },
              mouseout: (e) => layer.resetStyle(e.target as L.Path),
            });
          },
        });

        layerRef.current = layer;
        if (visible) layer.addTo(map);

        registerSearch?.((query: string) => {
          const q = query.trim().toLowerCase();
          let found: L.Layer | null = null;
          layer.eachLayer((l) => {
            const nm = (l as any).feature?.properties?.name?.toLowerCase() ?? "";
            if (!found && nm.includes(q)) found = l;
          });
          if (found) {
            const poly = found as L.Polygon;
            map.fitBounds(poly.getBounds(), { maxZoom: 14, padding: [40, 40] });
            poly.openPopup();
            return true;
          }
          return false;
        });
      });
    return () => {
      cancelled = true;
      if (layerRef.current) layerRef.current.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (visible) layer.addTo(map);
    else layer.remove();
  }, [visible, map]);

  return null;
}
