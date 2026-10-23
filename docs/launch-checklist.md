# Launch checklist

The current deliverable is a static interface prototype. All pages remain
`noindex`; sample content, preview metrics and policy drafts are not an AdSense
submission. The admin area is a public demo. No production backend, database,
sessions, authorization, advertising or analytics are connected.

The owner approved **Technology, Relationships and Culture** as the initial
editorial sections, with an extensible category model. Additional sections are
a future editorial decision. This is not a single-niche requirement attributed
to AdSense and does not promise approval for the selected topics.

## Editorial and identity

- [ ] Confirm the final brand, canonical domain and URL patterns. Keep the
  approved three-section taxonomy consistent across navigation, story data,
  filters and admin choices; review any additions before launch.
- [ ] Replace every sample article and metric with accurate content or remove
  it from the public release. A person reviews and fact-checks AI-assisted text.
- [ ] Use original, useful content, licensed imagery and real responsible
  authors. Do not invent credentials, experience, quotes or readership claims.
- [ ] Make About and Contact information accurate and usable; verify every
  public link and resolve empty or unfinished screens.
- [ ] Review Privacy and Terms drafts against actual site behavior, services,
  jurisdictions and the operator's identity. The owner approves final wording.
- [ ] Review each article's actual topic and claims. General relationship
  discussion is not automatically adult content, but explicit material and
  sensitive health, safety or legal advice need their relevant editorial and
  policy review before publication or monetization.

Google assesses original, useful content and navigation; a polished layout
cannot guarantee approval. [AdSense readiness guidance](https://support.google.com/adsense/answer/7299563)

## Production access and data

- [ ] Implement and verify server-enforced admin authentication, sessions,
  authorization, trusted-origin protection, validation and rate limits before
  permitting real editorial changes or storing private data.
- [ ] Add the Express/Mongoose backend only when that phase is approved. Create
  separate test and production databases and document migrations and backups.
- [ ] Connect forms only after approving their data purpose, fields, retention,
  providers and notices. Handle errors and deletion requests appropriately.
- [ ] Review infrastructure logs, retention, secrets, dependency audit results
  and TLS. Do not treat local typechecking as production security evidence.
- [ ] Disclose same-origin journal search requests and any query logging
  accurately. Do not imply search terms remain only in browser memory merely
  because contact fields and consent-preview choices do.

## Consent and advertising

- [ ] Confirm target regions and the actual vendors and data flows with the
  owner before enabling any analytics, cookies, local storage or advertising.
- [ ] Replace the consent UI preview with the approved real consent solution.
  For personalized advertising in the EEA, UK and Switzerland, use a
  Google-certified CMP integrated with the IAB TCF and supporting v2.3. Test
  initial denial, acceptance, category choices, withdrawal and consent records.
- [ ] Approve ad-enabled page types, manual or automatic placement, and density
  before adding real advertisements. Preserve space and keep ads distinct from
  navigation and other interaction targets. Never animate attention toward ads.
- [ ] Keep ads off admin, sign-in, error, confirmation, empty and unfinished
  screens. Never click your own ads, including during verification.
- [ ] Obtain the real publisher ID from the owner before creating `ads.txt`.
  Verify the real file at the chosen public origin; do not deploy a fake ID.
- [ ] Add accurate vendor disclosures and opt-out information to the approved
  privacy policy when advertising is actually configured.
- [ ] Measure performance and layout stability again with real ads and CMP
  enabled. A no-ad local run cannot prove live advertising behavior.

Sources: [Google consent requirements](https://support.google.com/adsense/answer/13554116),
[TCF v2.3](https://support.google.com/adsense/answer/16942036),
[EU user consent policy](https://www.google.com/about/company/user-consent-policy/),
[privacy disclosures](https://support.google.com/adsense/answer/1348695),
[ad placement](https://support.google.com/adsense/answer/1346295),
[publisher content requirements](https://support.google.com/publisherpolicies/answer/11112688).

## Search and deployment

- [ ] Approve the domain, HTTPS origin and www/apex canonical choice; set
  `SITE_URL` before building. Confirm redirects on alternate approved hosts.
- [ ] Verify unique titles and descriptions, real publication/update dates,
  image alt text, working links and exactly one appropriate absolute canonical
  on every intended indexable page.
- [ ] Add structured data describing real visible content and real authors;
  validate it with the appropriate Google or Schema.org tools.
- [ ] Obtain explicit launch approval before removing public preview
  `noindex`. Keep admin, previews, internal search and other nonindexable pages
  excluded. Do not use robots blocking to hide a `noindex` directive.
- [ ] Create the actual sitemap from approved canonical, indexable 200 URLs and
  genuine content modification dates. Add a deliberate robots configuration
  that keeps required assets and `Mediapartners-Google` crawlable. Neither file
  needs a fabricated domain or placeholder production content now.
- [ ] Verify Search Console ownership and submit the real sitemap. Check live
  HTML, indexing signals and status codes after deployment.
- [ ] Run the [VPS verification steps](vps-deployment.md), mobile accessibility
  checks, a production-build performance check and post-launch monitoring.
- [ ] Rebuild after the final content and design changes. Run
  `node scripts/verify-routes.mjs` for in-process route checks and
  `node scripts/render-snapshots.mjs` for static layout snapshots, then verify
  hydration, keyboard controls, dialogs, draft editing and navigation in the
  live browser. Neither script proves browser interaction or VPS serving.

Google may change its policies. Recheck the linked primary documentation when
the real site is configured; this checklist is a deployment aid, not a legal
opinion or a promise of AdSense approval.
