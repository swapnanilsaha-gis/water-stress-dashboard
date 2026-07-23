/** Study-area facts, verbatim from the dissertation. */
export const studyArea = {
  name: "Bruhat Bengaluru Mahanagara Palike (BBMP)",
  state: "Karnataka, India",
  extentLat: "12°50′N - 13°08′N",
  extentLng: "77°27′E - 77°47′E",
  areaKm2: 709,
  elevationMeanM: 920,
  elevationRange: "840 - 960 m",
  climate: "Tropical savannah (Köppen Aw)",
  meanTempC: 24,
  rainfallRange: "850 - 1,000 mm",
  monsoon: "Southwest (Jun-Sep), supplemented by Northeast (Oct-Dec)",
  wardCount: 225,
  valleys: ["Vrishabhavathi Valley", "Koramangala-Challaghatta Valley", "Hebbal Valley"],
  geology: "Precambrian granitic gneisses, migmatites and doleritic intrusions, overlain by weathered regolith and red loamy soils",
  description:
    "The study area is the administrative boundary of the BBMP, the urban core of Bengaluru on the southeastern Deccan Plateau. An undulating plateau traversed by a north-northeast to south-southwest ridge system governs local drainage. The city lacks a major perennial river and historically depended on an interconnected system of man-made lakes and tanks for storage, flood moderation and groundwater recharge. Rapid urbanisation has replaced natural recharge zones with impervious surfaces, reducing infiltration while increasing runoff and dependence on imported Cauvery water and groundwater abstraction.",
} as const;
