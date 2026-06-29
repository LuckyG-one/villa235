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
// Indeling volgens de definitieve bouwplannen (Maison Margaux, 01/12/2006):
// begane grond = serviceblok links, keuken/entree/trap midden, woonkamer rechts,
// overdekt terras aan de zijkant. Verdieping = 3 slaapkamers + 2 badkamers + overloop.
export const floors = [
  {
    id: "ground",
    rooms: [
      { id: "bed1", img: `${IMG}/slaapkamer-master.jpg`, shape: "5,6 28,6 28,27 5,27" },
      { id: "bath1", img: `${IMG}/badkamer-dubbel.jpg`, shape: "5,27 28,27 28,40 5,40" },
      { id: "buanderie", img: `${IMG}/berging.jpg`, shape: "5,40 28,40 28,49 5,49" },
      { id: "cellier", img: `${IMG}/berging.jpg`, shape: "5,49 18,49 18,58 5,58" },
      { id: "wc", img: `${IMG}/toilet.jpg`, shape: "18,49 28,49 28,58 18,58" },
      { id: "kitchen", img: `${IMG}/keuken-beneden.jpg`, shape: "28,6 54,6 54,30 28,30" },
      { id: "entree", img: `${IMG}/entree.jpg`, shape: "28,30 54,30 54,58 28,58" },
      { id: "living", img: `${IMG}/woonkamer-overdag.jpg`, shape: "54,6 82,6 82,58 54,58" },
      { id: "terrace", img: `${IMG}/terras-gedekt.jpg`, shape: "82,6 96,6 96,58 82,58" },
    ],
  },
  {
    id: "first",
    rooms: [
      { id: "bath2", img: `${IMG}/badkamer-wastafels.jpg`, shape: "5,6 32,6 32,26 5,26" },
      { id: "bed4", img: `${IMG}/slaapkamer-twee.jpg`, shape: "5,26 32,26 32,58 5,58" },
      { id: "bath3", img: `${IMG}/badkamer-dubbel.jpg`, shape: "32,6 58,6 58,30 32,30" },
      { id: "overloop", img: `${IMG}/overloop.jpg`, shape: "32,30 58,30 58,58 32,58" },
      { id: "bed2", img: `${IMG}/slaapkamer-twin.jpg`, shape: "58,6 96,6 96,30 58,30" },
      { id: "bed3", img: `${IMG}/slaapkamer-twee.jpg`, shape: "58,32 96,32 96,58 58,58" },
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

// Vintage travel-posters van de streek (portret). Naam zit in de poster zelf;
// `name` is alleen voor alt-tekst, `km` is de afstand bij benadering.
export const posters = [
  { id: "chateau", name: "Château de Salles", img: `${IMG}/poster-chateau.jpg` },
  { id: "capferret", name: "Cap Ferret", img: `${IMG}/poster-capferret.jpg`, km: 55 },
  { id: "pilat", name: "Dune du Pilat", img: `${IMG}/poster-pilat.jpg`, km: 45 },
  { id: "biscarrosse", name: "Biscarrosse", img: `${IMG}/poster-biscarrosse.jpg`, km: 40 },
  { id: "bordeaux", name: "Bordeaux", img: `${IMG}/poster-bordeaux.jpg`, km: 50 },
  { id: "saintemilion", name: "Saint-Émilion", img: `${IMG}/poster-saintemilion.jpg`, km: 80 },
  { id: "biarritz", name: "Biarritz", img: `${IMG}/poster-biarritz.jpg`, km: 140 },
];

export const CONTACT_EMAIL = "info@villa235.com";
export const RENTAL_URL = "https://www.bungalow.net/";
