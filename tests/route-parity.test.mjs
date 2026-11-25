import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join, sep } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const app = fileURLToPath(new URL("../src/app/", import.meta.url));
const trees = { sq: join(app, "(sq)"), en: join(app, "en") };

async function files(root) {
  const out = [];
  for (const entry of await readdir(root, { recursive: true, withFileTypes: true })) {
    // Path below the tree root. Built by slicing: Tailwind scans tests, and the
    // node:path helper's name is also a utility class name.
    if (entry.isFile()) out.push(join(entry.parentPath, entry.name).slice(root.length + sep.length));
  }
  return out.sort();
}

/** Express a wrapper in locale-neutral form so the two trees can be compared exactly. */
function normalize(source, locale) {
  let text = source;
  if (locale === "en") text = text.replace(/(PageProps|LayoutProps)<"\/en(?=[/"])/gu, '$1<"').replace(/<"">/gu, '<"/">');
  return text.replaceAll(`"${locale}"`, '"LOCALE"');
}

test("Albanian and English route trees contain the same route files", async () => {
  const [sq, en] = await Promise.all([files(trees.sq), files(trees.en)]);
  assert.deepEqual(en, sq);
  // 14 pages (13 content routes + catch-all), 2 dynamic not-found boundaries, root not-found, 3 layouts.
  assert.equal(sq.filter((file) => file.endsWith("page.tsx")).length, 14);
});

test("route wrappers are identical apart from the locale", async () => {
  for (const file of await files(trees.sq)) {
    const [sq, en] = await Promise.all([readFile(join(trees.sq, file), "utf8"), readFile(join(trees.en, file), "utf8")]);
    assert.equal(normalize(en, "en"), normalize(sq, "sq"), file);
  }
});

test("route wrappers stay thin and delegate to shared views", async () => {
  for (const file of await files(trees.sq)) {
    for (const [locale, root] of Object.entries(trees)) {
      const source = await readFile(join(root, file), "utf8");
      assert.ok(source.split("\n").length <= 20, `${locale}/${file} is longer than a thin wrapper`);
      for (const [, specifier] of source.matchAll(/from "([^"]+)"/gu)) {
        assert.ok(/^(@\/views\/|\.\.\/root-document$|next\/navigation$)/u.test(specifier), `${locale}/${file} imports ${specifier}`);
      }
    }
  }
});
