# Bengaluru Water Stress · GeoAI Web GIS Dashboard

Interactive dashboard for the M.Sc. Geoinformatics dissertation
**“Predictive Urban Water Stress Mapping and Decentralized Infrastructure
Siting in Bengaluru: A GeoAI Approach”** — Swapnanil Saha,
Symbiosis Institute of Geoinformatics.

> A concise 8-section interactive Web GIS: Home, Study Area, Methodology,
> Data Sources, Forecasting, Prediction, Infrastructure and Conclusion. The
> Prediction and Infrastructure maps are vectorised from the classified
> rasters and are fully interactive (model toggle, clickable wards).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build for production

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Tech stack

React 18 · Vite · TypeScript · Tailwind CSS · React Router · Framer Motion ·
React Icons · Chart.js (charts land in Phase 5).

## Project structure

```
src/
  data/         # single source of truth — every number from the dissertation
  components/   # layout shell + reusable UI (GlassCard, KpiCard, ...)
  pages/        # one file per route
  hooks/        # useCountUp, ...
  styles/       # theme + globals
public/assets/  # web-optimized figures (maps, charts, diagrams)
```

## Interactive map data

The Study Area page (`/study-area`) runs a Leaflet Web GIS built from your real data:

- `public/assets/geo/bbmp-wards.geojson` — 225 BBMP wards, choropleth by 2011-census population density, click for full census popup, searchable by name.
- `public/assets/geo/borewells.geojson` — 7,438 BWSSB borewells (clustered).
- `public/assets/geo/pumping-stations.geojson` — 30 pumping stations.
- `public/assets/geo/waterlines.geojson` — BWSSB pipeline network.

Controls: basemap switch (dark/satellite/streets/terrain), layer toggles + ward
opacity, legend, scale bar, north arrow, live coordinates, distance measure,
home, fullscreen, PNG export and print. Converted from your KML/GeoJSON to
web-optimized GeoJSON (268 MB of KML/shape → ~2 MB).

## Notes

- Original ArcGIS layouts (≈268 MB) were re-encoded to WebP (≈4 MB total) for the
  web. Originals are untouched; nothing in the figures was recreated or altered.
- Drop your dissertation PDF at `public/assets/dissertation.pdf` to activate the
  “Download Dissertation” button (see `public/assets/README.txt`).

A full README with deployment instructions is produced in Phase 10.
