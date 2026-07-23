/**
 * Narrative content, drawn from the dissertation. Kept as structured data so
 * the scientific pages stay consistent and every claim traces to the source.
 */

export const problemStatement = [
  "Bengaluru suffers from a chronic and deepening urban water stress, with groundwater extraction reaching approximately 1,392 MLD against a natural recharge of only 148 MLD, and a total freshwater deficit of nearly 500 MLD persisting daily despite Cauvery surface supply. All six groundwater assessment units within BBMP are over-exploited as per CGWB reports, and half of the city's existing borewells have run dry.",
  "Despite the scale of this crisis, limited study exists that provides a ward-level, multi-dimensional mapping of water stress severity, one that integrates biophysical drivers such as thermal load and precipitation with infrastructural realities such as borewell density, pumping stations and waterline infrastructure. Existing frameworks largely focus on groundwater alone while excluding several interacting parameters that drive the compound stress scenario. This report addresses that absence through a GeoAI-driven ensemble machine-learning framework that combines every factor into an Urban Water Stress Index, and further proposes ideal locations for decentralised water infrastructure.",
];

export const researchQuestions = [
  "What are the primary environmental, hydrological, infrastructural and socio-economic drivers influencing the spatial distribution of Bengaluru's water stress?",
  "How effectively can GeoAI-based machine-learning models, especially Random Forest and XGBoost, predict water stress for 2025 and 2035?",
  "How are projected climatic variations and urban growth expected to influence the future spatial distribution and intensity of water stress in Bengaluru?",
  "How can K-Means clustering be utilised to identify optimal decentralised water infrastructure interventions across Bengaluru?",
  "Can an integrated geospatial decision-support framework combining predictive stress modelling with infrastructure siting contribute to sustainable, evidence-based long-term urban water resilience?",
];

export const objectives = [
  {
    title: "Forecast The Drivers",
    body: "Generate future forecast scenarios of environmental and hydrological variables of Bengaluru's water stress using GeoAI-based stochastic and statistical modelling.",
  },
  {
    title: "Predict The Hotspots",
    body: "Produce predictive urban water-stress hotspot maps for 2025 and 2035 using Random Forest and XGBoost models, and evaluate their performance.",
  },
  {
    title: "Site The Infrastructure",
    body: "Identify suitable locations for decentralised water infrastructure allocation through a K-Means clustering algorithm and develop a spatial decision-support framework for sustainable urban water resource planning.",
  },
];

export const researchGap = [
  {
    heading: "Beyond groundwater alone",
    body: "Existing studies focus predominantly on Bengaluru's groundwater availability and depletion. Water stress, however, is multidimensional, shaped by rainfall variability, surface temperature, population concentration and accessibility to existing infrastructure. A comprehensive study is needed that unifies these diverse determinants into a single spatial modelling framework.",
  },
  {
    heading: "From description to prediction",
    body: "Previous work relied largely on conventional spatial analysis or descriptive assessments of existing government datasets. Applying a GeoAI framework with ensemble models like Random Forest and XGBoost is expected to provide a more detailed, reproducible analysis of Bengaluru's water stress, and a template for similar future studies.",
  },
  {
    heading: "From mapping to action",
    body: "Most studies conclude at the identification and mapping of hotspots. Translating stress assessments into actionable, decentralised infrastructure recommendations remains under-explored. This project addresses that gap by employing K-Means clustering to identify suitable locations for decentralised interventions.",
  },
];

export const conclusionPoints = [
  "A reproducible GeoAI-enabled predictive framework successfully mapped and quantified the spatial distribution of urban water stress across Bengaluru, and translated the findings into actionable infrastructure siting for long-term resilience.",
  "Historical LULC was classified with supervised Random Forest for 2000-2025; future drivers were projected with Prophet, ARIMA, CA-Markov and OLS regression, all validated through accuracy, R² and RMSE scores.",
  "In the absence of an official ground-truth dataset, AHP-driven training labels supported Random Forest and XGBoost stress prediction for 2025 and 2035, consistently achieving overall accuracy above 85% and near-perfect Kappa agreement.",
  "The study confirms high urban expansion and built-up acceleration, coupled with groundwater depletion, borewell construction and lake shrinkage, as the biggest drivers of Bengaluru's water stress.",
  "K-Means-based allocation proposed where Recharge Wells, Community Water Storage Tanks and Rainwater Harvesting Structures are best suited, and quantified the high and very-high stress wards requiring immediate intervention.",
  "Every finding was externally corroborated against BWSSB groundwater surveys, the WELL Labs Water Security Index and an independent Water Policy study, making the results externally validated and cross-referenced.",
];

export const limitations = [
  "The absence of an officially validated ground-truth Urban Water Stress dataset for Bengaluru led to training labels generated through AHP-based MCDA, a proxy for real-world observed stress rather than field-verified ground truth.",
  "The framework relied on secondary and remote-sensing datasets of varying native resolution. Resampling to a consistent 30 m may have produced interpolation artefacts and masked some variability.",
  "Borewell density, distance to pumping stations and existing water infrastructure were held constant between 2025 and 2035, due to the impracticality of forecasting future infrastructure development.",
];

export const futureScope = [
  {
    title: "Real-Time IoT Sensing",
    body: "Integrating IoT-enabled sensors on borewells, pumping stations and storage infrastructure could generate a continuously updating, live Water Stress Index.",
  },
  {
    title: "Deep Learning",
    body: "Convolutional neural networks can be explored to capture more complex, non-linear spatial dependencies among the driver variables.",
  },
  {
    title: "Water Quality",
    body: "Future studies may incorporate water-quality parameters such as groundwater salinity and arsenic or lead contamination to produce a more holistic Water Security Index.",
  },
  {
    title: "Transferable Framework",
    body: "The infrastructure-siting and ward-priority methodology can be extended and validated for other rapidly urbanising metropolitan cities of India and the Global South facing groundwater-induced water stress.",
  },
];
