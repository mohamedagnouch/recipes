const fs = require('fs');

function getSlugs(path) {
  const content = fs.readFileSync(path, 'utf8');
  const regex = /slug:\s*["']([^"']+)["']/g;
  const slugs = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    slugs.push(m[1]);
  }
  return Array.from(new Set(slugs));
}

const files = [
  'app/data/recipes.ts',
  'app/data/dinnerRecipes.ts',
  'app/data/lunchRecipes.ts',
  'app/data/breakfastRecipes.ts',
  'app/data/dessertRecipes.ts',
  'app/data/appetizerRecipes.ts',
  'app/data/freeziesData.ts',
  'app/data/giadaCelebrityRecipesData.ts',
  'app/data/roundupArticlesData.ts'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const s = getSlugs(f);
    console.log(f, ':', s.length, 'slugs');
  }
});
