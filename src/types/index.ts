import type { IconType } from "react-icons";

/** A single figure/map/chart extracted from the dissertation. */
export interface Figure {
  id: string;
  /** Figure number as printed in the dissertation, e.g. "Fig. 24". */
  label: string;
  /** Original caption, preserved verbatim from the dissertation. */
  caption: string;
  /** Path under /public relative to site root. */
  src: string;
  category: "map" | "chart" | "diagram";
  /** Chapter/section this figure belongs to (for grouping). */
  section?: string;
}

/** A sidebar / route entry. */
export interface NavItem {
  label: string;
  path: string;
  icon: IconType;
  /** Short one-line descriptor shown in tooltips / landing cards. */
  blurb?: string;
}

/** A KPI headline number surfaced from the dissertation. */
export interface Kpi {
  value: number;
  /** Text appended after the animated number, e.g. "%", " mbgl". */
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  decimals?: number;
  tone?: "primary" | "secondary" | "low" | "moderate" | "high";
}

export type StressLevel = "Low" | "Moderate" | "High";
