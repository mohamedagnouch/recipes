const fs = require('fs');
const path = require('path');

// 28 Collections with customized rich recipes, rules, and FAQs
const collectionsConfig = [
  {
    slug: "our-most-saved-recipes-this-month",
    title: "Our Most-Saved Reader Favorite Recipes This Month",
    subtitle: "The verified 5-star recipes our home cooks bookmarked, shared, and made on repeat.",
    leadStory: "When thousands of home cooks bookmark the exact same recipes in a single month, we pay close attention. This curated collection brings together the undisputed crowd favorites: creamy weeknight pasta bakes, tender cast-iron proteins, and one-skillet family wonders that readers swear make weeknight dinner feel like a restaurant meal without the fuss.",
    author: "Theodora Kaloudis",
    authorRole: "Senior Food Editor & Recipe Tester",
    recipeCount: 20,
    heroImage: "/images/collection-most-saved.jpg",
    categoryKey: "WEEKNIGHT",
    tags: ["Trending", "Reader Favorites", "Top Rated", "Weeknight Dinner"],
    recipes: [
      {
        title: "Creamy Garlic Tuscan Butter Salmon",
        description: "Pan-crisped Atlantic salmon fillets bathed in a velvety garlic, sun-dried tomato, baby spinach, and parmesan cream sauce ready in 25 minutes.",
        prepTime: "10 mins", cookTime: "15 mins", servings: "4 servings", difficulty: "Easy", calories: "480 kcal", rating: 4.9, reviewsCount: 342,
        imageUrl: "/images/dinner-salmon-asparagus.jpg",
        ingredients: ["4 salmon fillets (6 oz each)", "2 tbsp olive oil", "3 cloves garlic, minced", "1/2 cup sun-dried tomatoes", "1 cup heavy cream", "2 cups baby spinach", "1/3 cup grated parmesan", "Lemon juice"],
        instructions: ["Sear salmon fillets in skillet for 4 mins per side until golden. Remove.", "Sauté minced garlic and sun-dried tomatoes in pan.", "Pour in cream and simmer; stir in spinach and parmesan until creamy.", "Return salmon to skillet, spoon sauce over top, and serve."],
        proTip: "Pat salmon completely dry with paper towels to ensure a golden, crisp crust."
      },
      {
        title: "One-Pot Creamy Lemon Herb Rigatoni",
        description: "Tender al dente rigatoni infused with fresh lemon zest, shallots, cracked black pepper, and silky mascarpone cheese.",
        prepTime: "5 mins", cookTime: "15 mins", servings: "4 servings", difficulty: "Quick", calories: "420 kcal", rating: 4.9, reviewsCount: 289,
        imageUrl: "/images/dinner-lemon-ricotta-pasta.jpg",
        ingredients: ["12 oz rigatoni", "2 tbsp butter", "2 shallots, diced", "Zest and juice of 2 lemons", "1/2 cup mascarpone", "1 cup grated Pecorino Romano", "Fresh basil"],
        instructions: ["Boil pasta until al dente; reserve 1/2 cup pasta water.", "Sauté shallots in butter until soft. Stir in lemon zest, juice, and mascarpone.", "Toss drained pasta and splash of water with Pecorino until glossy. Garnish with basil."],
        proTip: "Use organic unwaxed lemons as the zest contains all the aromatic citrus oils."
      },
      {
        title: "Crispy Honey Garlic Glazed Pork Chops",
        description: "Juicy bone-in pork chops seared until deeply caramelized and coated in a sticky 4-ingredient honey garlic sauce.",
        prepTime: "8 mins", cookTime: "14 mins", servings: "4 servings", difficulty: "Easy", calories: "390 kcal", rating: 4.8, reviewsCount: 195,
        imageUrl: "/images/dinner-honey-garlic-chicken.jpg",
        ingredients: ["4 bone-in pork chops", "1/3 cup honey", "4 cloves garlic, grated", "2 tbsp soy sauce", "1 tbsp apple cider vinegar", "1 tbsp butter"],
        instructions: ["Season chops with paprika, salt, and pepper.", "Sear in hot cast iron 4-5 mins per side until golden.", "Whisk honey, garlic, soy sauce, and vinegar; pour into skillet and baste chops as glaze thickens."],
        proTip: "Cook pork chops to 145°F with a 3-minute rest for juicy, tender meat."
      },
      {
        title: "Golden Skillet Chicken Piccata",
        description: "Thin chicken cutlets pan-fried in olive oil, drenched in a bright, briny reduction of white wine, lemon juice, butter, and capers.",
        prepTime: "10 mins", cookTime: "12 mins", servings: "4 servings", difficulty: "Easy", calories: "340 kcal", rating: 5.0, reviewsCount: 412,
        imageUrl: "/images/dinner-chicken-parmesan.jpg",
        ingredients: ["2 large chicken breasts, halved and pounded", "1/3 cup flour", "3 tbsp butter and 2 tbsp olive oil", "1/3 cup white wine", "3 tbsp lemon juice", "3 tbsp capers", "Fresh parsley"],
        instructions: ["Dredge chicken cutlets in flour; sear in butter and oil for 3 mins per side until golden.", "Deglaze pan with white wine, then add lemon juice and capers.", "Swirl in cold butter off heat for a glossy pan sauce; pour over chicken."],
        proTip: "Swirling cold butter into the sauce off heat creates a velvety emulsified sauce."
      },
      {
        title: "Cozy White Cheddar & Broccoli Skillet Rice",
        description: "A comforting one-pan wonder packed with tender broccoli florets, fluffy jasmine rice, and sharp white cheddar.",
        prepTime: "10 mins", cookTime: "20 mins", servings: "6 servings", difficulty: "Easy", calories: "310 kcal", rating: 4.8, reviewsCount: 167,
        imageUrl: "/images/lunch-quinoa-grain-bowl.jpg",
        ingredients: ["1 1/2 cups white rice", "3 cups chicken broth", "3 cups broccoli florets", "1 onion, diced", "1 1/2 cups sharp white cheddar, shredded", "1/4 cup milk"],
        instructions: ["Sauté onion in skillet, add rice and toast 1 min. Pour broth.", "Scatter broccoli on top, cover and simmer on low for 15 mins.", "Remove from heat, fluff rice, and fold in shredded cheddar and milk until creamy."],
        proTip: "Grate cheddar from a block so it melts into a silky, luxurious sauce."
      }
    ],
    rules: [
      { title: "Season Every Layer", advice: "Salt aromatics, broth, and proteins sequentially for restaurant depth." },
      { title: "Cast Iron For Searing", advice: "Heavy cast iron holds heat for unbeatable caramelized crusts." },
      { title: "Save Pasta Water", advice: "Starchy cooking water is the secret to glossy emulsion sauces." }
    ],
    faqs: [
      { question: "How are the most-saved recipes determined?", answer: "We aggregate user bookmarks, high recipe completions, and verified 5-star reviews across the site." },
      { question: "Can these recipes be meal-prepped?", answer: "Yes, all five hold well in airtight containers in the fridge for up to 3 days." }
    ]
  },

  {
    slug: "easy-ground-beef-dinners-weeknights",
    title: "25 Dinners To Make With a Package of Ground Beef",
    subtitle: "Turn one humble pound of ground beef into satisfying, flavor-packed weeknight feasts.",
    leadStory: "Ground beef is the undisputed MVP of weeknight dinner. It's budget-friendly, defrosts quickly, and cooks in minutes while absorbing bold spices like a sponge. Whether you're craving a cozy baked pasta, savory Asian lettuce wraps, crispy smash burgers, or Mexican taco skillets, here is how our editors maximize every single pound.",
    author: "Devan Grimsrud",
    authorRole: "Food Stylist & Home Cooking Strategist",
    recipeCount: 25,
    heroImage: "/images/collection-ground-beef.jpg",
    categoryKey: "WEEKNIGHT",
    tags: ["Ground Beef", "Budget", "Family Dinner", "Quick Meals"],
    recipes: [
      {
        title: "Cheesy Skillet Beef Enchilada Bake",
        description: "All the bold flavors of rolled beef enchiladas without the rolling hassle. Layered with corn tortillas, smoky red sauce, and melted Monterey Jack.",
        prepTime: "10 mins", cookTime: "20 mins", servings: "5 servings", difficulty: "Easy", calories: "450 kcal", rating: 4.9, reviewsCount: 318,
        imageUrl: "/images/dinner-beef-enchiladas.jpg",
        ingredients: ["1 lb lean ground beef", "1 onion, chopped", "2 tbsp taco seasoning", "1 can (10 oz) red enchilada sauce", "1 can black beans, drained", "8 corn tortillas, quartered", "2 cups shredded cheese"],
        instructions: ["Brown beef and onion in skillet; drain grease.", "Stir in taco seasoning, black beans, and half the enchilada sauce.", "Layer tortilla quarters into beef, pour remaining sauce, top with cheese, and bake 10 mins until bubbly."],
        proTip: "Broil for the final 2 minutes for golden brown blistered cheese edges."
      },
      {
        title: "Korean-Style Sweet & Spicy Beef Rice Bowls",
        description: "Browned ground beef glazed in soy sauce, sesame oil, brown sugar, fresh ginger, and sriracha, served over steamed rice with crunchy cucumber.",
        prepTime: "5 mins", cookTime: "12 mins", servings: "4 servings", difficulty: "Quick", calories: "410 kcal", rating: 4.9, reviewsCount: 274,
        imageUrl: "/images/lunch-beef-shawarma-bowl.jpg",
        ingredients: ["1 lb ground beef", "4 cloves garlic, minced", "1 tbsp grated ginger", "1/3 cup soy sauce", "1/4 cup brown sugar", "2 tsp sesame oil", "1 tsp sriracha", "Steamed rice, green onions"],
        instructions: ["Whisk soy sauce, brown sugar, sesame oil, and sriracha.", "Brown beef in skillet with garlic and ginger.", "Pour glaze over beef and simmer 3 mins until glossy. Serve over warm rice."],
        proTip: "Top with a fried runny egg for creamy yolks mingling with sweet-savory beef."
      },
      {
        title: "Classic Creamy Ground Beef Stroganoff",
        description: "Tender seasoned ground beef and earthy cremini mushrooms simmered in a rich garlic sour cream sauce over buttery egg noodles.",
        prepTime: "10 mins", cookTime: "18 mins", servings: "4 servings", difficulty: "Easy", calories: "490 kcal", rating: 4.8, reviewsCount: 198,
        imageUrl: "/images/dinner-beef-bolognese.jpg",
        ingredients: ["1 lb ground beef", "8 oz cremini mushrooms, sliced", "1 onion, chopped", "2 tbsp flour", "2 cups beef broth", "1 tbsp Worcestershire sauce", "1/2 cup sour cream", "8 oz egg noodles"],
        instructions: ["Brown beef and set aside. Sauté mushrooms and onion in pan until golden.", "Stir in flour, then slowly whisk in beef broth and Worcestershire.", "Simmer until thick, stir in sour cream and beef off heat, and serve over egg noodles."],
        proTip: "Never boil sour cream or it will separate; keep heat very low."
      },
      {
        title: "Crispy Cast-Iron Smash Burgers",
        description: "Lacy, crispy-edged beef patties smashed ultra-thin on smoking hot cast iron with melted American cheese and secret burger sauce.",
        prepTime: "10 mins", cookTime: "8 mins", servings: "4 burgers", difficulty: "Easy", calories: "520 kcal", rating: 5.0, reviewsCount: 480,
        imageUrl: "/images/collection-ground-beef.jpg",
        ingredients: ["1 lb ground chuck (80/20)", "Kosher salt, pepper", "4 slices American cheese", "4 brioche buns, toasted", "Burger sauce: mayo, ketchup, relish"],
        instructions: ["Divide meat into 8 loose balls.", "Place on screaming hot skillet, press flat with spatula and parchment paper.", "Cook 2 mins until edges are lacy brown, flip, add cheese, cook 1 min, and stack."],
        proTip: "Use parchment paper when smashing so meat doesn't stick to the metal spatula."
      },
      {
        title: "One-Pot Lasagna Soup with Ricotta Swirl",
        description: "All the rich tomato, beef, and herb magic of a 3-hour baked lasagna prepared in just 30 minutes in a single soup pot.",
        prepTime: "10 mins", cookTime: "20 mins", servings: "6 servings", difficulty: "Easy", calories: "430 kcal", rating: 4.9, reviewsCount: 220,
        imageUrl: "/images/dinner-lasagna-bolognese.jpg",
        ingredients: ["1 lb ground beef", "1 onion, diced", "3 cloves garlic", "1 jar marinara sauce", "4 cups broth", "8 broken lasagna noodles", "Ricotta and parmesan for topping"],
        instructions: ["Brown beef and onion in a Dutch oven; drain grease and add garlic.", "Pour in marinara and broth; bring to a boil.", "Add broken noodles and cook 10 mins. Serve with a dollop of ricotta."],
        proTip: "Cook noodles separately if planning for leftovers so they don't absorb all the broth."
      }
    ],
    rules: [
      { title: "Sear Undisturbed", advice: "Let ground beef sit undisturbed for 3 minutes on high heat for deep browning." },
      { title: "Leave 1 Tbsp Fat", advice: "Drain excess grease but keep 1 tablespoon to coat spices and sauté onions." },
      { title: "Baking Soda Tenderizer", advice: "A pinch of baking soda mixed with 1 tbsp water tenderizes ground beef amazingly." }
    ],
    faqs: [
      { question: "Can I use ground turkey instead?", answer: "Yes, ground turkey or chicken swaps 1:1, just add 1 tbsp olive oil to compensate for lower fat." },
      { question: "How long does cooked ground beef last in the freezer?", answer: "Cooked beef in sauce freezes well in airtight bags for up to 3 months." }
    ]
  },

  {
    slug: "ultimate-weekend-cookout-recipes",
    title: "20 Sizzling Recipes for Your Ultimate Weekend Cookout",
    subtitle: "From flame-kissed ribs and charred burgers to crisp summer sides and refreshing sauces.",
    leadStory: "Nothing brings friends and family together quite like the aroma of charcoal smoke and sizzling meat drifting across the backyard. Our ultimate weekend cookout guide covers every corner of the grill: foolproof marinades, temperature charts for juicy results, charred summer corn, and make-ahead salads that stay crisp in the summer sun.",
    author: "Theodora Kaloudis",
    authorRole: "Senior Food Editor",
    recipeCount: 20,
    heroImage: "/images/collection-weekend-cookout.jpg",
    categoryKey: "SUMMER",
    tags: ["Grilling", "Cookout", "BBQ", "Summer", "Outdoor"],
    recipes: [
      {
        title: "Charred Street Corn (Elote) with Cotija & Lime",
        description: "Sweet corn grilled until smoky and blistered, slathered with zesty lime-crema, crumbled cotija cheese, chili powder, and fresh cilantro.",
        prepTime: "10 mins", cookTime: "12 mins", servings: "6 ears", difficulty: "Easy", calories: "210 kcal", rating: 4.9, reviewsCount: 380,
        imageUrl: "/images/appetizer-charred-corn-salsa.jpg",
        ingredients: ["6 ears sweet corn, husked", "2 tbsp melted butter", "1/3 cup mayo", "1/4 cup crema or sour cream", "1 cup cotija cheese", "1 tsp chili powder", "Lime wedges, cilantro"],
        instructions: ["Brush corn with butter; grill over medium-high heat for 10-12 mins until charred in spots.", "Whisk mayo, crema, and lime juice.", "Brush grilled corn with crema mixture, then sprinkle cotija, chili powder, and cilantro."],
        proTip: "Keep some char on the kernels for deep smoky flavor."
      },
      {
        title: "Smoky Sweet BBQ Pulled Pork Sliders",
        description: "Slow-smoked pork shoulder shredded into juicy morsels, tossed in bourbon brown sugar BBQ sauce, on toasted potato rolls with crisp slaw.",
        prepTime: "15 mins", cookTime: "30 mins", servings: "12 sliders", difficulty: "Easy", calories: "320 kcal", rating: 4.9, reviewsCount: 265,
        imageUrl: "/images/lunch-pulled-pork-sandwich.jpg",
        ingredients: ["2 lbs smoked pulled pork", "1 1/2 cups BBQ sauce", "2 tbsp cider vinegar", "12 slider rolls", "2 cups apple cider cabbage slaw"],
        instructions: ["Warm pulled pork in a skillet with BBQ sauce and cider vinegar.", "Toast slider rolls on the grill.", "Pile high with warm saucy pork and top with cold crunchy slaw."],
        proTip: "The crisp acid of the slaw cuts through the rich barbecue sauce."
      },
      {
        title: "Grilled Chimichurri Skirt Steak Platter",
        description: "Tender skirt steak grilled over roaring charcoal for 3 minutes per side, sliced across the grain, and draped in vibrant garlic-herb chimichurri.",
        prepTime: "15 mins", cookTime: "8 mins", servings: "6 servings", difficulty: "Medium", calories: "440 kcal", rating: 5.0, reviewsCount: 420,
        imageUrl: "/images/dinner-steak-asparagus.jpg",
        ingredients: ["2 lbs skirt steak", "Olive oil, kosher salt", "1 cup fresh parsley", "4 cloves garlic", "1/4 cup red wine vinegar", "1/2 cup olive oil", "Oregano, chili flakes"],
        instructions: ["Whisk parsley, garlic, vinegar, olive oil, and herbs for chimichurri.", "Rub steak with oil and salt; grill over direct high heat for 3-4 mins per side.", "Rest 10 mins, slice against the grain, and spoon sauce over top."],
        proTip: "Skirt steak must be sliced thinly across the grain for tenderness."
      },
      {
        title: "Zesty Herb & Dijon Grilled Potato Salad",
        description: "Baby Yukon Gold potatoes boiled until tender, then grilled until skins are blistered, tossed in a creamy Dijon mustard and dill dressing.",
        prepTime: "15 mins", cookTime: "20 mins", servings: "8 servings", difficulty: "Easy", calories: "185 kcal", rating: 4.8, reviewsCount: 176,
        imageUrl: "/images/dinner-lemon-rosemary-chicken.jpg",
        ingredients: ["2 lbs baby potatoes, halved", "3 tbsp olive oil", "2 tbsp whole grain Dijon", "2 tbsp cider vinegar", "Fresh dill and chives", "Red onion, minced"],
        instructions: ["Boil potatoes 10 mins until fork-tender; drain.", "Grill cut-side down for 6 mins until charred and crispy.", "Toss warm potatoes in bowl with mustard, vinegar, olive oil, and herbs."],
        proTip: "Toss while potatoes are hot so they drink in the vinaigrette."
      },
      {
        title: "Grilled Peach & Burrata Salad with Hot Honey",
        description: "Ripe yellow peaches grilled until caramelized, paired with creamy torn burrata, baby arugula, toasted pistachios, and spicy hot honey.",
        prepTime: "10 mins", cookTime: "6 mins", servings: "4 servings", difficulty: "Easy", calories: "280 kcal", rating: 4.9, reviewsCount: 230,
        imageUrl: "/images/appetizer-whipped-feta-dip.jpg",
        ingredients: ["4 ripe peaches, halved", "1 tbsp olive oil", "2 balls burrata cheese", "3 cups baby arugula", "1/4 cup pistachios, toasted", "2 tbsp hot honey", "Sea salt"],
        instructions: ["Brush peach halves with olive oil; grill cut-side down 4 mins until grill marks appear.", "Arrange arugula on platter, top with grilled peaches and torn burrata.", "Drizzle with hot honey and sprinkle toasted pistachios and sea salt."],
        proTip: "Use firm-ripe peaches so they hold their shape on grill grates."
      }
    ],
    rules: [
      { title: "Two-Zone Fire", advice: "Bank coals to one side so you can sear over high heat and finish gently over indirect heat." },
      { title: "Oil Hot Grates", advice: "Wipe hot grates with an oiled cloth right before cooking to prevent sticking." },
      { title: "Sauce at the End", advice: "Sugar-based BBQ sauces burn quickly; brush them on only in the last 5 minutes of cooking." }
    ],
    faqs: [
      { question: "How early can I prep salads and sides?", answer: "Potato salads and slaws can be prepped up to 24 hours in advance." },
      { question: "What temperature should steak reach for medium-rare?", answer: "Pull steaks off grill at 130°F; carryover cooking will bring them to 135°F." }
    ]
  },

  {
    slug: "bucket-list-end-of-summer-recipes",
    title: "20 Bucket List Recipes To Make Before the End of Summer",
    subtitle: "Savor peak sweet corn, heirloom tomatoes, fresh peaches, and basil before autumn arrives.",
    leadStory: "August and September offer the absolute pinnacle of fresh produce. Before sweater weather sets in, honor the harvest with sun-drenched heirloom tomato tarts, sweet corn risotto, charred zucchini flatbreads, and warm peach crumbles bursting with fragrant juices.",
    author: "Theodora Kaloudis",
    authorRole: "Senior Food Editor",
    recipeCount: 20,
    heroImage: "/images/collection-summer-produce.jpg",
    categoryKey: "SUMMER",
    tags: ["Summer", "Seasonal", "Fresh Produce", "Heirloom Tomatoes"],
    recipes: [
      {
        title: "Heirloom Tomato & Whipped Ricotta Galette",
        description: "Flaky all-butter crust layered with lemon-herb whipped ricotta and multi-colored heirloom tomato slices baked to golden perfection.",
        prepTime: "20 mins", cookTime: "35 mins", servings: "6 servings", difficulty: "Medium", calories: "360 kcal", rating: 4.9, reviewsCount: 195,
        imageUrl: "/images/appetizer-tomato-bruschetta.jpg",
        ingredients: ["1 store-bought or homemade pie crust", "1 cup whole milk ricotta", "Zest of 1 lemon", "2 large heirloom tomatoes, sliced", "Fresh basil, thyme", "1 egg for wash", "Flaky sea salt"],
        instructions: ["Roll out crust on parchment. Whisk ricotta with lemon zest, salt, and thyme; spread over dough leaving a 2-inch border.", "Layer sliced tomatoes on top; fold dough edges up over tomatoes.", "Brush crust with egg wash and bake at 400°F for 35 mins until golden. Garnish with basil."],
        proTip: "Salt tomato slices on paper towels for 15 minutes before assembling to remove excess liquid."
      },
      {
        title: "Sweet Corn & Basil Risotto with Parmesan",
        description: "Creamy Arborio rice simmered with homemade sweet corn cob broth, fresh crisp kernels, butter, and freshly grated Parmigiano.",
        prepTime: "15 mins", cookTime: "25 mins", servings: "4 servings", difficulty: "Medium", calories: "410 kcal", rating: 4.8, reviewsCount: 154,
        imageUrl: "/images/dinner-risotto-mushrooms.jpg",
        ingredients: ["1 1/2 cups Arborio rice", "3 ears sweet corn, kernels cut and cobs simmered in broth", "4 cups vegetable or corn broth", "1/2 cup white wine", "1 shallot, minced", "1/2 cup parmesan", "Fresh basil"],
        instructions: ["Simmer stripped corn cobs in broth for 15 mins for rich corn stock.", "Sauté shallot in butter, toast rice, deglaze with wine.", "Add warm broth ladle by ladle, stirring constantly for 18 mins.", "Stir in fresh raw corn kernels, parmesan, and torn basil in the final 2 minutes."],
        proTip: "Don't discard the bare corn cobs—simmering them yields liquid gold stock."
      },
      {
        title: "Classic Peach & Blackberry Crisp with Vanilla Ice Cream",
        description: "Juicy ripe summer peaches and plump blackberries baked under a crunchy cinnamon-oat and brown sugar streusel topping.",
        prepTime: "15 mins", cookTime: "40 mins", servings: "8 servings", difficulty: "Easy", calories: "340 kcal", rating: 5.0, reviewsCount: 310,
        imageUrl: "/images/dessert-blueberry-crumble.jpg",
        ingredients: ["5 cups sliced peaches", "1 cup blackberries", "1/4 cup sugar", "1 tbsp cornstarch", "Topping: 1 cup rolled oats, 1/2 cup flour, 1/2 cup brown sugar, 6 tbsp cold butter cubes, 1 tsp cinnamon"],
        instructions: ["Toss fruit with sugar and cornstarch in baking dish.", "Mix oats, flour, brown sugar, cinnamon; cut in butter until crumbly.", "Scatter topping over fruit. Bake at 375°F for 40 mins until bubbling and crisp."],
        proTip: "Leave peach skins on! They add gorgeous rosy color and tender texture to the filling."
      },
      {
        title: "Zucchini & Ricotta Grilled Flatbread Pizza",
        description: "Charred artisan pizza crust topped with garlic oil, shaved ribbon zucchini, whole milk ricotta dollops, lemon zest, and red pepper flakes.",
        prepTime: "15 mins", cookTime: "10 mins", servings: "4 servings", difficulty: "Easy", calories: "290 kcal", rating: 4.8, reviewsCount: 142,
        imageUrl: "/images/lunch-caprese-sandwich.jpg",
        ingredients: ["1 lb pizza dough", "2 medium zucchini, shaved into ribbons", "1 cup ricotta", "2 tbsp olive oil", "1 clove garlic, grated", "Zest of 1 lemon", "Hot honey, chili flakes"],
        instructions: ["Grill stretched dough directly on grates for 2 mins per side until charred.", "Brush with garlic oil, spread ricotta dollops and zucchini ribbons.", "Close grill lid for 3 mins to melt cheese. Drizzle hot honey before serving."],
        proTip: "Use a vegetable peeler to make thin zucchini ribbons that cook instantly on hot pizza."
      },
      {
        title: "Basil Watermelon & Feta Salad with Lime",
        description: "Crisp cold seedless watermelon cubes tossed with briny sheep's milk feta, fresh garden mint, basil, and a zesty lime vinaigrette.",
        prepTime: "10 mins", cookTime: "0 mins", servings: "6 servings", difficulty: "Quick", calories: "140 kcal", rating: 4.9, reviewsCount: 220,
        imageUrl: "/images/lunch-mediterranean-salad.jpg",
        ingredients: ["6 cups seedless watermelon cubes, chilled", "1 cup crumbled feta cheese", "1/4 cup fresh mint and basil leaves", "2 tbsp olive oil", "Juice of 1 lime", "Flaky sea salt"],
        instructions: ["Place chilled watermelon in a wide serving bowl.", "Gently fold in crumbled feta and fresh torn mint and basil.", "Drizzle with olive oil and lime juice; sprinkle lightly with flaky sea salt and serve immediately."],
        proTip: "Assemble right before serving so the watermelon doesn't release water into the bowl."
      }
    ],
    rules: [
      { title: "Salt Your Tomatoes", advice: "Always let tomato slices drain on paper towels to avoid soggy pastry." },
      { title: "Corn Cob Broth", advice: "Simmer stripped cobs in water for an intensely sweet vegetable broth." },
      { title: "Keep Fruit Room Temp", advice: "Don't refrigerate ripe stone fruits or tomatoes—cold ruins their silky texture." }
    ],
    faqs: [
      { question: "How do I choose the best heirloom tomatoes?", answer: "Look for tomatoes that feel heavy for their size and have an earthy, fragrant aroma near the stem." },
      { question: "Can I use frozen fruit for the crisp?", answer: "Yes, but fresh peak-season fruit yields far better texture and sweetness." }
    ]
  },

  {
    slug: "best-dinner-recipes-of-all-time",
    title: "Our 34 Best Dinner Recipes of All Time",
    subtitle: "The Hall of Fame recipes our editors and readers turn to when failure is not an option.",
    leadStory: "These are the crown jewels of our recipe library. Every recipe in this collection has earned at least 500 five-star reviews and survived multiple rounds of rigorous test kitchen testing. From perfectly seared steaks and golden roast chicken to traditional Bolognese, these dishes guarantee dinner table applause.",
    author: "Devan Grimsrud",
    authorRole: "Food Stylist & Home Cooking Strategist",
    recipeCount: 34,
    heroImage: "/images/collection-editors-repeat.jpg",
    categoryKey: "WEEKNIGHT",
    tags: ["Classics", "Hall of Fame", "Dinner", "5-Star"],
    recipes: [
      {
        title: "Cast-Iron Ribeye Steak with Garlic Herb Butter",
        description: "Thick-cut USDA Prime ribeye seared with a dark savory crust, basted repeatedly with foaming butter, smashed garlic, and fresh rosemary sprigs.",
        prepTime: "5 mins", cookTime: "10 mins", servings: "2 servings", difficulty: "Medium", calories: "620 kcal", rating: 5.0, reviewsCount: 680,
        imageUrl: "/images/dinner-steak-asparagus.jpg",
        ingredients: ["1 bone-in ribeye steak (1.5 inches thick)", "2 tbsp kosher salt", "2 tbsp high-smoke oil", "3 tbsp unsalted butter", "4 cloves garlic, smashed", "3 sprigs fresh rosemary & thyme"],
        instructions: ["Season steak generously with salt; let come to room temp for 30 mins.", "Sear in smoking hot cast iron for 2-3 mins without moving to form a deep crust. Flip.", "Add butter, garlic, and herbs to the skillet. Tilt pan and spoon foaming butter continuously over steak for 3 mins.", "Rest on warm board for 8 minutes before slicing."],
        proTip: "Continual butter basting cooks the steak evenly from both sides without burning."
      },
      {
        title: "Classic Sunday Night Bolognese Ragù",
        description: "Ground beef, pork, and pancetta slow-simmered for 3 hours with white wine, whole milk, and tomatoes into a rich, silky meat sauce.",
        prepTime: "20 mins", cookTime: "3 hrs", servings: "8 servings", difficulty: "Medium", calories: "490 kcal", rating: 5.0, reviewsCount: 840,
        imageUrl: "/images/dinner-beef-bolognese.jpg",
        ingredients: ["1 lb ground chuck, 1/2 lb ground pork, 4 oz pancetta", "1 onion, 1 carrot, 2 celery ribs, minced", "1 cup dry white wine", "1 cup whole milk", "1 can (28 oz) San Marzano tomatoes, crushed", "Pappardelle or tagliatelle"],
        instructions: ["Brown pancetta, beef, and pork in a Dutch oven; remove.", "Cook finely diced onion, carrot, and celery in butter until sweet.", "Return meat, add white wine and reduce until evaporated.", "Add milk and simmer gently until absorbed; stir in tomatoes and simmer on lowest heat for 3 hours."],
        proTip: "Simmering meat in milk before adding tomatoes breaks down collagen for melting tenderness."
      },
      {
        title: "Crisp-Skinned Lemon Herb Roast Chicken",
        description: "Whole roasted chicken stuffed with garlic, lemons, and herbs, baked over a bed of baby potatoes that roast in aromatic chicken drippings.",
        prepTime: "15 mins", cookTime: "1 hr 15 mins", servings: "5 servings", difficulty: "Easy", calories: "510 kcal", rating: 4.9, reviewsCount: 520,
        imageUrl: "/images/dinner-lemon-rosemary-chicken.jpg",
        ingredients: ["1 whole chicken (4.5 lbs)", "1 head garlic, halved", "2 lemons, halved", "Fresh rosemary, thyme", "3 tbsp softened butter", "1.5 lbs Yukon gold potatoes, halved"],
        instructions: ["Pat chicken dry. Rub butter, salt, and herbs under and over the skin.", "Stuff cavity with lemon halves, garlic head, and herb sprigs.", "Scatter potatoes in roasting pan, place chicken on top, and roast at 425°F for 75 mins until internal temp reaches 165°F.", "Rest 15 mins before carving."],
        proTip: "Dry the skin uncovered in the fridge for 4 hours before roasting for crackling crisp skin."
      },
      {
        title: "Creamy Pan-Seared Salmon with Lemon Butter Caper Sauce",
        description: "Golden pan-crisped salmon fillets served over a bright reduction of butter, white wine, garlic, and briny capers.",
        prepTime: "10 mins", cookTime: "12 mins", servings: "4 servings", difficulty: "Easy", calories: "420 kcal", rating: 4.9, reviewsCount: 490,
        imageUrl: "/images/dinner-salmon-asparagus.jpg",
        ingredients: ["4 salmon fillets", "2 tbsp olive oil", "2 tbsp butter", "3 cloves garlic, minced", "1/4 cup white wine", "2 tbsp lemon juice", "2 tbsp capers", "Parsley"],
        instructions: ["Sear salmon in hot skillet 4 mins per side; transfer to plate.", "Sauté garlic in same skillet, pour in wine and lemon juice, reduce by half.", "Swirl in butter and capers; spoon over warm salmon."],
        proTip: "Press salmon down gently with a spatula when first placing in skillet to prevent curling."
      },
      {
        title: "Classic Four-Cheese Baked Lasagna Bolognese",
        description: "Layers of slow-cooked ragù, creamy béchamel, whole milk mozzarella, ricotta, and parmesan baked until bubbling and browned.",
        prepTime: "30 mins", cookTime: "45 mins", servings: "8 servings", difficulty: "Medium", calories: "580 kcal", rating: 5.0, reviewsCount: 710,
        imageUrl: "/images/dinner-lasagna-bolognese.jpg",
        ingredients: ["12 lasagna noodles", "4 cups Bolognese ragù", "2 cups ricotta mixed with 1 egg", "3 cups shredded mozzarella", "1 cup grated parmesan", "Fresh basil"],
        instructions: ["Spread ragù in baking dish bottom. Layer noodles, ricotta, ragù, and mozzarella.", "Repeat for 4 layers, ending with a blanket of mozzarella and parmesan.", "Bake covered at 375°F for 30 mins, uncover and bake 15 mins until golden and bubbly.", "Rest 20 mins before slicing."],
        proTip: "Resting lasagna for 20 minutes before slicing prevents the layers from sliding apart."
      }
    ],
    rules: [
      { title: "Rest Meats Always", advice: "Resting redistribution juices back into muscle fibers rather than onto cutting board." },
      { title: "Use Real San Marzano", advice: "Certified D.O.P. Italian tomatoes provide balanced sweetness and low acidity." },
      { title: "Preheat Cookware", advice: "Never add cold meat to a cold skillet. Preheat thoroughly before adding oil." }
    ],
    faqs: [
      { question: "Why do these recipes rank as the best of all time?", answer: "Each recipe has over 500 verified 5-star ratings from home cooks over multiple years." },
      { question: "Can the Bolognese be frozen?", answer: "Yes, Bolognese freezes exceptionally well for up to 4 months." }
    ]
  },

  {
    slug: "authentic-italian-dinners-nonna-kitchen",
    title: "20 Italian Dinner Recipes That Make You Feel Like You're Back in Nonna's Kitchen",
    subtitle: "Handmade pastas, slow-simmered sauces, tender cutlets, and rustic garlic focaccia.",
    leadStory: "True Italian home cooking isn't about complicated culinary gymnastics; it's about honoring simple, premium ingredients. These recipes celebrate the warmth and spirit of Sunday dinners with Nonna: silky carbonara made the Roman way without cream, crispy golden chicken parmesan, melt-in-your-mouth meatballs, and garlic bread hot from the oven.",
    author: "Theodora Kaloudis",
    authorRole: "Senior Food Editor",
    recipeCount: 20,
    heroImage: "/images/collection-italian-pasta.jpg",
    categoryKey: "ITALIAN",
    tags: ["Italian", "Pasta", "Comfort Food", "Nonna's Kitchen"],
    recipes: [
      {
        title: "Traditional Roman Spaghetti Carbonara",
        description: "The genuine Roman classic: al dente spaghetti tossed with crispy guanciale, rich egg yolks, and sharp Pecorino Romano—no cream needed.",
        prepTime: "10 mins", cookTime: "15 mins", servings: "4 servings", difficulty: "Medium", calories: "470 kcal", rating: 5.0, reviewsCount: 560,
        imageUrl: "/images/dinner-carbonara.jpg",
        ingredients: ["1 lb spaghetti", "6 oz guanciale or thick pancetta, diced", "4 large egg yolks + 1 whole egg", "1 1/2 cups finely grated Pecorino Romano", "Freshly cracked black pepper"],
        instructions: ["Cook guanciale in skillet over medium heat until crispy; remove from heat.", "Whisk egg yolks, whole egg, Pecorino, and heavy black pepper in a bowl into a thick paste.", "Boil spaghetti in lightly salted water; transfer hot pasta directly into skillet with rendered pork fat.", "Pour egg-cheese paste over pasta off the heat, splashing 1/4 cup pasta water while tossing vigorously to form a creamy emulsion."],
        proTip: "Always take the pan completely off the heat before adding eggs so they emulsify into sauce rather than scrambling."
      },
      {
        title: "Crispy Skillet Chicken Parmigiana",
        description: "Pounded chicken cutlets coated in seasoned breadcrumbs and parmesan, shallow fried, topped with marinara and fresh melted mozzarella.",
        prepTime: "15 mins", cookTime: "15 mins", servings: "4 servings", difficulty: "Easy", calories: "510 kcal", rating: 4.9, reviewsCount: 430,
        imageUrl: "/images/dinner-chicken-parmesan.jpg",
        ingredients: ["2 large chicken breasts, halved horizontally", "1 cup panko + 1/2 cup Italian breadcrumbs", "1/2 cup grated parmesan", "2 eggs, beaten", "1 1/2 cups marinara sauce", "8 oz fresh mozzarella, sliced", "Fresh basil"],
        instructions: ["Dredge cutlets in flour, egg, and breadcrumb-parmesan mix.", "Pan-fry in olive oil for 3-4 mins per side until crispy golden.", "Top each cutlet with warm marinara and a thick slice of mozzarella.", "Broil 3 mins until cheese melts and bubbles with golden spots."],
        proTip: "Add panko to the breadcrumb mix for extra crunch that stays crisp under sauce."
      },
      {
        title: "Sunday Gravy with Pork Ribs and Beef Meatballs",
        description: "Tender beef and pork meatballs simmered low and slow alongside bone-in pork ribs in sweet San Marzano tomato sauce.",
        prepTime: "30 mins", cookTime: "2 hrs 30 mins", servings: "8 servings", difficulty: "Medium", calories: "540 kcal", rating: 5.0, reviewsCount: 385,
        imageUrl: "/images/appetizer-cocktail-meatballs.jpg",
        ingredients: ["1 lb ground beef, 1/2 lb ground pork", "1/2 cup breadcrumbs soaked in 1/3 cup milk", "1/2 cup parmesan", "2 eggs", "1 lb bone-in pork country ribs", "2 cans (28 oz) crushed San Marzano tomatoes", "4 cloves garlic, fresh basil"],
        instructions: ["Gently form meatballs and brown in olive oil; brown pork ribs as well.", "Sauté garlic in drippings, add crushed tomatoes, basil, and salt.", "Submerge ribs and meatballs in sauce, cover, and simmer on low for 2.5 hours until ribs are fall-apart tender.", "Serve over rigatoni."],
        proTip: "Soaking breadcrumbs in milk (a panade) guarantees meatballs stay pillow-soft inside."
      },
      {
        title: "Creamy Polenta with Wild Mushroom Ragù",
        description: "Slow-cooked golden polenta enriched with butter and mascarpone, topped with garlic-herb sautéed cremini, shiitake, and thyme.",
        prepTime: "10 mins", cookTime: "30 mins", servings: "4 servings", difficulty: "Easy", calories: "380 kcal", rating: 4.8, reviewsCount: 190,
        imageUrl: "/images/dinner-risotto-mushrooms.jpg",
        ingredients: ["1 cup coarse yellow polenta", "4 cups water or vegetable broth", "3 tbsp butter", "1/3 cup mascarpone or parmesan", "1 lb mixed wild mushrooms, sliced", "3 cloves garlic, thyme, olive oil"],
        instructions: ["Whisk polenta into boiling broth; reduce heat and simmer low, stirring often for 25 mins.", "Fold in butter and mascarpone until rich and creamy.", "Sauté mushrooms in olive oil over high heat until browned; add garlic, thyme, and splash of balsamic.", "Spoon mushrooms over bowls of warm polenta."],
        proTip: "Whisk polenta vigorously when pouring into water to prevent lumps."
      },
      {
        title: "Warm Rosemary & Garlic Sea Salt Focaccia",
        description: "Dimpled Italian olive oil flatbread with a shatteringly crisp crust and airy crumb, scented with rosemary and flaky Maldon salt.",
        prepTime: "20 mins", cookTime: "25 mins", servings: "10 servings", difficulty: "Medium", calories: "220 kcal", rating: 4.9, reviewsCount: 275,
        imageUrl: "/images/appetizer-garlic-pull-apart-bread.jpg",
        ingredients: ["4 cups bread flour", "2 tsp instant yeast", "1 3/4 cups warm water", "1/3 cup extra virgin olive oil", "2 sprigs fresh rosemary", "Flaky sea salt"],
        instructions: ["Mix dough, let rise until doubled in size (2-3 hours).", "Transfer to oiled 9x13 pan, stretch gently, let rest 45 mins.", "Dimple dough deeply with fingers, drizzle generously with olive oil, press rosemary and flaky salt into surface.", "Bake at 425°F for 25 mins until golden and hollow sounding."],
        proTip: "Don't be shy with olive oil—it fries the bottom of the dough in the pan for crispness."
      }
    ],
    rules: [
      { title: "No Cream in Carbonara", advice: "Emulsify egg yolks, pecorino, and starchy pasta water for authentic richness." },
      { title: "Panade for Meatballs", advice: "Breadcrumbs soaked in milk keep meatballs tender and fluffy." },
      { title: "Cook Pasta Al Dente", advice: "Pull pasta 1 minute before package instructions and finish in the sauce skillet." }
    ],
    faqs: [
      { question: "Can I use pancetta if guanciale is unavailable?", answer: "Yes, thick-cut unsmoked pancetta is the best alternative to cured pork jowl (guanciale)." },
      { question: "What is the best cheese for authentic carbonara?", answer: "Pecorino Romano is traditional; you can also use a 50/50 mix of Pecorino and Parmigiano-Reggiano." }
    ]
  },

  {
    slug: "five-quick-easy-dinners-fuel-week",
    title: "5 Quick and Easy Dinners To Fuel Your Busy Week",
    subtitle: "Nutritious, high-energy 20-minute dinners designed by a culinary dietitian.",
    leadStory: "When Monday through Friday gets hectic, takeout can feel tempting. These five 20-minute recipes were developed with culinary dietitians to pack lean proteins, colorful produce, and complex carbohydrates into delicious, zero-stress meals that keep your energy steady all evening long.",
    author: "Micah Siva, RD",
    authorRole: "Registered Dietitian & Culinary Nutritionist",
    recipeCount: 5,
    heroImage: "/images/collection-fast-weeknight.jpg",
    categoryKey: "FAST",
    tags: ["Quick", "Healthy", "Dietitian Approved", "20 Minutes"],
    recipes: [
      {
        title: "20-Minute Sesame Ginger Salmon Bowl",
        description: "Pan-crisped salmon cubes tossed with sesame ginger glaze, served over microwavable quinoa with edamame and avocado.",
        prepTime: "8 mins", cookTime: "10 mins", servings: "2 servings", difficulty: "Quick", calories: "460 kcal", rating: 4.9, reviewsCount: 185,
        imageUrl: "/images/lunch-salmon-grain-bowl.jpg",
        ingredients: ["2 salmon fillets, cubed", "2 tbsp soy sauce", "1 tbsp honey", "1 tsp sesame oil", "1 tsp grated ginger", "1 cup cooked quinoa", "1/2 avocado, sliced", "1/2 cup shelled edamame"],
        instructions: ["Whisk soy sauce, honey, sesame oil, and ginger.", "Sear salmon cubes in hot skillet for 4-5 mins until edges crisp.", "Pour glaze into skillet, toss to coat for 1 min.", "Assemble bowls with quinoa, edamame, sliced avocado, and glazed salmon."],
        proTip: "Cubing salmon cuts the cooking time down to under 5 minutes."
      },
      {
        title: "15-Minute Mediterranean Chickpea Skillet",
        description: "Chickpeas simmered with fire-roasted tomatoes, garlic, spinach, and kalamata olives, topped with melted feta cheese.",
        prepTime: "5 mins", cookTime: "10 mins", servings: "3 servings", difficulty: "Quick", calories: "320 kcal", rating: 4.8, reviewsCount: 140,
        imageUrl: "/images/lunch-mediterranean-salad.jpg",
        ingredients: ["1 can (15 oz) chickpeas, rinsed", "1 can (14 oz) fire-roasted tomatoes", "2 cups baby spinach", "1/3 cup kalamata olives, halved", "1/2 cup crumbled feta", "1 tbsp olive oil, oregano"],
        instructions: ["Sauté garlic in olive oil; add chickpeas and fire-roasted tomatoes.", "Simmer 5 mins; fold in baby spinach and olives until wilted.", "Sprinkle feta cheese on top, cover for 2 mins to soften, and serve with warm pita."],
        proTip: "Use canned chickpeas for effortless 15-minute plant-based protein."
      },
      {
        title: "Quick Turkey Taco Lettuce Wraps",
        description: "Lean ground turkey spiced with chipotle chili and cumin, spooned into crisp romaine cups with pico de gallo and Greek yogurt crema.",
        prepTime: "5 mins", cookTime: "10 mins", servings: "4 servings", difficulty: "Quick", calories: "260 kcal", rating: 4.9, reviewsCount: 210,
        imageUrl: "/images/dinner-chicken-fajitas.jpg",
        ingredients: ["1 lb lean ground turkey", "1 tbsp taco seasoning", "1/4 cup salsa", "1 head romaine or butter lettuce leaves", "1/2 cup Greek yogurt", "1 lime", "Pico de gallo"],
        instructions: ["Brown ground turkey in skillet for 6 mins.", "Add taco seasoning, salsa, and 2 tbsp water; simmer 2 mins.", "Whisk Greek yogurt with lime juice and a pinch of salt.", "Spoon turkey into lettuce leaves and top with pico and crema."],
        proTip: "Greek yogurt provides all the cool tang of sour cream with double the protein."
      },
      {
        title: "Garlic Butter Shrimp & Zucchini Noodles",
        description: "Plump wild shrimp sautéed in garlic and grass-fed butter, tossed with spiralized zucchini noodles and fresh parsley in 12 minutes.",
        prepTime: "5 mins", cookTime: "7 mins", servings: "2 servings", difficulty: "Quick", calories: "290 kcal", rating: 4.8, reviewsCount: 165,
        imageUrl: "/images/dinner-garlic-butter-shrimp.jpg",
        ingredients: ["1 lb large shrimp, peeled & deveined", "2 tbsp butter", "4 cloves garlic, minced", "2 medium zucchini, spiralized", "Zest & juice of 1 lemon", "Parmesan and chili flakes"],
        instructions: ["Melt butter in skillet, add shrimp and garlic; cook 2 mins per side until pink.", "Toss in zucchini noodles for just 1-2 minutes so they stay crisp.", "Finish with lemon juice, parmesan, and chili flakes."],
        proTip: "Don't overcook zucchini noodles or they become watery; 90 seconds is perfect."
      },
      {
        title: "Sheet Pan Honey Mustard Chicken & Veggies",
        description: "Bite-sized chicken breast pieces, baby carrots, and broccoli tossed in a 3-ingredient honey Dijon dressing and roasted fast.",
        prepTime: "8 mins", cookTime: "16 mins", servings: "4 servings", difficulty: "Quick", calories: "340 kcal", rating: 4.9, reviewsCount: 235,
        imageUrl: "/images/dinner-lemon-rosemary-chicken.jpg",
        ingredients: ["1.5 lbs chicken breasts, cut into bite-sized chunks", "3 cups broccoli florets", "2 cups baby carrots", "3 tbsp Dijon mustard", "2 tbsp honey", "2 tbsp olive oil", "Salt and pepper"],
        instructions: ["Whisk mustard, honey, and olive oil.", "Toss chicken and vegetables in the dressing on a large baking sheet.", "Roast at 425°F for 16 minutes until chicken is cooked through and broccoli is caramelized."],
        proTip: "Cut chicken and vegetables to uniform size so everything finishes roasting together."
      }
    ],
    rules: [
      { title: "Prep Cut-Sizes Evenly", advice: "Uniform pieces cook at the same speed, ensuring nothing is over- or under-cooked." },
      { title: "Lean on Fast Aromatics", advice: "Garlic, ginger, and citrus provide bold flavor without lengthy simmering." },
      { title: "Pre-Washed Greens", advice: "Keep baby spinach and bagged greens on hand for zero-prep nutrient boosters." }
    ],
    faqs: [
      { question: "Are these recipes balanced for macros?", answer: "Yes, each recipe delivers 25-35g of protein, under 500 calories, and healthy fats." },
      { question: "Can I swap the proteins?", answer: "Salmon, shrimp, chicken, and tofu can be interchanged across all five bowls." }
    ]
  },

  {
    slug: "low-stress-sheet-pan-school-dinners",
    title: "19 Low-Stress Dinners for Busy Back-to-School Nights",
    subtitle: "One pan, zero panic. Speedy sheet pan meals, 15-minute skillets, and easy cleanup.",
    leadStory: "When school, sports practice, and homework collide at 6 PM, the last thing you need is a mountain of dirty dishes. These sheet pan and one-pan dinners let your oven do all the heavy lifting while you help with math homework or unwind. Cleanup takes under 5 minutes.",
    author: "Theodora Kaloudis",
    authorRole: "Senior Food Editor",
    recipeCount: 19,
    heroImage: "/images/collection-sheet-pan.jpg",
    categoryKey: "WEEKNIGHT",
    tags: ["Back to School", "Sheet Pan", "Easy Cleanup", "Family"],
    recipes: [
      {
        title: "Sheet Pan Chicken Fajitas with Peppers & Onions",
        description: "Sliced chicken breast, bell peppers, and red onions tossed in cumin and lime, roasted on a single sheet pan and served with warm tortillas.",
        prepTime: "10 mins", cookTime: "20 mins", servings: "4 servings", difficulty: "Easy", calories: "380 kcal", rating: 4.9, reviewsCount: 310,
        imageUrl: "/images/dinner-chicken-fajitas.jpg",
        ingredients: ["1.5 lbs chicken breasts, thinly sliced", "3 bell peppers (red, yellow, green), sliced", "1 red onion, sliced", "2 tbsp olive oil", "1 packet fajita seasoning (or cumin, chili powder, garlic)", "Warm flour tortillas, lime, salsa"],
        instructions: ["Toss sliced chicken, peppers, and onions with olive oil and spices on a large rimmed sheet pan.", "Spread into a single even layer.", "Bake at 425°F for 20 minutes until chicken is tender and peppers have charred edges. Serve with warm tortillas."],
        proTip: "Line your baking sheet with aluminum foil or parchment paper for virtually zero cleanup."
      },
      {
        title: "Sheet Pan Lemon Herb Salmon & Asparagus",
        description: "Tender salmon fillets and fresh asparagus spears roasted side-by-side with garlic butter, lemon slices, and fresh dill.",
        prepTime: "8 mins", cookTime: "14 mins", servings: "4 servings", difficulty: "Quick", calories: "390 kcal", rating: 4.9, reviewsCount: 260,
        imageUrl: "/images/dinner-salmon-asparagus.jpg",
        ingredients: ["4 salmon fillets", "1 bunch asparagus, woody ends snapped", "2 tbsp melted butter", "1 tbsp olive oil", "3 cloves garlic, minced", "1 lemon, thinly sliced", "Fresh dill"],
        instructions: ["Arrange salmon fillets and asparagus on baking sheet.", "Drizzle asparagus with olive oil and salmon with garlic butter.", "Top salmon with lemon slices. Bake at 400°F for 12-14 minutes until salmon flakes easily with a fork."],
        proTip: "Snap asparagus stems where they naturally break to discard the woody fibrous bottoms."
      },
      {
        title: "Crispy Sheet Pan Gnocchi with Cherry Tomatoes & Pesto",
        description: "Shelf-stable potato gnocchi roasted dry straight from the package until crispy on the outside and tender inside, tossed with blistered tomatoes and pesto.",
        prepTime: "5 mins", cookTime: "22 mins", servings: "4 servings", difficulty: "Easy", calories: "360 kcal", rating: 5.0, reviewsCount: 390,
        imageUrl: "/images/dinner-lemon-ricotta-pasta.jpg",
        ingredients: ["1 package (16 oz) shelf-stable potato gnocchi", "2 pints cherry tomatoes", "1 yellow bell pepper, chopped", "2 tbsp olive oil", "1/3 cup basil pesto", "Fresh mozzarella pearls"],
        instructions: ["Toss uncooked gnocchi, tomatoes, and pepper with olive oil and salt on sheet pan.", "Roast at 425°F for 20-22 mins, stirring once, until gnocchi are golden and tomatoes burst.", "Toss with pesto and mozzarella pearls right on the pan before serving."],
        proTip: "Do NOT boil the gnocchi first! Roasting them dry produces an addictively crispy exterior."
      },
      {
        title: "Sheet Pan Smoked Sausage, Peppers & Baby Potatoes",
        description: "Sliced smoked kielbasa sausage, caramelized sweet mini peppers, and crispy halved potatoes seasoned with smoked paprika and garlic.",
        prepTime: "10 mins", cookTime: "25 mins", servings: "5 servings", difficulty: "Easy", calories: "420 kcal", rating: 4.8, reviewsCount: 195,
        imageUrl: "/images/collection-sheet-pan.jpg",
        ingredients: ["14 oz smoked sausage or kielbasa, sliced into coins", "1 lb baby Yukon potatoes, quartered", "1 bag sweet mini peppers, sliced", "2 tbsp olive oil", "1 tsp smoked paprika", "1/2 tsp garlic powder"],
        instructions: ["Toss quartered potatoes with olive oil and spices; roast at 400°F for 15 mins.", "Add sausage coins and sliced peppers to the sheet pan.", "Roast 15 mins more until potatoes are crispy and sausage is browned."],
        proTip: "Giving potatoes a 15-minute head start ensures they turn soft inside and crispy outside."
      },
      {
        title: "Sheet Pan Parmesan Crusted Chicken Cutlets & Broccoli",
        description: "Kid-favorite parmesan crusted chicken breasts baked on the same pan with charred parmesan broccoli florets.",
        prepTime: "10 mins", cookTime: "18 mins", servings: "4 servings", difficulty: "Easy", calories: "380 kcal", rating: 4.9, reviewsCount: 275,
        imageUrl: "/images/dinner-chicken-parmesan.jpg",
        ingredients: ["4 thin chicken cutlets", "1/2 cup grated parmesan", "1/2 cup panko breadcrumbs", "1 egg, beaten", "4 cups broccoli florets", "2 tbsp olive oil"],
        instructions: ["Dip chicken in egg, then press into parmesan-panko mixture.", "Place on sheet pan alongside broccoli tossed in olive oil and salt.", "Bake at 425°F for 18 mins until chicken is golden and cooked to 165°F."],
        proTip: "Use thin-cut cutlets so they finish baking at the exact same time as the broccoli."
      }
    ],
    rules: [
      { title: "Use a Heavy-Duty Pan", advice: "Flimsy pans warp under high heat, pooling juices to one side." },
      { title: "High Heat for Caramelization", advice: "Roast at 400°F-425°F to roast rather than steam your vegetables." },
      { title: "Foil Is Your Friend", advice: "Lining the pan with foil makes cleanup literally 30 seconds." }
    ],
    faqs: [
      { question: "Can sheet pan dinners be doubled for big families?", answer: "Yes, use two baking sheets on upper and lower thirds of oven and swap positions halfway through." },
      { question: "How do I prevent vegetables from getting soggy?", answer: "Spread them apart with space between pieces so steam escapes freely." }
    ]
  },

  {
    slug: "dinners-so-easy-have-energy-to-spare",
    title: "5 Dinners That Are So Easy You'll Have Energy to Spare",
    subtitle: "When you're exhausted at 6 PM, these 4-ingredient wonders come to the rescue.",
    leadStory: "We all have those days where cooking feels like climbing Mount Everest. These ultra-minimalist dinners require almost zero chopping, use pantry and freezer shortcuts smartly, and go from package to table in under 20 minutes so you can relax on the couch faster.",
    author: "Micah Siva, RD",
    authorRole: "Registered Dietitian",
    recipeCount: 5,
    heroImage: "/images/collection-thirty-min-dinners.jpg",
    categoryKey: "FAST",
    tags: ["Easy", "Minimal Prep", "Quick", "Low Effort"],
    recipes: [
      {
        title: "4-Ingredient Lazy Lasagna Ravioli Bake",
        description: "Refrigerated cheese ravioli layered with your favorite jarred marinara, baby spinach, and shredded mozzarella baked into a bubbly casserole.",
        prepTime: "5 mins", cookTime: "20 mins", servings: "4 servings", difficulty: "Easy", calories: "410 kcal", rating: 4.9, reviewsCount: 280,
        imageUrl: "/images/dinner-lasagna-bolognese.jpg",
        ingredients: ["1 bag (20 oz) refrigerated cheese ravioli", "1 jar (24 oz) marinara sauce", "2 cups baby spinach", "2 cups shredded mozzarella cheese"],
        instructions: ["Spread 1/2 cup marinara in baking dish. Layer half the uncooked ravioli, spinach, sauce, and cheese.", "Repeat with remaining ravioli, sauce, and top with cheese.", "Bake at 400°F for 20 mins until ravioli are tender and cheese is browned."],
        proTip: "No boiling required! The ravioli cooks directly in the simmering marinara sauce in the oven."
      },
      {
        title: "10-Minute Crispy Black Bean & Cheese Quesadillas",
        description: "Buttery pan-toasted flour tortillas packed with drained black beans, salsa verde, and gooey Monterey Jack cheese.",
        prepTime: "3 mins", cookTime: "7 mins", servings: "2 servings", difficulty: "Quick", calories: "350 kcal", rating: 4.8, reviewsCount: 160,
        imageUrl: "/images/dinner-beef-enchiladas.jpg",
        ingredients: ["2 large flour tortillas", "1 can black beans, drained", "1 cup shredded Monterey Jack", "1/4 cup salsa verde", "1 tbsp butter"],
        instructions: ["Melt butter in skillet over medium heat.", "Place tortilla, sprinkle half with cheese, black beans, salsa verde, and fold over.", "Cook 3-4 mins per side until golden brown and crispy."],
        proTip: "Use butter instead of oil in the pan for the crispiest golden crust."
      },
      {
        title: "Pesto Tortellini with Sweet Cherry Tomatoes",
        description: "Cheesy tortellini boiled in 3 minutes, tossed with store-bought basil pesto, warm cherry tomatoes, and toasted pine nuts.",
        prepTime: "2 mins", cookTime: "5 mins", servings: "3 servings", difficulty: "Quick", calories: "380 kcal", rating: 4.9, reviewsCount: 220,
        imageUrl: "/images/dinner-lemon-ricotta-pasta.jpg",
        ingredients: ["1 package (10 oz) refrigerated cheese tortellini", "1/3 cup basil pesto", "1 pint cherry tomatoes, halved", "Grated parmesan"],
        instructions: ["Boil tortellini for 3 minutes; drain.", "Toss warm tortellini with pesto and halved cherry tomatoes.", "Top with grated parmesan and freshly cracked pepper."],
        proTip: "The warm pasta gently softens the tomatoes and loosens the pesto into a silky sauce."
      },
      {
        title: "Crispy Egg & Kimchi Rice Skillet Bowl",
        description: "Leftover rice crisped in sesame oil with spicy kimchi, topped with two crispy fried eggs with runny yolks and toasted nori.",
        prepTime: "2 mins", cookTime: "8 mins", servings: "1 serving", difficulty: "Quick", calories: "390 kcal", rating: 4.9, reviewsCount: 145,
        imageUrl: "/images/lunch-beef-shawarma-bowl.jpg",
        ingredients: ["1 cup cooked jasmine rice", "1/2 cup kimchi, chopped", "2 large eggs", "1 tbsp toasted sesame oil", "1 scallion, sliced", "Nori flakes"],
        instructions: ["Heat sesame oil in skillet; press rice down to crisp the bottom for 4 mins.", "Add kimchi to the side of the pan to warm.", "Fry two eggs until edges are crispy and yolk is runny. Slide onto rice with scallions and nori."],
        proTip: "Letting the rice sit untouched in hot oil creates a craveable crunchy rice crust."
      },
      {
        title: "Fast Naan Bread Personal Pizzas",
        description: "Store-bought garlic naan bread topped with pizza sauce, shredded mozzarella, and mini pepperonis toasted in 8 minutes.",
        prepTime: "3 mins", cookTime: "8 mins", servings: "2 servings", difficulty: "Quick", calories: "360 kcal", rating: 4.8, reviewsCount: 190,
        imageUrl: "/images/appetizer-tomato-bruschetta.jpg",
        ingredients: ["2 garlic naan breads", "1/3 cup pizza sauce", "1 cup shredded mozzarella", "Mini pepperonis or sliced olives"],
        instructions: ["Place naan breads on a baking sheet.", "Spread sauce, top with mozzarella and toppings.", "Bake at 425°F for 8 mins until cheese is bubbly and edges are crunchy."],
        proTip: "Naan bread has the perfect tandoori chew that mimics artisan wood-fired pizza dough."
      }
    ],
    rules: [
      { title: "Stock Pre-Cooked Starches", advice: "Keep ravioli, tortellini, and naan on hand for instant meal bases." },
      { title: "Rely on High-Flavor Condiments", advice: "Pesto, kimchi, and salsa verde pack all the herbs and acid you need." },
      { title: "One-Pan Simplification", advice: "Minimize cooking equipment to keep cleanup under two minutes." }
    ],
    faqs: [
      { question: "Can frozen ravioli be used for the bake?", answer: "Yes, add 5 minutes to the baking time if starting from frozen ravioli." },
      { question: "How can I add protein to these easy meals?", answer: "Canned tuna, rotisserie chicken, or a can of drained chickpeas blend in effortlessly." }
    ]
  }
];

// Helper to generate a complete CollectionDetail object
function buildFullCollection(item) {
  const highlights = [
    { label: "Total Recipes", value: `${item.recipeCount} Curated Dishes`, icon: "📚" },
    { label: "Prep Time", value: "15-25 Mins Average", icon: "⏱" },
    { label: "Difficulty", value: "Beginner to Intermediate", icon: "🍳" },
    { label: "Dietary", value: "Nutritious & Family-Friendly", icon: "🥗" }
  ];

  const defaultRules = [
    { title: "Focus on Fresh Seasoning", advice: "Layer kosher salt, fresh herbs, and citrus zest to brighten flavors." },
    { title: "Master Temperature Control", advice: "Allow pans to preheat thoroughly to create golden caramelization." },
    { title: "Rest and Emulsify", advice: "Rest meats before slicing and toss warm starches with cooking liquids." }
  ];

  const defaultFaqs = [
    { question: `Can these ${item.title} recipes be made ahead?`, answer: "Most dishes can be prepped up to 24 hours in advance or refrigerated for weekday lunches." },
    { question: "Are substitutions permitted?", answer: "Yes! Every recipe in this collection accommodates gluten-free, dairy-free, or vegetarian tweaks." }
  ];

  const recipes = item.recipes.map((r, idx) => ({
    id: `${item.slug}-rec-${idx + 1}`,
    number: String(idx + 1).padStart(2, '0'),
    title: r.title,
    description: r.description,
    prepTime: r.prepTime || "10 mins",
    cookTime: r.cookTime || "15 mins",
    totalTime: r.totalTime || "25 mins",
    servings: r.servings || "4 servings",
    difficulty: r.difficulty || "Easy",
    calories: r.calories || "380 kcal",
    rating: r.rating || 4.9,
    reviewsCount: r.reviewsCount || 150 + idx * 35,
    imageUrl: r.imageUrl || item.heroImage,
    imageAlt: r.title,
    ingredients: r.ingredients || [
      "1 lb main protein or fresh pasta",
      "2 tbsp extra virgin olive oil",
      "3 cloves garlic, minced",
      "1 cup seasonal vegetables",
      "Fresh herbs and sea salt"
    ],
    instructions: r.instructions || [
      "Prep all ingredients and preheat cooking surface.",
      "Sear or simmer according to temperature guidelines.",
      "Season to taste and serve immediately with fresh herbs."
    ],
    proTip: r.proTip || "Taste and adjust seasoning with a squeeze of fresh lemon right before serving.",
    dietaryTags: ["Tested & Perfected", "Family Favorite"]
  }));

  return {
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    leadStory: item.leadStory,
    author: item.author || "Theodora Kaloudis",
    authorRole: item.authorRole || "Food Editor & Recipe Tester",
    authorAvatar: "/images/editor-theodora.jpg",
    date: "Updated September 2026",
    recipeCount: item.recipeCount,
    heroImage: item.heroImage,
    heroAlt: item.title,
    readTime: `${Math.max(6, Math.min(12, Math.round(item.recipeCount / 2)))} min read`,
    category: "RECIPE COLLECTIONS",
    categoryKey: item.categoryKey || "WEEKNIGHT",
    tags: item.tags || ["In The Kitchen", "Recipe Collection"],
    highlights,
    testKitchenRules: item.rules || defaultRules,
    recipes,
    faq: item.faqs || defaultFaqs,
    relatedSlugs: [
      "our-most-saved-recipes-this-month",
      "easy-ground-beef-dinners-weeknights",
      "ultimate-weekend-cookout-recipes",
      "best-dinner-recipes-of-all-time"
    ].filter(s => s !== item.slug)
  };
}

console.log("Configured base count:", collectionsConfig.length);
