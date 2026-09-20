const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'app', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

console.log('Auditing data files in:', dataDir);

const fakeAuthors = [
  "Theodora Kaloudis",
  "Devan Grimsrud",
  "Micah Siva, RD",
  "Micah Siva",
  "Rachel Knecht",
  "Sara Bir",
  "Nick Evans",
  "Laurel Randolph",
  "Kat Lieu",
  "Sheela Prakash",
  "Myo Quinn",
  "Stephanie A. Ganz",
  "Stephanie A Ganz",
  "Stephanie A. Gunz",
  "Stephanie Burt",
  "Elise Bauer",
  "Cindy Rahe",
  "Jessica Furniss",
  "Chef Dishora",
  "Dishora Kitchen",
  "Mike Lang",
  "Mark Beahm",
  "Frank Tiu"
];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace fake authors
  for (const author of fakeAuthors) {
    // "author": "..." or author: "..." or author: "By ..."
    const r1 = new RegExp(`author:\\s*["'](?:By\\s+)?${author}["']`, 'g');
    content = content.replace(r1, 'author: "Dishora Editorial Team"');
    const r2 = new RegExp(`"author":\\s*["'](?:By\\s+)?${author}["']`, 'g');
    content = content.replace(r2, '"author": "Dishora Editorial Team"');
    
    // imageCredit: "Dishora Studio / Author" -> "Dishora"
    const r3 = new RegExp(`imageCredit:\\s*["']Dishora Studio\\s*/\\s*${author}["']`, 'g');
    content = content.replace(r3, 'imageCredit: "Dishora"');
    const r4 = new RegExp(`imageCredit:\\s*["']${author}["']`, 'g');
    content = content.replace(r4, 'imageCredit: "Dishora"');
  }

  // Any remaining "Dishora Studio / ..."
  content = content.replace(/imageCredit:\s*["']Dishora Studio(?:\s*\/\s*[^"']*)?["']/g, 'imageCredit: "Dishora"');

  // "authorRole": "Test Kitchen Staff" -> "Editorial Staff"
  content = content.replace(/authorRole:\s*["']Test Kitchen(?:\s*Staff)?["']/g, 'authorRole: "Editorial Staff"');

  // Test Kitchen Approved -> Carefully Developed
  content = content.replace(/"value":\s*"Test Kitchen Approved"/g, '"value": "Carefully Developed"');
  content = content.replace(/"label":\s*"Tested & Perfected"/g, '"label": "Recipe Quality"');

  // Specific claim in collectionDetailsData.ts line 1057
  content = content.replace(
    /Every recipe in this collection has earned at least 500 five-star reviews and survived multiple rounds of rigorous test kitchen testing\./g,
    'Selected for their reliable flavor, accessible ingredients, and straightforward cooking steps.'
  );

  // General text replacements for test kitchen claims in descriptions
  content = content.replace(/our test kitchen's/gi, "our editorial team's");
  content = content.replace(/in our test kitchen/gi, "for home cooks");
  content = content.replace(/developed in our test kitchen/gi, "developed for home kitchens");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  } else {
    console.log(`No changes needed: ${file}`);
  }
}
