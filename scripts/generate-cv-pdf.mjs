// Generates the downloadable CV PDF by printing the /cv page with headless Chrome or Edge.
// Because the PDF is rendered from the same page and data.json, the online and PDF CVs stay identical.
//
// Usage: npm run build && npm run cv:pdf
// Set CHROME_PATH if your browser is installed somewhere unusual.

import { spawn, execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const data = JSON.parse(readFileSync(path.join(root, "data/data.json"), "utf8"));
const output = path.join(root, "public", data.cv.pdfUrl);
const port = 3123;
const url = `http://localhost:${port}/cv`;

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browser = candidates.find((candidate) => existsSync(candidate));
if (!browser) {
  console.error("No Chrome/Edge found. Set CHROME_PATH to a Chromium-based browser.");
  process.exit(1);
}

const server = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "start", "-p", String(port)], {
  cwd: root,
  stdio: "ignore",
});

async function waitForServer(timeoutMs = 60_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not respond at ${url}. Did you run "npm run build" first?`);
}

try {
  await waitForServer();
  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=5000",
    `--print-to-pdf=${output}`,
    url,
  ], { stdio: "ignore" });
  console.log(`CV written to ${path.relative(root, output)} (${Math.round(statSync(output).size / 1024)} KB)`);
} finally {
  server.kill();
}
