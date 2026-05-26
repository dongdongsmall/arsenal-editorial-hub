import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const oldHome = readFileSync(join(root, "docs/index.html"), "utf8");
const tastePath = join(root, "docs/taste/index.html");
const tasteCssPath = join(root, "docs/taste/assets/style.css");
const tasteJsPath = join(root, "docs/taste/assets/site.js");

const tasteHtml = existsSync(tastePath) ? readFileSync(tastePath, "utf8") : "";
const tasteCss = existsSync(tasteCssPath) ? readFileSync(tasteCssPath, "utf8") : "";
const tasteJs = existsSync(tasteJsPath) ? readFileSync(tasteJsPath, "utf8") : "";

const checks = [
  ["Old homepage preserved", /阿森纳 2025\/26 英超冠军 · 冠军长卷/.test(oldHome)],
  ["Taste page exists", existsSync(tastePath)],
  ["Taste CSS exists", existsSync(tasteCssPath)],
  ["Taste JS exists", existsSync(tasteJsPath)],
  ["Taste title", /North London, Finally/.test(tasteHtml)],
  ["Chinese longform", /二十二年/.test(tasteHtml) && /冠军不是烟花/.test(tasteHtml)],
  ["No em dash", !/[—]/.test(tasteHtml + tasteCss + tasteJs)],
  ["No scroll cue", !/继续阅读|Scroll|scroll|↓/.test(tasteHtml)],
  ["No purple slop", !/(purple|#8b5cf6|#a855f7|#7c3aed)/i.test(tasteCss)],
  ["Single accent red", /--accent:\s*#b7132b/.test(tasteCss)],
  ["Hero viewport discipline", /min-height:\s*100dvh/.test(tasteCss) && !/h-screen/.test(tasteHtml + tasteCss)],
  ["Reduced motion", /prefers-reduced-motion:\s*reduce/.test(tasteCss)],
  ["Mobile rules", /@media\s*\(max-width:\s*760px\)/.test(tasteCss)],
  ["Search interaction", /tasteSearchIndex/.test(tasteJs) && /David Raya/.test(tasteJs)],
  ["Official source links", (tasteHtml.match(/premierleague\.com\/en\/news/g) || []).length >= 3],
  ["Standalone taste route", tasteHtml.includes('href="./"') && tasteHtml.includes('href="#sources"')]
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
  console.error(`${failures} taste checks failed.`);
  process.exit(1);
}

console.log("All taste site checks passed.");
