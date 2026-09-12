const fs = require('fs');
const content = fs.readFileSync('app/data/freeziesData.ts', 'utf8');

const productMatches = content.matchAll(/id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?categorySlug:\s*"([^"]+)"/g);
for (const match of productMatches) {
  if (!match[1].startsWith('best-') && match[1] !== 'all') {
    console.log(`- ${match[1]}: ${match[2]} (${match[3]})`);
  }
}
