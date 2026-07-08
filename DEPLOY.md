# Villa 235, publiceren

De site draait nu in de dev-omgeving op Cloudflare Pages (`https://villa235.pages.dev`).
Zolang dat het live adres is hoeft er niets te veranderen: `npm run build` gebruikt
standaard dat domein.

## Naar het echte domein (TransIP, bijv. villa235.com)

Alle absolute URL's (canonical, Open Graph, Twitter, JSON-LD, robots.txt, sitemap.xml)
komen uit **één** waarde: `SITE_URL` in `vite.config.js`. Je hoeft dus niets in de
HTML of losse bestanden aan te passen.

1. **Zet het domein.** Kopieer `.env.production.example` naar `.env.production` en
   vul het echte domein in:

   ```
   SITE_URL=https://villa235.com
   ```

   (Of eenmalig meegeven: `SITE_URL=https://villa235.com npm run build`.)

2. **Bouwen.**

   ```
   npm run build
   ```

   Controleer daarna dat `dist/index.html`, `dist/robots.txt` en `dist/sitemap.xml`
   het nieuwe domein bevatten en nergens meer `villa235.pages.dev`.

3. **Uploaden naar TransIP.** Zet de **inhoud** van `dist/` in de webroot
   (`public_html` of `www`). Niet de map `dist` zelf, maar wat erin zit.

4. **Serverconfig (TransIP shared hosting, Apache).** De site is één pagina met
   in-page (hash) navigatie, dus er is geen SPA-rewrite nodig. Wel handig, een
   `.htaccess` in de webroot voor HTTPS, compressie en caching:

   ```apache
   # Forceer HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

   # Compressie
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
   </IfModule>

   # Caching voor gehashte assets
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 month"
     ExpiresByType image/png "access plus 1 month"
   </IfModule>
   ```

5. **DNS / www.** Kies of `www.villa235.com` naar `villa235.com` (of andersom)
   redirect, zodat er één canoniek adres is. De canonical in de HTML moet naar
   diezelfde variant wijzen als `SITE_URL`.

6. **Na livegang.**
   - `https://villa235.com/robots.txt` en `/sitemap.xml` moeten laden.
   - Sitemap indienen in Google Search Console (property voor het echte domein).
   - Deel-preview checken via de Facebook Sharing Debugger en de Twitter/X card
     validator, zodat de OG-afbeelding vers wordt opgehaald.

## Waar staat wat

| Wat | Bron |
|---|---|
| Domein (canonical, OG, JSON-LD) | `vite.config.js` -> `SITE_URL`, token `%SITE_URL%` in `index.html` |
| robots.txt | gegenereerd in `vite.config.js` |
| sitemap.xml | gegenereerd in `vite.config.js` |
| OG-afbeelding (1200x630) | `public/images/og-villa235.jpg` |
