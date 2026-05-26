import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(join(root, "docs/index.html"), "utf8");
const css = readFileSync(join(root, "docs/assets/css/style.css"), "utf8");
const js = readFileSync(join(root, "docs/assets/js/site.js"), "utf8");

const checks = [
  ["Chinese language", /<html lang="zh-CN">/.test(html)],
  ["Responsive viewport", /name="viewport"/.test(html)],
  ["Champion headline", /阿森纳.*2025\/26.*英超冠军/.test(html)],
  ["Long-form sections", (html.match(/<section\b/g) || []).length >= 12],
  ["Final table data", /85\s*分/.test(html) && /7\s*分领先/.test(html)],
  ["Official PL source links", (html.match(/premierleague\.com\/en\/news/g) || []).length >= 3],
  ["No placeholder copy", !/Seed content|illustrative|示例内容|Matchday Intelligence/.test(html + js)],
  ["Navigation anchors", /href="#chapter-season"/.test(html) && /href="#chapter-sources"/.test(html)],
  ["Visual system CSS", /hero-visual/.test(css) && /trophy-silhouette/.test(css)],
  ["No dominant purple theme", !/(purple|#8b5cf6|#a855f7|#7c3aed)/i.test(css)],
  ["Mobile layout rules", /@media\s*\(max-width:\s*760px\)/.test(css)],
  ["Search data updated", /2025\/26/.test(js) && /David Raya/.test(js)]
];

let failures = 0;
for (const [name, passed] of checks) {
  if (passed) {
    console.log(`PASS ${name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${name}`);
  }
}

if (failures > 0) {
  console.error(`${failures} verification checks failed.`);
  process.exit(1);
}

console.log("All verification checks passed.");
