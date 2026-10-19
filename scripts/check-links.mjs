// Post-build check: every internal href/src in dist/ must resolve to a file, and every #fragment to an id.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); } })(dist);

const ids = new Map();
const html = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]));
for (const [p, h] of html) ids.set(p, new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));

const resolve = (path) => {
  const rel = path.startsWith(base) ? path.slice(base.length) : null;
  if (rel === null) return null;
  for (const c of [join(dist, rel), join(dist, rel, 'index.html')]) if (existsSync(c) && statSync(c).isFile()) return c;
  return undefined;
};

let bad = 0;
for (const [page, h] of html) {
  for (const m of h.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|data:|\/\/)/.test(ref)) continue;
    const [pathPart, frag] = ref.split('#');
    let target = page;
    if (pathPart) {
      const abs = pathPart.startsWith('/') ? pathPart : join('/' + dirname(page.slice(dist.length)), pathPart).replace(/\\/g, '/');
      target = resolve(abs);
      if (target === null) continue;
      if (!target) { console.error(`${page.slice(dist.length)}: broken link ${ref}`); bad++; continue; }
    }
    if (frag && target.endsWith('.html') && !ids.get(target)?.has(frag)) { console.error(`${page.slice(dist.length)}: missing anchor ${ref}`); bad++; }
  }
}
console.log(`checked ${pages.length} pages, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
