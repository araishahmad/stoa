import assert from "node:assert/strict";
import { access, mkdir, writeFile } from "node:fs/promises";
import { Socket } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getRequestHandlers } from "next/dist/server/lib/start-server.js";
import { createRequestResponseMocks } from "next/dist/server/lib/mock-request.js";

// Exercise the real production image route and decode its response bytes.
// All sources are local public assets. No HTTP listener or external fetch is used.
// Next.js may populate its normal .next/cache/images cache during these requests.
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const frontendRoot = path.join(projectRoot, "frontend");
const outputRoot = path.join(projectRoot, "out", "render-check");
const requestTimeoutMs = 15000;
const quality = 90;
const widths = [640, 1920];
const imageNames = [
  "stoa-genz-attention.png",
  "stoa-genz-conversation.png",
  "stoa-genz-weird-web.png",
  "stoa-genz-phone.png",
  "stoa-genz-plans.png",
  "stoa-genz-paper.png",
  "stoa-genz-friendship.png",
  "stoa-genz-tools.png",
];

await access(path.join(frontendRoot, ".next", "BUILD_ID"));
const sources = await Promise.all(imageNames.map(async (name) => {
  const metadata = await sharp(path.join(frontendRoot, "public", "images", name)).metadata();
  assert.ok(metadata.width && metadata.height, `Missing source dimensions: ${name}`);
  return { name, width: metadata.width, height: metadata.height, format: metadata.format };
}));

const runtimeErrors = [];
function recordRuntimeError(error) {
  runtimeErrors.push(error instanceof Error ? error.stack ?? error.message : String(error));
}
process.on("uncaughtExceptionMonitor", recordRuntimeError);

const { requestHandler: handler, server } = await getRequestHandlers({
  dir: frontendRoot,
  isDev: false,
  hostname: "stoa.test",
  port: 3000,
});

async function requestInProcess(url) {
  const chunks = [];
  // An unconnected socket supplies Node stream lifecycle methods that Next's
  // minimal socket stub deliberately omits. It never binds or connects.
  const socket = new Socket();
  const { req, res } = createRequestResponseMocks({
    url,
    method: "GET",
    headers: {
      host: "stoa.test",
      accept: "image/webp",
      "user-agent": "StoaImageVerification/1.0",
    },
    socket,
    resWriter(chunk) { chunks.push(Buffer.from(chunk)); return true; },
  });
  let timeout;
  try {
    await Promise.race([
      (async () => { await handler(req, res); await res.hasStreamed; })(),
      new Promise((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error(`Image request exceeded ${requestTimeoutMs}ms: ${url}`));
        }, requestTimeoutMs);
      }),
    ]);
    return { status: res.statusCode, headers: res.getHeaders(), body: Buffer.concat(chunks) };
  } finally {
    clearTimeout(timeout);
    socket.destroy();
  }
}

const results = [];
try {
  await mkdir(outputRoot, { recursive: true });
  for (const source of sources) {
    for (const requestedWidth of widths) {
      const query = new URLSearchParams({
        url: `/images/${source.name}`,
        w: String(requestedWidth),
        q: String(quality),
      });
      const url = `/_next/image?${query}`;
      const result = {
        image: source.name,
        url,
        sourceWidth: source.width,
        sourceHeight: source.height,
        sourceFormat: source.format,
        requestedWidth,
        quality,
        expectedWidth: Math.min(source.width, requestedWidth),
        failures: [],
      };
      try {
        const response = await requestInProcess(url);
        result.status = response.status;
        result.contentType = response.headers["content-type"];
        result.bytes = response.body.length;
        result.cacheStatus = response.headers["x-nextjs-cache"];
        assert.equal(response.status, 200, `Expected 200; body: ${response.body.subarray(0, 160).toString("utf8")}`);
        assert.match(String(result.contentType), /^image\/webp(?:\s*;|$)/i, "Expected image/webp response");
        assert.ok(result.bytes > 12, "Response must contain image bytes");
        assert.equal(response.body.subarray(0, 4).toString("ascii"), "RIFF", "Missing WebP RIFF signature");
        assert.equal(response.body.subarray(8, 12).toString("ascii"), "WEBP", "Missing WebP format signature");
        const optimized = await sharp(response.body).metadata();
        result.outputWidth = optimized.width;
        result.outputHeight = optimized.height;
        result.outputFormat = optimized.format;
        assert.equal(optimized.format, "webp", "Response bytes must decode as WebP");
        assert.equal(optimized.width, result.expectedWidth, "Output width must resize without upscaling");
        assert.ok(optimized.height > 0 && optimized.height <= source.height, "Output height must not upscale the source");
        assert.ok(Math.abs(optimized.height - source.height * result.expectedWidth / source.width) <= 1, "Output must preserve the source aspect ratio");
        if (response.headers["content-length"] !== undefined) {
          assert.equal(Number(response.headers["content-length"]), result.bytes, "Content-Length must match the returned bytes");
        }
      } catch (error) {
        result.failures.push(error instanceof Error ? error.message : String(error));
      }
      results.push(result);
      console.log(`${result.failures.length ? "FAIL" : "PASS"} ${source.name} w=${requestedWidth} q=${quality}: ${result.status ?? "no response"}, ${result.contentType ?? "no MIME type"}, ${result.outputWidth ?? "?"}x${result.outputHeight ?? "?"}, ${result.bytes ?? 0} bytes`);
      for (const failure of result.failures) console.error(`  ${failure}`);
    }
  }
  await writeFile(path.join(outputRoot, "image-verification.json"), JSON.stringify({
    method: "Next.js production /_next/image handler with in-process request/response mocks; local assets only; no HTTP listener",
    limitations: "Does not verify browser image selection, hydration, network transport, Nginx, TLS, Linux native binaries or live VPS serving.",
    requestTimeoutMs,
    runtimeErrors,
    results,
  }, null, 2));
  const failed = results.filter((result) => result.failures.length).length;
  console.log(`\n${results.length - failed}/${results.length} image endpoint checks passed. Evidence: out/render-check/image-verification.json`);
  if (runtimeErrors.length) {
    console.error(`Image verification encountered ${runtimeErrors.length} runtime error(s):`);
    for (const error of runtimeErrors) console.error(error);
  }
  if (failed || runtimeErrors.length) process.exitCode = 1;
} finally {
  await server.close();
  process.off("uncaughtExceptionMonitor", recordRuntimeError);
}
