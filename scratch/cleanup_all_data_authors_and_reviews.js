const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'app', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Any author that is NOT "Dishora Editorial Team" should become "Dishora Editorial Team"
  // Handles author: "...", "author": "...", author: '...'
  content = content.replace(/(["']?author["']?\s*:\s*["'])([^"']+)(["'])/g, (match, p1, p2, p3) => {
    // If it's already Dishora Editorial Team, keep it
    if (p2 === 'Dishora Editorial Team' || p2 === 'By Dishora Editorial Team') {
      return `${p1}Dishora Editorial Team${p3}`;
    }
    // Otherwise unify to Dishora Editorial Team
    return `${p1}Dishora Editorial Team${p3}`;
  });

  // 2. Remove all userReviews arrays with mock content: replace with empty array userReviews: []
  content = content.replace(/userReviews:\s*\[[\s\S]*?\](?=,\s*\n|\n\s*})/g, 'userReviews: []');

  // 3. Any remaining photoCredit or imageCredit with personal names or Dishora Studio
  content = content.replace(/(["']?imageCredit["']?\s*:\s*["'])([^"']+)(["'])/g, '$1Dishora$3');
  content = content.replace(/(["']?photoCredit["']?\s*:\s*["'])([^"']+)(["'])/g, '$1Dishora$3');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  } else {
    console.log(`No changes: ${file}`);
  }
}
