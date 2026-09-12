const fs = require('fs');
const path = require('path');

const dataFilePath = './app/data/collectionDetailsData.ts';
let content = fs.readFileSync(dataFilePath, 'utf8');

const availableImages = new Set(fs.readdirSync('./public/images'));

// Find all imageUrl lines
const regex = /imageUrl:\s*["']\/images\/([^"']+)["']/g;
let match;
const missingImages = [];

while ((match = regex.exec(content)) !== null) {
  const filename = match[1];
  if (!availableImages.has(filename)) {
    missingImages.push(filename);
  }
}

console.log('Total missing image references:', missingImages.length);
console.log('Missing list:', [...new Set(missingImages)]);

// Replacement mapping for missing images to real existing files in public/images
const fallbackMap = {
  'dinner-salmon-asparagus.jpg': 'dinner-salmon-bean-salad.jpg',
  'dinner-lemon-ricotta-pasta.jpg': 'dinner-tuscan-tortellini.jpg',
  'dinner-honey-garlic-chicken.jpg': 'dinner-deviled-chicken.jpg',
  'dinner-chicken-parmesan.jpg': 'dinner-crispy-chicken-greens.jpg',
  'dinner-beef-enchiladas.jpg': 'dinner-enchilada-casserole.jpg',
  'dinner-beef-bolognese.jpg': 'dinner-spaghetti-meatballs.jpg',
  'dinner-lasagna-bolognese.jpg': 'dinner-4-ingredient-pasta-bake.jpg',
  'dinner-steak-asparagus.jpg': 'dinner-steak-fingers.jpg',
  'dinner-lemon-rosemary-chicken.jpg': 'dinner-chicken-rice-casserole.jpg',
  'dinner-risotto-mushrooms.jpg': 'dinner-italian-sausage-pasta.jpg',
  'dinner-carbonara.jpg': 'dinner-spaghetti-best-dinner.jpg',
  'dinner-chicken-fajitas.jpg': 'dinner-crispy-chicken-greens.jpg',
  'dinner-garlic-butter-shrimp.jpg': 'dinner-spaghetti-fra-diavolo.jpg',
  'dinner-creamy-garlic-chicken.jpg': 'dinner-chicken-rice-casserole.jpg',
  'lunch-salmon-grain-bowl.jpg': 'lunch-spicy-salmon-cucumber-rice-bowl.jpg',
  'lunch-quinoa-grain-bowl.jpg': 'lunch-ancient-grains-bowl.jpg',
  'lunch-beef-shawarma-bowl.jpg': 'lunch-steak-burrito-bowl.jpg',
  'lunch-pulled-pork-sandwich.jpg': 'lunch-cuban-sandwich.jpg',
  'lunch-caprese-sandwich.jpg': 'lunch-turkey-club-croissant.jpg',
  'lunch-mediterranean-salad.jpg': 'lunch-greek-farro-salad.jpg',
  'lunch-tuna-salad-sandwich.jpg': 'lunch-white-bean-salmon-salad.jpg',
  'lunch-grilled-chicken-wrap.jpg': 'lunch-chicken-caesar-wrap.jpg',
  'breakfast-oatmeal-bowl.jpg': 'breakfast-steel-cut-oatmeal.jpg',
  'breakfast-smoothie-bowl.jpg': 'breakfast-acai-bowl.jpg',
  'breakfast-chia-pudding.jpg': 'breakfast-overnight-chia-pudding.jpg',
  'breakfast-egg-bites.jpg': 'breakfast-sheet-pan-eggs.jpg',
  'breakfast-shakshuka.jpg': 'breakfast-sweet-potato-hash.jpg',
  'breakfast-pancakes.jpg': 'breakfast-blueberry-ricotta-pancakes.jpg',
  'breakfast-avocado-toast.jpg': 'avocado-bean-toast.jpg',
  'dessert-chocolate-lava-cake.jpg': 'dessert-lava-cake.jpg',
  'dessert-cheesecake.jpg': 'dessert-basque-cheesecake.jpg',
  'dessert-blueberry-crumble.jpg': 'dessert-peach-blackberry-galette.jpg',
  'appetizer-mozzarella-bites.jpg': 'appetizer-mozzarella-bites.jpg'
};

// Check fallbackMap validity
for (const [missing, replacement] of Object.entries(fallbackMap)) {
  if (!availableImages.has(replacement)) {
    console.warn(`WARNING: Replacement ${replacement} does not exist!`);
  }
}

// Replace missing in content
let updatedContent = content;
for (const [missing, replacement] of Object.entries(fallbackMap)) {
  if (availableImages.has(replacement)) {
    updatedContent = updatedContent.split(missing).join(replacement);
  }
}

fs.writeFileSync(dataFilePath, updatedContent, 'utf8');
console.log('Successfully updated collectionDetailsData.ts with verified existing images!');
