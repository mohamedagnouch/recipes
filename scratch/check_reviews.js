const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'app', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  if (content.includes('reviews:') || content.includes('userReviews:') || content.includes('"reviews":')) {
    console.log(`Found reviews in: ${file}`);
  }
}
