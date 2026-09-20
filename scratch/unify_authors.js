const fs = require('fs');
const path = require('path');

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

const files = walk('app');
let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace variations
  content = content.replace(/By Dishora Test Kitchen/g, 'By Dishora Editorial Team');
  content = content.replace(/By Dishora Culinary Team/g, 'By Dishora Editorial Team');
  content = content.replace(/By Dishora Editors/g, 'By Dishora Editorial Team');
  content = content.replace(/By Dishora Food Editors/g, 'By Dishora Editorial Team');
  content = content.replace(/By Dishora News Desk/g, 'By Dishora Editorial Team');
  content = content.replace(/By Dishora Kitchen Editors/g, 'By Dishora Editorial Team');
  content = content.replace(/By Dishora Culinary Editors/g, 'By Dishora Editorial Team');

  content = content.replace(/"Dishora Test Kitchen"/g, '"Dishora Editorial Team"');
  content = content.replace(/"Dishora Culinary Team"/g, '"Dishora Editorial Team"');
  content = content.replace(/"Dishora Editors"/g, '"Dishora Editorial Team"');
  content = content.replace(/"Dishora Culinary Studio"/g, '"Dishora Editorial Team"');
  content = content.replace(/Dishora Test Kitchen/g, 'Dishora Editorial Team');
  content = content.replace(/Dishora Culinary Team/g, 'Dishora Editorial Team');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
    console.log('Updated:', file);
  }
}
console.log('Total files updated:', modifiedCount);
