const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(appDir);
console.log(`Auditing ${allFiles.length} files in app/ for compliance...`);

const checks = [
  { name: 'Freezies', regex: /freezies/i },
  { name: 'Test Kitchen', regex: /test\s*kitchen/i },
  { name: 'Dishora Studio', regex: /dishora\s*studio/i },
  { name: 'Theodora Kaloudis', regex: /theodora\s*kaloudis/i },
  { name: 'Nick Evans', regex: /nick\s*evans/i },
  { name: 'Laurel Randolph', regex: /laurel\s*randolph/i },
  { name: 'Kat Lieu', regex: /kat\s*lieu/i },
  { name: 'Sheela Prakash', regex: /sheela\s*prakash/i },
  { name: 'Myo Quinn', regex: /myo\s*quinn/i },
  { name: 'Stephanie A. Ganz', regex: /stephanie\s*(?:a\.?\s*)?ganz/i },
  { name: 'Elise/Elisa Bauer', regex: /elis[ea]\s*bauer/i },
  { name: 'Cindy Rahe', regex: /cindy\s*rahe/i },
  { name: 'Devan Grimsrud', regex: /devan\s*grimsrud/i },
  { name: 'Jessica Furniss', regex: /jessica\s*furniss/i },
  { name: 'Fake metrics (3,600 / 8M / 20+ years / 100+ contributors)', regex: /(?:3,?600\+|8M\+|20\+\s*years|100\+\s*contributors|100\+\s*expert)/i },
  { name: 'aggregateRating', regex: /aggregateRating/i },
  { name: 'triple-tested / tested in-house', regex: /(?:triple-tested|tested\s*three\s*times|tested\s*in-house|tested\s*at\s*least\s*3\s*times)/i },
  { name: 'Lorem ipsum', regex: /lorem\s*ipsum/i },
  { name: 'TODO / FIXME', regex: /\b(?:TODO|FIXME)\b/i },
];

let totalIssues = 0;

for (const check of checks) {
  let matched = [];
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (check.regex.test(content)) {
      const relPath = path.relative(path.join(__dirname, '..'), file);
      matched.push(relPath);
    }
  }
  if (matched.length > 0) {
    console.log(`⚠️ MATCH FOUND for "${check.name}" in ${matched.length} files:`);
    for (const m of matched) {
      console.log(`   - ${m}`);
    }
    totalIssues += matched.length;
  } else {
    console.log(`✅ Clean: "${check.name}" (0 occurrences)`);
  }
}

console.log(`\nAudit complete. Total flag count: ${totalIssues}`);
