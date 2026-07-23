import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

/**
 * Page heading block: eyebrow, title, optional subtitle. Establishes the
 * primary level of the visual hierarchy used across every page.
 */
export default function SectionTitle({ eyebrow, title, subtitle, align = "left" }: SectionTitleProps) {
  return (
    <header className={`mb-8 lg:mb-10 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="eyebrow mb-2.5 flex items-center gap-2">
          {align === "left" && <span className="inline-block h-px w-6 bg-primary/50" />}
          {eyebrow}
        </p>
      )}
      <h2 className="text-display-md font-semibold tracking-tight text-ink-primary">{title}</h2>
      {subtitle && (
        <p
          className={`mt-3.5 max-w-3xl text-[16.5px] leading-[1.65] text-ink-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
