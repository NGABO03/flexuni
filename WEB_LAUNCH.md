# FlexUni Web / PWA Launch

## Goal
Launch FlexUni as a public web application first, without requiring Google Play or Apple App Store publication.

## Local development
1. Install Node.js 22.
2. Run `npm ci`.
3. Copy `.env.example` to `.env` and add the Supabase URL + publishable key.
4. Run `npm run web`.
5. Test the app in Chrome.

## Production build
`npm run build:web`

The output is the `dist/` folder.

## Free-friendly hosting options
- GitHub Pages (workflow included)
- Vercel (config included)
- Netlify (config included)

Hosting providers and free tiers can change. Check the provider's current limits before launch.

## Google Search
A website must first be publicly reachable at a real domain/subdomain. Then:
1. Create a Google Search Console property.
2. Submit the sitemap.
3. Make important public pages crawlable.
4. Keep private student pages behind authentication.

Do not put private student data in public pages.

## PWA
The project includes a web manifest so the site can be progressively enhanced for installation from supported browsers. PWA installability also depends on HTTPS and the final deployed site's configuration.

## Environment
Never commit Supabase service-role keys or other private secrets. The browser should only receive the intended public/publishable key.
