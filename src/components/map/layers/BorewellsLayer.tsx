import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";

interface BorewellsLayerProps {
  visible: boolean;
}

/**
 * 7,438 BWSSB borewell points. Rendered through a marker cluster group so the
 * browser stays responsive, clusters expand as you zoom in. Borewell density
 * is the study's #2 predictor of water stress (AHP weight 16.33%).
 */
export default function BorewellsLayer({ visible }: BorewellsLayerProps) {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 55,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (c) => {
        const n = c.getChildCount();
        const size = n < 50 ? 30 : n < 500 ? 38 : 46;
        return L.divIcon({
          html: `<div class="bw-cluster"><span>${n}</span></div>`,
          className: "bw-cluster-wrap",
          iconSize: L.point(size, size),
        });
      },
    });
    clusterRef.current = cluster;

    fetch("/assets/geo/borewells.geojson")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const dotIcon = L.divIcon({
          html: '<span class="bw-dot"></span>',
          className: "bw-dot-wrap",
          iconSize: [10, 10],
        });
        const markers = data.features.map((f: any) => {
          const [lng, lat] = f.geometry.coordinates;
          return L.marker([lat, lng], { icon: dotIcon }).bindPopup(
            `<div class="map-popup"><h4>BWSSB Borewell</h4>
             <p>${lat.toFixed(5)}, ${lng.toFixed(5)}</p></div>`
          );
        });
        cluster.addLayers(markers);
        if (visible) cluster.addTo(map);
      });

    return () => {
      cancelled = true;
      clusterRef.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    if (visible) cluster.addTo(map);
    else cluster.remove();
  }, [visible, map]);

  return null;
}
