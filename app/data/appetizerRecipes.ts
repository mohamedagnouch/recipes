import type { Recipe, RelatedArticle } from "./recipes";

export const appetizerRelatedArticles: RelatedArticle[] = [
  {
    id: 1001,
    slug: "creamy-spinach-artichoke-dip",
    category: "DIP RECIPES",
    title: "Warm Skillet Creamy Spinach Artichoke Dip",
    author: "By Meghan Splawn",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/appetizer-spinach-artichoke-dip.jpg",
  },
  {
    id: 1002,
    slug: "whipped-feta-hot-honey-dip",
    category: "DIP RECIPES",
    title: "Whipped Feta Dip with Hot Honey and Crushed Pistachios",
    author: "By Kat Lieu",
    rating: 5,
    time: "15 mins",
    imageUrl: "/images/appetizer-whipped-feta-dip.jpg",
  },
  {
    id: 1003,
    slug: "charred-corn-black-bean-salsa",
    category: "SALSA RECIPES",
    title: "Smoky Charred Sweet Corn and Black Bean Salsa",
    author: "By Sara Bir",
    rating: 5,
    time: "20 mins",
    imageUrl: "/images/appetizer-charred-corn-salsa.jpg",
  },
  {
    id: 1004,
    slug: "roasted-tomatillo-salsa-verde",
    category: "SALSA RECIPES",
    title: "Fire-Roasted Tomatillo Salsa Verde",
    author: "By Jessica Furniss",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/appetizer-tomatillo-salsa-verde.jpg",
  },
];

export const appetizerRecipesData: Recipe[] = [
  // 1. DIP RECIPES
  {
    id: 1001,
    slug: "creamy-spinach-artichoke-dip",
    title: "Warm Skillet Creamy Spinach Artichoke Dip",
    leadText: "Bubbling, creamy, and loaded with tender artichoke hearts, melted mozzarella, and sharp parmesan. Served hot with crispy tortilla or pita chips.",
    badge: "CROWD FAVORITE",
    category: "Dip Recipes",
    rating: 5,
    ratingsCount: 342,
    reviewCount: 98,
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "280 kcal",
    author: "Meghan Splawn",
    authorRole: "Senior Food Editor",
    date: "June 14, 2026",
    imageUrl: "/images/appetizer-spinach-artichoke-dip.jpg",
    imageAlt: "Warm bubbling skillet creamy spinach artichoke dip",
    imageCredit: "Dishora Studio / Meghan Splawn",
    description: "The ultimate party centerpiece that disappears faster than any other snack on the table. A velvety base of cream cheese, sour cream, and garlic folded with sautéed baby spinach and zesty marinated artichokes.",
    whyMakeThis: [
      "Comes together in one bowl before baking golden and bubbly in a cast iron skillet.",
      "Can be assembled up to 24 hours in advance and baked right before guests arrive.",
      "Ultra-rich cheese pull with both mozzarella and aged parmesan."
    ],
    ingredients: [
      "8 oz cream cheese, softened at room temperature",
      "1/2 cup sour cream or whole milk Greek yogurt",
      "1/4 cup mayonnaise",
      "2 cloves garlic, finely minced",
      "10 oz frozen chopped spinach, thawed and squeezed very dry",
      "14 oz can quartered artichoke hearts, drained and chopped",
      "1 1/2 cups shredded low-moisture mozzarella cheese (divided)",
      "1/2 cup freshly grated Parmigiano-Reggiano",
      "1/4 tsp red pepper flakes",
      "1/2 tsp kosher salt & 1/4 tsp black pepper",
      "Warm tortilla chips or toasted baguette slices for dipping"
    ],
    instructions: [
      {
        step: 1,
        title: "Preheat and prepare dish",
        text: "Preheat oven to 375°F (190°C). Lightly grease a 9-inch cast iron skillet or oven-safe baking dish.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Blend the creamy base",
        text: "In a large mixing bowl, beat together the softened cream cheese, sour cream, mayonnaise, minced garlic, salt, pepper, and red pepper flakes until smooth and lump-free.",
        timerMinutes: 3
      },
      {
        step: 3,
        title: "Fold in greens and cheese",
        text: "Fold in the thoroughly dried spinach, chopped artichoke hearts, 1 cup of mozzarella, and half the grated parmesan until evenly distributed.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Bake until bubbling",
        text: "Spread the mixture into the prepared skillet. Top with remaining mozzarella and parmesan. Bake for 20 minutes until bubbling around the edges and lightly golden on top.",
        timerMinutes: 20
      }
    ],
    nutrition: {
      calories: "280 kcal",
      protein: "10g",
      carbs: "8g",
      fat: "23g",
      sodium: "410mg",
      fiber: "2g"
    },
    tips: [
      "Squeeze out as much liquid from the spinach as possible using a clean dish towel to prevent watery dip.",
      "Broil on high for the final 2 minutes for a deeply browned, bubbly crust."
    ],
    tags: ["Dips", "Appetizers", "Party", "Cheese", "Vegetarian"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1002,
    slug: "whipped-feta-hot-honey-dip",
    title: "Whipped Feta Dip with Hot Honey and Crushed Pistachios",
    leadText: "Silky whipped Greek feta cheese emulsified with lemon juice and olive oil, drizzled with spicy chili hot honey and roasted pistachios.",
    badge: "VIRAL HIT",
    category: "Dip Recipes",
    rating: 5,
    ratingsCount: 285,
    reviewCount: 74,
    prepTime: "15 mins",
    cookTime: "0 mins",
    totalTime: "15 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "210 kcal",
    author: "Kat Lieu",
    authorRole: "Contributing Recipe Developer",
    date: "July 2, 2026",
    imageUrl: "/images/appetizer-whipped-feta-dip.jpg",
    imageAlt: "Creamy whipped feta dip with chili hot honey drizzle and pistachios",
    imageCredit: "Dishora Studio / Kat Lieu",
    description: "An effortless 15-minute appetizer that looks and tastes like a dish from a fine Mediterranean bistro. Tangy block feta is transformed in the food processor into an airy, cloud-like dip.",
    whyMakeThis: [
      "No cooking or oven required — ready in just 15 minutes.",
      "The perfect balance of salty feta, floral honey, mild heat, and nutty crunch.",
      "Pairs wonderfully with warm fluffy pita bread, seeded crackers, or fresh radishes."
    ],
    ingredients: [
      "8 oz Greek feta cheese (in brine), drained and crumbled",
      "1/2 cup Greek whole milk yogurt",
      "3 tbsp extra virgin olive oil (divided)",
      "1 tbsp freshly squeezed lemon juice",
      "1 small clove garlic, grated",
      "2 tbsp hot chili honey (or wildflower honey with a pinch of red pepper flakes)",
      "1/4 cup roasted unsalted pistachios, coarsely chopped",
      "1 tbsp fresh mint or dill leaves, roughly chopped",
      "Flaky sea salt and fresh black pepper",
      "Pita wedges or sourdough crostini for serving"
    ],
    instructions: [
      {
        step: 1,
        title: "Whip the feta and yogurt",
        text: "In the bowl of a food processor, combine crumbled feta, Greek yogurt, 2 tablespoons olive oil, lemon juice, and grated garlic.",
        timerMinutes: 2
      },
      {
        step: 2,
        title: "Process until velvety smooth",
        text: "Process for 3 to 4 minutes on high speed, scraping down the sides with a spatula halfway through, until the mixture is silky, light, and spreadable.",
        timerMinutes: 4
      },
      {
        step: 3,
        title: "Plate and garnish",
        text: "Spoon the whipped feta into a shallow serving bowl and use the back of a spoon to create rustic swoops. Drizzle hot honey and remaining olive oil over the top.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Top and serve",
        text: "Scatter chopped pistachios, fresh mint, and a sprinkle of flaky sea salt over the swirls. Serve immediately at room temperature.",
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: "210 kcal",
      protein: "7g",
      carbs: "9g",
      fat: "17g",
      sodium: "390mg",
      fiber: "1g"
    },
    tips: [
      "Use block feta packed in brine for maximum creaminess; pre-crumbled feta has anti-caking agents that make it gritty.",
      "Bring the feta to room temperature for 15 minutes before blending for the smoothest emulsion."
    ],
    tags: ["Dips", "Mediterranean", "Quick", "No-Cook", "Vegetarian"],
    relatedArticles: appetizerRelatedArticles
  },

  // 2. SALSA RECIPES
  {
    id: 1003,
    slug: "charred-corn-black-bean-salsa",
    title: "Smoky Charred Sweet Corn and Black Bean Salsa",
    leadText: "Sweet corn kernels blistered in a screaming hot skillet, tossed with black beans, ripe tomatoes, diced jalapeño, and fresh lime juice.",
    badge: "SUMMER ESSENTIAL",
    category: "Salsa Recipes",
    rating: 5,
    ratingsCount: 198,
    reviewCount: 47,
    prepTime: "10 mins",
    cookTime: "10 mins",
    totalTime: "20 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "120 kcal",
    author: "Sara Bir",
    authorRole: "Senior Culinary Producer",
    date: "July 18, 2026",
    imageUrl: "/images/appetizer-charred-corn-salsa.jpg",
    imageAlt: "Smoky charred corn and black bean salsa served with tortilla chips",
    imageCredit: "Dishora Studio / Sara Bir",
    description: "Bursting with smoky sweetness, zesty lime, and crisp cilantro, this vibrant salsa works equally well as a standalone chip dip or spooned over grilled chicken and fish tacos.",
    whyMakeThis: [
      "Charring the corn caramelizes natural sugars for an irresistible deep flavor.",
      "Naturally vegan, gluten-free, and high in fiber.",
      "Tastes even better the second day after the flavors have marinated together."
    ],
    ingredients: [
      "3 cups sweet corn kernels (fresh or frozen, thawed)",
      "1 tbsp neutral oil or olive oil",
      "1 can (15 oz) black beans, rinsed and thoroughly drained",
      "1 cup diced roma tomatoes, seeds removed",
      "1/2 cup finely diced red onion",
      "1 fresh jalapeño pepper, seeded and finely minced",
      "1/3 cup fresh cilantro leaves, chopped",
      "Juice of 2 fresh limes (about 3 tablespoons)",
      "1/2 tsp ground cumin",
      "1/2 tsp smoked paprika",
      "3/4 tsp kosher salt & freshly cracked pepper",
      "Crisp tortilla chips for dipping"
    ],
    instructions: [
      {
        step: 1,
        title: "Char the corn",
        text: "Heat oil in a heavy cast-iron skillet over high heat. Add corn in an even layer and cook undisturbed for 3–4 minutes until charred on the bottom. Stir and cook 2–3 minutes more until blistered.",
        timerMinutes: 8
      },
      {
        step: 2,
        title: "Cool slightly",
        text: "Transfer charred corn to a wide mixing bowl and let cool for 5 minutes so it does not wilt the fresh herbs.",
        timerMinutes: 5
      },
      {
        step: 3,
        title: "Combine all ingredients",
        text: "Add the black beans, diced tomatoes, red onion, jalapeño, cilantro, lime juice, ground cumin, smoked paprika, and salt.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Toss and chill",
        text: "Toss thoroughly to coat. Taste and adjust seasoning with extra lime or salt. Serve chilled or at room temperature.",
        timerMinutes: 5
      }
    ],
    nutrition: {
      calories: "120 kcal",
      protein: "5g",
      carbs: "22g",
      fat: "2.5g",
      sodium: "220mg",
      fiber: "5g"
    },
    tips: [
      "If using frozen corn, pat it thoroughly dry with paper towels before hitting the hot pan to get proper charring.",
      "Add a diced creamy avocado right before serving for extra rich texture."
    ],
    tags: ["Salsa", "Corn", "Party", "Healthy", "Vegan"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1004,
    slug: "roasted-tomatillo-salsa-verde",
    title: "Fire-Roasted Tomatillo Salsa Verde",
    leadText: "Tart husked tomatillos, serrano peppers, and sweet onions charred under the broiler and blended with cilantro and lime.",
    badge: "AUTHENTIC RECIPE",
    category: "Salsa Recipes",
    rating: 5,
    ratingsCount: 220,
    reviewCount: 63,
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "45 kcal",
    author: "Jessica Furniss",
    authorRole: "Recipe Developer",
    date: "June 29, 2026",
    imageUrl: "/images/appetizer-tomatillo-salsa-verde.jpg",
    imageAlt: "Rustic stone bowl of fire-roasted tomatillo salsa verde",
    imageCredit: "Dishora Studio / Jessica Furniss",
    description: "A staple of Mexican cantinas and taquerias. Fire-roasting the tomatillos softens their acidic bite into a savory, smoky salsa with a kick of fresh serrano chili.",
    whyMakeThis: [
      "Roasted on a single sheet pan in under 12 minutes.",
      "Infinitely superior to any store-bought jarred green salsa.",
      "Thick, luscious texture without any thickeners or fillers."
    ],
    ingredients: [
      "1 lb fresh tomatillos, husks removed and rinsed sticky film off",
      "2 serrano chiles (or jalapeños), stems removed",
      "1/2 medium white onion, cut into wedges",
      "3 unpeeled cloves garlic",
      "1/2 cup fresh cilantro leaves and tender stems",
      "1 tbsp fresh lime juice",
      "1 tsp kosher salt",
      "1/4 tsp ground cumin"
    ],
    instructions: [
      {
        step: 1,
        title: "Broil the vegetables",
        text: "Line a rimmed baking sheet with foil. Place husked tomatillos, serranos, onion wedges, and unpeeled garlic cloves on the sheet. Broil on high 4 inches from heat for 6–8 minutes until charred and blistered.",
        timerMinutes: 8
      },
      {
        step: 2,
        title: "Flip and finish char",
        text: "Turn vegetables with tongs and broil another 4–5 minutes until soft and skins are blackened in spots.",
        timerMinutes: 5
      },
      {
        step: 3,
        title: "Blend the salsa",
        text: "Peel the roasted garlic cloves. Transfer all charred vegetables and their pan juices to a blender with cilantro, lime juice, salt, and cumin. Pulse until slightly chunky.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Rest and serve",
        text: "Pour into a serving dish and let rest 10 minutes for flavors to marry. Serve with crunchy salted tortilla chips.",
        timerMinutes: 10
      }
    ],
    nutrition: {
      calories: "45 kcal",
      protein: "1g",
      carbs: "7g",
      fat: "1g",
      sodium: "290mg",
      fiber: "2g"
    },
    tips: [
      "Keep the juices released by the tomatillos on the baking sheet — they pack massive savory umami.",
      "Remove seeds from the serranos if you prefer mild heat."
    ],
    tags: ["Salsa", "Tomatillo", "Mexican", "Low-Calorie", "Vegan"],
    relatedArticles: appetizerRelatedArticles
  },

  // 3. EASY SNACK RECIPES
  {
    id: 1005,
    slug: "crispy-spiced-roasted-chickpeas",
    title: "Crunchy Smoky Paprika Roasted Chickpeas",
    leadText: "Canned garbanzo beans dried and baked until shatteringly crisp, tossed in olive oil, smoked paprika, garlic, and sea salt.",
    badge: "ADDICTIVE SNACK",
    category: "Easy Snack Recipes",
    rating: 5,
    ratingsCount: 165,
    reviewCount: 42,
    prepTime: "10 mins",
    cookTime: "30 mins",
    totalTime: "40 mins",
    servings: "4 servings",
    servingsCount: 4,
    calories: "160 kcal",
    author: "Lou Perseghin",
    authorRole: "Test Kitchen Specialist",
    date: "May 10, 2026",
    imageUrl: "/images/appetizer-roasted-chickpeas.jpg",
    imageAlt: "Golden crunchy smoky paprika roasted chickpeas in ceramic bowl",
    imageCredit: "Dishora Studio / Lou Perseghin",
    description: "The ultimate savory snack to replace potato chips. With high plant-based protein and fiber, these roasted chickpeas deliver a satisfying salty crunch with every handful.",
    whyMakeThis: [
      "Made with affordable pantry staples in just three steps.",
      "Stays crunchy for days in an open jar or container.",
      "Infinitely customizable with curry, ranch, or chili lime seasonings."
    ],
    ingredients: [
      "2 cans (15 oz each) chickpeas/garbanzo beans, rinsed and drained",
      "2 tbsp extra virgin olive oil",
      "1 tsp smoked Spanish paprika",
      "1/2 tsp garlic powder",
      "1/2 tsp ground cumin",
      "1/2 tsp onion powder",
      "3/4 tsp fine sea salt",
      "1/4 tsp cayenne pepper (optional)"
    ],
    instructions: [
      {
        step: 1,
        title: "Dry chickpeas thoroughly",
        text: "Spread rinsed chickpeas between two layers of clean kitchen towels and roll gently to remove all surface moisture and loose skins.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Roast plain first",
        text: "Preheat oven to 400°F (200°C). Spread chickpeas on a dry baking sheet. Roast for 20 minutes with no oil so remaining moisture evaporates.",
        timerMinutes: 20
      },
      {
        step: 3,
        title: "Toss with oil and spices",
        text: "Remove pan from oven. Drizzle olive oil over the warm chickpeas and sprinkle paprika, garlic powder, cumin, onion powder, and sea salt. Toss until evenly coated.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Finish baking crisp",
        text: "Return to oven for 10–12 more minutes until deeply golden and crispy. Turn off oven and leave door cracked for 10 minutes to cool crisp.",
        timerMinutes: 10
      }
    ],
    nutrition: {
      calories: "160 kcal",
      protein: "6g",
      carbs: "19g",
      fat: "7g",
      sodium: "320mg",
      fiber: "5g"
    },
    tips: [
      "The secret to maximum crunch is roasting them dry first before adding oil and seasonings, which prevents spices from burning.",
      "Store at room temperature in a breathable container, not airtight, to preserve crispiness."
    ],
    tags: ["Snacks", "Chickpeas", "Healthy", "Crunchy", "Gluten-Free"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1006,
    slug: "parmesan-garlic-ranch-snack-mix",
    title: "Baked Parmesan Ranch Pretzel Snack Mix",
    leadText: "Crisp mini pretzels, bite-sized crackers, and crunchy cereal baked in browned garlic butter, savory ranch herbs, and grated parmesan.",
    badge: "GAME NIGHT FAVORITE",
    category: "Easy Snack Recipes",
    rating: 5,
    ratingsCount: 310,
    reviewCount: 88,
    prepTime: "10 mins",
    cookTime: "25 mins",
    totalTime: "35 mins",
    servings: "10 servings",
    servingsCount: 10,
    calories: "220 kcal",
    author: "Molly Adams",
    authorRole: "Recipe Contributor",
    date: "August 1, 2026",
    imageUrl: "/images/appetizer-parmesan-snack-mix.jpg",
    imageAlt: "Savory baked parmesan ranch pretzel snack mix in a large party bowl",
    imageCredit: "Dishora Studio / Molly Adams",
    description: "A huge upgrade over ordinary party mixes. Butter, dry ranch seasoning, garlic, and finely grated parmesan create a savory glaze that bakes into every nook and cranny.",
    whyMakeThis: [
      "Makes a large crowd-sized batch perfect for movie nights or game days.",
      "Simple sheet pan bake fills the entire kitchen with mouthwatering aromas.",
      "Keeps crisp for up to two weeks in a sealed container."
    ],
    ingredients: [
      "4 cups square crisp rice cereal",
      "3 cups mini pretzel twists",
      "2 cups bite-sized cheese crackers",
      "1 cup roasted salted peanuts or pecans",
      "6 tbsp unsalted butter, melted",
      "1 packet (1 oz) dry ranch dressing seasoning mix",
      "1/2 cup finely grated parmesan cheese",
      "1 tsp garlic powder",
      "1/2 tsp dried parsley flakes"
    ],
    instructions: [
      {
        step: 1,
        title: "Preheat and prepare pans",
        text: "Preheat oven to 275°F (135°C). Line two large rimmed baking sheets with parchment paper.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Combine crunchy mix",
        text: "In an extra-large mixing bowl, combine cereal, mini pretzels, cheese crackers, and peanuts.",
        timerMinutes: 2
      },
      {
        step: 3,
        title: "Whisk savory butter",
        text: "Whisk together the melted butter, dry ranch seasoning, and garlic powder until smooth. Drizzle evenly over the snack mixture, tossing gently to coat.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Bake and add cheese",
        text: "Spread mix across prepared sheets. Bake for 15 minutes, stir, sprinkle grated parmesan on top, and bake 10 minutes more until crisp and fragrant. Let cool completely.",
        timerMinutes: 25
      }
    ],
    nutrition: {
      calories: "220 kcal",
      protein: "5g",
      carbs: "26g",
      fat: "11g",
      sodium: "460mg",
      fiber: "2g"
    },
    tips: [
      "Bake at low heat (275°F) so the butter dehydrates the mix instead of scorching the cheese.",
      "Toss with extra parmesan right as it comes out of the hot oven for double cheese flavor."
    ],
    tags: ["Snack Mix", "Party", "Easy", "Kids", "Baking"],
    relatedArticles: appetizerRelatedArticles
  },

  // 4. HEALTHY SNACK RECIPES
  {
    id: 1007,
    slug: "cucumber-herb-cream-cheese-bites",
    title: "Crisp Cucumber Bites with Herbed Greek Yogurt Spread",
    leadText: "Thick rounds of English cucumber topped with a whipped Greek yogurt and cream cheese spread, finished with fresh dill and smoked paprika.",
    badge: "REFRESHING & LIGHT",
    category: "Healthy Snack Recipes",
    rating: 5,
    ratingsCount: 145,
    reviewCount: 38,
    prepTime: "15 mins",
    cookTime: "0 mins",
    totalTime: "15 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "75 kcal",
    author: "Grace Elkus",
    authorRole: "Food Writer",
    date: "July 12, 2026",
    imageUrl: "/images/appetizer-cucumber-herb-bites.jpg",
    imageAlt: "Crisp cucumber rounds piped with herbed cream cheese and fresh dill",
    imageCredit: "Dishora Studio / Grace Elkus",
    description: "Cool, crisp, and wonderfully elegant without requiring turning on the stove. Greek yogurt keeps the spread light and protein-rich while chives, garlic, and lemon provide bright flavor.",
    whyMakeThis: [
      "Naturally low-carb, keto-friendly, and under 80 calories per serving.",
      "A stunning finger food platter that comes together in 15 minutes.",
      "Refreshing crunchy bite that balances heavier appetizers on a buffet."
    ],
    ingredients: [
      "2 large English seedless cucumbers, sliced into 3/4-inch rounds",
      "4 oz reduced-fat cream cheese, softened",
      "1/2 cup plain Greek yogurt",
      "1 tbsp fresh lemon juice",
      "2 tbsp fresh chives, finely snipped",
      "1 tbsp fresh dill, chopped (plus tiny sprigs for garnish)",
      "1 small clove garlic, grated",
      "1/2 tsp kosher salt",
      "Freshly ground black pepper and smoked paprika for dusting"
    ],
    instructions: [
      {
        step: 1,
        title: "Slice cucumbers",
        text: "Slice cucumbers into uniform 3/4-inch thick rounds. Use a melon baller or small spoon to scoop a shallow well in the center of each round without puncturing the bottom.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Whip herb spread",
        text: "In a medium bowl, beat softened cream cheese, Greek yogurt, lemon juice, grated garlic, chives, dill, salt, and pepper until fluffy.",
        timerMinutes: 4
      },
      {
        step: 3,
        title: "Fill cucumber rounds",
        text: "Transfer mixture to a piping bag fitted with a star tip (or a zip-top bag with the corner snipped) and pipe generously into each cucumber well.",
        timerMinutes: 4
      },
      {
        step: 4,
        title: "Garnish and chill",
        text: "Garnish each bite with a small sprig of fresh dill and a light dust of smoked paprika. Chill until ready to serve.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "75 kcal",
      protein: "4g",
      carbs: "3g",
      fat: "5g",
      sodium: "140mg",
      fiber: "1g"
    },
    tips: [
      "Scooping out a shallow well in each cucumber prevents the herb cream from sliding off when picked up.",
      "English cucumbers have thin skin that does not require peeling and few seeds."
    ],
    tags: ["Healthy", "Low-Carb", "No-Cook", "Gluten-Free", "Vegetarian"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1008,
    slug: "stuffed-mini-peppers-goat-cheese",
    title: "Mediterranean Stuffed Sweet Mini Peppers",
    leadText: "Sweet baby bell peppers halved and stuffed with creamy tangy goat cheese, chopped kalamata olives, sun-dried tomatoes, and fresh oregano.",
    badge: "COLORFUL & HEALTHY",
    category: "Healthy Snack Recipes",
    rating: 5,
    ratingsCount: 178,
    reviewCount: 49,
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTime: "30 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "135 kcal",
    author: "Robin Asbell",
    authorRole: "Culinary Author",
    date: "June 20, 2026",
    imageUrl: "/images/appetizer-stuffed-mini-peppers.jpg",
    imageAlt: "Bright roasted sweet mini peppers stuffed with goat cheese and herbs",
    imageCredit: "Dishora Studio / Robin Asbell",
    description: "Vibrant yellow, orange, and red mini peppers make a stunning colorful plate. Stuffed with warm goat cheese and savory Mediterranean Mediterranean toppings, they burst with sweet and tangy flavors.",
    whyMakeThis: [
      "Can be served warm right out of the oven or enjoyed at room temperature.",
      "Packed with antioxidants and vitamin C from the fresh peppers.",
      "Creamy, tangy filling that feels indulgent while keeping calories moderate."
    ],
    ingredients: [
      "1 lb sweet mini peppers (about 12–14 peppers), halved lengthwise and seeded",
      "6 oz creamy goat cheese (chèvre), softened",
      "2 oz cream cheese or ricotta",
      "1/4 cup kalamata olives, finely chopped",
      "3 tbsp oil-packed sun-dried tomatoes, drained and chopped",
      "1 tbsp fresh oregano or basil, minced",
      "1 clove garlic, minced",
      "1 tbsp extra virgin olive oil for drizzling",
      "Fresh ground black pepper & flaky salt"
    ],
    instructions: [
      {
        step: 1,
        title: "Preheat oven",
        text: "Preheat oven to 375°F (190°C). Line a large baking sheet with parchment paper.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Mix the filling",
        text: "In a bowl, mash together goat cheese, cream cheese, kalamata olives, sun-dried tomatoes, oregano, garlic, and freshly cracked black pepper.",
        timerMinutes: 5
      },
      {
        step: 3,
        title: "Stuff the peppers",
        text: "Spoon the filling evenly into each pepper half. Arrange on the baking sheet and drizzle lightly with olive oil.",
        timerMinutes: 5
      },
      {
        step: 4,
        title: "Bake until tender",
        text: "Bake for 15 minutes until peppers are tender-crisp and cheese is warm and lightly golden on top. Finish with flaky salt.",
        timerMinutes: 15
      }
    ],
    nutrition: {
      calories: "135 kcal",
      protein: "5g",
      carbs: "6g",
      fat: "10g",
      sodium: "220mg",
      fiber: "1.5g"
    },
    tips: [
      "Leave the stem ends attached when slicing peppers in half lengthwise for an attractive presentation handle.",
      "Drizzle with a touch of balsamic glaze right before serving for gourmet flair."
    ],
    tags: ["Healthy", "Vegetarian", "Gluten-Free", "Low-Carb", "Mediterranean"],
    relatedArticles: appetizerRelatedArticles
  },

  // 5. QUICK APPETIZER RECIPES
  {
    id: 1009,
    slug: "prosciutto-melon-basil-skewers",
    title: "10-Minute Prosciutto and Melon Skewers with Balsamic Glaze",
    leadText: "Sweet juicy cantaloupe melon balls wrapped with savory ribbons of Italian prosciutto, fresh basil leaves, and mini mozzarella pearls.",
    badge: "10-MINUTE MAGIC",
    category: "Quick Appetizer Recipes",
    rating: 5,
    ratingsCount: 260,
    reviewCount: 65,
    prepTime: "10 mins",
    cookTime: "0 mins",
    totalTime: "10 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "110 kcal",
    author: "Stephanie A Ganz",
    authorRole: "Food Columnist",
    date: "August 5, 2026",
    imageUrl: "/images/appetizer-prosciutto-melon-skewers.jpg",
    imageAlt: "Bite-sized prosciutto wrapped cantaloupe skewers with basil and mozzarella",
    imageCredit: "Dishora Studio / Stephanie A Ganz",
    description: "The timeless Italian antipasto transformed into handheld party skewers. Sweet melon and delicate salty cured prosciutto create an instant flavor harmony that never fails to impress.",
    whyMakeThis: [
      "Zero cooking required — assemble in 10 minutes flat.",
      "Stunning restaurant-style visual presentation.",
      "Naturally bite-sized and completely mess-free for party cocktail hours."
    ],
    ingredients: [
      "1 ripe cantaloupe, seeded and scooped into balls (about 24 balls)",
      "4 oz thinly sliced prosciutto di Parma, cut into strips",
      "8 oz small fresh mozzarella pearls (bocconcini)",
      "24 fresh small basil leaves",
      "2 tbsp aged thick balsamic glaze",
      "24 wooden cocktail skewers or decorative toothpicks",
      "Flaky sea salt and fresh black pepper"
    ],
    instructions: [
      {
        step: 1,
        title: "Prep melon and prosciutto",
        text: "Use a melon baller to scoop 24 round melon balls. Cut each slice of prosciutto lengthwise into 2–3 thin ribbons.",
        timerMinutes: 4
      },
      {
        step: 2,
        title: "Assemble skewers",
        text: "Thread one end of a prosciutto ribbon onto a skewer, fold over a mozzarella pearl, thread through prosciutto, add a fresh basil leaf, and finish with a cantaloupe ball.",
        timerMinutes: 4
      },
      {
        step: 3,
        title: "Plate and drizzle",
        text: "Arrange skewers on a wide platter. Right before serving, drizzle artistic zig-zags of thick balsamic glaze over the top.",
        timerMinutes: 1
      },
      {
        step: 4,
        title: "Season and serve",
        text: "Finish with a delicate sprinkle of flaky sea salt and cracked black pepper. Serve immediately.",
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: "110 kcal",
      protein: "7g",
      carbs: "8g",
      fat: "6g",
      sodium: "340mg",
      fiber: "1g"
    },
    tips: [
      "Choose a cantaloupe that feels heavy for its size and smells fragrant at the stem end for maximum sweetness.",
      "Keep skewers chilled on the platter until 10 minutes before guests arrive."
    ],
    tags: ["Quick", "No-Cook", "Italian", "Finger Food", "Party"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1010,
    slug: "classic-tomato-basil-bruschetta",
    title: "Rustic Garlic Crostini with Fresh Tomato and Basil",
    leadText: "Vine-ripened tomatoes marinated in extra virgin olive oil, garlic, and fresh basil, spooned over warm, garlic-rubbed crusty sourdough.",
    badge: "TIMELESS CLASSIC",
    category: "Quick Appetizer Recipes",
    rating: 5,
    ratingsCount: 390,
    reviewCount: 112,
    prepTime: "10 mins",
    cookTime: "5 mins",
    totalTime: "15 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "140 kcal",
    author: "Meghan Splawn",
    authorRole: "Senior Food Editor",
    date: "July 24, 2026",
    imageUrl: "/images/appetizer-tomato-bruschetta.jpg",
    imageAlt: "Toasted garlic crostini topped with fresh marinated diced tomatoes and basil",
    imageCredit: "Dishora Studio / Meghan Splawn",
    description: "The gold standard of Italian appetizers. Crisp toasted artisan bread rubbed with a clove of raw garlic while still warm from the oven, topped with fragrant summer tomatoes and olive oil.",
    whyMakeThis: [
      "Showcases the peak flavor of sweet summer tomatoes.",
      "Bread can be toasted in advance; topping takes 5 minutes to mix.",
      "Infused with pungent garlic and peppery extra virgin olive oil."
    ],
    ingredients: [
      "1 crusty French baguette or sourdough loaf, sliced into 1/2-inch diagonal rounds",
      "1.5 lbs ripe Roma or vine tomatoes, seeded and finely diced",
      "2 cloves fresh garlic, peeled (1 grated, 1 left whole for rubbing bread)",
      "1/4 cup extra virgin olive oil (plus more for brushing)",
      "1/4 cup fresh basil leaves, thinly sliced into ribbons (chiffonade)",
      "1 tbsp good balsamic vinegar",
      "3/4 tsp kosher salt & 1/4 tsp freshly ground black pepper"
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate tomatoes",
        text: "In a medium bowl, gently combine diced tomatoes, grated garlic, olive oil, balsamic vinegar, basil ribbons, salt, and black pepper. Let sit at room temperature for 10 minutes.",
        timerMinutes: 10
      },
      {
        step: 2,
        title: "Toast the bread",
        text: "Preheat oven broiler or grill pan. Brush bread slices lightly with olive oil and toast 2–3 minutes per side until golden and crispy.",
        timerMinutes: 5
      },
      {
        step: 3,
        title: "Rub with fresh garlic",
        text: "Immediately rub the cut side of the whole garlic clove across the hot toasted bread surface — the crust acts like a grater, infusing rich garlic essence.",
        timerMinutes: 2
      },
      {
        step: 4,
        title: "Top and serve",
        text: "Use a slotted spoon to mound marinated tomato mixture onto each warm crostini and serve right away.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "140 kcal",
      protein: "3g",
      carbs: "18g",
      fat: "6g",
      sodium: "260mg",
      fiber: "2g"
    },
    tips: [
      "Always seed your tomatoes before dicing so your crostini doesn't become soggy.",
      "Use a slotted spoon to transfer tomatoes so excess juices stay in the bowl."
    ],
    tags: ["Bruschetta", "Italian", "Vegetarian", "Quick", "Summer"],
    relatedArticles: appetizerRelatedArticles
  },

  // 6. PARTY APPETIZERS
  {
    id: 1011,
    slug: "sweet-tangy-cocktail-meatballs",
    title: "Slow-Cooker Sweet and Tangy Party Meatballs",
    leadText: "Tender beef and pork meatballs simmered in a rich glaze of grape jelly, smoky chili sauce, and a hint of apple cider vinegar.",
    badge: "HOLIDAY HERO",
    category: "Party Appetizers",
    rating: 5,
    ratingsCount: 420,
    reviewCount: 135,
    prepTime: "5 mins",
    cookTime: "2 hrs",
    totalTime: "2 hrs 5 mins",
    servings: "12 servings",
    servingsCount: 12,
    calories: "230 kcal",
    author: "Susan Bronson",
    authorRole: "Home Cook Contributor",
    date: "August 15, 2026",
    imageUrl: "/images/appetizer-cocktail-meatballs.jpg",
    imageAlt: "Glossy sweet and tangy cocktail meatballs served with party toothpicks",
    imageCredit: "Dishora Studio / Susan Bronson",
    description: "The legendary 3-ingredient slow-cooker party appetizer that has anchored buffet tables for generations. The grape jelly and chili sauce melt into a glossy, sweet, tangy barbecue glaze.",
    whyMakeThis: [
      "Just 5 minutes of hands-on prep — dump in the slow cooker and walk away.",
      "Keeps warm in the slow cooker for hours during the party.",
      "Loved by kids and adults alike."
    ],
    ingredients: [
      "2 lbs fully cooked frozen homestyle or Italian meatballs (about 48 mini meatballs)",
      "1 jar (12 oz) chili sauce (such as Heinz)",
      "1 jar (12 oz) concord grape jelly",
      "1 tbsp apple cider vinegar",
      "1/2 tsp crushed red pepper flakes (optional for gentle heat)",
      "2 tbsp chopped fresh chives or green onions for garnish",
      "Toothpicks for serving"
    ],
    instructions: [
      {
        step: 1,
        title: "Whisk the sauce",
        text: "In the bottom of a 4- to 6-quart slow cooker, whisk together chili sauce, grape jelly, apple cider vinegar, and red pepper flakes until blended.",
        timerMinutes: 3
      },
      {
        step: 2,
        title: "Add meatballs",
        text: "Add frozen meatballs into the sauce and stir with a wooden spoon until every meatball is completely coated.",
        timerMinutes: 2
      },
      {
        step: 3,
        title: "Slow cook until bubbly",
        text: "Cover and cook on LOW for 3 to 4 hours (or HIGH for 2 hours) until meatballs are piping hot and sauce is thick and caramelized.",
        timerMinutes: 120
      },
      {
        step: 4,
        title: "Garnish and serve warm",
        text: "Switch slow cooker to 'WARM'. Sprinkle with fresh chopped chives and provide a cup of wooden toothpicks nearby.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "230 kcal",
      protein: "12g",
      carbs: "20g",
      fat: "11g",
      sodium: "510mg",
      fiber: "1g"
    },
    tips: [
      "You can make your own homemade meatballs or use store-bought frozen ones for ultra-convenience.",
      "Swap grape jelly with whole cranberry sauce for Thanksgiving and holiday parties."
    ],
    tags: ["Party", "Meatballs", "Slow Cooker", "Holiday", "Kid-Friendly"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1012,
    slug: "caramelized-onion-gruyere-tarts",
    title: "Caramelized Onion and Gruyère Puff Pastry Tarts",
    leadText: "Flaky all-butter puff pastry topped with jammy balsamic caramelized onions, melted Swiss Gruyère, and fresh fragrant thyme.",
    badge: "ELEGANT BITES",
    category: "Party Appetizers",
    rating: 5,
    ratingsCount: 230,
    reviewCount: 56,
    prepTime: "15 mins",
    cookTime: "35 mins",
    totalTime: "50 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "210 kcal",
    author: "Lou Perseghin",
    authorRole: "Test Kitchen Specialist",
    date: "July 11, 2026",
    imageUrl: "/images/appetizer-onion-gruyere-tarts.jpg",
    imageAlt: "Golden puffed caramelized onion and gruyere pastry squares with thyme",
    imageCredit: "Dishora Studio / Lou Perseghin",
    description: "French bakery elegance made accessible at home. Sweet, slow-cooked onions combined with nutty Gruyère cheese over shattered layers of crisp golden puff pastry.",
    whyMakeThis: [
      "Looks and tastes like it came from a Parisian patisserie.",
      "Onions can be caramelized up to 3 days in advance.",
      "Flaky, golden-brown crust with irresistible savory cheese edges."
    ],
    ingredients: [
      "1 sheet frozen puff pastry (all-butter preferred), thawed",
      "2 large yellow onions, thinly sliced",
      "2 tbsp unsalted butter",
      "1 tbsp extra virgin olive oil",
      "1 tbsp balsamic vinegar",
      "1 tsp fresh thyme leaves (plus extra for garnish)",
      "1 1/2 cups shredded Gruyère cheese",
      "1 large egg beaten with 1 tbsp water (egg wash)",
      "1/2 tsp kosher salt & 1/4 tsp black pepper"
    ],
    instructions: [
      {
        step: 1,
        title: "Caramelize the onions",
        text: "Melt butter and olive oil in a skillet over medium-low heat. Add onions and cook slowly for 20–25 minutes until deeply caramelized and golden brown. Stir in balsamic vinegar, thyme, salt, and pepper. Let cool.",
        timerMinutes: 25
      },
      {
        step: 2,
        title: "Prep pastry",
        text: "Preheat oven to 400°F (200°C). Unroll puff pastry onto a parchment-lined baking sheet. Score a 1/2-inch border around the edge with a knife and prick the center with a fork.",
        timerMinutes: 5
      },
      {
        step: 3,
        title: "Assemble toppings",
        text: "Scatter 1 cup of Gruyère within the border, top with caramelized onions, and finish with remaining cheese. Brush edges with egg wash.",
        timerMinutes: 5
      },
      {
        step: 4,
        title: "Bake until golden",
        text: "Bake for 18–20 minutes until pastry is puffed and golden brown. Cut into squares and serve warm.",
        timerMinutes: 20
      }
    ],
    nutrition: {
      calories: "210 kcal",
      protein: "7g",
      carbs: "17g",
      fat: "13g",
      sodium: "220mg",
      fiber: "1g"
    },
    tips: [
      "Keep the puff pastry cold right until baking so the butter layers expand into maximum flaky puffiness.",
      "Gruyère can be substituted with sharp Swiss cheese or white cheddar."
    ],
    tags: ["Puff Pastry", "Party", "Baking", "Cheese", "Vegetarian"],
    relatedArticles: appetizerRelatedArticles
  },

  // 7. FINGER FOOD RECIPES
  {
    id: 1013,
    slug: "bacon-wrapped-goat-cheese-dates",
    title: "Crispy Bacon-Wrapped Dates Stuffed with Goat Cheese",
    leadText: "Plump Medjool dates stuffed with creamy chèvre and toasted almonds, wrapped tightly in smoky bacon and baked until sizzling and crisp.",
    badge: "SWEET & SAVORY",
    category: "Finger Food Recipes",
    rating: 5,
    ratingsCount: 310,
    reviewCount: 89,
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "35 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "180 kcal",
    author: "Kat Lieu",
    authorRole: "Recipe Developer",
    date: "July 28, 2026",
    imageUrl: "/images/appetizer-bacon-wrapped-dates.jpg",
    imageAlt: "Crispy bacon wrapped dates stuffed with goat cheese on a platter",
    imageCredit: "Dishora Studio / Kat Lieu",
    description: "Commonly known as 'Devils on Horseback', these sweet and savory parcels are the undisputed champion of party finger foods. The sweetness of dates melts into the rich bacon and tangy goat cheese.",
    whyMakeThis: [
      "Combines 4 distinct textures: chewy date, creamy cheese, crunchy almond, and crisp bacon.",
      "Assemble hours ahead and slide into the oven 20 minutes before guests arrive.",
      "Guaranteed zero leftovers at every party."
    ],
    ingredients: [
      "16 large Medjool dates, pitted",
      "4 oz creamy goat cheese or blue cheese",
      "16 whole roasted almonds (optional, for crunch)",
      "8 slices center-cut bacon, cut in half crosswise (16 short strips)",
      "Toothpicks soaked in water for 15 minutes",
      "1 tbsp pure maple syrup for brushing (optional)"
    ],
    instructions: [
      {
        step: 1,
        title: "Stuff the dates",
        text: "Make a slit lengthwise in each date. Stuff each cavity with about 1 teaspoon of goat cheese and press a roasted almond into the center.",
        timerMinutes: 6
      },
      {
        step: 2,
        title: "Wrap with bacon",
        text: "Wrap a half-strip of bacon snugly around each stuffed date, overlapping the ends. Secure with a soaked toothpick.",
        timerMinutes: 6
      },
      {
        step: 3,
        title: "Bake on a rack",
        text: "Preheat oven to 400°F (200°C). Place an oven-safe wire rack on a rimmed baking sheet. Arrange dates seam-side down on the rack. Bake for 15–18 minutes.",
        timerMinutes: 18
      },
      {
        step: 4,
        title: "Glaze and crisp",
        text: "Brush lightly with maple syrup and broil on high for 2 minutes until bacon is deep reddish-brown and crispy. Let rest 5 minutes before serving.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "180 kcal",
      protein: "5g",
      carbs: "18g",
      fat: "10g",
      sodium: "260mg",
      fiber: "2g"
    },
    tips: [
      "Baking on a wire rack allows hot air to circulate underneath the bacon so it crisps evenly without sitting in grease.",
      "Soaking wooden toothpicks in water prevents them from scorching in the oven."
    ],
    tags: ["Finger Food", "Bacon", "Party", "Gluten-Free", "Appetizers"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1014,
    slug: "golden-mini-crab-cakes-remoulade",
    title: "Crisp Mini Jumbo Lump Crab Cakes with Lemon Remoulade",
    leadText: "Bite-sized golden pan-seared crab cakes packed with sweet wild lump crab meat, Old Bay seasoning, and very little filler.",
    badge: "GOURMET BITE",
    category: "Finger Food Recipes",
    rating: 5,
    ratingsCount: 195,
    reviewCount: 52,
    prepTime: "15 mins",
    cookTime: "10 mins",
    totalTime: "25 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "190 kcal",
    author: "Theodora Kaloudis",
    authorRole: "Executive Food Editor",
    date: "June 19, 2026",
    imageUrl: "/images/appetizer-mini-crab-cakes.jpg",
    imageAlt: "Golden mini crab cakes with creamy lemon remoulade and fresh chives",
    imageCredit: "Dishora Studio / Theodora Kaloudis",
    description: "Maryland coastal perfection in a two-bite finger food appetizer. Pure jumbo lump crab is bound gently with Dijon, lemon, and crushed saltines, pan-fried in butter to a delicate crisp exterior.",
    whyMakeThis: [
      "All crab and almost zero breading filler for true seafood luxury.",
      "Seared in butter in just 4 minutes per side.",
      "Comes with an easy 2-minute tangy Cajun lemon remoulade."
    ],
    ingredients: [
      "1 lb fresh jumbo lump crab meat, picked through for shells",
      "1 large egg, beaten",
      "1/4 cup mayonnaise",
      "1 tsp Dijon mustard",
      "1 tsp Old Bay seasoning",
      "1 tbsp fresh lemon juice",
      "2 tbsp fresh parsley, finely minced",
      "1/2 cup crushed saltine crackers or panko",
      "2 tbsp butter and 1 tbsp olive oil for pan-frying",
      "Quick Remoulade: 1/3 cup mayo, 1 tsp capers, 1 tsp Dijon, 1/2 tsp smoked paprika, 1 tsp lemon juice"
    ],
    instructions: [
      {
        step: 1,
        title: "Mix binder",
        text: "In a medium bowl, whisk together the egg, mayonnaise, Dijon mustard, Old Bay, lemon juice, and parsley until smooth.",
        timerMinutes: 3
      },
      {
        step: 2,
        title: "Fold crab gently",
        text: "Add crushed saltines and gently fold in the lump crab meat with a rubber spatula, being careful not to break up the large crab chunks.",
        timerMinutes: 3
      },
      {
        step: 3,
        title: "Shape mini cakes",
        text: "Shape mixture into 12 small 2-inch patties. Place on a plate and chill for 15 minutes to firm up.",
        timerMinutes: 15
      },
      {
        step: 4,
        title: "Pan-fry golden",
        text: "Heat butter and oil in a large nonstick skillet over medium heat. Fry mini crab cakes for 3–4 minutes per side until deeply golden brown. Serve with remoulade.",
        timerMinutes: 8
      }
    ],
    nutrition: {
      calories: "190 kcal",
      protein: "16g",
      carbs: "6g",
      fat: "11g",
      sodium: "480mg",
      fiber: "0.5g"
    },
    tips: [
      "Chilling the shaped patties for 15 minutes prevents them from breaking apart in the frying pan.",
      "Handle the crab as gently as possible to keep the prized jumbo lump clusters intact."
    ],
    tags: ["Seafood", "Finger Food", "Party", "Maryland", "Gourmet"],
    relatedArticles: appetizerRelatedArticles
  },

  // 8. CHEESE APPETIZERS
  {
    id: 1015,
    slug: "honey-pecan-baked-brie-wheel",
    title: "Golden Baked Brie Wheel with Spiced Pecans and Thyme",
    leadText: "Warm, molten French brie cheese wheel baked until gooey, topped with toasted buttered pecans, orange zest, and amber wildflower honey.",
    badge: "PARTY SHOWSTOPPER",
    category: "Cheese Appetizers",
    rating: 5,
    ratingsCount: 340,
    reviewCount: 94,
    prepTime: "5 mins",
    cookTime: "15 mins",
    totalTime: "20 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "240 kcal",
    author: "Ivy Manning",
    authorRole: "Cookbook Author",
    date: "July 7, 2026",
    imageUrl: "/images/appetizer-baked-brie-pecans.jpg",
    imageAlt: "Warm molten wheel of baked brie with honey, toasted pecans, and fresh thyme",
    imageCredit: "Dishora Studio / Ivy Manning",
    description: "An effortless 20-minute centerpiece that turns any gathering into a celebration. The rind softens in the oven while the interior becomes decadently molten and spoonable.",
    whyMakeThis: [
      "Requires only 5 minutes of prep and simple ingredients.",
      "The contrast between hot, buttery cheese and crunchy candied nuts is unforgettable.",
      "Serve right in the baking skillet with crackers and sliced crisp apples."
    ],
    ingredients: [
      "1 wheel (8 oz) good quality French brie cheese",
      "1/2 cup raw pecan halves, roughly chopped",
      "2 tbsp unsalted butter",
      "1/4 cup wildflower honey or pure maple syrup",
      "1/2 tsp fresh thyme leaves",
      "1/4 tsp ground cinnamon",
      "Pinch of sea salt",
      "Sliced Honeycrisp apples, pear slices, and water crackers for dipping"
    ],
    instructions: [
      {
        step: 1,
        title: "Preheat and score brie",
        text: "Preheat oven to 375°F (190°C). Place the brie wheel into a small cast iron skillet or ceramic baker. Lightly score a crosshatch pattern across the top rind.",
        timerMinutes: 3
      },
      {
        step: 2,
        title: "Toast the pecans",
        text: "In a small skillet, melt butter over medium heat. Add chopped pecans, cinnamon, and a pinch of salt. Cook 2–3 minutes until fragrant and toasted.",
        timerMinutes: 3
      },
      {
        step: 3,
        title: "Bake brie",
        text: "Bake the brie wheel in the oven for 12–15 minutes until soft and puffed, but before the sides burst.",
        timerMinutes: 15
      },
      {
        step: 4,
        title: "Top with honey nuts",
        text: "Spoon the warm toasted pecans over the melted brie. Drizzle generously with honey and scatter fresh thyme over the top. Serve warm immediately.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "240 kcal",
      protein: "7g",
      carbs: "12g",
      fat: "19g",
      sodium: "220mg",
      fiber: "1g"
    },
    tips: [
      "Do not cut the entire top rind off before baking; scoring it allows heat in while keeping the cheese contained.",
      "Serve on a heat-safe trivet with a cheese knife for guests to scoop directly onto crackers."
    ],
    tags: ["Cheese", "Baking", "Holiday", "Vegetarian", "Quick"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1016,
    slug: "crispy-mozzarella-bites-marinara",
    title: "Golden Fried Fresh Mozzarella Bites with Spicy Marinara",
    leadText: "Bite-sized cubes of whole-milk mozzarella double-breaded in seasoned Italian breadcrumbs, fried to a golden crisp with an epic cheese pull.",
    badge: "EPIC CHEESE PULL",
    category: "Cheese Appetizers",
    rating: 5,
    ratingsCount: 295,
    reviewCount: 81,
    prepTime: "15 mins",
    cookTime: "10 mins",
    totalTime: "25 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "260 kcal",
    author: "Nick Evans",
    authorRole: "Senior Culinary Producer",
    date: "June 8, 2026",
    imageUrl: "/images/appetizer-mozzarella-bites.jpg",
    imageAlt: "Golden crispy fried mozzarella cheese bites with hot spicy marinara dip",
    imageCredit: "Dishora Studio / Nick Evans",
    description: "Forget rubbery frozen cheese sticks. These bite-sized cubes made with real whole milk mozzarella are crunchy on the outside, melty and stringy on the inside, and paired with tangy marinara.",
    whyMakeThis: [
      "Double-breading technique ensures zero cheese leaks into the oil.",
      "Can be frozen in advance and fried directly from the freezer.",
      "Incredible crunchy shell seasoned with oregano, garlic, and parmesan."
    ],
    ingredients: [
      "12 oz block whole-milk low-moisture mozzarella, cut into 3/4-inch cubes (about 24 cubes)",
      "1/2 cup all-purpose flour",
      "2 large eggs, whisked with 2 tbsp milk",
      "1 cup Italian seasoned breadcrumbs",
      "1/4 cup finely grated parmesan cheese",
      "1 tsp garlic powder & 1/2 tsp dried oregano",
      "Vegetable oil for frying (about 2 cups)",
      "1 cup warm marinara sauce for dipping",
      "Freshly chopped parsley"
    ],
    instructions: [
      {
        step: 1,
        title: "Set up breading station",
        text: "Set out three shallow bowls: bowl 1 with flour; bowl 2 with whisked eggs; bowl 3 with breadcrumbs mixed with parmesan, garlic powder, and oregano.",
        timerMinutes: 3
      },
      {
        step: 2,
        title: "Double bread cheese",
        text: "Dredge each mozzarella cube in flour, dip in egg, coat in breadcrumbs, dip in egg again, and coat in breadcrumbs a second time for a tight seal.",
        timerMinutes: 8
      },
      {
        step: 3,
        title: "Freeze briefly",
        text: "Place breaded cheese bites on a baking sheet and freeze for 20 minutes so the cheese remains cold while the crust fries crisp.",
        timerMinutes: 20
      },
      {
        step: 4,
        title: "Fry golden",
        text: "Heat 1 inch of oil to 365°F (185°C) in a skillet. Fry in small batches for 1–2 minutes per side until golden brown. Drain on paper towels and serve with warm marinara.",
        timerMinutes: 6
      }
    ],
    nutrition: {
      calories: "260 kcal",
      protein: "14g",
      carbs: "16g",
      fat: "16g",
      sodium: "490mg",
      fiber: "1g"
    },
    tips: [
      "Freezing the breaded cubes for 20 minutes before frying is non-negotiable — it gives the breading time to brown before the cheese melts.",
      "Check oil temperature with a thermometer to ensure it stays near 365°F."
    ],
    tags: ["Cheese", "Fried", "Italian", "Finger Food", "Party"],
    relatedArticles: appetizerRelatedArticles
  },

  // 9. CHICKEN APPETIZERS
  {
    id: 1017,
    slug: "crispy-garlic-parmesan-wings",
    title: "Extra-Crispy Baked Garlic Parmesan Chicken Wings",
    leadText: "Oven-baked chicken wings with crackling crispy skin tossed in warm garlic butter, grated Parmigiano-Reggiano, and chopped fresh parsley.",
    badge: "GAME DAY BESTSELLER",
    category: "Chicken Appetizers",
    rating: 5,
    ratingsCount: 450,
    reviewCount: 140,
    prepTime: "10 mins",
    cookTime: "45 mins",
    totalTime: "55 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "340 kcal",
    author: "Megan Scott",
    authorRole: "Recipe Developer",
    date: "July 16, 2026",
    imageUrl: "/images/appetizer-garlic-parm-wings.jpg",
    imageAlt: "Crispy oven baked garlic parmesan wings tossed with herbs in a bowl",
    imageCredit: "Dishora Studio / Megan Scott",
    description: "Deep-fryer crispiness without any splattering oil. An aluminum-free baking powder dry brine draws out surface moisture in the oven, creating an ultra-crisp skin that absorbs garlic butter.",
    whyMakeThis: [
      "Secret baking powder method produces crackling fried-like skin in a standard oven.",
      "Tossed in rich melted garlic butter and aged Italian parmesan cheese.",
      "A huge crowd pleaser for sports games and casual weekends."
    ],
    ingredients: [
      "3 lbs chicken wings, split into flats and drumettes, patted very dry",
      "1 tbsp aluminum-free baking powder",
      "1 tsp kosher salt",
      "1/2 tsp black pepper",
      "1/2 cup unsalted butter, melted",
      "4 cloves garlic, finely grated or pressed",
      "3/4 cup freshly grated Parmigiano-Reggiano",
      "2 tbsp fresh parsley, chopped",
      "1/4 tsp crushed red pepper flakes"
    ],
    instructions: [
      {
        step: 1,
        title: "Dry and season wings",
        text: "Thoroughly pat wings dry with paper towels. In a large bowl, toss wings with baking powder, salt, and black pepper until lightly coated.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Bake on a wire rack",
        text: "Preheat oven to 425°F (220°C). Place wings skin-side up on a wire rack set inside a foil-lined baking sheet. Bake for 40–45 minutes until blistered and crispy.",
        timerMinutes: 45
      },
      {
        step: 3,
        title: "Whisk garlic butter sauce",
        text: "While wings finish baking, whisk together the melted butter, grated garlic, half the parmesan, parsley, and red pepper flakes in a large metal bowl.",
        timerMinutes: 3
      },
      {
        step: 4,
        title: "Toss and coat",
        text: "Transfer piping-hot wings directly into the butter bowl. Toss vigorously to coat. Sprinkle remaining parmesan over the top and serve immediately.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "24g",
      carbs: "1g",
      fat: "27g",
      sodium: "520mg",
      fiber: "0g"
    },
    tips: [
      "Make sure to use aluminum-free baking powder, NEVER baking soda, which will taste bitter.",
      "Patience is key: do not crowd the baking sheet so steam escapes and skin turns crispy."
    ],
    tags: ["Chicken", "Wings", "Game Day", "Crispy", "Gluten-Free"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1018,
    slug: "spicy-buffalo-chicken-wonton-cups",
    title: "Crisp Wonton Cups Stuffed with Creamy Buffalo Chicken",
    leadText: "Crispy baked wonton wrappers shaped into mini cups, loaded with shredded chicken, cream cheese, tangy Frank's RedHot sauce, and crumbled blue cheese.",
    badge: "EASY BITE",
    category: "Chicken Appetizers",
    rating: 5,
    ratingsCount: 275,
    reviewCount: 72,
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTime: "30 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "170 kcal",
    author: "Jessica Furniss",
    authorRole: "Recipe Developer",
    date: "July 29, 2026",
    imageUrl: "/images/appetizer-buffalo-wonton-cups.jpg",
    imageAlt: "Golden wonton cups filled with bubbling buffalo chicken and blue cheese",
    imageCredit: "Dishora Studio / Jessica Furniss",
    description: "All the beloved flavor of Buffalo chicken dip packaged into crunchy, single-serving pastry cups. No messy dripping or broken chips — just neat, delicious party bites.",
    whyMakeThis: [
      "Uses store-bought rotisserie chicken for lightning-fast preparation.",
      "Baked in a standard muffin pan for perfect crunchy cups.",
      "The ideal handheld snack for sports parties and game nights."
    ],
    ingredients: [
      "24 square wonton wrappers",
      "Cooking spray or melted butter for brushing",
      "2 cups shredded cooked chicken (rotisserie chicken works great)",
      "4 oz cream cheese, softened",
      "1/4 cup sour cream or ranch dressing",
      "1/3 cup Frank's RedHot sauce",
      "1 cup shredded sharp cheddar or Monterey Jack cheese",
      "1/4 cup crumbled blue cheese or gorgonzola",
      "2 green onions, thinly sliced"
    ],
    instructions: [
      {
        step: 1,
        title: "Pre-bake wonton cups",
        text: "Preheat oven to 375°F (190°C). Lightly spray a 24-cup mini muffin pan with cooking spray. Press a wonton wrapper into each cup. Bake for 6–7 minutes until lightly golden and firm.",
        timerMinutes: 7
      },
      {
        step: 2,
        title: "Mix buffalo filling",
        text: "In a mixing bowl, stir together softened cream cheese, sour cream, hot sauce, shredded chicken, and 3/4 cup of the shredded cheddar until creamy.",
        timerMinutes: 4
      },
      {
        step: 3,
        title: "Fill and top",
        text: "Spoon 1 rounded tablespoon of chicken filling into each baked wonton cup. Top with remaining cheddar and crumbled blue cheese.",
        timerMinutes: 4
      },
      {
        step: 4,
        title: "Bake until bubbly",
        text: "Return to the oven for 8–10 minutes until cheese is melted and bubbling. Garnish with sliced green onions and serve warm.",
        timerMinutes: 10
      }
    ],
    nutrition: {
      calories: "170 kcal",
      protein: "11g",
      carbs: "10g",
      fat: "9g",
      sodium: "380mg",
      fiber: "0.5g"
    },
    tips: [
      "You can double up wonton wrappers in each muffin cup if you like an extra crunchy, sturdy shell.",
      "Substitute blue cheese with ranch drizzle if your guests prefer mild flavor."
    ],
    tags: ["Chicken", "Buffalo", "Party", "Finger Food", "Game Day"],
    relatedArticles: appetizerRelatedArticles
  },

  // 10. VEGETARIAN APPETIZERS
  {
    id: 1019,
    slug: "classic-chive-deviled-eggs",
    title: "Traditional Creamy Deviled Eggs with Fresh Chives and Paprika",
    leadText: "Velvety egg yolks whipped with Dijon mustard, mayonnaise, apple cider vinegar, and sweet relish, garnished with smoked paprika and snipped chives.",
    badge: "HERITAGE RECIPE",
    category: "Vegetarian Appetizers",
    rating: 5,
    ratingsCount: 380,
    reviewCount: 118,
    prepTime: "20 mins",
    cookTime: "15 mins",
    totalTime: "35 mins",
    servings: "12 servings",
    servingsCount: 12,
    calories: "95 kcal",
    author: "Jamie Anulewicz",
    authorRole: "Recipe Contributor",
    date: "May 4, 2026",
    imageUrl: "/images/appetizer-deviled-eggs.jpg",
    imageAlt: "Perfect creamy deviled eggs piped with chives and smoked paprika",
    imageCredit: "Dishora Studio / Jamie Anulewicz",
    description: "The gold standard deviled egg recipe passed down through generations. Silky, rich, and balanced with tangy vinegar and Dijon, topped with a dusting of smoky Spanish paprika.",
    whyMakeThis: [
      "Foolproof steam method yields shells that slide off effortlessly.",
      "Silky smooth whipped filling using a piping bag or spoon.",
      "An absolute staple for Easter, Thanksgiving, and summer barbecues."
    ],
    ingredients: [
      "12 large eggs (preferably 1–2 weeks old for easier peeling)",
      "1/2 cup mayonnaise (such as Duke's or Hellmann's)",
      "1 1/2 tsp Dijon mustard",
      "1 tsp apple cider vinegar",
      "1 tbsp sweet pickle relish (optional)",
      "1/4 tsp Tabasco or hot sauce",
      "1/2 tsp kosher salt & 1/4 tsp white pepper",
      "Smoked paprika and fresh snipped chives for garnish"
    ],
    instructions: [
      {
        step: 1,
        title: "Steam and hard-cook eggs",
        text: "Bring 1 inch of water to a rolling boil in a pot with a steamer basket. Lower eggs gently into basket, cover tightly, and steam over medium-high heat for exactly 13 minutes.",
        timerMinutes: 13
      },
      {
        step: 2,
        title: "Ice bath and peel",
        text: "Immediately transfer eggs into a bowl of ice water for 10 minutes. Crack shells all over and peel under cool running water.",
        timerMinutes: 10
      },
      {
        step: 3,
        title: "Whip the yolks",
        text: "Slice eggs in half lengthwise. Pop yolks into a bowl. Mash yolks with a fork until powdery, then whisk in mayonnaise, Dijon, vinegar, salt, and pepper until completely smooth.",
        timerMinutes: 5
      },
      {
        step: 4,
        title: "Pipe and garnish",
        text: "Pipe yolk mixture back into egg white cavities. Dust with smoked paprika and sprinkle with fresh chives. Chill before serving.",
        timerMinutes: 5
      }
    ],
    nutrition: {
      calories: "95 kcal",
      protein: "6g",
      carbs: "1g",
      fat: "8g",
      sodium: "160mg",
      fiber: "0g"
    },
    tips: [
      "Steaming eggs instead of boiling them prevents rubbery whites and creates a shell that slips right off.",
      "Pushing the yolks through a fine-mesh sieve produces an ultra-luxurious, velvet-smooth filling."
    ],
    tags: ["Deviled Eggs", "Easter", "Vegetarian", "Gluten-Free", "Classic"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1020,
    slug: "crispy-zucchini-corn-fritters",
    title: "Golden Zucchini and Sweet Corn Fritters with Garlic Aioli",
    leadText: "Crisp pan-fried fritters of shredded garden zucchini, sweet corn, green onion, and sharp cheddar, served with cool lemon garlic aioli.",
    badge: "GARDEN FAVORITE",
    category: "Vegetarian Appetizers",
    rating: 5,
    ratingsCount: 215,
    reviewCount: 58,
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTime: "30 mins",
    servings: "6 servings",
    servingsCount: 6,
    calories: "165 kcal",
    author: "Stephanie A Ganz",
    authorRole: "Food Writer",
    date: "July 21, 2026",
    imageUrl: "/images/appetizer-zucchini-fritters.jpg",
    imageAlt: "Stack of golden crispy zucchini sweet corn fritters with garlic aioli",
    imageCredit: "Dishora Studio / Stephanie A Ganz",
    description: "The most delicious way to use garden zucchini. Shredded zucchini is squeezed dry, tossed with sweet corn and batter, and fried until crisp on the edges and tender in the middle.",
    whyMakeThis: [
      "Crispy edges with sweet corn pop in every bite.",
      "Great way to get kids to eat green summer vegetables.",
      "Can be reheated in a toaster oven or air fryer to stay ultra-crisp."
    ],
    ingredients: [
      "2 medium zucchini (about 1 lb), coarsely grated",
      "1 cup sweet corn kernels (fresh or frozen)",
      "1/2 cup sharp cheddar cheese, shredded",
      "2 green onions, thinly sliced",
      "2 large eggs, lightly beaten",
      "1/2 cup all-purpose flour",
      "1/2 tsp baking powder",
      "1/2 tsp garlic powder & 1/2 tsp salt",
      "Olive oil for pan-frying",
      "Garlic Aioli: 1/2 cup mayo, 1 clove grated garlic, 1 tbsp lemon juice, pinch of salt"
    ],
    instructions: [
      {
        step: 1,
        title: "Drain zucchini",
        text: "Toss grated zucchini with 1/2 tsp salt and let sit 10 minutes. Wrap in a clean kitchen towel and wring out firmly to remove all liquid.",
        timerMinutes: 10
      },
      {
        step: 2,
        title: "Mix the batter",
        text: "In a bowl, combine dried zucchini, sweet corn, cheddar, and green onions. Stir in eggs, flour, baking powder, and garlic powder until a thick batter forms.",
        timerMinutes: 4
      },
      {
        step: 3,
        title: "Pan-fry fritters",
        text: "Heat 2 tablespoons oil in a nonstick skillet over medium-high heat. Drop 1/4-cup scoops of batter and flatten slightly. Cook 3–4 minutes per side until golden brown.",
        timerMinutes: 8
      },
      {
        step: 4,
        title: "Drain and serve",
        text: "Drain fritters briefly on paper towels. Serve warm with homemade garlic aioli.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "165 kcal",
      protein: "6g",
      carbs: "15g",
      fat: "9g",
      sodium: "280mg",
      fiber: "2g"
    },
    tips: [
      "Wringing the moisture out of the shredded zucchini is the single most important step for crispy fritters.",
      "Keep fried batches warm in a 250°F oven on a wire rack while frying the remaining batter."
    ],
    tags: ["Vegetarian", "Zucchini", "Fritters", "Summer", "Appetizers"],
    relatedArticles: appetizerRelatedArticles
  },

  // 11. BAKED APPETIZERS
  {
    id: 1021,
    slug: "cheesy-garlic-pull-apart-bread",
    title: "Pull-Apart Garlic Herb Bread with Melted Mozzarella",
    leadText: "A crusty sourdough boule crosshatch-sliced and stuffed with garlic butter, fresh parsley, and gooey melted mozzarella cheese.",
    badge: "BAKED PERFECTION",
    category: "Baked Appetizers",
    rating: 5,
    ratingsCount: 380,
    reviewCount: 110,
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTime: "40 mins",
    servings: "10 servings",
    servingsCount: 10,
    calories: "290 kcal",
    author: "Robin Asbell",
    authorRole: "Culinary Author",
    date: "June 25, 2026",
    imageUrl: "/images/appetizer-garlic-pull-apart-bread.jpg",
    imageAlt: "Crusty sourdough pull apart bread stuffed with melted mozzarella and garlic herbs",
    imageCredit: "Dishora Studio / Robin Asbell",
    description: "The ultimate interactive party bread. Guests pull apart warm, crusty bread fingers dripping with garlic butter and stretchy melted mozzarella straight from the baking pan.",
    whyMakeThis: [
      "Spectacular visual presentation for family dinners and dinner parties.",
      "Every single bite is infused with garlic herb butter and cheese.",
      "Bakes in foil so the crust stays crunchy while the cheese melts into fondue."
    ],
    ingredients: [
      "1 round artisan sourdough or French bread boule (about 1 lb)",
      "1/2 cup unsalted butter, melted",
      "4 cloves garlic, finely minced",
      "2 tbsp fresh parsley, chopped",
      "1 tsp dried Italian seasoning",
      "1/2 tsp kosher salt",
      "2 1/2 cups shredded low-moisture mozzarella cheese",
      "1/3 cup freshly grated parmesan cheese",
      "Warm marinara sauce for dipping"
    ],
    instructions: [
      {
        step: 1,
        title: "Cut crosshatch loaf",
        text: "Preheat oven to 375°F (190°C). Using a serrated bread knife, slice bread in a 1-inch diamond crosshatch pattern, cutting deep but stopping before piercing through bottom crust.",
        timerMinutes: 6
      },
      {
        step: 2,
        title: "Mix garlic butter",
        text: "Whisk together melted butter, minced garlic, parsley, Italian seasoning, and salt in a small bowl.",
        timerMinutes: 2
      },
      {
        step: 3,
        title: "Stuff cheese and butter",
        text: "Drizzle garlic butter between all bread crevices. Stuff shredded mozzarella and parmesan generously into every crevice using your fingers.",
        timerMinutes: 6
      },
      {
        step: 4,
        title: "Bake in foil",
        text: "Wrap loaf loosely in aluminum foil. Bake for 15 minutes. Uncover top and bake 10 minutes more until cheese is bubbling and crust is golden crisp.",
        timerMinutes: 25
      }
    ],
    nutrition: {
      calories: "290 kcal",
      protein: "11g",
      carbs: "28g",
      fat: "15g",
      sodium: "460mg",
      fiber: "1.5g"
    },
    tips: [
      "Use a dense, crusty artisan sourdough boule so the bread doesn't collapse under the weight of the cheese.",
      "Serve hot right on a cutting board with a side bowl of marinara for dipping."
    ],
    tags: ["Baked", "Bread", "Cheese", "Party", "Crowd-Pleaser"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1022,
    slug: "crispy-spinach-feta-phyllo-triangles",
    title: "Flaky Spanakopita Spinach and Feta Triangles",
    leadText: "Delicate paper-thin layers of golden phyllo pastry brushed with butter and folded around a rich Greek filling of spinach, feta, dill, and scallions.",
    badge: "MEDITERRANEAN CLASSIC",
    category: "Baked Appetizers",
    rating: 5,
    ratingsCount: 265,
    reviewCount: 68,
    prepTime: "25 mins",
    cookTime: "20 mins",
    totalTime: "45 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "175 kcal",
    author: "Theodora Kaloudis",
    authorRole: "Executive Food Editor",
    date: "May 18, 2026",
    imageUrl: "/images/appetizer-spanakopita-triangles.jpg",
    imageAlt: "Golden crisp flaky phyllo spanakopita spinach and feta triangles",
    imageCredit: "Dishora Studio / Theodora Kaloudis",
    description: "The beloved Greek party pastry, handheld and baked to shatteringly crisp perfection. Every bite bursts with flaky buttery phyllo pastry and savory herb-laced spinach and salty feta.",
    whyMakeThis: [
      "Can be assembled and frozen unbaked for months; bake straight from the freezer.",
      "Traditional Greek filling made with authentic dill, green onion, and feta.",
      "Shatteringly crisp exterior with a warm, tender savory core."
    ],
    ingredients: [
      "10 sheets frozen phyllo dough, thawed in refrigerator overnight",
      "10 oz frozen chopped spinach, thawed and thoroughly squeezed bone-dry",
      "6 oz authentic Greek feta cheese, crumbled",
      "3 green onions, finely chopped",
      "2 tbsp fresh dill, finely minced",
      "1 large egg, lightly beaten",
      "Pinch of ground nutmeg",
      "1/2 cup unsalted butter, melted for brushing",
      "Freshly ground black pepper"
    ],
    instructions: [
      {
        step: 1,
        title: "Make the filling",
        text: "In a mixing bowl, combine dried spinach, crumbled feta, green onions, dill, egg, nutmeg, and black pepper. Mix thoroughly with a fork.",
        timerMinutes: 5
      },
      {
        step: 2,
        title: "Layer phyllo sheets",
        text: "Preheat oven to 375°F (190°C). Lay 1 sheet of phyllo on a clean surface (keep remaining sheets covered with a damp towel). Brush lightly with melted butter, top with a second sheet, and cut lengthwise into 4 equal strips.",
        timerMinutes: 5
      },
      {
        step: 3,
        title: "Fold flag-style triangles",
        text: "Place 1 tablespoon of filling at the bottom of each strip. Fold the corner diagonally over the filling to form a triangle, and continue folding up like a flag. Brush tops with butter.",
        timerMinutes: 10
      },
      {
        step: 4,
        title: "Bake until golden",
        text: "Place triangles on a parchment-lined baking sheet. Bake for 18–22 minutes until deep golden brown and crispy. Let cool 5 minutes before serving.",
        timerMinutes: 20
      }
    ],
    nutrition: {
      calories: "175 kcal",
      protein: "5g",
      carbs: "14g",
      fat: "11g",
      sodium: "310mg",
      fiber: "1.5g"
    },
    tips: [
      "Keep unused phyllo sheets covered with a lightly damp kitchen towel to prevent them from drying out and crumbling.",
      "Squeeze every drop of liquid from the spinach to keep the phyllo bottom crisp."
    ],
    tags: ["Greek", "Baked", "Vegetarian", "Phyllo", "Party"],
    relatedArticles: appetizerRelatedArticles
  },

  // 12. GAME DAY SNACKS
  {
    id: 1023,
    slug: "loaded-sheet-pan-beef-nachos",
    title: "Loaded Skillet-Baked Beef and Jalapeño Nachos",
    leadText: "Thick restaurant-style tortilla chips layered with seasoned ground beef, warm black beans, melted cheddar-jack cheese, pickled jalapeños, and pico de gallo.",
    badge: "GAME DAY ULTIMATE",
    category: "Game Day Snacks",
    rating: 5,
    ratingsCount: 490,
    reviewCount: 165,
    prepTime: "15 mins",
    cookTime: "15 mins",
    totalTime: "30 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "380 kcal",
    author: "Amanda Luchtel",
    authorRole: "Recipe Contributor",
    date: "August 10, 2026",
    imageUrl: "/images/appetizer-loaded-beef-nachos.jpg",
    imageAlt: "Sheet pan loaded with melted cheese beef nachos, jalapeños, and sour cream",
    imageCredit: "Dishora Studio / Amanda Luchtel",
    description: "The ultimate sharing food for Super Bowl Sunday and sports weekends. Two full layers of chips and cheese guarantee that every single chip gets an even coating of melted cheese, meat, and toppings.",
    whyMakeThis: [
      "Two-layer technique ensures no sad dry chips at the bottom of the pan.",
      "Ready in 30 minutes from start to table.",
      "Loaded with zesty seasoned beef, creamy cheeses, and fresh toppings."
    ],
    ingredients: [
      "1 bag (12 oz) thick restaurant-style corn tortilla chips",
      "1 lb ground beef (85/15) or ground turkey",
      "1 packet (1 oz) taco seasoning",
      "1 can (15 oz) black beans, rinsed and drained",
      "3 cups shredded Mexican cheese blend or sharp cheddar & Monterey Jack",
      "1/2 cup pickled or fresh sliced jalapeño peppers",
      "1/2 cup diced red onion",
      "1 cup fresh pico de gallo or salsa",
      "1/2 cup sour cream and 1 cup guacamole for serving",
      "Fresh cilantro leaves"
    ],
    instructions: [
      {
        step: 1,
        title: "Brown the beef",
        text: "In a skillet over medium-high heat, cook ground beef until browned, breaking it into small crumbles. Drain excess fat. Stir in taco seasoning and 1/3 cup water; simmer for 3 minutes.",
        timerMinutes: 8
      },
      {
        step: 2,
        title: "First layer",
        text: "Preheat oven to 400°F (200°C). Line a large sheet pan with parchment paper. Spread half the tortilla chips, top with half the beef, black beans, and half the shredded cheese.",
        timerMinutes: 3
      },
      {
        step: 3,
        title: "Second layer & bake",
        text: "Top with remaining chips, beef, black beans, sliced jalapeños, red onion, and remaining cheese. Bake for 8–10 minutes until cheese is fully melted and bubbling.",
        timerMinutes: 10
      },
      {
        step: 4,
        title: "Top and serve hot",
        text: "Remove from oven. Dollop fresh pico de gallo, guacamole, sour cream, and cilantro across the warm nachos. Serve immediately from the pan.",
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: "380 kcal",
      protein: "21g",
      carbs: "32g",
      fat: "19g",
      sodium: "680mg",
      fiber: "5g"
    },
    tips: [
      "Always layer chips and cheese twice — single-layer nachos leave plain chips underneath.",
      "Add fresh cold toppings (sour cream, guacamole, tomatoes) only after baking."
    ],
    tags: ["Game Day", "Nachos", "Beef", "Cheese", "Party"],
    relatedArticles: appetizerRelatedArticles
  },
  {
    id: 1024,
    slug: "bacon-wrapped-cheddar-jalapeno-poppers",
    title: "Smoky Bacon-Wrapped Jalapeño Poppers with Sharp Cheddar",
    leadText: "Fresh jalapeño pepper halves stuffed with a blend of cream cheese, sharp cheddar, and scallions, wrapped in smoky bacon and baked until sizzling.",
    badge: "TAILGATE CLASSIC",
    category: "Game Day Snacks",
    rating: 5,
    ratingsCount: 360,
    reviewCount: 95,
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTime: "40 mins",
    servings: "8 servings",
    servingsCount: 8,
    calories: "220 kcal",
    author: "Nick Evans",
    authorRole: "Senior Culinary Producer",
    date: "July 31, 2026",
    imageUrl: "/images/appetizer-jalapeno-poppers.jpg",
    imageAlt: "Crispy bacon wrapped jalapeno poppers with melted cheddar on a platter",
    imageCredit: "Dishora Studio / Nick Evans",
    description: "The quintessential spicy finger food for tailgates, cookouts, and Sunday games. Baking softens the jalapeños and tames their heat, while the creamy cheese and smoky bacon provide savory bliss.",
    whyMakeThis: [
      "Bacon stays crisp while the rich cheese center stays molten.",
      "Customizable spice level: remove all seeds and ribs for mild poppers.",
      "Assemble up to 24 hours ahead and bake right before kickoff."
    ],
    ingredients: [
      "12 medium fresh jalapeño peppers, halved lengthwise, seeds and ribs scraped out",
      "8 oz cream cheese, softened",
      "1 cup sharp cheddar cheese, shredded",
      "2 green onions, finely sliced",
      "1/2 tsp garlic powder & 1/2 tsp smoked paprika",
      "1/4 tsp salt & black pepper",
      "12 slices center-cut bacon, cut in half crosswise (24 short slices)",
      "Toothpicks for securing (optional)"
    ],
    instructions: [
      {
        step: 1,
        title: "Prep jalapeños",
        text: "Preheat oven to 400°F (200°C). Wearing gloves, slice jalapeños in half lengthwise and scrape out seeds and pale ribs with a spoon.",
        timerMinutes: 6
      },
      {
        step: 2,
        title: "Mix cheese stuffing",
        text: "In a bowl, mix cream cheese, shredded cheddar, green onions, garlic powder, smoked paprika, salt, and pepper until uniform.",
        timerMinutes: 4
      },
      {
        step: 3,
        title: "Stuff and wrap",
        text: "Fill each jalapeño half with cheese mixture. Wrap a half-slice of bacon snugly around each pepper, tucking the ends underneath.",
        timerMinutes: 6
      },
      {
        step: 4,
        title: "Bake on rack",
        text: "Place poppers on an oven-safe wire rack set over a baking sheet. Bake for 22–25 minutes until bacon is browned and crispy. Rest 5 minutes before serving.",
        timerMinutes: 25
      }
    ],
    nutrition: {
      calories: "220 kcal",
      protein: "8g",
      carbs: "3g",
      fat: "20g",
      sodium: "380mg",
      fiber: "1g"
    },
    tips: [
      "Always wear food prep gloves when handling and deseeding fresh jalapeño peppers.",
      "Baking on a wire rack lets excess bacon fat drip away, keeping the bacon extra crisp."
    ],
    tags: ["Jalapeno Poppers", "Game Day", "Bacon", "Cheese", "Spicy"],
    relatedArticles: appetizerRelatedArticles
  }
];
