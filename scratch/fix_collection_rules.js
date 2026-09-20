const fs = require('fs');
const path = require('path');

// 1. collectionDetailsData.ts
const dataFile = path.join(__dirname, '..', 'app', 'data', 'collectionDetailsData.ts');
let content = fs.readFileSync(dataFile, 'utf8');

content = content.replace(
  /"These 16 test kitchen bakes and bowls/g,
  '"These 16 wholesome breakfast bakes and bowls'
);
content = content.replace(
  /"authorRole":\s*"Test Kitchen Associate"/g,
  '"authorRole": "Editorial Staff"'
);
content = content.replace(
  /testKitchenRules:\s*\{/g,
  'culinaryRules: {'
);
content = content.replace(
  /"testKitchenRules":\s*\[/g,
  '"culinaryRules": ['
);

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Updated collectionDetailsData.ts');

// 2. CollectionDetailClient.tsx
const clientFile = path.join(__dirname, '..', 'app', 'recipe-collections', '[slug]', 'CollectionDetailClient.tsx');
let clientContent = fs.readFileSync(clientFile, 'utf8');
clientContent = clientContent.replace(/collection\.testKitchenRules/g, 'collection.culinaryRules');
fs.writeFileSync(clientFile, clientContent, 'utf8');
console.log('Updated CollectionDetailClient.tsx');
