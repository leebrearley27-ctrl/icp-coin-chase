// node check.js — static sanity checks for ICP Coin Chase
const fs = require('fs'), path = require('path'), vm = require('vm');
const d = __dirname; let ok = true;
const fail = m => { ok = false; console.log('FAIL', m); }, pass = m => console.log('ok  ', m);
for (const f of ['index.html', 'play.html', 'og.png', 'README.md', 'icon.svg']) fs.existsSync(path.join(d, f)) ? pass('exists ' + f) : fail('missing ' + f);
const idx = fs.readFileSync(path.join(d, 'index.html'), 'utf8');
const head = idx.split('</head>')[0];
const need = { 'twitter:card':'player', 'twitter:site':'@leebrearley27', 'twitter:title':'ICP Coin Chase',
  'twitter:description':null, 'twitter:image':null, 'twitter:player':null, 'twitter:player:width':'480', 'twitter:player:height':'480' };
for (const [k, v] of Object.entries(need)){
  const m = head.match(new RegExp('<meta name="' + k.replace(/:/g, '\\:') + '" content="([^"]*)"'));
  if (!m) fail('meta ' + k); else if (v && m[1] !== v) fail(`meta ${k}=${m[1]} (want ${v})`); else pass(`meta ${k}=${m[1]}`);
}
if (/PLACEHOLDER/.test(head)) console.log('note  public URL not set yet (https://PLACEHOLDER) — run node configure.js <https-url>');
if (/X-Frame-Options/i.test(idx + fs.readFileSync(path.join(d, 'play.html'), 'utf8'))) fail('X-Frame-Options found'); else pass('no X-Frame-Options');
for (const f of ['play.html', 'index.html', 'src/og-source.html']){
  const s = fs.readFileSync(path.join(d, f), 'utf8'); const re = /<script>([\s\S]*?)<\/script>/g; let m, n = 0;
  while ((m = re.exec(s))){ n++; try { new vm.Script(m[1], {filename: f}); pass('JS parses in ' + f); } catch(e){ fail(f + ': ' + e.message); } }
}
const png = fs.readFileSync(path.join(d, 'og.png')); const w = png.readUInt32BE(16), h = png.readUInt32BE(20);
(w >= 675 && h >= 675 && w === h) ? pass(`og.png ${w}x${h}, ${(png.length/1024).toFixed(0)} KB`) : fail(`og.png size ${w}x${h}`);
console.log(ok ? '\nALL CHECKS PASSED' : '\nSOME CHECKS FAILED'); process.exit(ok ? 0 : 1);
