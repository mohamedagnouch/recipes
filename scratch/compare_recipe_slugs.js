const { execSync } = require('child_process');
const fs = require('fs');

const recipeFiles = [
  'app/data/recipes.ts',
  'app/data/breakfastRecipes.ts',
  'app/data/dinnerRecipes.ts',
  'app/data/lunchRecipes.ts',
  'app/data/dessertRecipes.ts',
  'app/data/roundupArticlesData.ts',
  'app/data/giadaCelebrityRecipesData.ts'
];

function extractSlugsFromText(content) {
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return new Set(matches.map(m => m[1]));
}

let beforeTotalSlugs = new Set();
let afterTotalSlugs = new Set();

const fileBreakdown = {};

for (const file of recipeFiles) {
  // Get content before (commit 267d2e4)
  let beforeContent = '';
  try {
    beforeContent = execSync(`git show 267d2e4:${file.replace(/\\/g, '/')}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (e) {
    console.error('Error reading git show for', file, e.message);
  }
  const beforeSlugs = extractSlugsFromText(beforeContent);
  beforeSlugs.forEach(s => beforeTotalSlugs.add(s));

  // Get current content
  const currentContent = fs.readFileSync(file, 'utf8');
  const currentSlugs = extractSlugsFromText(currentContent);
  currentSlugs.forEach(s => afterTotalSlugs.add(s));

  fileBreakdown[file] = {
    beforeCount: beforeSlugs.size,
    afterCount: currentSlugs.size,
    missing: [...beforeSlugs].filter(s => !currentSlugs.has(s)),
    added: [...currentSlugs].filter(s => !beforeSlugs.has(s))
  };
}

console.log('=== Recipe Files Slug Comparison ===');
console.log('Total unique recipe slugs BEFORE (commit 267d2e4):', beforeTotalSlugs.size);
console.log('Total unique recipe slugs AFTER (current):', afterTotalSlugs.size);

const missingOverall = [...beforeTotalSlugs].filter(s => !afterTotalSlugs.has(s));
const addedOverall = [...afterTotalSlugs].filter(s => !beforeTotalSlugs.has(s));

console.log('Missing recipe slugs:', missingOverall.length === 0 ? 'NONE (0)' : missingOverall);
console.log('Added recipe slugs:', addedOverall.length === 0 ? 'NONE (0)' : addedOverall);
console.log('\nBreakdown per file:');
for (const [f, d] of Object.entries(fileBreakdown)) {
  console.log(`- ${f}: Before=${d.beforeCount}, After=${d.afterCount}, Missing=${d.missing.length}, Added=${d.added.length}`);
}

// Now check what was removed from the build
console.log('\n=== What was removed from the build? ===');
try {
  const freeziesBefore = execSync(`git ls-tree -r --name-only 267d2e4 app/freezies/`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  console.log('Freezies pages in 267d2e4:', freeziesBefore.length, 'files');
  console.log('Freezies paths:', freeziesBefore);
} catch (e) {
  console.log('Could not list freezies:', e.message);
}
