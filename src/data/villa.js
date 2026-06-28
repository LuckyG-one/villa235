// VILLA235 — centrale data. Beeld-paden, feiten, journey, plattegrond, omgeving.
// Afstanden zijn benaderingen vanaf Résidence du Château de Salles.

const BASE = import.meta.env.BASE_URL;
export const IMG = `${BASE}images`;
export const VIDEO = `${BASE}video`;

export const facts = [
  { key: "area", img: `${IMG}/exterieur-voorgevel.jpg` },
  { key: "beds", img: `${IMG}/slaapkamer-master.jpg` },
  { key: "baths", img: `${IMG}/badkamer-wastafels.jpg` },
  { key: "pool", img: `${IMG}/zwembad-dag.jpg` },
  { key: "terrace", img: `${IMG}/terras-gedekt.jpg` },
  { key: "garden", img: `${IMG}/exterieur-tuin.jpg` },
];

// Scroll-driven "een dag" (Experience). 4 momenten met beeld.
export const experience = [
  { key: "1", img: `${IMG}/aankomst.jpg` },
  { key: "2", img: `${IMG}/zwembad-dag.jpg` },
  { key: "3", img: `${IMG}/woonkamer-overdag.jpg` },
  { key: "4", img: `${IMG}/zwembad-avond.jpg` },
];

// Digitale rondleiding door het huis (Journey). Volgt de echte looproute:
// auto -> voordeur -> hal (trap links, woonkamer rechts) -> de woonkamer in ->
// kookeiland -> omdraaien: keuken/eettafel/woonkamer in een -> avond -> zwembad.
export const journey = [
  { key: "aankomst", img: `${IMG}/aankomst.jpg` },
  { key: "voordeur", img: `${IMG}/gevel-entree.jpg` },
  { key: "binnen", img: `${IMG}/entree.jpg` },
  { key: "woonkamerin", img: `${IMG}/hal-woonkamer.jpg` },
  { key: "woonkamer", img: `${IMG}/woonkamer-overdag.jpg` },
  { key: "keuken", img: `${IMG}/keuken-beneden.jpg` },
  { key: "open", img: `${IMG}/gedekte-tafel-2.jpg` },
  { key: "avond", img: `${IMG}/woonkamer-avond.jpg` },
  { key: "zwembad", img: `${IMG}/zwembad-avond.jpg` },
];

// Interactieve plattegrond. Twee verdiepingen, klikbare ruimtes (SVG polygonen).
// coords in een 0..100 x 0..70 grid per verdieping.
export const floors = [
  {
    id: "ground",
    rooms: [
      { id: "living", img: `${IMG}/woonkamer-overdag.jpg`, shape: "6,6 44,6 44,40 6,40" },
      { id: "kitchen", img: `${IMG}/keuken-beneden.jpg`, shape: "44,6 74,6 74,22 44,22" },
      { id: "bed1", img: `${IMG}/slaapkamer-master.jpg`, shape: "44,22 74,22 74,33 44,33" },
      { id: "bath1", img: `${IMG}/badkamer-dubbel.jpg`, shape: "44,33 74,33 74,40 44,40" },
      { id: "terrace", img: `${IMG}/terras-gedekt.jpg`, shape: "6,40 74,40 74,58 6,58" },
      { id: "garden", img: `${IMG}/exterieur-tuin.jpg`, shape: "76,6 96,6 96,32 76,32" },
      { id: "berging", img: `${IMG}/berging.jpg`, shape: "76,34 96,34 96,58 76,58" },
    ],
  },
  {
    id: "first",
    rooms: [
      { id: "bed2", img: `${IMG}/slaapkamer-twee.jpg`, shape: "6,6 42,6 42,30 6,30" },
      { id: "bath2", img: `${IMG}/badkamer-wastafels.jpg`, shape: "42,6 62,6 62,30 42,30" },
      { id: "bed3", img: `${IMG}/slaapkamer-twin.jpg`, shape: "6,32 36,32 36,58 6,58" },
      { id: "bed4", img: `${IMG}/slaapkamer-twee.jpg`, shape: "36,32 62,32 62,58 36,58" },
      { id: "bath3", img: `${IMG}/badkamer-dubbel.jpg`, shape: "64,6 90,6 90,58 64,58" },
    ],
  },
];

// Omgeving — pins op de kaart. lng/lat (WGS84), afstand bij benadering.
export const SALLES = { lng: -0.8694, lat: 44.5419 };

export const destinations = [
  { id: "salles", lng: -0.8694, lat: 44.5419, km: 3, img: `${IMG}/exterieur-tuin.jpg` },
  { id: "capferret", lng: -1.2453, lat: 44.6586, km: 55, img: `${IMG}/zwembad-avond.jpg`, hero: true },
  { id: "pilat", lng: -1.2128, lat: 44.5882, km: 45, img: `${IMG}/exterieur-terras-zijde.jpg` },
  { id: "bordeaux", lng: -0.5792, lat: 44.8378, km: 50, img: `${IMG}/woonkamer-keuken.jpg` },
  { id: "biscarrosse", lng: -1.1656, lat: 44.3942, km: 40, img: `${IMG}/terras-loungers.jpg` },
  { id: "biarritz", lng: -1.5586, lat: 43.4832, km: 140, img: `${IMG}/zwembad-dag.jpg` },
  { id: "sansebastian", lng: -1.9812, lat: 43.3183, km: 190, img: `${IMG}/aankomst.jpg` },
];

export const park = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
];

export const CONTACT_EMAIL = "info@villa235.com";
export const RENTAL_URL = "https://www.bungalow.net/";
