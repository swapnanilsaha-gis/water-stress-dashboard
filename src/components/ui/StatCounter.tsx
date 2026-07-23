import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Animated number that counts up when scrolled into view. */
export default function StatCounter({ value, decimals = 0, prefix = "", suffix = "", className = "" }: StatCounterProps) {
  const { display, ref } = useCountUp(value, { decimals });
  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
