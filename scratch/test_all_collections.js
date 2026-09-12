const http = require('http');

const testUrls = [
  'http://localhost:3000/recipe-collections',
  'http://localhost:3000/recipe-collections/our-most-saved-recipes-this-month',
  'http://localhost:3000/recipe-collections/easy-ground-beef-dinners-weeknights',
  'http://localhost:3000/recipe-collections/ultimate-weekend-cookout-recipes',
  'http://localhost:3000/recipe-collections/bucket-list-end-of-summer-recipes',
  'http://localhost:3000/recipe-collections/best-dinner-recipes-of-all-time',
  'http://localhost:3000/recipe-collections/authentic-italian-dinners-nonna-kitchen',
  'http://localhost:3000/recipe-collections/five-quick-easy-dinners-fuel-week',
  'http://localhost:3000/recipe-collections/low-stress-sheet-pan-school-dinners',
  'http://localhost:3000/recipe-collections/dinners-so-easy-have-energy-to-spare',
  'http://localhost:3000/recipe-collections/best-crispy-juicy-chicken-recipes',
  'http://localhost:3000/recipe-collections/vibrant-high-fiber-sides-weeknights',
  'http://localhost:3000/recipe-collections/thirty-one-easy-thirty-min-dinners',
  'http://localhost:3000/recipe-collections/kid-approved-healthy-after-school-snacks',
  'http://localhost:3000/recipe-collections/cozy-comfort-food-dinners-lazy-sunday',
  'http://localhost:3000/recipe-collections/high-protein-fiber-dinners-under-thirty-mins',
  'http://localhost:3000/recipe-collections/fifteen-minute-toasts-and-sandwiches-lunch',
  'http://localhost:3000/recipe-collections/creamy-italian-dinners-no-red-sauce',
  'http://localhost:3000/recipe-collections/treat-yourself-indulgent-bakes-and-dinners',
  'http://localhost:3000/recipe-collections/hearty-breakfasts-from-around-the-world',
  'http://localhost:3000/recipe-collections/thirty-minute-recipes-smoky-bacon-star',
  'http://localhost:3000/recipe-collections/high-fiber-morning-bakes-start-your-day',
  'http://localhost:3000/recipe-collections/crisp-mediterranean-recipes-late-summer',
  'http://localhost:3000/recipe-collections/make-ahead-casseroles-sunday-gatherings',
  'http://localhost:3000/recipe-collections/clever-pantry-meals-no-grocery-run',
  'http://localhost:3000/recipe-collections/grab-and-go-breakfasts-back-to-school',
  'http://localhost:3000/recipe-collections/easy-dump-dinners-every-night',
  'http://localhost:3000/recipe-collections/fresh-skewer-recipes-outdoor-grilling',
  'http://localhost:3000/recipe-collections/beloved-heirloom-family-recipes-forever'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          length: body.length,
          hasH1: body.includes('<h1')
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing', testUrls.length, 'URLs...');
  for (const u of testUrls) {
    const res = await checkUrl(u);
    console.log(`${res.status} | len:${res.length} | hasH1:${res.hasH1} | ${u}`);
  }
}

run();
