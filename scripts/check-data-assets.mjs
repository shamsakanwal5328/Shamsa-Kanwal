// Fails if data.json references a local file (/documents, /images, /profile) missing from public/.
// Catches broken CV, certificate and research document links before they are deployed.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const data = readFileSync(path.join(root, "data/data.json"), "utf8");
const paths = [...new Set(data.match(/"\/(?:documents|images|profile)\/[^"#?]+"/g) ?? [])].map((p) => p.slice(1, -1));
const missing = paths.filter((p) => !existsSync(path.join(root, "public", decodeURIComponent(p))));

if (missing.length > 0) {
  console.error(`Missing files referenced in data/data.json:\n${missing.map((p) => `  public${p}`).join("\n")}`);
  process.exit(1);
}
console.log(`All ${paths.length} files referenced in data/data.json exist.`);
