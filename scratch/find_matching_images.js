const fs = require('fs');

const all = fs.readdirSync('./public/images');

console.log('--- LUNCH ---');
console.log(all.filter(f => f.startsWith('lunch')).slice(0, 15));

console.log('--- BREAKFAST ---');
console.log(all.filter(f => f.startsWith('breakfast')).slice(0, 15));

console.log('--- DESSERT ---');
console.log(all.filter(f => f.startsWith('dessert')).slice(0, 15));

console.log('--- EDITOR/AUTHOR ---');
console.log(all.filter(f => f.includes('editor') || f.includes('author') || f.includes('devan') || f.includes('theodora')));
