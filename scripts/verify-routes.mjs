import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getRequestHandlers } from "next/dist/server/lib/start-server.js";
import { createRequestResponseMocks } from "next/dist/server/lib/mock-request.js";

// Uses the installed Next.js request handler and its own stream mocks.
// No HTTP server is created, no socket is bound, and no request leaves this process.
// This checks production handler output, not browser hydration, Nginx, or live HTTP.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendRoot = path.join(projectRoot, "frontend");
const outputRoot = path.join(projectRoot, "out", "render-check");
const { requestHandler: handler, server } = await getRequestHandlers({
  dir: frontendRoot,
  isDev: false,
  hostname: "stoa.test",
  port: 3000,
});

const cases = [
  { url: "/", status: 200, contains: "Your attention is the most valuable thing you own", save: "home-source.html" },
  { url: "/blog", status: 200, contains: "8 stories", save: "journal-source.html" },
  { url: "/blog?category=Technology", status: 200, contains: "3 stories", excludes: "The conversations we keep putting off", save: "technology-source.html" },
  { url: "/blog?category=Relationships", status: 200, contains: "3 stories", excludes: "Your attention is the most valuable thing you own", save: "relationships-source.html" },
  { url: "/blog?category=Culture", status: 200, contains: "2 stories", excludes: "The conversations we keep putting off", save: "culture-source.html" },
  { url: "/blog?q=zzzz", status: 200, contains: "No stories found", save: "empty-search-source.html" },
  { url: "/blog?category=Unknown", status: 404 },
  { url: "/blog/your-attention-is-the-most-valuable-thing-you-own", status: 200, contains: "What did you come here to do?", publishedAt: "2026-10-22T09:00:00Z", save: "article-source.html" },
  { url: "/blog/no-such-story", status: 404 },
  { url: "/about", status: 200, contains: "The publication is taking shape." },
  { url: "/privacy", status: 200, contains: "Cookies and local storage" },
  { url: "/terms", status: 200, contains: "Demonstration content" },
  { url: "/contact", status: 200, contains: "Preview message", save: "contact-source.html" },
  { url: "/admin", status: 200, contains: "Good stories start here.", save: "admin-source.html" },
  { url: "/admin/posts", status: 200, contains: "Every story, in one place." },
  { url: "/admin/posts/new", status: 200, contains: "Story title" },
  { url: "/admin/settings", status: 200, contains: "Behind the publication." },
];

async function requestInProcess(url) {
  const chunks = [];
  const { req, res } = createRequestResponseMocks({
    url,
    method: "GET",
    headers: { host: "stoa.test", "user-agent": "StoaInProcessVerification/1.0", accept: "text/html" },
    resWriter(chunk) { chunks.push(Buffer.from(chunk)); return true; },
  });
  let timeout;
  try {
    await Promise.race([
      (async () => { await handler(req, res); await res.hasStreamed; })(),
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error(`Timed out rendering ${url}`)), 15000); }),
    ]);
    return { status: res.statusCode, headers: res.getHeaders(), html: Buffer.concat(chunks).toString("utf8") };
  } finally {
    clearTimeout(timeout);
  }
}

const results = [];
try {
  await mkdir(outputRoot, { recursive: true });
  for (const check of cases) {
    const response = await requestInProcess(check.url);
    const visibleHtml = response.html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
    const titleMatches = [...visibleHtml.matchAll(/<title>([\s\S]*?)<\/title>/g)];
    const robots = [...visibleHtml.matchAll(/<meta\s+name="robots"\s+content="([^"]*)"/g)].map((match) => match[1]);
    const descriptions = [...visibleHtml.matchAll(/<meta\s+name="description"\s+content="([^"]*)"/g)].map((match) => match[1]);
    const failures = [];
    try {
      assert.equal(response.status, check.status, `${check.url}: HTTP status`);
      assert.equal(titleMatches.length, 1, `${check.url}: expected one title`);
      assert.ok(robots.some((value) => value.includes("noindex")), `${check.url}: preview must be noindex`);
      assert.ok(response.headers["x-robots-tag"]?.includes("noindex"), `${check.url}: expected noindex response header`);
      assert.equal(response.headers["set-cookie"], undefined, `${check.url}: preview must not set cookies`);
      if (check.status === 200) assert.equal(descriptions.length, 1, `${check.url}: expected one meta description`);
      if (check.contains) assert.ok(visibleHtml.includes(check.contains), `${check.url}: expected ${JSON.stringify(check.contains)}`);
      if (check.excludes) assert.ok(!visibleHtml.includes(check.excludes), `${check.url}: unexpected ${JSON.stringify(check.excludes)}`);
      if (check.publishedAt) {
        assert.ok(visibleHtml.includes(`property="article:published_time" content="${check.publishedAt}"`), `${check.url}: article metadata date mismatch`);
        assert.ok(new RegExp(`<time[^>]+datetime="${check.publishedAt}"`, "i").test(visibleHtml), `${check.url}: visible publication date mismatch`);
      }
    } catch (error) { failures.push(error.message); }
    if (check.save) await writeFile(path.join(outputRoot, check.save), response.html);
    const result = { url: check.url, expectedStatus: check.status, actualStatus: response.status, title: titleMatches[0]?.[1], robots, robotsHeader: response.headers["x-robots-tag"], setsCookie: response.headers["set-cookie"] !== undefined, descriptionCount: descriptions.length, bytes: Buffer.byteLength(response.html), failures };
    results.push(result);
    console.log(`${failures.length ? "FAIL" : "PASS"} ${response.status} ${check.url} | ${result.title ?? "no title"}`);
    for (const failure of failures) console.error(`  ${failure}`);
  }
  await writeFile(path.join(outputRoot, "route-verification.json"), JSON.stringify({ method: "Next.js production request handler with in-process mock streams; no HTTP listener", results }, null, 2));
  const failed = results.filter((result) => result.failures.length).length;
  console.log(`\n${results.length - failed}/${results.length} route checks passed. Evidence: out/render-check/route-verification.json`);
  if (failed) process.exitCode = 1;
} finally {
  await server.close();
}
