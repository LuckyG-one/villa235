import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Single source of truth for the public origin (no trailing slash).
//
// Current dev deploy  : Cloudflare Pages -> https://villa235.pages.dev (default)
// Production (TransIP): set SITE_URL, e.g. `SITE_URL=https://villa235.com npm run build`
//                        or drop it in .env.production (see .env.production.example).
//
// index.html uses the %SITE_URL% token; robots.txt and sitemap.xml are generated
// below. Change the origin in ONE place and everything follows.
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const SITE_URL = (env.SITE_URL || 'https://villa235.pages.dev').replace(/\/$/, '')

  // Alleen het echte domein mag in Google/AI-crawlers. De Cloudflare Pages
  // staging (*.pages.dev, ook de default) blijft noindex + Disallow, zodat de
  // testversie nooit in de zoekresultaten belandt. Zodra SITE_URL naar het
  // echte domein wijst (TransIP-build) wordt de site vanzelf indexeerbaar.
  const INDEXABLE = !/(^|\.)pages\.dev$/.test(new URL(SITE_URL).host)

  const robotsMeta = INDEXABLE
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow'

  // The site is a single page; all navigation is in-page (hash based).
  const ROUTES = ['/']
  const lastmod = new Date().toISOString().slice(0, 10)

  const robotsTxt = INDEXABLE
    ? `# Villa 235, te koop in Residence du Chateau de Salles, Gironde.
# Alles mag geindexeerd worden, inclusief AI- en LLM-crawlers.

User-agent: *
Allow: /

# AI- en answer-engine crawlers expliciet toegestaan
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
    : `# Staging (Cloudflare Pages). Niet indexeren; alleen het echte domein hoort in Google.
User-agent: *
Disallow: /
`

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${ROUTES.map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_URL}/images/og-villa235.jpg</image:loc>
      <image:title>Villa 235 met verwarmd privezwembad, Residence du Chateau de Salles</image:title>
    </image:image>
  </url>`
  ).join('\n')}
</urlset>
`

  return {
    base: '/',
    plugins: [
      react(),
      {
        name: 'villa235-site-meta',
        transformIndexHtml(html) {
          return html.replaceAll('%SITE_URL%', SITE_URL).replaceAll('%ROBOTS_META%', robotsMeta)
        },
        generateBundle() {
          this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt })
          this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml })
        },
      },
    ],
  }
})
