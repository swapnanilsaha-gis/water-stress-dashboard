import {
  MdHome,
  MdOutlineMap,
  MdOutlineAccountTree,
  MdOutlineLayers,
  MdOutlineWaterDrop,
  MdOutlineSummarize,
} from "react-icons/md";
import type { NavItem } from "@/types";

/**
 * The dashboard's 8 sections, in narrative order. `path` values are the source
 * of truth for the router in App.tsx.
 */
export const navItems: NavItem[] = [
  { label: "Home", path: "/home", icon: MdHome, blurb: "Overview and headline findings" },
  { label: "Study Area", path: "/study-area", icon: MdOutlineMap, blurb: "BBMP, Bengaluru" },
  { label: "Methodology", path: "/methodology", icon: MdOutlineAccountTree, blurb: "Workflow and variables" },
  { label: "Prediction", path: "/prediction", icon: MdOutlineLayers, blurb: "2035 water-stress map" },
  { label: "Infrastructure", path: "/infrastructure", icon: MdOutlineWaterDrop, blurb: "Decentralised siting" },
  { label: "Conclusion", path: "/conclusion", icon: MdOutlineSummarize, blurb: "Synthesis and outlook" },
];

/** Landing-page call-to-action buttons (subset of the nav). */
export const heroCtas = [
  { label: "Explore Dashboard", path: "/home", primary: true },
  { label: "Methodology", path: "/methodology" },
  { label: "Prediction", path: "/prediction" },
  { label: "Infrastructure", path: "/infrastructure" },
];
