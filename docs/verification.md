# Static preview verification

## Preferred Source follow-up — 23 October 2026

Added a shared, server-rendered Google Preferred Source promotion to the public
footer and article endings. The default state is an explicitly disabled preview.
The live deeplink requires an approved HTTPS `SITE_URL` and the explicit
`GOOGLE_PREFERRED_SOURCE_ENABLED=true` build setting. No Google script or remote
badge asset is loaded, and no indexing rules were changed.

Validation for this follow-up:

- Lint and TypeScript passed; the final isolated production build generated
  29 pages successfully.
- The production handler passed 17/17 existing route checks, including preview
  noindex and no response cookies.
- 16/16 additional server-rendered placement/privacy checks passed: one badge
  on homepage/journal, two on articles, none in admin; default controls are
  disabled and no live Google preference link or SDK resource is emitted.
- 41/41 temporary helper/configuration/component checks passed. They covered
  active and inactive variants, valid domains/subdomains, local/reserved/IP
  and trailing-dot hosts, origin validation, exact activation-flag behavior,
  hostname-only query construction, new-tab disclosure, and referrer suppression.
  A trailing-dot reserved-host bypass found during review was corrected before
  the final run.
- Browser visual review could not start: the computer-use tool returned
  `Sky Computer Use native pipe startup failed`. These checks do not establish
  browser rendering or live Google eligibility. No account preferences changed.

The disposable `out/preferred-source-check/` build and evidence were removed
after verification. Product source and the existing development build were
preserved; type generation's incidental next-env.d.ts change was restored.

Search Console ownership is not configured in this codebase, and external DNS
verification was not inspected. Domain verification, Google source eligibility
and approved removal of public noindex remain launch tasks, documented in
`docs/launch-checklist.md`.

## Editorial refresh checkpoint

Verification checkpoint on 23 October 2026 for the eight-image Gen Z editorial
refresh, animated hero, interactive artwork, topic ribbon and scroll composition.
The final production build and regression checks include the follow-up focus,
mobile layout, touch-target, and dialog-button adjustments. Mobile visual
verification remains blocked by the available browser surface as described below.

## Automated checks completed

- Root `npm run lint` and `npm run typecheck`.
- A Next.js webpack production build in the isolated, ignored
  `out/build-check/` project copy, including eight public article routes and
  their admin editor previews. The user's existing development server and
  working build directory were preserved. The final build prerendered 29/29
  pages successfully.
- **17/17** production-route checks using `scripts/verify-routes.mjs`: public
  pages, all three categories, empty search, admin pages, and genuine 404
  responses for missing articles and unknown categories. Checks include a
  single title, description presence, preview `noindex`, no response cookies,
  and agreement between visible and Open Graph article dates.
- **16/16** image-optimizer checks using `scripts/verify-images.mjs`: all eight
  replacement images at requested widths 640 and 1920, quality 90, WebP output.
  Each returned 200 with decodable bytes. The smaller outputs were 640 × 427;
  the larger requests stayed at the source size of 1536 × 1024 rather than
  inventing extra resolution. This run reported no runtime errors.
- **7/7** source-level motion check groups using `scripts/verify-motion.mjs`:
  bounded tilt math; static server-rendered ribbon; visible, nonduplicated
  artwork and links; intersection threshold, finite stagger and one-time
  playback; reduced-motion cancellation; focus/pointer cancellation; and
  static fallback when animation APIs are unavailable. These use React server
  rendering and mocked browser APIs, not a live browser.
- All eight new source images have verified dimensions of 1536 × 1024.
- Standalone packaging completed. The entry file passed a syntax check, build
  IDs matched, static files were present, and all eight packaged images had
  SHA-256 hashes matching their sources.
- Independent source review covered 320–430 px layouts, grid shrinking, image
  aspect ratios, long text wrapping, dialog controls, forms and admin tables.
  This is code review, not measured browser layout or physical-device testing.

The route harness emits Next.js's standalone/start warning because it invokes
internal production handlers directly. The unknown-article case also logs an
internal `NoFallbackError`; its tested response is 404, not a 200 or a 500.
These scripts are version-specific diagnostics, not production startup scripts.

## Browser checks completed

- Native Chrome reached the user's already-running development site at
  `http://localhost:3000`. The refreshed desktop hero and new imagery were
  visibly inspected on the hydrated page.
- The topic ribbon's button responded through **Pause → Resume → Pause**.
  This establishes that the control was hydrated and responding to clicks;
  it does not establish every motion or reduced-motion behavior.
- The console revealed an `aria-hidden` warning when a clickable image link
  received focus. The source was changed to remove `aria-hidden` from those
  links and supply accessible labels. A fresh clean-console check after that
  change is still pending.
- Font-preload warnings were also observed in development tools. They are not
  claimed resolved.
- The 390 px responsive control was reached. Further captures became blank or
  inconsistent with the accessibility state, including the standalone visual
  HTML snapshots, so these captures were not accepted as mobile evidence.
  Resetting the computer-use session did not resolve this. A Safari fallback
  was rejected with `Computer Use was not approved to use Safari`.
- Chrome was returned to `http://localhost:3000/` with DevTools closed.

No new HTTP listener or development server was started for this review. The
production route and image tests still run entirely in-process. Access to an
existing development server is not production, VPS, Nginx or TLS verification.

## Remaining checks and limitations

- Complete final mobile/tablet visual review and the desktop regression review.
  Mobile layout and image crops have **not** been visually verified; the
  responsive implementation and source review are complete.
- Recheck the console and focused image links once browser rendering is
  available. A clear-console action is not proof that the warning is fixed.
- Live keyboard navigation, dialog focus flows, client navigation, editor
  saves and consent controls; actual pointer tilt, scroll-settle rendering,
  and OS/browser reduced-motion behavior. Source/mocked tests do not establish
  these interactions.
- Production standalone HTTP delivery. The managed shell previously rejected
  a new localhost TCP listener with `EPERM`; no restriction was bypassed.
- Lighthouse, real-user Core Web Vitals, Search Console, or live ad/CMP behavior.
- Online dependency audit: the registry was unreachable during the audit attempt
  (`ENOTFOUND registry.npmjs.org`). Repeat in a connected environment.
- VPS, Nginx, TLS, domain ownership, real authentication or production security.

The app intentionally remains a dummy-content, noindex preview. It has no real
advertising, analytics, newsletter delivery, contact submission or publishing.
Policy text and consent controls are drafts, not a legal-compliance certification
or a production CMP. The layout does not guarantee AdSense approval.

## Reproduce and finish review

1. Run `npm run lint`, `npm run typecheck`, and `node scripts/verify-motion.mjs`.
2. Build the final source with `npm run build` in a separate release/test copy
   if a development server is running. Do not build over its active directory.
   Run `node scripts/verify-routes.mjs` and `node scripts/verify-images.mjs`
   from that same built project copy.
3. Run `node scripts/render-snapshots.mjs` for visual-only HTML. These files
   deliberately omit client scripts and cannot prove interaction behavior.
4. Run `npm run prepare:standalone`, then serve the app in an environment where
   a listener is permitted. Check public and admin pages at desktop, tablet,
   390 px and 320 px, including dialogs, filters, validation and empty states.
5. Re-run the dependency audit and complete the VPS/launch checklists before
   any production use.

Generated test copies and snapshots are disposable and ignored by Git. This
iteration used `out/build-check/`; the verification scripts write evidence to
`out/render-check/` relative to the project copy where they run. The disposable
build copy and snapshots were removed after verification. Source assets,
reusable scripts and this verification record are retained.
