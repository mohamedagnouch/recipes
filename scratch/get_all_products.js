const fs = require('fs');
const content = fs.readFileSync('app/data/freeziesData.ts', 'utf8');

// Find export const freeziesProducts
const startIndex = content.indexOf('export const freeziesProducts: FreeziesProduct[] = [');
const slice = content.slice(startIndex);
const regex = /slug:\s*"([^"]+)"/g;
const slugs = [];
let match;
while ((match = regex.exec(slice)) !== null) {
  slugs.push(match[1]);
}
console.log('Total products in freeziesProducts:', slugs.length);
slugs.forEach(s => console.log('Product slug:', s));
