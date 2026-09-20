const fs = require('fs');
const path = require('path');

const files = [
  'app/advertise/page.tsx',
  'app/careers/page.tsx',
  'app/data/appetizerRecipes.ts',
  'app/data/collectionDetailsData.ts',
  'app/recipe-collections/[slug]/CollectionDetailClient.tsx',
  'app/recipe-round-up/page.tsx',
  'app/recipes/giada-de-laurentiis-lemon-spaghetti/page.tsx',
  'app/recipes/[slug]/page.tsx',
  'app/api/contact/route.ts'
];

for (const rel of files) {
  const full = path.join(__dirname, '..', rel);
  if (!fs.existsSync(full)) continue;
  const lines = fs.readFileSync(full, 'utf8').split('\n');
  lines.forEach((line, idx) => {
    if (/test\s*kitchen/i.test(line)) {
      console.log(`[TK] ${rel}:${idx + 1}: ${line.trim()}`);
    }
    if (/dishora\s*studio/i.test(line)) {
      console.log(`[DS] ${rel}:${idx + 1}: ${line.trim()}`);
    }
    if (/\b(?:TODO|FIXME)\b/i.test(line)) {
      console.log(`[TODO] ${rel}:${idx + 1}: ${line.trim()}`);
    }
  });
}
