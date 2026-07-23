import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Lift + glow on hover. Use for cards that reward attention. */
  hover?: boolean;
  /** Stagger index for entrance animation. Omit to render immediately. */
  index?: number;
  as?: "div" | "article" | "section";
}

/**
 * The core surface of the dashboard: a translucent, blurred panel with a
 * hairline border. Fades and lifts into view, and responds to hover.
 */
export default function GlassCard({ children, className = "", hover = false, index }: GlassCardProps) {
  const animated = typeof index === "number";
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 14 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: true, margin: "-60px" } : undefined}
      transition={animated ? { duration: 0.45, delay: Math.min(index * 0.06, 0.4), ease: "easeOut" } : undefined}
      whileHover={hover ? { y: -4 } : undefined}
      className={`glass rounded-2xl transition-colors duration-300 ${
        hover ? "hover:border-primary/40 hover:shadow-glow-soft" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
