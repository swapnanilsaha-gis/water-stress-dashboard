/**
 * Prediction (2035 water stress) and Infrastructure (decentralised siting) data.
 * Class percentages follow the dissertation (Table 7, XGBoost 2035). Model
 * accuracies are from Table 6. Vector zone layers are derived from the actual
 * classified rasters supplied by the author.
 */

export interface StressModel {
  id: "xgb" | "rf";
  name: string;
  zonesUrl: string;
  accuracy: number; // overall accuracy %
  kappa: number;
  note: string;
}

/** The two 2035 models, XGBoost first (best performer). */
export const stressModels: StressModel[] = [
  {
    id: "xgb",
    name: "XGBoost",
    zonesUrl: "/assets/geo/stress-xgb-2035.geojson",
    accuracy: 87.97,
    kappa: 0.8196,
    note: "Best-performing model. Sharper high-stress boundaries and the highest agreement with reference data.",
  },
  {
    id: "rf",
    name: "Random Forest",
    zonesUrl: "/assets/geo/stress-rf-2035.geojson",
    accuracy: 85.08,
    kappa: 0.7762,
    note: "Broadly consistent spatial pattern, with slightly smoother, more contiguous stress zones.",
  },
];

/** 2035 stress-class share of area (dissertation Table 7, XGBoost). */
export const stressShare2035 = [
  { level: "Low", pct: 24.37, color: "#15A34A" },
  { level: "Moderate", pct: 50.31, color: "#FACC15" },
  { level: "High", pct: 25.32, color: "#EA580C" },
];

/** Ward-priority ranking (dissertation, Figure 25). 224 wards total. */
export const wardPriority = [
  { level: "Very High", count: 19, pct: 8.5, color: "#DC2626" },
  { level: "High", count: 49, pct: 21.9, color: "#EA580C" },
  { level: "Moderate", count: 110, pct: 49.1, color: "#FACC15" },
  { level: "Low", count: 46, pct: 20.5, color: "#15A34A" },
];

/** Legend for the interactive stress map. */
export const stressLegend = [
  { label: "Low Stress", color: "#15A34A" },
  { label: "Moderate Stress", color: "#FACC15" },
  { label: "High Stress", color: "#EA580C" },
];

/**
 * Decentralised infrastructure clusters (K-Means, 3 groups). Area shares are
 * computed from the supplied planning-zones raster. Descriptions follow the
 * dissertation.
 */
export const infraClusters = [
  {
    type: "Recharge Wells",
    color: "#2563EB",
    sharePct: 30.03,
    where: "Eastern and north-eastern wards",
    rationale:
      "Deep groundwater tables, high borewell density and locally favourable soil infiltration make these wards suitable for artificial recharge that replenishes aquifers directly.",
  },
  {
    type: "Community Water Storage Tanks",
    color: "#DB2777",
    sharePct: 45.39,
    where: "Central and western wards (largest zone)",
    rationale:
      "Dense population, extensive impervious cover, the highest water stress and low infiltration call for above-ground storage that buffers supply and distributes equitably without relying on local recharge.",
  },
  {
    type: "Rainwater Harvesting Structures",
    color: "#14B8A6",
    sharePct: 24.58,
    where: "Northern, southern and south-western periphery",
    rationale:
      "Higher predicted rainfall, higher SPI, lower population density and moderate-to-high infiltration suit rooftop and surface rainwater capture as a low-cost supplementary supply.",
  },
];

/** Legend for the infrastructure map. */
export const infraLegend = infraClusters.map((c) => ({ label: c.type, color: c.color }));
