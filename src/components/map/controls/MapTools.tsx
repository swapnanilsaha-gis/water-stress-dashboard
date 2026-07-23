import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { MdHome, MdFullscreen, MdFullscreenExit, MdPhotoCamera } from "react-icons/md";
import ControlPane from "./ControlPane";
import { BBMP_BOUNDS } from "@/data/mapLayers";

/**
 * A deliberately compact toolbar: home (fit BBMP), fullscreen and PNG export -
 * the three actions useful in a defense. Plus a live coordinate readout, scale
 * bar and north arrow (standard GIS map furniture).
 */
export default function MapTools() {
  const map = useMap();
  const [isFull, setIsFull] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const shotter = useRef<SimpleMapScreenshoter | null>(null);

  useEffect(() => {
    shotter.current = new SimpleMapScreenshoter({ hidden: true }).addTo(map);
    L.control.scale({ position: "bottomleft", imperial: false }).addTo(map);
    const onMove = (e: L.LeafletMouseEvent) => setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    const onOut = () => setCoords(null);
    map.on("mousemove", onMove);
    map.on("mouseout", onOut);
    return () => {
      map.off("mousemove", onMove);
      map.off("mouseout", onOut);
    };
  }, [map]);

  const home = () => map.fitBounds(BBMP_BOUNDS, { padding: [20, 20] });

  const fullscreen = () => {
    const el = map.getContainer().parentElement ?? map.getContainer();
    if (!document.fullscreenElement) el.requestFullscreen?.().then(() => setIsFull(true));
    else document.exitFullscreen?.().then(() => setIsFull(false));
    setTimeout(() => map.invalidateSize(), 250);
  };

  const screenshot = () => {
    shotter.current
      ?.takeScreen("image")
      .then((image) => {
        const a = document.createElement("a");
        a.href = image as unknown as string;
        a.download = "bengaluru-water-stress-map.png";
        a.click();
      })
      .catch(() => {});
  };

  const btn = "glass grid h-10 w-10 place-items-center rounded-xl text-ink-primary hover:text-primary transition-colors";

  return (
    <>
      <ControlPane className="left-3 top-3 flex flex-col gap-1.5">
        <button className={btn} onClick={home} title="Home, Fit BBMP" aria-label="Home">
          <MdHome size={19} />
        </button>
        <button className={btn} onClick={fullscreen} title="Fullscreen" aria-label="Fullscreen">
          {isFull ? <MdFullscreenExit size={19} /> : <MdFullscreen size={19} />}
        </button>
        <button className={btn} onClick={screenshot} title="Export PNG" aria-label="Export PNG">
          <MdPhotoCamera size={18} />
        </button>
      </ControlPane>

      {/* North arrow */}
      <ControlPane className="right-3 bottom-16">
        <div className="glass grid h-11 w-11 place-items-center rounded-full">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-label="North arrow">
            <path d="M12 2 L15 12 L12 9 L9 12 Z" fill="#22D3EE" />
            <path d="M12 22 L9 12 L12 15 L15 12 Z" fill="#64748B" />
            <text x="12" y="7.5" textAnchor="middle" fontSize="4.5" fill="#E2E8F0" fontFamily="monospace">N</text>
          </svg>
        </div>
      </ControlPane>

      {/* Coordinate readout */}
      <ControlPane className="bottom-3 right-3">
        <div className="glass rounded-lg px-2.5 py-1 font-mono text-[11px] text-ink-muted">
          {coords ? `${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E` : "- move over map -"}
        </div>
      </ControlPane>
    </>
  );
}
