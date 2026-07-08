# Villa 235, publiceren op TransIP

De site draait tijdens de bouw op Cloudflare Pages (`https://villa235.pages.dev`,
auto-deploy bij elke push). Bij livegang gaat Villa 235 naar **TransIP**.

Villa 235 is een **statische site**: de contactknop is een `mailto`-link, dus er
is geen server-backend nodig. Het gewone **TransIP WebHosting** (shared) pakket
volstaat, geen PHP of Node.js nodig. Publiceren is: bouwen met het echte domein
en de `dist/`-inhoud uploaden.

## Stap voor stap

1. **Domein kiezen.** `villa235.com` of `www.villa235.com`? Kies één canonieke
   vorm; de andere redirect je (zie de www-regel in `deploy/transip/.htaccess`).
   Zorg dat `SITE_URL` exact die vorm gebruikt.

2. **Bouwen met het echte domein.** Kopieer `.env.production.example` naar
   `.env.production` met `SITE_URL=https://villa235.com`, of geef het eenmalig mee:

   ```
   SITE_URL=https://villa235.com npm run build
   ```

   Controleer daarna dat `dist/index.html`, `dist/robots.txt` en `dist/sitemap.xml`
   het echte domein bevatten en nergens meer `villa235.pages.dev`:

   ```
   grep -r "villa235.pages.dev" dist/ && echo "FOUT: nog dev-URLs" || echo "OK"
   ```

3. **SSL aanzetten.** In het TransIP-controlepaneel bij het webhostingpakket:
   Let's Encrypt-certificaat aanvragen (gratis) voor het domein. Meestal één klik.

4. **Uploaden naar de webroot.** Via TransIP's Bestandsbeheer in het
   controlepaneel, of via SFTP (host/gebruiker/wachtwoord staan in het
   webhosting-overzicht). Zet de **inhoud** van `dist/` in de webroot
   (`www` of `public_html`), niet de map `dist` zelf. Dus na afloop staat
   `index.html` direct in de webroot.

5. **`.htaccess` meenemen.** Upload `deploy/transip/.htaccess` naar de webroot,
   naast `index.html`. Die regelt HTTPS afdwingen, caching op de gehashte assets,
   security headers en compressie (dat deed Cloudflare eerder automatisch). Kies
   in dat bestand de gewenste www- of kaal-domein-redirect.

6. **DNS.** Wijs het domein naar het TransIP-pakket (A-record / bij TransIP-domein
   staat dit vaak al goed). Na propagatie is de site live op het echte domein.

7. **Na livegang controleren.**
   - `https://villa235.com/robots.txt` en `/sitemap.xml` moeten laden.
   - Sitemap indienen in **Google Search Console** (property voor het echte domein).
   - Deel-preview verversen via de Facebook Sharing Debugger en de X/Twitter card
     validator, zodat de OG-afbeelding opnieuw wordt opgehaald.
   - Hero-video checkt op mobiel (iOS vereist `muted playsInline`, staat al goed).

## Wat wegvalt t.o.v. Cloudflare Pages

- Auto-deploy bij elke `git push`. Op TransIP WebHosting upload je handmatig
  (of via een eigen SFTP-scriptje). Cloudflare Pages mag als gratis
  staging/preview blijven draaien naast de TransIP-productie; houd die op
  `noindex` (staat daar automatisch zolang `SITE_URL` het pages.dev-domein is).
- Edge-caching/CDN, automatische compressie en HTTPS. Dat regelt de `.htaccess`
  nu zelf op Apache.

## Waar staat wat

| Wat | Bron |
|---|---|
| Domein (canonical, OG, JSON-LD) | `vite.config.js` -> `SITE_URL`, token `%SITE_URL%` in `index.html` |
| robots.txt + sitemap.xml | gegenereerd in `vite.config.js` bij de build |
| OG-afbeelding (1200x630) | `public/images/og-villa235.jpg` |
| Apache-config voor TransIP | `deploy/transip/.htaccess` |
