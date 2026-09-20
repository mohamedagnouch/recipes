const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'app', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

const authors = new Set();
for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  const matches = content.matchAll(/"?author"?:\s*["']([^"']+)["']/g);
  for (const m of matches) {
    authors.add(m[1]);
  }
}

console.log('Unique authors in app/data:');
for (const a of authors) {
  console.log(' -', a);
}
