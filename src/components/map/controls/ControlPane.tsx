import { useEffect, useRef, type ReactNode } from "react";
import L from "leaflet";

/**
 * Wraps a floating map control so clicks/scrolls over it don't pan or zoom the
 * map underneath. Position is controlled by the `className` passed in.
 */
export default function ControlPane({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      L.DomEvent.disableClickPropagation(ref.current);
      L.DomEvent.disableScrollPropagation(ref.current);
    }
  }, []);
  return (
    <div ref={ref} className={`absolute z-[1000] ${className}`}>
      {children}
    </div>
  );
}
