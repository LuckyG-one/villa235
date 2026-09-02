// Prerender: bakt de volledig gerenderde pagina per taal in statische HTML.
//
// Draait na `vite build` (client) en `vite build --ssr` (server-bundle):
//   dist/index.html     -> nl (bron-template, wordt overschreven)
//   dist/fr/index.html  -> fr
//   dist/en/index.html  -> en
//
// Per pagina: <html lang>, title, description, Open Graph/Twitter, og:locale,
// canonical + hreflang-alternates, JSON-LD url, en de gerenderde app in #root.
// SITE_URL wordt uit de canonical van de build gelezen (een bron: vite.config).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const canon = template.match(/<link rel="canonical" href="([^"]+?)\/?"/)
if (!canon) throw new Error('prerender: geen canonical gevonden in dist/index.html')
const SITE_URL = canon[1].replace(/\/$/, '')

const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const PAGES = {
  nl: {
    path: '/',
    locale: 'nl_NL',
    title: 'Villa 235 te koop · Résidence du Château de Salles, Gironde',
    ogTitle: 'Villa 235 te koop · Résidence du Château de Salles',
    description:
      'Villa 235 te koop in Résidence du Château de Salles, Gironde. Vrijstaande vakantievilla van 160 m², 4 slaapkamers, verwarmd privézwembad, volledig gemeubileerd. Vraagprijs € 405.000.',
    ogDescription:
      'Vrijstaande vakantievilla van 160 m² met verwarmd privézwembad in de Gironde. 4 slaapkamers, volledig gemeubileerd. Vraagprijs € 405.000.',
  },
  fr: {
    path: '/fr/',
    locale: 'fr_FR',
    title: 'Villa 235 à vendre · Résidence du Château de Salles, Gironde',
    ogTitle: 'Villa 235 à vendre · Résidence du Château de Salles',
    description:
      'Villa 235 à vendre à la Résidence du Château de Salles, en Gironde. Villa de vacances indépendante de 160 m², 4 chambres, piscine privée chauffée, entièrement meublée. Prix : 405 000 €.',
    ogDescription:
      'Villa de vacances indépendante de 160 m² avec piscine privée chauffée en Gironde. 4 chambres, entièrement meublée. Prix : 405 000 €.',
  },
  en: {
    path: '/en/',
    locale: 'en_GB',
    title: 'Villa 235 for sale · Résidence du Château de Salles, Gironde',
    ogTitle: 'Villa 235 for sale · Résidence du Château de Salles',
    description:
      'Villa 235 for sale at Résidence du Château de Salles, Gironde. Detached holiday villa of 160 m², 4 bedrooms, heated private pool, fully furnished. Asking price €405,000.',
    ogDescription:
      'Detached 160 m² holiday villa with a heated private pool in the Gironde. 4 bedrooms, fully furnished. Asking price €405,000.',
  },
}

const hreflang =
  Object.entries(PAGES)
    .map(([code, p]) => `    <link rel="alternate" hreflang="${code}" href="${SITE_URL}${p.path}" />`)
    .join('\n') + `\n    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`

function setMeta(html, attr, name, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`prerender: meta ${name} niet gevonden in template`)
  return html.replace(re, `$1${value}$2`)
}

for (const [code, p] of Object.entries(PAGES)) {
  const app = render(code)
  if (!app || app.length < 1000) throw new Error(`prerender: lege render voor "${code}"`)

  let html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${code}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${p.title}</title>`)
    .replace(/\s*<meta property="og:locale(?::alternate)?" content="[^"]*" \/>/g, '')
    // canonical, og:url en JSON-LD "url" wijzen naar de taalpagina; beeld-URL's
    // (.../images/...) matchen bewust niet op `SITE_URL/"`.
    .replaceAll(`${SITE_URL}/"`, `${SITE_URL}${p.path}"`)

  html = setMeta(html, 'name', 'description', p.description)
  html = setMeta(html, 'property', 'og:title', p.ogTitle)
  html = setMeta(html, 'property', 'og:description', p.ogDescription)
  html = setMeta(html, 'name', 'twitter:title', p.ogTitle)
  html = setMeta(html, 'name', 'twitter:description', p.ogDescription)

  const alternates = Object.entries(PAGES)
    .filter(([c]) => c !== code)
    .map(([, o]) => `    <meta property="og:locale:alternate" content="${o.locale}" />`)
    .join('\n')
  html = html.replace(
    /(<meta property="og:site_name" content="[^"]*" \/>)/,
    `$1\n    <meta property="og:locale" content="${p.locale}" />\n${alternates}`
  )
  html = html.replace(/(<link rel="canonical" href="[^"]*" \/>)/, `$1\n${hreflang}`)

  if (!html.includes('<div id="root"></div>')) throw new Error('prerender: lege #root niet gevonden')
  html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`)

  const out = resolve(dist, `.${p.path}index.html`)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  console.log(`prerender: ${p.path.padEnd(5)} ${(app.length / 1024).toFixed(0)} kB app-HTML -> ${out.replace(root + '/', '')}`)
}
