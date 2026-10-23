# VPS deployment

These are operator instructions and configuration templates. Nothing here has
been installed on a VPS, and no DNS, certificates, firewall rules or running
services have been changed. The owner selected VPS hosting; the domain,
canonical hostname and Linux distribution still need to be supplied.

## Runtime and build

Use the latest patched **Node.js 22 LTS** release for the Linux VPS. Install npm,
PM2 and Nginx through the operator's approved installation process. Run the
application as an unprivileged deployment user. Node 22 is an LTS branch;
recheck its support status when deploying. [Node.js release schedule](https://nodejs.org/en/about/previous-releases)

Build on the Linux VPS or in a Linux build environment matching its CPU and
runtime. Do not copy macOS `node_modules` or a macOS standalone build to Linux:
packages such as Next.js's compiler and image tooling include platform-specific
binaries. Copy or clone the source and committed lockfile into a new release
directory, separate from a running development or production build.

From that release's repository root:

```sh
npm ci
npm run typecheck
npm run lint
npm run build
npm run prepare:standalone
node scripts/verify-routes.mjs
```

The frontend build script explicitly uses `next build --webpack`. The optional
route verification runs Next.js's production request handler inside the Node
process; it does not start an HTTP server or substitute for the live checks
below. `node scripts/render-snapshots.mjs` produces visual-only snapshots of a
build for layout inspection and removes client scripts, so it cannot validate
interactive browser behavior.

The preparation script copies `frontend/public` and `frontend/.next/static`
into `frontend/.next/standalone/frontend/`. Next.js excludes those assets from
standalone output by default. Run preparation after each successful fresh
build. Keep the entire `frontend/.next/standalone` directory together, including
its traced `node_modules`; its server is
`frontend/.next/standalone/frontend/server.js`.

This layout depends on `output: "standalone"` and an `outputFileTracingRoot`
pointing at the monorepo root in the frontend configuration. See the installed
Next.js documentation at
`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md`.

## Environment settings

The frontend's `.env.example` documents the current application settings.
`SITE_URL` is optional for this preview. Leave it unset until the owner approves
the public origin, including HTTPS and the www/apex decision. Without it, the
preview omits canonical URLs. Supplying it does **not** authorize removing
`noindex` or publishing the dummy content.

When the origin is approved, set `SITE_URL` in the build environment or an
uncommitted `frontend/.env.local` before rebuilding. Static metadata is created
at build time; changing only the PM2 process environment will not regenerate it.
The current prototype needs no database, ad account or authentication secrets.
Do not place future secrets in source, the PM2 template or a public-prefixed
environment variable.

The standalone process uses these runtime settings:

| Setting | Value | Purpose |
| --- | --- | --- |
| `NODE_ENV` | `production` | Runs the production build. |
| `HOSTNAME` | `127.0.0.1` | Keeps Node reachable only through the local proxy. |
| `PORT` | `3000` | Matches the supplied Nginx upstream. |

## Start and inspect the application

For a foreground check, run from the repository root:

```sh
HOSTNAME=127.0.0.1 PORT=3000 npm run start:standalone
```

Check the response from another terminal, then stop the foreground process
before starting PM2 on the same port:

```sh
curl -I http://127.0.0.1:3000/
```

After inspection, the supplied PM2 template can start or restart only STOA:

```sh
pm2 startOrRestart deploy/ecosystem.config.js --only stoa --update-env
pm2 status stoa
pm2 logs stoa --lines 80 --nostream
curl -I http://127.0.0.1:3000/
```

The configuration resolves its repository location automatically. Run PM2 as
the same unprivileged deployment user each time. For reboot persistence, the
operator can run `pm2 startup`, review and execute its generated service command,
then run `pm2 save` only after the application is healthy. These are server
changes, not part of local prototype validation. [PM2 ecosystem configuration](https://pm2.keymetrics.io/docs/usage/application-declaration/)

For an update, build in a separate release directory and keep the previous
working release available. Inspect the active PM2 process's path before
switching it to the new release; verify its final path and responses afterward.
Do not run `next build` over a directory that is currently serving requests.

## Nginx and HTTPS

`deploy/nginx.http.conf.example` is an **HTTP bootstrap template**, not a complete
public production configuration. Replace `YOUR_CONFIRMED_DOMAIN` with the
owner-approved hostname. Inspect the VPS's existing server blocks and install
it as a separate site using the distribution's layout; do not replace unrelated
sites or assume a default-site path.

The template proxies to loopback, preserves Next.js status codes, and overwrites
forwarded client headers. It assumes Nginx receives traffic directly. If a CDN
or load balancer sits in front of it, configure the trusted proxy addresses and
real-IP handling for that actual chain first. It does not configure shared
proxy caching, robots blocking, a script-restricting CSP or canonical redirects.
[Nginx proxy documentation](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)

Before reloading a reviewed Nginx configuration, run:

```sh
sudo nginx -t
```

Reload only after that succeeds, using the VPS's service manager. Confirm the
approved DNS record points at this VPS and that the required HTTP/HTTPS ports
are available. Do not open the Node port to the internet.

**HTTPS is required before public launch.** Follow the Certbot instructions for
the actual operating system and Nginx installation. Once Certbot is installed,
the following is an example with a hostname placeholder, not a command that has
been executed:

```sh
sudo certbot --nginx -d YOUR_CONFIRMED_DOMAIN
sudo certbot renew --dry-run
```

Review the resulting certificate configuration and HTTP-to-HTTPS redirect.
Add alternate hosts only after the owner chooses them, verifies their DNS and
approves canonical redirects. Verify the HTTPS site, certificate renewal and
the `X-Forwarded-Proto` received by Node. [Certbot Nginx instructions](https://certbot.eff.org/instructions?ws=nginx&os=snap)

## Verify before sharing a preview

- Check `/` and a known article return 200; a nonexistent article must return
  404, including through Nginx. An unavailable upstream must not become a 200
  error page.
- Open the site on desktop and mobile. Check local fonts, images and
  `/_next/static/` assets, navigation, focus states and browser errors.
- Inspect rendered page HTML for `noindex` on both public and admin previews.
  `noindex` is a search directive, not an access-control system.
- Keep `/admin` limited to dummy data. It is a public visual demo with no login
  or authorization. Do not add confidential content or real publishing access.
- Inspect browser requests and storage. The prototype must not enable ads,
  analytics, newsletter delivery or persistent tracking.
- Confirm the journal search's same-origin `q` query is handled as documented;
  search URLs may appear in browser history and infrastructure logs. Contact
  preview fields must remain local and must never be sent as URL parameters.
- Review infrastructure log retention separately. Application-level tracking
  being absent does not mean a VPS or reverse proxy never records IP addresses.

The managed development environment rejected the local loopback listener with
`EPERM`. Local standalone preparation, in-process request rendering or offline
page snapshots do not prove live serving. The templates have not been validated
against a live Linux server. VPS runtime,
PM2 lifecycle, Nginx configuration, DNS, TLS and real-world performance require
verification in the chosen deployment environment. Complete the
[launch checklist](launch-checklist.md) before changing this preview into a
publicly indexed, monetized site.
