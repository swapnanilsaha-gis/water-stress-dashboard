import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface VectorLayerProps {
  visible: boolean;
  src: string;
}

/**
 * Generic point layer for small point sets (e.g. 30 pumping stations).
 * Rendered as labelled circle markers with popups.
 */
export function PointLayer({ visible, src, color, label }: VectorLayerProps & { color: string; label: string }) {
  const map = useMap();
  const ref = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    let cancelled = false;
    const group = L.layerGroup();
    ref.current = group;
    fetch(src)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        data.features.forEach((f: any) => {
          const [lng, lat] = f.geometry.coordinates;
          L.circleMarker([lat, lng], {
            radius: 6,
            fillColor: color,
            color: "#0a1520",
            weight: 1.5,
            fillOpacity: 0.95,
          })
            .bindPopup(`<div class="map-popup"><h4>${label}</h4>
               <p>${lat.toFixed(5)}, ${lng.toFixed(5)}</p></div>`)
            .addTo(group);
        });
        if (visible) group.addTo(map);
      });
    return () => {
      cancelled = true;
      ref.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    if (visible) g.addTo(map);
    else g.remove();
  }, [visible, map]);

  return null;
}

/** Water pipeline network (LineStrings). */
export function WaterlinesLayer({ visible, src }: VectorLayerProps) {
  const map = useMap();
  const ref = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        // Drawn as two passes: a dark casing, then the royal-blue line on top,
        // so the network stays legible over light and dark ward fills alike.
        const casing = L.geoJSON(data, {
          style: { color: "#0B1220", weight: 4.2, opacity: 0.55, lineJoin: "round", lineCap: "round" },
        });
        const line = L.geoJSON(data, {
          style: { color: "#1D4ED8", weight: 2.4, opacity: 1, lineJoin: "round", lineCap: "round" },
        });
        const layer = L.layerGroup([casing, line]) as unknown as L.GeoJSON;
        ref.current = layer;
        if (visible) layer.addTo(map);
      });
    return () => {
      cancelled = true;
      ref.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const l = ref.current;
    if (!l) return;
    if (visible) l.addTo(map);
    else l.remove();
  }, [visible, map]);

  return null;
}
