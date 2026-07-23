/** The end-to-end GeoAI workflow, as staged in the dissertation. */
export interface MethodStage {
  step: number;
  title: string;
  model?: string;
  body: string;
  outputs: string[];
}

export const methodology: MethodStage[] = [
  {
    step: 1,
    title: "LULC Classification",
    model: "Supervised Random Forest (GEE)",
    body: "Multi-temporal Land Use / Land Cover rasters for 2000, 2005, 2015, 2020 and 2025 were classified into Built-Up, Vegetation and Waterbody from Landsat 5 & 8 imagery, using 250 reference samples split 70:30 for training and validation.",
    outputs: ["5 LULC maps (30 m)", "Overall accuracy 85.8-89.8%", "Kappa 0.79-0.85"],
  },
  {
    step: 2,
    title: "Forecasting the 2035 Drivers",
    model: "Prophet · ARIMA · CA-Markov · OLS",
    body: "Future predictor layers were projected: rainfall & SPI with Facebook Prophet, Land Surface Temperature with ARIMA, LULC with a Cellular Automata-Markov model, and groundwater depth with Ordinary Least Squares regression.",
    outputs: ["Rainfall R² 0.78 (RMSE 150 mm)", "LST R² 0.82 (RMSE 0.8 °C)", "2035 driver rasters"],
  },
  {
    step: 3,
    title: "GIS Spatial Analysis",
    model: "ArcGIS Pro",
    body: "Euclidean distance to pumps, pipelines and waterbodies; Kernel Density Estimation for borewell density; focal-statistics built-up density; a Soil Infiltration Index from SoilGrids; and slope from the SRTM DEM.",
    outputs: ["Distance rasters", "Borewell density surface", "Soil Infiltration Index (0-1)"],
  },
  {
    step: 4,
    title: "AHP-Based Training Labels",
    model: "MCDA, Saaty (1980)",
    body: "In the absence of an official labelled stress dataset, an Analytical Hierarchy Process weighted the 11 predictors and generated 500 training points per class (Low / Moderate / High) for 2025 and 2035, at an acceptable Consistency Ratio of 0.05.",
    outputs: ["11 weighted predictors", "1,500 labelled points / year", "CR = 0.05"],
  },
  {
    step: 5,
    title: "Stress Prediction",
    model: "Random Forest & XGBoost",
    body: "Two ensemble tree-based classifiers predicted the Urban Water Stress Index and hotspots for 2025 and 2035. Data were split 70:30; XGBoost consistently outperformed Random Forest.",
    outputs: ["2025 & 2035 stress maps", "XGBoost OA 87.56% / 87.97%", "Kappa > 0.81"],
  },
  {
    step: 6,
    title: "Infrastructure Siting",
    model: "K-Means clustering",
    body: "An unsupervised K-Means model clustered high-priority pixels from the 2035 stress stack into three groups, validated by the Elbow Method, Silhouette Score and Davies-Bouldin Index (K = 3), each mapped to a decentralised infrastructure type.",
    outputs: ["Recharge Wells", "Community Water Storage Tanks", "Rainwater Harvesting Structures"],
  },
];

/** Data sources (Table 1), condensed. */
export const dataSources = [
  { layer: "Rainfall & SPI", source: "CHIRPS", res: "5.5 km to 30 m", years: "2000-2025" },
  { layer: "Land Surface Temperature", source: "MODIS MOD11A1", res: "1 km to 30 m", years: "2000-2025" },
  { layer: "LULC & Built-Up Density", source: "Landsat 5 & 8 OLI", res: "30 m", years: "2000-2025" },
  { layer: "Elevation & Slope", source: "SRTM DEM", res: "30 m", years: "2025" },
  { layer: "Soil Infiltration", source: "SoilGrids v2.0", res: "250 m to 30 m", years: "2025" },
  { layer: "Road Network", source: "OpenStreetMap", res: "Vector", years: "2025" },
  { layer: "Population", source: "GBA (2011 Census)", res: "Ward polygons", years: "2025" },
  { layer: "Groundwater / Borewells / Pumps / Pipelines", source: "BWSSB", res: "Point & line", years: "2012-2024" },
];
