import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Wraps every routed page with a consistent max width, responsive padding and
 * a subtle entrance animation.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-14"
    >
      {children}
    </motion.main>
  );
}
