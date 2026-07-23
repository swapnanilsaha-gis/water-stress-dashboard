/**
 * Minimal project metadata actually used by the UI. Institutional and personal
 * details are intentionally omitted so the dashboard reads as a general,
 * standalone Web GIS.
 */
export const meta = {
  title: "Predictive Urban Water Stress Mapping And Decentralized Infrastructure Siting In Bengaluru",
  subtitle: "A GeoAI Approach",
  years: { baseline: 2025, projection: 2035 },
  // Drop the report PDF into /public/assets to activate the download button.
  dissertationPdf: "/assets/dissertation.pdf",
} as const;

/** Short abstract used on the landing hero. */
export const abstractShort =
  "A GeoAI framework that predicts the spatial distribution of Bengaluru's urban water stress over a ten-year " +
  "horizon (2025 to 2035) and proposes decentralized infrastructure interventions across the BBMP region. The study " +
  "integrates SPI, LST, LULC, groundwater depth, borewell density, population and built-up density, slope and " +
  "proximity to existing water infrastructure, driving Random Forest and XGBoost classifiers and a K-Means siting model.";
