# Stoa

A responsive publication and admin interface prototype built with Next.js App
Router, TypeScript and TSX. The approved design direction uses sans-serif
typography, cobalt, lilac and coral accents, local assets and motion that
respects reduced motion preferences.

This is the first static layout stage. The public articles, dates and admin
metrics are sample data. All routes are `noindex` until a separate launch
decision. The `/admin` area is a publicly reachable interface demo with no
authentication; it must not contain private information or real publishing
capabilities.

## Run locally

Use a supported Node.js LTS runtime; the VPS target is Node.js 22 LTS.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` for the publication and
`http://localhost:3000/admin` for the admin preview. The admin is intentionally
absent from the publication's visitor navigation.

```sh
npm run typecheck
npm run lint
npm run build
npm run prepare:standalone
node scripts/verify-routes.mjs
node scripts/verify-images.mjs
node scripts/verify-motion.mjs
node scripts/render-snapshots.mjs
HOSTNAME=127.0.0.1 PORT=3000 npm run start:standalone
```

Stop a development server before building in the same working directory. Use
a separate release directory when a running site must remain available.
`npm run build` explicitly runs `next build --webpack`; it does not use
Turbopack for the production build. The verification scripts are described
in [verification limits](#verification-limits).

The included `package-lock.json` pins the dependency graph. The initial local
dependency installation was completed from an existing npm cache because the
environment could not resolve the npm registry. A fresh isolated `npm ci`
succeeded from that cache. The online `npm audit` attempt failed with
`ENOTFOUND registry.npmjs.org`; rerun it in a connected environment before
deployment. No successful security audit is implied.

## Editorial scope

The owner approved three initial sections: **Technology, Relationships and
Culture**. The category and article model remains extensible so additional
sections can be introduced deliberately without redesigning the application.
Only approved sections should appear in navigation and filters; adding an empty
category is not a substitute for reviewed content.

This initial focus is an editorial choice, not a claim that AdSense requires a
single niche or guarantees approval for this category mix. The preview's
articles and authorship labels remain demonstrations. Real publication requires
the review steps in the [launch checklist](docs/launch-checklist.md).

## Screens

| Route | Interface |
| --- | --- |
| `/` | Magazine-style home with featured and recent stories. |
| `/blog` | Story collection. |
| `/blog/[slug]` | Sample article pages with a reading layout, contents links and related stories. Unknown slugs return 404. |
| `/about` | Publication introduction and editorial preview information. |
| `/contact` | Locally validated contact-form preview; no message is sent. |
| `/privacy` | Draft privacy notice for the prototype's actual behavior. |
| `/terms` | Draft terms for owner review before launch. |
| `/admin` | Editorial overview with explicitly illustrative metrics. |
| `/admin/posts` | Sample story management, title/category search and status filters. |
| `/admin/posts/new` | New draft editor preview. |
| `/admin/posts/[slug]` | Sample story editor with content preview and in-memory draft saving. |
| `/admin/settings` | Read-only publishing and launch-readiness settings. |

## Static behavior and privacy

Interactive controls are interface demonstrations. Admin draft changes live in
React memory while navigating inside the admin; reloading or leaving the admin
resets them. Publishing is disabled. The activity chart represents illustrative
editing activity and is not connected to analytics.

Contact fields are validated in the browser. Their values are not submitted to
a server, saved in browser storage or delivered by email. Article sharing uses
a user-triggered clipboard action. Consent preferences demonstrate the intended
interaction and reset when the page is reloaded; the preview is not a certified
consent management platform.

The header's search dialog filters its story list in browser memory. The
journal search submits a same-origin GET request using the `q` URL parameter;
those search terms can appear in browser history and server or proxy logs.
Search requests are separate from the contact-form preview and should not be
described as entirely local or as never reaching the server.

The application does not connect advertising, analytics, cookies, browser
storage, a database, authentication or newsletter delivery. Fonts and editorial
imagery are served locally. VPS and proxy access logs are separate deployment
concerns and may record request data depending on the operator's configuration.

`SITE_URL` is an optional server setting, documented in
[`frontend/.env.example`](frontend/.env.example). Leave it unset until the
canonical origin is approved; no canonical hostname is invented. Providing a
site URL does not remove the preview's `noindex`. There is no placeholder
`ads.txt`, fabricated publisher ID or production sitemap.

## Structure

```text
frontend/
  src/
    app/                 Routes, layouts and metadata
    assets/fonts/        Self-hosted font files and license
    components/          Shared layout, navigation and UI primitives
    features/site/       Public sections and typed sample stories
    features/admin/      Admin screens and isolated preview interactions
    lib/                 Site configuration and metadata helpers
  public/                Local editorial images and public assets
scripts/                 Standalone build preparation
deploy/                  PM2 and Nginx templates
docs/                    VPS setup and launch checklist
```

The root npm workspace configuration reserves `backend` and `packages/*` for
the planned Express/TypeScript/Mongoose architecture. Those directories are
created when real functionality needs them. This prototype has no API routes
or database operations. Public content stays server-rendered; client components
are reserved for actual interactions.

## Verification limits

See [the verification record](docs/verification.md) for the checks performed on
this iteration and the remaining browser, network and deployment limitations.

Run the route, image and snapshot scripts after building the current source.
The source-level motion checks do not require a build:

- `node scripts/verify-routes.mjs` invokes the installed Next.js production
  request handler using in-process request/response streams. It checks the
  configured public, admin, filter and missing-route cases, status codes,
  rendered content, titles, descriptions and preview indexing directives. It
  writes evidence to the ignored `out/render-check/` directory. This uses
  Next.js internal testing interfaces, so recheck it when upgrading Next.js.
- `node scripts/render-snapshots.mjs` creates visual-only HTML snapshots from
  the current build with local styles, fonts and imagery embedded. It removes
  client scripts; these snapshots cannot verify hydration, dialogs, saved
  preferences, editing, navigation or network activity.
- `node scripts/verify-images.mjs` requests the production `/_next/image`
  endpoint in process for all eight editorial images at widths 640 and 1920,
  quality 90, with WebP requested. It verifies status, MIME type and decoded
  image dimensions, including no upscaling beyond the source resolution. Each
  request has a 15-second timeout. Results go to
  `out/render-check/image-verification.json`; Next.js may populate its local
  image cache. This checks actual optimizer response bytes, not browser image
  selection or live HTTP/VPS delivery.
- `node scripts/verify-motion.mjs` checks tilt math, server-rendered visibility
  and static fallbacks, finite scroll composition, reduced-motion handling,
  cancellation and cleanup using React server rendering and mocked browser
  APIs. It does not launch a browser or verify actual animation rendering,
  hydration, focus behavior or scrolling.

The managed local environment rejected a TCP listener on `127.0.0.1:3000`
with `EPERM`. In-process rendering and static browser snapshots are useful
checks, but they do not establish live HTTP serving, browser interaction,
Nginx behavior, TLS, a successful VPS deployment or real-user performance.
Repeat the runtime and browser checks in an environment that can serve the
application. Verification results must refer to the final source and build,
not an earlier design iteration.

## VPS and launch

Follow [`docs/vps-deployment.md`](docs/vps-deployment.md) for the standalone
output layout, loopback-only PM2 process, Nginx HTTP template and required TLS
setup. The Linux VPS must build its own native dependencies; do not deploy
macOS `node_modules` or a macOS standalone build to it. The templates have not
been applied to a server.

Complete [`docs/launch-checklist.md`](docs/launch-checklist.md) before enabling
indexing, real user data, admin access or ads. That includes human review of
content, accurate authorship, approved policy wording, server-enforced admin
security, region-appropriate consent, the real publisher ID and a verified
canonical origin. A static design cannot guarantee AdSense approval.
