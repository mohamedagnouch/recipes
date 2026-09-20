const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('             COMPREHENSIVE AUDIT DISHORA            ');
console.log('====================================================\n');

// 1. Check public images vs referenced images
let imagesInPublic = new Set();
if (fs.existsSync('public/images')) {
  imagesInPublic = new Set(fs.readdirSync('public/images'));
}

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        files = files.concat(walk(full));
      }
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      files.push(full);
    }
  }
  return files;
}

const allAppFiles = walk('app');

let missingImages = new Map();
let totalImgRefs = 0;

for (const file of allAppFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/\/images\/([a-zA-Z0-9_\-\.]+\.(jpg|jpeg|png|webp|svg|gif))/gi);
  for (const m of matches) {
    totalImgRefs++;
    const imgName = m[1];
    if (!imagesInPublic.has(imgName)) {
      if (!missingImages.has(imgName)) {
        missingImages.set(imgName, []);
      }
      missingImages.get(imgName).push(file);
    }
  }
}

console.log('--- 1. Image Assets Audit ---');
console.log('Total images available in public/images:', imagesInPublic.size);
console.log('Total /images/... references found in code:', totalImgRefs);
console.log('Missing referenced images:', missingImages.size);
if (missingImages.size > 0) {
  console.log('Missing images list:');
  for (const [img, files] of missingImages.entries()) {
    console.log(`  - ${img} (in ${files.slice(0, 2).join(', ')})`);
  }
} else {
  console.log('✓ All referenced images exist in public/images/!');
}

// 2. SEO & Technical Checks
console.log('\n--- 2. Technical SEO & Schema Audit ---');
console.log('robots.ts exists:', fs.existsSync('app/robots.ts'));
console.log('sitemap.ts exists:', fs.existsSync('app/sitemap.ts'));
console.log('public/robots.txt (should NOT exist to avoid conflict):', fs.existsSync('public/robots.txt'));
console.log('public/ads.txt exists:', fs.existsSync('public/ads.txt'));

// Check domain consistency
let domainIssues = [];
for (const file of allAppFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('http://localhost:3000') || content.includes('https://localhost:3000')) {
    domainIssues.push({ file, issue: 'localhost:3000' });
  }
  if (content.includes('simplyrecipes.com')) {
    domainIssues.push({ file, issue: 'simplyrecipes.com' });
  }
}
console.log('Domain issues (localhost / simplyrecipes):', domainIssues.length === 0 ? '✓ None (All clean)' : domainIssues);

// 3. Google AdSense & Publisher Compliance
console.log('\n--- 3. Google AdSense / Publisher Compliance ---');
const essentialPages = [
  { name: 'About Us', path: 'app/about/page.tsx' },
  { name: 'Privacy Policy', path: 'app/privacy-policy/page.tsx' },
  { name: 'Terms of Service', path: 'app/terms-of-service/page.tsx' },
  { name: 'Contact Us', path: 'app/contact/page.tsx' },
  { name: 'Editorial Guidelines', path: 'app/editorial-guidelines/page.tsx' },
  { name: 'Advertise', path: 'app/advertise/page.tsx' },
  { name: 'Careers', path: 'app/careers/page.tsx' }
];

for (const p of essentialPages) {
  const exists = fs.existsSync(p.path);
  let length = 0;
  if (exists) {
    length = fs.readFileSync(p.path, 'utf8').length;
  }
  console.log(`- ${p.name} (${p.path}): ${exists ? `✓ Exists (${length} chars)` : '✗ MISSING'}`);
}

// 4. Broken internal links audit in navigation
console.log('\n--- 4. Navigation & Internal Links Audit ---');
const headerContent = fs.readFileSync('app/components/Header.tsx', 'utf8');
const footerContent = fs.readFileSync('app/components/Footer.tsx', 'utf8');

function checkRoutes(text, source) {
  const links = [...text.matchAll(/href=["'](\/[a-zA-Z0-9_\-\/]*)["']/g)].map(m => m[1]);
  const uniqueLinks = [...new Set(links)].filter(l => !l.startsWith('/api') && l !== '#');
  console.log(`Checking ${uniqueLinks.length} links in ${source}...`);
  for (const link of uniqueLinks) {
    const routePath = link === '/' ? 'app/page.tsx' : `app${link}/page.tsx`;
    const dynamicDir = `app${link.substring(0, link.lastIndexOf('/'))}/[slug]/page.tsx`;
    const exists = fs.existsSync(routePath) || fs.existsSync(dynamicDir) || fs.existsSync(`app${link}.tsx`);
    if (!exists) {
      console.log(`  ⚠ Warning: Link "${link}" in ${source} might not have a direct page file.`);
    }
  }
}

checkRoutes(headerContent, 'Header.tsx');
checkRoutes(footerContent, 'Footer.tsx');

// 5. Check recipes count in all data sources
console.log('\n--- 5. Content & Recipes Integrity ---');
const recipesFiles = [
  'app/data/recipes.ts',
  'app/data/breakfastRecipes.ts',
  'app/data/dinnerRecipes.ts',
  'app/data/lunchRecipes.ts',
  'app/data/dessertRecipes.ts',
  'app/data/roundupArticlesData.ts',
  'app/data/giadaCelebrityRecipesData.ts'
];

let totalSlugs = new Set();
for (const file of recipesFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
  matches.forEach(s => totalSlugs.add(s));
  console.log(`- ${file}: ${matches.length} recipes found`);
}
console.log(`Total unique recipe slugs in data files: ${totalSlugs.size}`);
