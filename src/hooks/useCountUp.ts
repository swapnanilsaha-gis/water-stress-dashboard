import { useEffect, useRef, useState } from "react";

interface Options {
  duration?: number; // ms
  decimals?: number;
  /** Start only when the element scrolls into view. */
  startOnView?: boolean;
}

/**
 * Animates a numeric value from 0 to target with an ease-out curve.
 * Returns the current display value and a ref to attach to the element
 * (used when `startOnView` is true). Honors prefers-reduced-motion by
 * jumping straight to the final value.
 */
export function useCountUp(target: number, { duration = 1400, decimals = 0, startOnView = true }: Options = {}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setValue(target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    };

    if (!startOnView || !ref.current) {
      run();
      return;
    }

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, startOnView]);

  const display = value.toFixed(decimals);
  return { display, ref };
}
