#!/usr/bin/env node
// Fill in the public HTTPS base URL for the X player card tags.
// Usage: node configure.js https://your-host.example/icp-coin-chase
const fs = require('fs'), path = require('path');
const base = (process.argv[2] || '').replace(/\/+$/, '');
if (!/^https:\/\/[^\s]+$/.test(base)) { console.error('Give the public HTTPS base URL, e.g. node configure.js https://example.com/icp-coin-chase'); process.exit(1); }
const f = path.join(__dirname, 'index.html');
let s = fs.readFileSync(f, 'utf8');
const n = (s.match(/https:\/\/PLACEHOLDER/g) || []).length;
if (!n) { console.error('No https://PLACEHOLDER left in index.html (already configured?)'); process.exit(1); }
s = s.replace(/https:\/\/PLACEHOLDER/g, base);
fs.writeFileSync(f, s);
console.log(`Replaced ${n} placeholder(s) with ${base}. Check with https://cards-dev.x.com or by previewing a draft post.`);
