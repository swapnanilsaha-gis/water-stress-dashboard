import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";

/** BBMP centre and a bounding box that frames the whole jurisdiction. */
export const BBMP_CENTER: LatLngExpression = [12.9716, 77.5946];
export const BBMP_BOUNDS: LatLngBoundsExpression = [
  [12.79, 77.37], // SW
  [13.16, 77.78], // NE
];

export interface Basemap {
  id: string;
  label: string;
  url: string;
  attribution: string;
  /** Preview swatch colour for the basemap switcher. */
  swatch: string;
  maxZoom?: number;
}

/**
 * Basemaps. All providers send CORS headers so the map can be exported to PNG.
 * Dark Matter is the default to match the dashboard's "Deep Water" theme.
 */
export const basemaps: Basemap[] = [
  {
    id: "dark",
    label: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    swatch: "#0b1622",
    maxZoom: 20,
  },
  {
    id: "satellite",
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri, Maxar, Earthstar Geographics",
    swatch: "#2b3a2a",
    maxZoom: 19,
  },
  {
    id: "streets",
    label: "Streets",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    swatch: "#e8e5df",
    maxZoom: 20,
  },
];

/** Vector overlay identifiers, kept in one place so controls stay in sync. */
export type OverlayId = "wards" | "borewells" | "pumps" | "waterlines";

export interface OverlayMeta {
  id: OverlayId;
  label: string;
  /** Path to the GeoJSON produced by the conversion pipeline. */
  src: string;
  /** Legend/color hint. */
  color: string;
  /** One-line description shown in the layer panel. */
  blurb: string;
  defaultOn: boolean;
}

export const overlays: OverlayMeta[] = [
  {
    id: "wards",
    label: "BBMP Wards, Population (2011)",
    src: "/assets/geo/bbmp-wards.geojson",
    color: "#22D3EE",
    blurb: "225 wards shaded by 2011-census ward population.",
    defaultOn: true,
  },
  {
    id: "borewells",
    label: "BWSSB Borewells",
    src: "/assets/geo/borewells.geojson",
    color: "#F87171",
    blurb: "Borewell locations (clustered). A top driver of water stress.",
    defaultOn: false,
  },
  {
    id: "pumps",
    label: "Pumping Stations",
    src: "/assets/geo/pumping-stations.geojson",
    color: "#FBBF24",
    blurb: "BWSSB water pumping stations.",
    defaultOn: true,
  },
  {
    id: "waterlines",
    label: "Water Pipeline Network",
    src: "/assets/geo/waterlines.geojson",
    color: "#1D4ED8",
    blurb: "BWSSB water supply pipeline infrastructure.",
    defaultOn: false,
  },
];

/** Sequential cyan ramp for the population choropleth (low to high). */
export const popRamp = ["#0c4a6e", "#0e7490", "#0891b2", "#22d3ee", "#a5f3fc"];
