// Visual-only snapshots of prerendered HTML and in-process route output.
// Run verify-routes.mjs first for the dynamic journal source. These do not exercise
// hydration, navigation, HTTP, or interactive client behavior.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const build = path.join(root, "frontend/.next");
const destination = path.join(root, "out/render-check");
await fs.mkdir(destination, { recursive: true });
const routes = {
  home: "index",
  article: "blog/your-attention-is-the-most-valuable-thing-you-own",
  journal: null,
  technology: null,
  relationships: null,
  culture: null,
  about: "about",
  contact: "contact",
  privacy: "privacy",
  admin: "admin",
  posts: "admin/posts",
  editor: "admin/posts/new",
  settings: "admin/settings",
  missing: "_not-found",
};

async function dataUrl(file) {
  const type = file.endsWith(".ttf") ? "font/ttf" : file.endsWith(".woff2") ? "font/woff2" : "image/png";
  return `data:${type};base64,${(await fs.readFile(file)).toString("base64")}`;
}

for (const [name, route] of Object.entries(routes)) {
  const source = route === null ? path.join(destination, `${name}-source.html`) : path.join(build, `server/app/${route}.html`);
  let html = await fs.readFile(source, "utf8");
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  for (const match of [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/gi)]) {
    const href = match[0].match(/href="([^"]+)"/)[1];
    const cssFile = path.join(build, href.replace("/_next/", ""));
    let css = await fs.readFile(cssFile, "utf8");
    for (const font of [...css.matchAll(/url\(([^)]+)\)/g)]) {
      const url = font[1].replace(/["']/g, "");
      if (!url.includes("media/")) continue;
      const target = url.startsWith("/_next/") ? path.join(build, url.replace("/_next/", "")) : path.resolve(path.dirname(cssFile), url);
      css = css.replace(font[0], `url(${await dataUrl(target)})`);
    }
    html = html.replace(match[0], `<style>${css}</style>`);
  }
  html = html.replace(/<link\b[^>]*>/gi, "");
  for (const match of [...html.matchAll(/<img\b[^>]*>/gi)]) {
    let tag = match[0];
    const source = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (!source) continue;
    const url = new URL(source.replaceAll("&amp;", "&"), "http://snapshot.invalid");
    const imagePath = url.pathname === "/_next/image" ? url.searchParams.get("url") : url.pathname;
    if (!imagePath?.startsWith("/images/")) continue;
    tag = tag.replace(/\ssrcSet="[^"]*"/gi, "").replace(/\ssrc="[^"]*"/, ` src="${await dataUrl(path.join(root, "frontend/public", imagePath))}"`);
    html = html.replace(match[0], tag);
  }
  await fs.writeFile(path.join(destination, `${name}.html`), html);
}
for (const width of [390, 320]) {
  const filename = width === 390 ? "mobile.html" : "mobile-small.html";
  await fs.writeFile(path.join(destination, filename), `<!doctype html><html lang="en"><head><title>Stoa mobile render checks</title><style>body{margin:20px;background:#eeedff;font-family:Arial,sans-serif;color:#171717}main{display:flex;gap:24px}h2{font-size:14px}iframe{width:${width}px;height:844px;border:1px solid #60616b;background:white;display:block}</style></head><body><h1 style="font-size:20px">Built page snapshots at ${width} px</h1><main>${["home","journal","article","contact","admin"].map(name=>`<section><h2>${name}</h2><iframe title="${name} at ${width} pixels" src="${name}.html"></iframe></section>`).join("")}</main></body></html>`);
}
console.log(`Created ${Object.keys(routes).length} visual-only snapshots in out/render-check.`);
