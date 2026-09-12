const fs = require('fs');

const content = fs.readFileSync('./app/data/collectionDetailsData.ts', 'utf8');
const available = new Set(fs.readdirSync('./public/images'));

// Match all "/images/filename"
const regex = /\/images\/([a-zA-Z0-9_\-\.]+)/g;
let match;
const missing = new Set();
const allReferenced = new Set();

while ((match = regex.exec(content)) !== null) {
  const filename = match[1];
  allReferenced.add(filename);
  if (!available.has(filename)) {
    missing.add(filename);
  }
}

console.log('Total unique images referenced:', allReferenced.size);
console.log('Missing count:', missing.size);
if (missing.size > 0) {
  console.log('Missing list:', Array.from(missing));
}
