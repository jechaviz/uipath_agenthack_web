import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4273);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.vue': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function route(url) {
  const clean = decodeURIComponent((url || '/').split('?')[0]);
  const target = clean === '/' ? '/index.html' : clean;
  const full = resolve(root, `.${target}`);
  if (!full.startsWith(resolve(root))) return null;
  return existsSync(full) ? full : resolve(root, 'index.html');
}

createServer(async (req, res) => {
  const path = route(req.url);
  if (!path) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const body = await readFile(path);
  res.writeHead(200, {
    'content-type': types[extname(path)] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(body);
}).listen(port, () => {
  console.log(`Agentic Incident Ops web: http://localhost:${port}`);
});
