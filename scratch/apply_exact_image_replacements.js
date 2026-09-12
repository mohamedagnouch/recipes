const fs = require('fs');

const exactMap = {
  'editor-theodora.jpg': 'dinner-spaghetti-best-dinner.jpg',
  'lunch-quinoa-grain-bowl.jpg': 'lunch-high-protein-salads-collection.jpg',
  'lunch-beef-shawarma-bowl.jpg': 'dinner-cowboy-sliders.jpg',
  'lunch-pulled-pork-sandwich.jpg': 'dinner-cowboy-sliders.jpg',
  'dessert-blueberry-crumble.jpg': 'dessert-cherry-dump-cobbler.jpg',
  'lunch-caprese-sandwich.jpg': 'lunch-greek-dakos-tomato-toast.jpg',
  'lunch-mediterranean-salad.jpg': 'lunch-fresh-tomato-salad.jpg',
  'breakfast-oatmeal-bowl.jpg': 'breakfast-blueberry-baked-oatmeal.jpg',
  'breakfast-smoothie-bowl.jpg': 'breakfast-apple-oatmeal-cookies.jpg',
  'dessert-chocolate-lava-cake.jpg': 'dessert-cast-iron-fudgy-skillet-brownie.jpg',
  'lunch-grilled-chicken-wrap.jpg': 'lunch-avocado-radish-toast.jpg',
  'dessert-cheesecake.jpg': 'dessert-best-vanilla-snack-cake.jpg',
  'breakfast-pancakes.jpg': 'breakfast-banana-egg-pancakes.jpg',
  'breakfast-egg-bites.jpg': 'breakfast-bacon-egg-muffins.jpg',
  'breakfast-chia-pudding.jpg': 'breakfast-blueberry-baked-oatmeal.jpg'
};

const dataFilePath = './app/data/collectionDetailsData.ts';
let content = fs.readFileSync(dataFilePath, 'utf8');

for (const [missing, actual] of Object.entries(exactMap)) {
  content = content.split(missing).join(actual);
}

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('Successfully replaced all 15 missing images with existing files!');
