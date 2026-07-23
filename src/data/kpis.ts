import type { Kpi } from "@/types";

/** Full abstract, verbatim from the dissertation. */
export const abstractFull = [
  "Water Stress in Bengaluru has been a long-term issue that has significantly intensified in contemporary times, constituted by rapid urbanisation, climatic variability and unsustainable groundwater exploitation practices. Conventional methods to combat this issue often fail to capture the complex spatial interactions among environmental, hydrological and socio-economic factors which influence water availability. This study features a GeoAI-enabled framework to predict the spatial distribution of Bengaluru's water stress over a ten-year period and suggests decentralised infrastructural intervention approaches to mitigate the water scarcity issue within the BBMP region.",
  "The project integrates several geospatial datasets representing key determinants of urban water availability, Standardized Precipitation Index (SPI), Land Surface Temperature (LST), Land Use and Land Cover (LULC), Groundwater Depth, Borewell Density, Population and Built-Up Density, Slope, and proximity to existing water infrastructure such as surface water bodies, pumping stations and water pipelines.",
  "Predictive layers highlighting the spatial concentration of water stress within BBMP were developed for 2025 and 2035. Future predictor variables for 2035 were generated using a combination of machine learning and statistical forecasting techniques. These datasets trained Random Forest and XGBoost algorithms for predictive urban water stress mapping, followed by an unsupervised K-Means clustering algorithm to site decentralised water infrastructure locations across BBMP.",
];

/** Headline numbers surfaced as animated KPI cards on the Home page. */
export const headlineKpis: Kpi[] = [
  { value: 87.97, suffix: "%", decimals: 2, label: "Best model accuracy", sublabel: "XGBoost, 2035 prediction", tone: "primary" },
  { value: 95, prefix: "", suffix: " mbgl", label: "Deepest groundwater (2025)", sublabel: "western & south-western wards", tone: "high" },
  { value: 96.2, suffix: "%", decimals: 1, label: "Built-up cover (2025)", sublabel: "up from 72.8% in 2000", tone: "moderate" },
  { value: 68, suffix: " wards", label: "High / Very-high stress", sublabel: "≈ one-third of all wards", tone: "high" },
];

/** Secondary crisis statistics (introductory context). */
export const crisisFacts: Kpi[] = [
  { value: 1392, suffix: " MLD", label: "Groundwater extracted / yr", tone: "high" },
  { value: 148, suffix: " MLD", label: "Natural recharge / yr", tone: "moderate" },
  { value: 6997, label: "Borewells run dry", sublabel: "of 14,781 (early 2024)", tone: "high" },
  { value: 88, suffix: "%", label: "Vegetation lost since 1973", tone: "moderate" },
  { value: 79, suffix: "%", label: "Waterbodies lost since 1973", tone: "moderate" },
  { value: 15.13, suffix: " °C", decimals: 2, label: "LST rise over 30 years", tone: "high" },
];
