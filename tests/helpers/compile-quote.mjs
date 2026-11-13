import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const projectRoot = fileURLToPath(new URL("../../", import.meta.url));

/** Compile only the testable quote service graph using the project's existing TypeScript compiler. */
export async function compileQuoteSources(extraSources = []) {
  const root = await mkdtemp(join(tmpdir(), "prosafe-quote-tests-"));
  const folder = "src/features/quote/request";
  const sources = (await readdir(resolve(projectRoot, folder)))
    .filter((name) => name.endsWith(".ts"))
    .map((name) => `${folder}/${name}`);
  sources.push("src/features/catalog/products.ts", "src/features/catalog/types.ts", "src/lib/product-categories.ts");
  sources.push(...extraSources);
  for (const source of sources) {
    const input = await readFile(resolve(projectRoot, source), "utf8");
    const output = ts.transpileModule(input, {
      fileName: source,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText.replace(/require\("@\/([^"\n]+)"\)/gu, (_match, path) =>
      `require(${JSON.stringify(`./${relative(dirname(source), `src/${path}`)}`)})`);
    const target = join(root, source.replace(/\.ts$/u, ".js"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, output);
  }
  // The Next.js marker is virtual in framework builds; this is a Node-only server test context.
  const marker = join(root, "node_modules/server-only");
  await mkdir(marker, { recursive: true });
  await writeFile(join(marker, "index.js"), '"use strict";\n');
  const load = createRequire(join(root, "test-runner.cjs"));
  return {
    root,
    load: (path) => load(join(root, path.replace(/\.ts$/u, ".js"))),
    cleanup: () => rm(root, { recursive: true, force: true }),
  };
}
