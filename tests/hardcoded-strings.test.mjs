import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join, sep } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const src = fileURLToPath(new URL("../src/", import.meta.url));

/** Attributes whose values are read by people or assistive technology. */
const USER_FACING_ATTRIBUTES = new Set(["aria-label", "aria-description", "aria-roledescription", "aria-valuetext", "alt", "placeholder", "title", "label"]);

/**
 * Text that intentionally stays in components:
 * - the official slogan, which is not translated (also split across lines),
 * - the PROSAFE brand and the "PROSAFE / " eyebrow prefix,
 * - the technical browser storage key shown in <code> on the privacy page.
 */
const ALLOWED = new Set([
  "SAFETY WITHOUT COMPROMISE.",
  "SAFETY WITHOUT",
  "COMPROMISE.",
  "Safety without compromise.",
  "PROSAFE",
  "PROSAFE /",
  "prosafe.quote.v1",
]);

/**
 * Data that is not UI copy and moves to the localized data model in M9.3.
 * These are .ts modules, so the .tsx scan below never reads them; they are
 * listed here so the exception is documented and checked to still exist.
 */
const DEFERRED_DATA = [
  "features/catalog/products.ts",
  "features/industries/industries.ts",
  "lib/product-categories.ts",
  "features/protection-explorer/zones.ts",
  "features/quote/request/validation.ts",
  "features/quote/request/http.server.ts",
  "features/quote/request/submission.server.ts",
  "features/quote/request/delivery.server.ts",
];

async function sourceFiles() {
  const out = [];
  for (const entry of await readdir(src, { recursive: true, withFileTypes: true })) {
    const path = join(entry.parentPath, entry.name);
    if (entry.isFile() && path.endsWith(".tsx") && !path.includes(`${sep}i18n${sep}dictionaries${sep}`)) out.push(path);
  }
  return out.sort();
}

const hasWords = (text) => /\p{L}{2,}/u.test(text);
const normalize = (text) => text.replace(/\s+/gu, " ").trim();

function findings(path, source) {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const out = [];
  const report = (node, text) => {
    const value = normalize(text);
    if (!hasWords(value) || ALLOWED.has(value)) return;
    const { line } = file.getLineAndCharacterOfPosition(node.getStart());
    out.push(`${path.slice(src.length)}:${line + 1} ${JSON.stringify(value)}`);
  };
  const literalText = (node) =>
    ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text
      : ts.isTemplateExpression(node) ? [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" ")
      : null;
  // String literals rendered as JSX children, including both branches of conditionals.
  const visitRendered = (node) => {
    const text = literalText(node);
    if (text !== null) return report(node, text);
    if (ts.isConditionalExpression(node)) { visitRendered(node.whenTrue); visitRendered(node.whenFalse); }
    else if (ts.isBinaryExpression(node)) { visitRendered(node.left); visitRendered(node.right); }
    else if (ts.isParenthesizedExpression(node)) visitRendered(node.expression);
  };
  const visit = (node) => {
    if (ts.isJsxText(node)) report(node, node.text);
    else if (ts.isJsxExpression(node) && node.expression && !ts.isJsxAttribute(node.parent)) visitRendered(node.expression);
    else if (ts.isJsxAttribute(node) && USER_FACING_ATTRIBUTES.has(node.name.getText(file)) && node.initializer) {
      if (ts.isStringLiteral(node.initializer)) report(node, node.initializer.text);
      else if (ts.isJsxExpression(node.initializer) && node.initializer.expression) visitRendered(node.initializer.expression);
    } else if (ts.isPropertyAssignment(node) && ["title", "description", "default", "template"].includes(node.name.getText(file))) {
      const text = literalText(node.initializer);
      if (text !== null && !/^%s \| PROSAFE$/u.test(text)) report(node, text);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}

test("components and views contain no hardcoded user-facing text", async () => {
  const all = [];
  for (const path of await sourceFiles()) all.push(...findings(path, await readFile(path, "utf8")));
  assert.deepEqual(all, [], `Move these strings into the dictionaries:\n${all.join("\n")}`);
});

test("the scanner detects hardcoded text, attributes, conditionals and metadata", () => {
  const sample = `
    export const metadata = { title: "Hardcoded title" };
    export function X({ ok }) {
      return <div aria-label="Hardcoded label" className="not-user-facing">
        Hardcoded text
        {ok ? "Yes branch" : "No branch"}
        <img alt={\`Alt \${ok}\`} />
        SAFETY WITHOUT COMPROMISE.
      </div>;
    }`;
  const found = findings(`${src}sample.tsx`, sample).map((line) => line.replace(/^[^ ]+ /u, ""));
  assert.deepEqual(found, ['"Hardcoded title"', '"Hardcoded label"', '"Hardcoded text"', '"Yes branch"', '"No branch"', '"Alt"']);
});

test("documented deferred data modules still exist", async () => {
  for (const path of DEFERRED_DATA) await readFile(join(src, path), "utf8");
});
