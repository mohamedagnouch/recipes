const fs = require('fs');
const content = fs.readFileSync('./app/data/recipeCollectionsData.ts', 'utf8');
const regex = /id:\s*(\d+),\s*slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`${match[1]}: ${match[2]} | ${match[3]}`);
}
