import { access, cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const frontendRoot = path.join(projectRoot, "frontend");
const buildRoot = path.join(frontendRoot, ".next");
const standaloneFrontend = path.join(buildRoot, "standalone", "frontend");

try {
  await Promise.all([
    access(path.join(standaloneFrontend, "server.js")),
    access(path.join(buildRoot, "static")),
    access(path.join(frontendRoot, "public")),
  ]);

  await mkdir(path.join(standaloneFrontend, ".next"), { recursive: true });
  await cp(
    path.join(frontendRoot, "public"),
    path.join(standaloneFrontend, "public"),
    { recursive: true, force: true },
  );
  await cp(
    path.join(buildRoot, "static"),
    path.join(standaloneFrontend, ".next", "static"),
    { recursive: true, force: true },
  );

  console.log("Standalone assets prepared in frontend/.next/standalone/frontend.");
} catch (error) {
  console.error(
    "Could not prepare standalone assets. Run a successful standalone build first; public assets, .next/static and .next/standalone/frontend/server.js must exist.",
  );
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
