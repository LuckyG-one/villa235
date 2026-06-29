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
// Indeling volgens de definitieve bouwplannen (Maison Margaux, 01/12/2006).
// `dim` = afgelezen maat (m). `doors` = deurzwaai-symbolen { x,y hinge, w leaf,
// a leaf-hoek in graden, s arc-richting }. `stairs` = traprechthoek met treden.
export const floors = [
  {
    id: "ground",
    rooms: [
      { id: "bed1", img: `${IMG}/slaapkamer-master.jpg`, dim: "4,24 × 3,25 m", shape: "5,6 24,6 24,25 5,25" },
      { id: "bath1", img: `${IMG}/badkamer-dubbel.jpg`, shape: "5,25 24,25 24,36 5,36" },
      { id: "buanderie", img: `${IMG}/berging.jpg`, shape: "5,36 24,36 24,46 5,46" },
      { id: "cellier", img: `${IMG}/berging.jpg`, dim: "2,19 × 2,06 m", shape: "5,46 14,46 14,58 5,58" },
      { id: "wc", img: `${IMG}/toilet.jpg`, shape: "14,46 24,46 24,58 14,58" },
      { id: "gang", img: `${IMG}/entree.jpg`, shape: "24,6 31,6 31,58 24,58" },
      { id: "kitchen", img: `${IMG}/keuken-beneden.jpg`, shape: "31,6 56,6 56,28 31,28" },
      { id: "entree", img: `${IMG}/entree.jpg`, shape: "31,28 56,28 56,58 31,58" },
      { id: "living", img: `${IMG}/woonkamer-overdag.jpg`, shape: "56,6 84,6 84,58 56,58" },
      { id: "terrace", img: `${IMG}/terras-gedekt.jpg`, shape: "84,6 96,6 96,58 84,58" },
    ],
    // Deuren openen op de gang (oostmuur x=24) of de entree.
    doors: [
      { x: 24, y: 19, w: 5, a: 180, s: -1 }, // slaapkamer 1 -> gang
      { x: 24, y: 30, w: 4, a: 180, s: -1 }, // badkamer -> gang
      { x: 24, y: 41, w: 4, a: 180, s: -1 }, // wasruimte -> gang
      { x: 24, y: 53, w: 3.5, a: 180, s: -1 }, // toilet -> gang
      { x: 10, y: 46, w: 4, a: 90, s: 1 }, // bijkeuken -> wasruimte
      { x: 31, y: 50, w: 4, a: 0, s: 1 }, // gang -> entree
      { x: 45, y: 58, w: 6, a: 270, s: 1 }, // voordeur
    ],
    sliders: [{ x: 84, y1: 33, y2: 47 }], // woonkamer -> terras
    stairs: { x: 42, y: 33, w: 9, h: 22, n: 9, dir: "up" },
  },
  {
    id: "first",
    rooms: [
      { id: "bath2", img: `${IMG}/badkamer-wastafels.jpg`, shape: "5,6 30,6 30,29 5,29" },
      { id: "bath3", img: `${IMG}/badkamer-dubbel.jpg`, shape: "30,6 52,6 52,29 30,29" },
      { id: "bed2", img: `${IMG}/slaapkamer-twin.jpg`, dim: "5,12 × 2,99 m", shape: "52,6 96,6 96,29 52,29" },
      { id: "bed4", img: `${IMG}/slaapkamer-twee.jpg`, dim: "3,29 × 2,71 m", shape: "5,29 30,29 30,58 5,58" },
      { id: "overloop", img: `${IMG}/overloop.jpg`, shape: "30,29 52,29 52,58 30,58" },
      { id: "bed3", img: `${IMG}/slaapkamer-twee.jpg`, dim: "4,09 × 2,81 m", shape: "52,29 96,29 96,58 52,58" },
    ],
    doors: [
      { x: 30, y: 43, w: 5, a: 0, s: 1 }, // slaapkamer 4 -> overloop
      { x: 52, y: 43, w: 5, a: 180, s: -1 }, // slaapkamer 3 -> overloop
      { x: 41, y: 29, w: 4, a: 270, s: 1 }, // badkamer 3
      { x: 18, y: 29, w: 4, a: 270, s: -1 }, // badkamer 2 (boven bed4)
      { x: 55, y: 29, w: 5, a: 270, s: 1 }, // slaapkamer 2
    ],
    stairs: { x: 38, y: 33, w: 9, h: 22, n: 9, dir: "down" },
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
