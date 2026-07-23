/**
 * The eleven predictor variables and their AHP-MCDA weights (Table 4/5).
 * Sorted by weight. Consistency Ratio = 0.05. Values are verbatim.
 */
export interface Predictor {
  name: string;
  weight: number; // percent
  category: "Hydrological" | "Infrastructural" | "Socio-economic" | "Climatic" | "Terrain";
  note: string;
}

export const predictors: Predictor[] = [
  { name: "Groundwater Depth", weight: 18.37, category: "Hydrological", note: "Depth to water table (mbgl); deeper means greater stress." },
  { name: "Borewell Density", weight: 16.33, category: "Infrastructural", note: "Borewells per km²; high density signals groundwater dependence." },
  { name: "Distance to Pumps", weight: 12.24, category: "Infrastructural", note: "Proximity to BWSSB pumping stations." },
  { name: "Built-Up Density", weight: 10.2, category: "Socio-economic", note: "Impervious surface share; reduces recharge." },
  { name: "Population", weight: 10.2, category: "Socio-economic", note: "Ward population (2011 census); demand pressure." },
  { name: "Distance to Waterbodies", weight: 8.16, category: "Hydrological", note: "Proximity to surface water / lakes." },
  { name: "Distance to Water Pipes", weight: 8.16, category: "Infrastructural", note: "Proximity to the piped supply network." },
  { name: "Soil Infiltration Index", weight: 6.12, category: "Terrain", note: "Capacity of soil to recharge groundwater." },
  { name: "Slope", weight: 4.08, category: "Terrain", note: "Steeper slopes shed runoff, lowering recharge." },
  { name: "Land Surface Temperature", weight: 4.08, category: "Climatic", note: "Thermal load; a proxy for urban heat and evaporative demand." },
  { name: "SPI", weight: 2.04, category: "Climatic", note: "Standardized Precipitation Index; rainfall anomaly." },
];

export const ahpConsistencyRatio = 0.05;

/** Colour per predictor category, reused in charts and legends. */
export const categoryColor: Record<Predictor["category"], string> = {
  Hydrological: "#22D3EE",
  Infrastructural: "#0EA5E9",
  "Socio-economic": "#FBBF24",
  Climatic: "#2DD4BF",
  Terrain: "#94A3B8",
};
