const fs = require('fs');
const path = require('path');
const full = path.join(__dirname, '..', 'app', 'data', 'collectionDetailsData.ts');
const lines = fs.readFileSync(full, 'utf8').split('\n');
lines.forEach((line, idx) => {
  if (/test\s*kitchen/i.test(line)) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
