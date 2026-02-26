const recipes = [
  // Italian
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    image: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
    cookTime: 25,
    servings: 4,
    cuisine: "Italian",
    diet: null,
    rating: 4.8,
    ingredients: ["400g spaghetti", "4 large eggs", "100g pecorino cheese, grated", "150g pancetta, diced", "2 cloves garlic, minced", "1/2 tsp black pepper", "Salt to taste", "2 tbsp olive oil"],
    instructions: [
      "Bring a large pot of salted water to boil. Add spaghetti and cook according to package directions until al dente (usually 8-10 minutes).",
      "While pasta cooks, heat olive oil in a large skillet over medium heat. Add diced pancetta and cook until crispy and golden brown, about 5-7 minutes.",
      "Add minced garlic to the skillet and cook for 30 seconds until fragrant. Remove from heat.",
      "In a bowl, whisk together eggs, grated pecorino cheese, and black pepper until well combined.",
      "Drain pasta, reserving 1 cup of pasta water. Immediately add hot pasta to the skillet with pancetta.",
      "Working quickly, pour the egg mixture over the hot pasta, tossing constantly to coat the pasta without scrambling the eggs.",
      "Add 1/4 cup of reserved pasta water to create a creamy sauce. Continue tossing until the sauce is smooth and coats the pasta.",
      "Season with additional salt if needed and serve immediately with extra grated cheese and black pepper."
    ]
  },
  {
    id: 2,
    title: "Margherita Pizza",
    description: "Classic Neapolitan pizza with fresh mozzarella, tomatoes, and basil.",
    image: "https://cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg",
    cookTime: 20,
    servings: 2,
    cuisine: "Italian",
    diet: "Vegetarian",
    rating: 4.7,
    ingredients: ["1 pizza dough ball", "1/2 cup tomato sauce", "200g fresh mozzarella, sliced", "Fresh basil leaves", "2 tbsp olive oil", "Salt and pepper to taste", "1/4 cup grated parmesan cheese"],
    instructions: [
      "Preheat your oven to the highest temperature (usually 500-550°F/260-290°C) with a pizza stone or baking sheet inside.",
      "On a floured surface, stretch the pizza dough into a 12-inch circle, being careful not to tear it.",
      "Transfer the dough to a pizza peel or parchment paper dusted with cornmeal.",
      "Spread tomato sauce evenly over the dough, leaving a 1-inch border around the edges.",
      "Arrange mozzarella slices evenly over the sauce, then drizzle with olive oil.",
      "Carefully transfer the pizza to the preheated stone or baking sheet.",
      "Bake for 8-12 minutes until the crust is golden and the cheese is bubbly and slightly browned.",
      "Remove from oven and immediately top with fresh basil leaves and grated parmesan. Let rest for 2 minutes before slicing and serving."
    ]
  },
  {
    id: 3,
    title: "Lasagna Bolognese",
    description: "Layered pasta with rich meat sauce, béchamel, and cheese.",
    image: "https://i0.wp.com/smittenkitchen.com/wp-content/uploads/2012/02/lasagna-bolognese-4-scaled.jpg?fit=1200%2C800&ssl=1",
    cookTime: 60,
    servings: 6,
    cuisine: "Italian",
    diet: null,
    rating: 4.9,
    ingredients: ["12 lasagna noodles", "500g ground beef", "1 onion, diced", "2 cloves garlic, minced", "2 cups tomato sauce", "2 cups béchamel sauce", "200g mozzarella, grated", "100g parmesan, grated", "2 tbsp olive oil", "Salt and pepper to taste"],
    instructions: [
      "Preheat oven to 375°F (190°C). Bring a large pot of salted water to boil and cook lasagna noodles according to package directions until al dente. Drain and set aside.",
      "In a large skillet, heat olive oil over medium heat. Add diced onion and cook until translucent, about 5 minutes.",
      "Add minced garlic and cook for 30 seconds until fragrant. Add ground beef and cook until browned, breaking it up with a spoon.",
      "Pour in tomato sauce and season with salt and pepper. Simmer for 15 minutes until sauce thickens.",
      "In a 9x13 inch baking dish, spread a thin layer of meat sauce on the bottom.",
      "Place 3 lasagna noodles over the sauce, then spread 1/3 of the remaining meat sauce over the noodles.",
      "Pour 1/3 of the béchamel sauce over the meat sauce, then sprinkle with 1/3 of the mozzarella and parmesan.",
      "Repeat the layering process two more times, ending with cheese on top.",
      "Cover with aluminum foil and bake for 25 minutes. Remove foil and bake for an additional 15 minutes until cheese is golden and bubbly.",
      "Let rest for 10 minutes before cutting and serving."
    ]
  },
  {
    id: 4,
    title: "Risotto alla Milanese",
    description: "Creamy saffron risotto from Milan.",
    image: "https://cookingwithwineblog.com/wp-content/uploads/2024/04/Milanese-Style-Creamy-Saffron-Leek-Risotto-Recipe-Featured-1.jpg",
    cookTime: 35,
    servings: 4,
    cuisine: "Italian",
    diet: "Gluten-Free",
    rating: 4.6,
    ingredients: ["1 1/2 cups arborio rice", "1/2 tsp saffron threads", "1 onion, finely diced", "1/2 cup white wine", "4 cups chicken broth, hot", "1/2 cup grated parmesan cheese", "2 tbsp butter", "2 tbsp olive oil", "Salt and pepper to taste"],
    instructions: [
      "In a small bowl, steep saffron threads in 1/4 cup of hot chicken broth for 10 minutes.",
      "In a large, heavy-bottomed pan, heat olive oil and 1 tbsp butter over medium heat. Add diced onion and cook until soft and translucent, about 5 minutes.",
      "Add arborio rice and stir for 2-3 minutes until the rice is slightly translucent around the edges.",
      "Pour in white wine and stir until it's almost completely absorbed by the rice.",
      "Add the saffron-infused broth and stir gently. Begin adding the remaining hot chicken broth one ladle at a time.",
      "Stir constantly and add more broth only when the previous addition has been almost completely absorbed.",
      "Continue this process for 18-20 minutes until the rice is creamy and al dente (firm but not hard in the center).",
      "Remove from heat and stir in the remaining butter and grated parmesan cheese.",
      "Cover and let rest for 2 minutes, then season with salt and pepper to taste. Serve immediately with extra parmesan on the side."
    ]
  },
  {
    id: 5,
    title: "Eggplant Parmigiana",
    description: "Baked eggplant slices with tomato sauce and cheese.",
    image: "https://www.vincenzosplate.com/wp-content/uploads/2024/02/1500x1500-Photo-21-3359-How-to-Make-Eggplant-Parmigiana-V1.jpg",
    cookTime: 50,
    servings: 4,
    cuisine: "Italian",
    diet: "Vegetarian",
    rating: 4.5,
    ingredients: ["2 large eggplants", "2 cups tomato sauce", "200g mozzarella, sliced", "100g parmesan, grated", "Fresh basil leaves", "2 eggs, beaten", "1 cup breadcrumbs", "1/2 cup flour", "Olive oil for frying", "Salt and pepper to taste"],
    instructions: [
      "Slice eggplants into 1/4-inch thick rounds. Sprinkle with salt and let sit for 30 minutes to draw out moisture. Pat dry with paper towels.",
      "Set up three shallow bowls: one with flour, one with beaten eggs, and one with breadcrumbs seasoned with salt and pepper.",
      "Dredge each eggplant slice in flour, then dip in beaten eggs, and finally coat with breadcrumbs. Place on a wire rack.",
      "Heat 1/4 inch of olive oil in a large skillet over medium-high heat. Fry eggplant slices in batches until golden brown on both sides, about 2-3 minutes per side. Drain on paper towels.",
      "Preheat oven to 375°F (190°C). In a 9x13 inch baking dish, spread a thin layer of tomato sauce on the bottom.",
      "Arrange a layer of fried eggplant slices over the sauce, overlapping slightly. Top with tomato sauce, mozzarella slices, and parmesan cheese.",
      "Repeat the layering process, ending with cheese on top. Scatter fresh basil leaves over the final layer.",
      "Bake for 25-30 minutes until the cheese is melted and bubbly and the top is golden brown.",
      "Let rest for 10 minutes before cutting and serving."
    ]
  },
  {
    id: 16,
    title: "Pesto Genovese",
    description: "Classic basil pesto sauce tossed with pasta.",
    image: "https://www.sipandfeast.com/wp-content/uploads/2023/07/pesto-alla-genovese-recipe-snippet.jpg",
    cookTime: 20,
    servings: 4,
    cuisine: "Italian",
    diet: "Vegetarian",
    rating: 4.8,
    ingredients: [
      "400g pasta",
      "2 cups fresh basil leaves",
      "1/2 cup olive oil",
      "1/3 cup pine nuts",
      "2 cloves garlic",
      "1/2 cup grated parmesan",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Blend basil, pine nuts, garlic, and parmesan. Slowly add olive oil. Toss with cooked pasta and serve."
    ]
  },
  {
    id: 19,
    title: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.",
    image: "https://www.flavoursholidays.co.uk/wp-content/uploads/2020/07/Tiramisu.jpg",
    cookTime: 40,
    servings: 8,
    cuisine: "Italian",
    diet: "Vegetarian",
    rating: 4.9,
    ingredients: [
      "6 egg yolks",
      "3/4 cup sugar",
      "2/3 cup milk",
      "1 1/4 cups heavy cream",
      "1/2 tsp vanilla extract",
      "1 pound mascarpone cheese",
      "1 cup strong brewed coffee",
      "24 ladyfingers",
      "2 tbsp cocoa powder"
    ],
    instructions: [
      "Whisk yolks and sugar, add milk, cook until thick. Cool, then mix with mascarpone and whipped cream.",
      "Dip ladyfingers in coffee, layer with cream. Repeat layers. Chill and dust with cocoa."
    ]
  },
  // Mexican
  {
    id: 6,
    title: "Chicken Enchiladas",
    description: "Corn tortillas filled with chicken and topped with red enchilada sauce.",
    image: "https://www.jessicagavin.com/wp-content/uploads/2018/04/chicken-enchiladas-5-1200.jpg",
    cookTime: 40,
    servings: 4,
    cuisine: "Mexican",
    diet: null,
    rating: 4.7,
    ingredients: ["8 corn tortillas", "2 chicken breasts, cooked and shredded", "2 cups red enchilada sauce", "200g monterey jack cheese, grated", "1 onion, diced", "2 cloves garlic, minced", "2 tbsp olive oil", "Salt and pepper to taste", "Fresh cilantro for garnish"],
    instructions: [
      "Preheat oven to 375°F (190°C). In a skillet, heat olive oil over medium heat and sauté diced onion until soft, about 5 minutes.",
      "Add minced garlic and cook for 30 seconds until fragrant. Add shredded chicken and season with salt and pepper. Cook for 2-3 minutes to warm through.",
      "Warm corn tortillas in a dry skillet or microwave for 30 seconds to make them pliable.",
      "Spread 1/2 cup of enchilada sauce in the bottom of a 9x13 inch baking dish.",
      "Place a tortilla on a flat surface and fill with 1/8 of the chicken mixture and a sprinkle of cheese. Roll up tightly and place seam-side down in the baking dish.",
      "Repeat with remaining tortillas, arranging them in a single layer in the dish.",
      "Pour remaining enchilada sauce over the rolled tortillas, making sure to cover them completely.",
      "Sprinkle remaining cheese over the top and bake for 20-25 minutes until cheese is melted and sauce is bubbling.",
      "Garnish with fresh cilantro and serve hot with rice and beans on the side."
    ]
  },
  {
    id: 7,
    title: "Tacos al Pastor",
    description: "Pork tacos with pineapple, onion, and cilantro.",
    image: "https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg",
    cookTime: 30,
    servings: 4,
    cuisine: "Mexican",
    diet: null,
    rating: 4.8,
    ingredients: ["500g pork shoulder, thinly sliced", "1 cup pineapple juice", "2 tbsp achiote paste", "2 cloves garlic, minced", "1 tsp oregano", "1 tsp cumin", "12 corn tortillas", "1 onion, diced", "Fresh cilantro", "1 lime, cut into wedges", "Salt and pepper to taste"],
    instructions: [
      "In a bowl, combine pineapple juice, achiote paste, minced garlic, oregano, cumin, salt, and pepper to make the marinade.",
      "Add thinly sliced pork to the marinade and let it marinate for at least 2 hours, or overnight in the refrigerator.",
      "Heat a large skillet or griddle over medium-high heat. Remove pork from marinade and cook in batches until browned and cooked through, about 3-4 minutes per side.",
      "While pork cooks, warm corn tortillas in a dry skillet or over an open flame until slightly charred and pliable.",
      "Chop the cooked pork into smaller pieces and return to the skillet to crisp up the edges.",
      "To assemble tacos, place a small amount of pork on each tortilla.",
      "Top with diced onion, fresh cilantro, and a squeeze of lime juice.",
      "Serve immediately with additional lime wedges and your favorite salsa on the side."
    ]
  },
  {
    id: 8,
    title: "Chiles Rellenos",
    description: "Poblano peppers stuffed with cheese and fried in egg batter.",
    image: "https://www.goya.com/wp-content/uploads/2023/10/stuffed-chileschiles-rellenos.jpg",
    cookTime: 45,
    servings: 4,
    cuisine: "Mexican",
    diet: "Vegetarian",
    rating: 4.6,
    ingredients: ["4 poblano peppers", "200g queso fresco or monterey jack cheese", "4 eggs, separated", "1/2 cup flour", "2 cups tomato sauce", "1 onion, diced", "2 cloves garlic, minced", "Oil for frying", "Salt and pepper to taste"],
    instructions: [
      "Roast poblano peppers over an open flame or under the broiler until the skin is charred and blistered on all sides.",
      "Place charred peppers in a paper bag or bowl covered with plastic wrap and let steam for 10 minutes to loosen the skin.",
      "Carefully peel the charred skin from the peppers, being careful not to tear them. Make a small slit lengthwise in each pepper and remove seeds and membranes.",
      "Stuff each pepper with cheese, then close the slit and secure with toothpicks if necessary.",
      "In a large bowl, beat egg whites until stiff peaks form. In another bowl, beat egg yolks with a pinch of salt.",
      "Gently fold beaten egg yolks into the egg whites to create the batter.",
      "Heat oil in a deep skillet to 375°F (190°C). Dredge each stuffed pepper in flour, then dip in the egg batter to coat completely.",
      "Carefully lower battered peppers into the hot oil and fry until golden brown on all sides, about 3-4 minutes per side.",
      "Remove from oil and drain on paper towels. Remove toothpicks and serve hot with warm tomato sauce."
    ]
  },
  {
    id: 9,
    title: "Pozole Rojo",
    description: "Traditional hominy soup with pork and red chile broth.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVzqE8_kIYexMeKRkPmoWcYwSyrQMjn_Ztw&s",
    cookTime: 90,
    servings: 6,
    cuisine: "Mexican",
    diet: null,
    rating: 4.9,
    ingredients: ["1kg pork shoulder, cut into chunks", "2 cans hominy, drained", "6 dried ancho chiles", "4 dried guajillo chiles", "1 onion, diced", "4 cloves garlic", "2 tbsp oregano", "1 tsp cumin", "Salt to taste", "Lime wedges, radishes, and cilantro for garnish"],
    instructions: [
      "In a large pot, combine pork chunks with enough water to cover by 2 inches. Bring to a boil, then reduce heat and simmer for 1 hour until pork is tender.",
      "While pork cooks, remove stems and seeds from dried chiles. Toast chiles in a dry skillet over medium heat for 30 seconds on each side until fragrant.",
      "Place toasted chiles in a bowl and cover with hot water. Let soak for 20 minutes until softened.",
      "In a blender, combine soaked chiles, diced onion, garlic cloves, oregano, cumin, and 2 cups of the soaking liquid. Blend until smooth.",
      "Strain the chile mixture through a fine-mesh sieve to remove any solids.",
      "Remove cooked pork from the pot and shred into bite-sized pieces. Return pork to the pot.",
      "Add the strained chile sauce and drained hominy to the pot. Bring to a simmer and cook for 30 minutes until flavors meld.",
      "Season with salt to taste. Serve hot in bowls with lime wedges, sliced radishes, and fresh cilantro for garnish."
    ]
  },
  {
    id: 10,
    title: "Guacamole",
    description: "Classic avocado dip with lime, onion, and cilantro.",
    image: "https://www.giallozafferano.com/images/255-25549/Guacamole_650x433_wm.jpg",
    cookTime: 10,
    servings: 4,
    cuisine: "Mexican",
    diet: "Vegan",
    rating: 4.8,
    ingredients: ["3 ripe avocados", "1 lime, juiced", "1/2 onion, finely diced", "1/4 cup fresh cilantro, chopped", "1 jalapeño, seeded and minced", "1 tomato, diced", "1 clove garlic, minced", "Salt and pepper to taste"],
    instructions: [
      "Cut avocados in half lengthwise and remove the pits. Scoop the flesh into a large bowl.",
      "Using a fork or potato masher, mash the avocados to your desired consistency (chunky or smooth).",
      "Add lime juice immediately to prevent browning and add a tangy flavor.",
      "Stir in finely diced onion, chopped cilantro, minced jalapeño, diced tomato, and minced garlic.",
      "Season with salt and pepper to taste. Mix gently to combine all ingredients.",
      "Taste and adjust seasoning if needed. For best flavor, let the guacamole sit for 10-15 minutes before serving.",
      "Serve immediately with tortilla chips, or cover with plastic wrap pressed directly onto the surface to prevent browning if storing briefly."
    ]
  },
  {
    id: 17,
    title: "Mole Poblano",
    description: "Rich Mexican sauce with chocolate, chilies, and spices, served over chicken.",
    image: "https://www.firstdayofhome.com/wp-content/uploads/2021/05/Chicken-Mole-Recipe-featureimg-500x500.jpg",
    cookTime: 90,
    servings: 6,
    cuisine: "Mexican",
    diet: null,
    rating: 4.7,
    ingredients: [
      "1 whole chicken, cut into pieces",
      "4 dried ancho chilies",
      "2 dried pasilla chilies",
      "1 onion, chopped",
      "2 cloves garlic",
      "1/4 cup almonds",
      "1/4 cup raisins",
      "2 tbsp sesame seeds",
      "2 tbsp cocoa powder",
      "2 cups chicken broth",
      "2 tbsp oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Toast chilies, soak in hot water. Sauté onion, garlic, almonds, raisins. Blend with chilies, cocoa, sesame, broth. Simmer with chicken until tender."
    ]
  },
  {
    id: 20,
    title: "Elote (Mexican Street Corn)",
    description: "Grilled corn on the cob slathered with mayo, cheese, and chili powder.",
    image: "https://www.wholesomeyum.com/wp-content/uploads/2023/04/wholesomeyum-Elote-Recipe-Mexican-Street-Corn-6.jpg",
    cookTime: 25,
    servings: 4,
    cuisine: "Mexican",
    diet: null,
    rating: 4.8,
    ingredients: [
      "4 ears corn",
      "1/4 cup mayonnaise",
      "1/4 cup cotija cheese, crumbled",
      "1 tsp chili powder",
      "1 lime, cut into wedges",
      "2 tbsp cilantro, chopped"
    ],
    instructions: [
      "Grill corn until charred. Spread with mayo, sprinkle with cheese, chili, and cilantro. Serve with lime."
    ]
  },
  // Chinese
  {
    id: 11,
    title: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.",
    image: "https://www.kitchensanctuary.com/wp-content/uploads/2019/10/Kung-Pao-Chicken-square-FS-39-new-500x500.jpg",
    cookTime: 25,
    servings: 4,
    cuisine: "Chinese",
    diet: null,
    rating: 4.7,
    ingredients: ["500g chicken breast, cubed", "1/2 cup roasted peanuts", "2 bell peppers, diced", "6 dried red chilies", "3 cloves garlic, minced", "1 inch ginger, minced", "3 tbsp soy sauce", "2 tbsp rice vinegar", "1 tbsp sugar", "1 tbsp cornstarch", "2 tbsp vegetable oil"],
    instructions: [
      "In a bowl, combine chicken cubes with 1 tbsp soy sauce and 1 tbsp cornstarch. Let marinate for 15 minutes.",
      "In a small bowl, mix together remaining soy sauce, rice vinegar, sugar, and 1 tbsp water to make the sauce.",
      "Heat vegetable oil in a wok or large skillet over high heat until smoking hot.",
      "Add marinated chicken and stir-fry for 3-4 minutes until golden brown and almost cooked through. Remove from wok and set aside.",
      "In the same wok, add dried chilies and stir-fry for 30 seconds until fragrant and slightly darkened.",
      "Add minced garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "Add diced bell peppers and stir-fry for 2 minutes until slightly softened.",
      "Return chicken to the wok and pour in the sauce mixture. Stir-fry for 2-3 minutes until sauce thickens and coats the chicken.",
      "Add roasted peanuts and stir-fry for 1 minute to heat through.",
      "Serve hot over steamed rice with additional soy sauce on the side."
    ]
  },
  {
    id: 12,
    title: "Sweet and Sour Pork",
    description: "Crispy pork in a tangy sweet and sour sauce with pineapple and peppers.",
    image: "https://playswellwithbutter.com/wp-content/uploads/2020/11/Sweet-Sour-Pork-9.jpg",
    cookTime: 35,
    servings: 4,
    cuisine: "Chinese",
    diet: null,
    rating: 4.6,
    ingredients: ["500g pork loin, cut into cubes", "1 cup pineapple chunks", "2 bell peppers, diced", "1 onion, diced", "1/2 cup cornstarch", "2 eggs, beaten", "1/4 cup ketchup", "1/4 cup rice vinegar", "2 tbsp sugar", "1 tbsp soy sauce", "Oil for frying"],
    instructions: [
      "In a bowl, combine pork cubes with beaten eggs and 1/4 cup cornstarch. Mix well to coat the pork evenly.",
      "Heat oil in a deep fryer or large pot to 375°F (190°C). Fry pork cubes in batches until golden brown and crispy, about 4-5 minutes per batch. Drain on paper towels.",
      "In a small bowl, whisk together ketchup, rice vinegar, sugar, soy sauce, and 1/4 cup water to make the sweet and sour sauce.",
      "Heat 2 tbsp oil in a wok or large skillet over high heat. Add diced onion and stir-fry for 2 minutes until softened.",
      "Add diced bell peppers and stir-fry for 2 minutes until slightly softened.",
      "Add pineapple chunks and stir-fry for 1 minute to heat through.",
      "Pour in the sweet and sour sauce and bring to a boil. Cook for 2-3 minutes until sauce thickens slightly.",
      "Add fried pork cubes to the sauce and toss gently to coat evenly.",
      "Cook for 1-2 minutes until pork is heated through and well-coated with sauce.",
      "Serve hot over steamed rice with additional sauce on the side."
    ]
  },
  {
    id: 13,
    title: "Mapo Tofu",
    description: "Sichuan dish of tofu in a spicy, flavorful sauce with ground pork.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSruek24q28yNYBYVEYvFzLLCaFWgIYCEpbuw&s",
    cookTime: 30,
    servings: 4,
    cuisine: "Chinese",
    diet: "Gluten-Free",
    rating: 4.8,
    ingredients: ["400g firm tofu, cubed", "200g ground pork", "2 tbsp doubanjiang (spicy bean paste)", "2 tbsp soy sauce", "1 tbsp Sichuan peppercorns", "3 cloves garlic, minced", "1 inch ginger, minced", "2 green onions, chopped", "1 tbsp cornstarch", "2 tbsp vegetable oil"],
    instructions: [
      "Cut tofu into 1-inch cubes and set aside. In a small bowl, mix cornstarch with 2 tbsp water to make a slurry.",
      "Heat vegetable oil in a wok or large skillet over medium-high heat. Add ground pork and cook until browned, breaking it up with a spoon.",
      "Add minced garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "Add doubanjiang and stir-fry for 1 minute until the oil turns red and fragrant.",
      "Add soy sauce and 1 cup of water. Bring to a boil, then reduce heat to medium.",
      "Gently add tofu cubes to the sauce, being careful not to break them. Simmer for 5 minutes to allow tofu to absorb flavors.",
      "Stir in cornstarch slurry and cook for 1-2 minutes until sauce thickens.",
      "Add Sichuan peppercorns and chopped green onions. Stir gently to combine.",
      "Cook for 1 minute more, then remove from heat. The sauce should be thick and glossy.",
      "Serve hot over steamed rice with additional green onions for garnish."
    ]
  },
  {
    id: 14,
    title: "Beef Chow Fun",
    description: "Stir-fried wide rice noodles with beef, bean sprouts, and scallions.",
    image: "https://omnivorescookbook.com/wp-content/uploads/2024/08/240730_Beef-Chow-Fun_550.jpg",
    cookTime: 20,
    servings: 3,
    cuisine: "Chinese",
    diet: null,
    rating: 4.5,
    ingredients: ["400g wide rice noodles", "300g beef, thinly sliced", "2 cups bean sprouts", "4 green onions, cut into 2-inch pieces", "3 cloves garlic, minced", "2 tbsp soy sauce", "1 tbsp oyster sauce", "1 tbsp dark soy sauce", "1 tsp sugar", "2 tbsp vegetable oil"],
    instructions: [
      "If using dried rice noodles, soak them in hot water for 10-15 minutes until softened. If using fresh noodles, separate them gently.",
      "In a bowl, combine beef slices with 1 tbsp soy sauce and let marinate for 10 minutes.",
      "Heat 1 tbsp oil in a wok or large skillet over high heat until smoking hot.",
      "Add marinated beef and stir-fry for 2-3 minutes until browned and almost cooked through. Remove from wok and set aside.",
      "Add remaining oil to the wok and heat until smoking. Add minced garlic and stir-fry for 30 seconds until fragrant.",
      "Add rice noodles and stir-fry for 2-3 minutes, using tongs to separate and toss the noodles.",
      "Add bean sprouts and green onions, stir-fry for 1 minute until slightly softened.",
      "Return beef to the wok and add oyster sauce, dark soy sauce, and sugar.",
      "Stir-fry for 2-3 minutes until all ingredients are well combined and noodles are heated through.",
      "Serve hot immediately with additional soy sauce on the side."
    ]
  },
  {
    id: 15,
    title: "Egg Fried Rice",
    description: "Classic fried rice with eggs, peas, and carrots.",
    image: "https://i0.wp.com/breakthespicerecipes.com/wp-content/uploads/2023/09/spicy-egg-fried-rice.jpg?fit=900%2C1200&ssl=1",
    cookTime: 15,
    servings: 2,
    cuisine: "Chinese",
    diet: "Vegetarian",
    rating: 4.7,
    ingredients: ["3 cups cooked rice, cooled", "3 eggs", "1/2 cup frozen peas", "1/2 cup diced carrots", "3 green onions, chopped", "3 cloves garlic, minced", "2 tbsp soy sauce", "1 tbsp sesame oil", "2 tbsp vegetable oil", "Salt and pepper to taste"],
    instructions: [
      "Ensure rice is completely cooled (preferably day-old rice). Break up any clumps with your hands.",
      "In a small bowl, beat eggs with a pinch of salt and pepper.",
      "Heat 1 tbsp vegetable oil in a wok or large skillet over high heat until smoking hot.",
      "Pour beaten eggs into the hot oil and scramble quickly until just set but still slightly runny. Remove from wok and set aside.",
      "Add remaining oil to the wok and heat until smoking. Add minced garlic and stir-fry for 30 seconds until fragrant.",
      "Add diced carrots and stir-fry for 2 minutes until slightly softened.",
      "Add frozen peas and stir-fry for 1 minute until heated through.",
      "Add cooled rice to the wok and stir-fry for 3-4 minutes, breaking up any clumps and ensuring rice is heated through.",
      "Return scrambled eggs to the wok and add soy sauce and sesame oil. Stir-fry for 1-2 minutes until everything is well combined.",
      "Add chopped green onions and stir-fry for 30 seconds. Season with additional salt and pepper if needed.",
      "Serve hot immediately as a main dish or side dish."
    ]
  },
  {
    id: 18,
    title: "Peking Duck",
    description: "Crispy roasted duck served with pancakes, scallions, and hoisin sauce.",
    image: "https://www.allrecipes.com/thmb/I7mLbsFOCOSkEIyYgIa1QT89tzQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-31972-peking-duck-DDMFS-4x3-hero-3344139da66141b687e1d7b85b995bf5.jpg",
    cookTime: 120,
    servings: 6,
    cuisine: "Chinese",
    diet: null,
    rating: 4.9,
    ingredients: [
      "1 whole duck",
      "2 tbsp honey",
      "2 tbsp soy sauce",
      "1 tbsp five-spice powder",
      "1 cucumber, sliced",
      "4 green onions, sliced",
      "12 Chinese pancakes",
      "Hoisin sauce"
    ],
    instructions: [
      "Rub duck with five-spice, honey, and soy. Roast until crispy. Slice and serve with pancakes, hoisin, cucumber, and scallions."
    ]
  },
  {
    id: 27,
    title: "Spring Rolls",
    description: "Crispy rolls filled with vegetables and sometimes meat, served with dipping sauce.",
    image: "https://d1mxd7n691o8sz.cloudfront.net/static/recipe/recipe/2023-12/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4_thumbnail_170.jpeg",
    cookTime: 45,
    servings: 6,
    cuisine: "Chinese",
    diet: null,
    rating: 4.7,
    ingredients: [
      "12 spring roll wrappers",
      "2 cups shredded cabbage",
      "1 carrot, julienned",
      "1/2 cup bean sprouts",
      "100g pork or chicken, cooked and shredded (optional)",
      "2 green onions, sliced",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "Oil for frying"
    ],
    instructions: [
      "Stir-fry vegetables and meat. Cool, fill wrappers, roll, and fry until golden. Serve with dipping sauce."
    ]
  },
  // Indian
  {
    id: 21,
    title: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces.",
    image: "https://sugarspunrun.com/wp-content/uploads/2025/04/Butter-chicken-1-of-1.jpg",
    cookTime: 40,
    servings: 4,
    cuisine: "Indian",
    diet: null,
    rating: 4.9,
    ingredients: ["500g chicken breast, cubed", "1 cup tomato puree", "1/2 cup heavy cream", "4 tbsp butter", "2 tbsp garam masala", "1 inch ginger, minced", "4 cloves garlic, minced", "1 onion, diced", "1 tsp turmeric", "1 tsp chili powder", "Salt to taste", "Fresh cilantro for garnish"],
    instructions: [
      "In a bowl, combine chicken cubes with 1 tbsp garam masala, 1/2 tsp turmeric, 1/2 tsp chili powder, and salt. Let marinate for 30 minutes.",
      "Heat 2 tbsp butter in a large skillet over medium-high heat. Add marinated chicken and cook until browned on all sides, about 5-7 minutes. Remove from skillet and set aside.",
      "In the same skillet, add remaining butter and sauté diced onion until soft and translucent, about 5 minutes.",
      "Add minced ginger and garlic, cook for 1 minute until fragrant.",
      "Add tomato puree, remaining garam masala, turmeric, and chili powder. Cook for 5 minutes until the mixture thickens and oil starts to separate.",
      "Return chicken to the skillet and add 1/2 cup water. Bring to a boil, then reduce heat and simmer for 15 minutes until chicken is cooked through.",
      "Stir in heavy cream and simmer for 5 minutes until the sauce is rich and creamy.",
      "Adjust seasoning with salt if needed. Garnish with fresh cilantro and serve hot with naan bread or steamed rice."
    ]
  },
  {
    id: 22,
    title: "Palak Paneer",
    description: "Cottage cheese cubes in a spiced spinach gravy.",
    image: "https://www.indianveggiedelight.com/wp-content/uploads/2017/10/palak-paneer-recipe-featured.jpg",
    cookTime: 30,
    servings: 4,
    cuisine: "Indian",
    diet: "Vegetarian",
    rating: 4.8,
    ingredients: ["400g fresh spinach", "200g paneer, cubed", "1 onion, diced", "2 tomatoes, diced", "4 cloves garlic, minced", "1 inch ginger, minced", "1 tsp cumin seeds", "1 tsp garam masala", "1/2 tsp turmeric", "1/2 cup heavy cream", "2 tbsp oil", "Salt to taste"],
    instructions: [
      "Bring a large pot of water to boil. Add spinach and blanch for 2 minutes until wilted. Drain and immediately transfer to ice water to preserve color.",
      "Drain spinach and blend in a food processor until smooth. Set aside.",
      "Heat oil in a large skillet over medium heat. Add cumin seeds and cook until they start to crackle.",
      "Add diced onion and cook until soft and translucent, about 5 minutes.",
      "Add minced ginger and garlic, cook for 1 minute until fragrant.",
      "Add diced tomatoes and cook for 3-4 minutes until they start to break down.",
      "Add turmeric and garam masala, stir for 30 seconds to release flavors.",
      "Add blended spinach and cook for 5 minutes, stirring occasionally.",
      "Add paneer cubes and heavy cream. Simmer for 5 minutes until paneer is heated through.",
      "Season with salt to taste. Serve hot with naan bread or steamed rice."
    ]
  },
  {
    id: 23,
    title: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried bread.",
    image: "https://thewhiskaddict.com/wp-content/uploads/2024/08/IMG_0727-4-scaled.jpg",
    cookTime: 50,
    servings: 4,
    cuisine: "Indian",
    diet: "Vegan",
    rating: 4.7,
    ingredients: [
      "2 cups chickpeas, soaked overnight",
      "1 onion, diced",
      "2 tomatoes, diced",
      "4 cloves garlic, minced",
      "1 inch ginger, minced",
      "2 tsp garam masala",
      "1 tsp turmeric",
      "1 tsp chili powder",
      "2 cups all-purpose flour",
      "1/2 cup yogurt",
      "1 tsp baking powder",
      "Oil for frying",
      "Salt to taste"
    ],
    instructions: [
      "Drain soaked chickpeas and cook in a pressure cooker with 4 cups water for 3-4 whistles, or simmer in a pot for 1 hour until tender.",
      "Heat oil in a large skillet over medium heat. Add diced onion and cook until soft, about 5 minutes.",
      "Add minced ginger and garlic, cook for 1 minute until fragrant.",
      "Add diced tomatoes and cook for 3-4 minutes until they start to break down.",
      "Add garam masala, turmeric, and chili powder. Stir for 30 seconds to release flavors.",
      "Add cooked chickpeas and 1 cup of cooking liquid. Simmer for 15 minutes until gravy thickens.",
      "For bhature, mix flour, yogurt, baking powder, and salt in a bowl. Add water gradually to form a soft dough.",
      "Knead dough for 5 minutes until smooth. Cover and let rest for 30 minutes.",
      "Divide dough into 8 portions and roll each into a 6-inch circle.",
      "Heat oil in a deep skillet to 375°F (190°C). Fry bhature one at a time until golden brown and puffed, about 2-3 minutes per side.",
      "Serve hot chole with warm bhature and pickled onions."
    ]
  },
  {
    id: 24,
    title: "Paneer Tikka Masala",
    description: "Grilled paneer cubes simmered in a creamy tomato sauce.",
    image: "https://cookingfromheart.com/wp-content/uploads/2017/03/Paneer-Tikka-Masala-4-500x375.jpg",
    cookTime: 45,
    servings: 4,
    cuisine: "Indian",
    diet: "Vegetarian",
    rating: 4.8,
    ingredients: [
      "250g paneer, cubed",
      "1 cup yogurt",
      "2 tbsp tikka masala paste",
      "1 onion, chopped",
      "2 tomatoes, pureed",
      "1/2 cup cream",
      "2 tbsp oil",
      "1 tsp cumin seeds",
      "1 tsp garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Marinate paneer in yogurt and tikka masala paste for 30 min. Grill or pan-fry until golden.",
      "Heat oil, add cumin seeds, then onion. Sauté until golden. Add tomatoes and cook 5 min.",
      "Add grilled paneer, cream, garam masala, and salt. Simmer 10 min. Serve hot."
    ]
  },
  {
    id: 25,
    title: "Aloo Gobi",
    description: "Classic dry curry of potatoes and cauliflower with Indian spices.",
    image: "https://ministryofcurry.com/wp-content/uploads/2017/04/Aloo-Gobi-5.jpg",
    cookTime: 30,
    servings: 4,
    cuisine: "Indian",
    diet: "Vegan",
    rating: 4.7,
    ingredients: [
      "2 potatoes, cubed",
      "1 small cauliflower, cut into florets",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "2 green chilies, sliced",
      "1 tsp cumin seeds",
      "1 tsp turmeric",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, add cumin seeds, then onion and chilies. Sauté until soft.",
      "Add potatoes, cauliflower, turmeric, coriander, and salt. Cook 5 min.",
      "Add tomatoes, cover, and cook until vegetables are tender. Stir in garam masala and serve."
    ]
  },
  {
    id: 26,
    title: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas.",
    image: "https://paattiskitchen.com/wp-content/uploads/2023/03/kmc_20230226_232129.jpg",
    cookTime: 60,
    servings: 6,
    cuisine: "Indian",
    diet: "Vegan",
    rating: 4.8,
    ingredients: [
      "2 cups flour",
      "3 potatoes, boiled and mashed",
      "1/2 cup peas",
      "1 onion, chopped",
      "2 green chilies, chopped",
      "1 tsp cumin seeds",
      "1 tsp garam masala",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste",
      "Oil for frying"
    ],
    instructions: [
      "Make dough with flour, oil, and water. Sauté onion, chilies, spices, add potatoes and peas. Fill dough, shape, and fry until golden."
    ]
  },
  {
    id: 28,
    title: "Rogan Josh",
    description: "Aromatic lamb curry from Kashmir with yogurt and spices.",
    image: "https://static.toiimg.com/thumb/53192600.cms?width=1200&height=900",
    cookTime: 90,
    servings: 6,
    cuisine: "Indian",
    diet: null,
    rating: 4.8,
    ingredients: [
      "1 kg lamb, cubed",
      "1 cup yogurt",
      "2 onions, sliced",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic paste",
      "2 tsp Kashmiri chili powder",
      "1 tsp turmeric",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    instructions: [
      "Brown lamb in oil. Add onions, ginger-garlic, tomatoes, and spices. Add yogurt, simmer until tender."
    ]
  },
  // Japanese
  {
    id: 31,
    title: "Sushi Rolls",
    description: "Classic Japanese sushi rolls with rice, nori, and fresh fillings.",
    image: "https://japanesetaste.com/cdn/shop/articles/how-to-make-makizushi-sushi-rolls-japanese-taste.jpg?v=1707913754&width=600",
    cookTime: 50,
    servings: 4,
    cuisine: "Japanese",
    diet: "Gluten-Free",
    rating: 4.8,
    ingredients: [
      "2 cups sushi rice",
      "4 sheets nori",
      "200g fresh fish or vegetables",
      "2 tbsp rice vinegar",
      "1 tbsp sugar",
      "1 tsp salt",
      "Soy sauce, wasabi, pickled ginger for serving"
    ],
    instructions: [
      "Cook sushi rice according to package instructions. Mix with rice vinegar, sugar, and salt.",
      "Place a sheet of nori on a bamboo mat, spread rice evenly, add fillings, and roll tightly.",
      "Slice into pieces and serve with soy sauce, wasabi, and pickled ginger."
    ]
  },
  {
    id: 32,
    title: "Chicken Teriyaki",
    description: "Grilled chicken glazed with a sweet and savory teriyaki sauce.",
    image: "https://www.onceuponachef.com/images/2024/01/chicken-teriyaki.jpg",
    cookTime: 30,
    servings: 4,
    cuisine: "Japanese",
    diet: null,
    rating: 4.7,
    ingredients: [
      "4 chicken thighs",
      "1/4 cup soy sauce",
      "2 tbsp mirin",
      "2 tbsp sake",
      "1 tbsp sugar",
      "1 tbsp vegetable oil",
      "1 green onion, sliced"
    ],
    instructions: [
      "In a bowl, mix soy sauce, mirin, sake, and sugar to make the teriyaki sauce.",
      "Heat oil in a skillet over medium heat. Add chicken thighs and cook until browned on both sides.",
      "Pour in the sauce and cook until the chicken is glazed and cooked through.",
      "Slice and garnish with green onion. Serve with steamed rice."
    ]
  },
  {
    id: 33,
    title: "Tempura",
    description: "Lightly battered and fried seafood and vegetables.",
    image: "https://www.thespruceeats.com/thmb/CkzlxmRyeK8IUrMrHrbq73RX4g4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-tempura-for-fish-and-seafood-1300531-hero-01-bbd91b4ee23940749fec5ab7693eadcc.jpg",
    cookTime: 35,
    servings: 4,
    cuisine: "Japanese",
    diet: null,
    rating: 4.7,
    ingredients: [
      "8 shrimp, peeled",
      "1 sweet potato, sliced",
      "1 bell pepper, sliced",
      "1/2 cup flour",
      "1/2 cup cornstarch",
      "1 egg",
      "1 cup ice water",
      "Oil for frying",
      "Tempura dipping sauce"
    ],
    instructions: [
      "Mix flour and cornstarch. Beat egg with ice water, then combine with flour mixture.",
      "Dip shrimp and vegetables in batter and fry until golden.",
      "Drain on paper towels and serve with dipping sauce."
    ]
  },
  {
    id: 34,
    title: "Miso Soup",
    description: "Traditional Japanese soup with tofu, seaweed, and green onions.",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-01-miso-soup%2Fmiso-soup-030",
    cookTime: 15,
    servings: 4,
    cuisine: "Japanese",
    diet: "Vegan",
    rating: 4.6,
    ingredients: [
      "4 cups dashi stock",
      "3 tbsp miso paste",
      "100g tofu, cubed",
      "2 tbsp wakame seaweed",
      "2 green onions, sliced"
    ],
    instructions: [
      "Heat dashi stock. Add tofu and wakame, simmer for 2 minutes.",
      "Dissolve miso paste in a ladle of hot broth, then stir into soup.",
      "Garnish with green onions and serve."
    ]
  },
  {
    id: 35,
    title: "Okonomiyaki",
    description: "Savory Japanese pancake with cabbage, pork, and okonomiyaki sauce.",
    image: "https://static01.nyt.com/images/2023/10/10/multimedia/08EATrex-Okonomiyaki-wjth/08EATrex-Okonomiyaki-wjth-mediumSquareAt3X.jpg",
    cookTime: 30,
    servings: 2,
    cuisine: "Japanese",
    diet: null,
    rating: 4.7,
    ingredients: [
      "1 cup flour",
      "2 eggs",
      "1/2 cup dashi or water",
      "2 cups cabbage, shredded",
      "100g pork belly, sliced",
      "Okonomiyaki sauce",
      "Mayonnaise",
      "Bonito flakes"
    ],
    instructions: [
      "Mix flour, eggs, dashi, and cabbage. Pour batter on griddle, top with pork, cook both sides. Serve with sauces and bonito flakes."
    ]
  },
  {
    id: 36,
    title: "Katsu Curry",
    description: "Breaded pork cutlet served with Japanese curry sauce and rice.",
    image: "https://cookingwithayeh.com/wp-content/uploads/2024/10/Katsu-Curry-SQ-3.jpg",
    cookTime: 50,
    servings: 4,
    cuisine: "Japanese",
    diet: null,
    rating: 4.8,
    ingredients: [
      "4 pork cutlets",
      "1 cup panko breadcrumbs",
      "2 eggs",
      "1/2 cup flour",
      "2 cups cooked rice",
      "2 cups Japanese curry sauce",
      "Oil for frying"
    ],
    instructions: [
      "Bread pork cutlets with flour, egg, and panko. Fry until golden. Serve with rice and curry sauce."
    ]
  },
  // French
  {
    id: 41,
    title: "Ratatouille",
    description: "A classic French Provençal stewed vegetable dish.",
    image: "https://www.allrecipes.com/thmb/F1rucOY3FQT5Ic0oyxdLoqU_yKc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/222006-disneys-ratatouille-DDMFS-4x3-36eb15843ab548a79e7aab761dac92e1.jpg",
    cookTime: 60,
    servings: 4,
    cuisine: "French",
    diet: "Vegan",
    rating: 4.7,
    ingredients: [
      "1 eggplant",
      "2 zucchinis",
      "1 bell pepper",
      "2 tomatoes",
      "1 onion",
      "2 cloves garlic",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Fresh basil"
    ],
    instructions: [
      "Dice all vegetables. Sauté onion and garlic in olive oil.",
      "Add eggplant, zucchini, and bell pepper. Cook until softened.",
      "Add tomatoes, salt, and pepper. Simmer for 30 minutes.",
      "Garnish with fresh basil before serving."
    ]
  },
  {
    id: 42,
    title: "Quiche Lorraine",
    description: "A savory French tart with bacon, cheese, and custard filling.",
    image: "https://img.taste.com.au/yzM49jFu/taste/2017/02/classic-quiche-lorraine-121391-2.jpg",
    cookTime: 70,
    servings: 6,
    cuisine: "French",
    diet: null,
    rating: 4.8,
    ingredients: [
      "1 pie crust",
      "200g bacon, chopped",
      "1 onion, diced",
      "1 cup grated gruyere cheese",
      "3 eggs",
      "1 cup heavy cream",
      "Salt and pepper to taste",
      "Pinch of nutmeg"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Cook bacon in a skillet until crisp. Remove and sauté onion in the bacon fat until soft.",
      "In a bowl, whisk eggs, cream, salt, pepper, and nutmeg.",
      "Spread bacon, onion, and cheese in the pie crust. Pour egg mixture over.",
      "Bake for 35-40 minutes until set and golden. Cool slightly before slicing."
    ]
  },
  {
    id: 43,
    title: "Coq au Vin",
    description: "French chicken stew braised with wine, mushrooms, and bacon.",
    image: "https://www.recipetineats.com/tachyon/2021/09/Coq-au-Vin_00-SQ.jpg",
    cookTime: 120,
    servings: 6,
    cuisine: "French",
    diet: null,
    rating: 4.8,
    ingredients: [
      "1 whole chicken, cut into pieces",
      "200g bacon, chopped",
      "200g mushrooms, sliced",
      "1 onion, chopped",
      "2 carrots, sliced",
      "2 cups red wine",
      "2 cups chicken broth",
      "2 tbsp flour",
      "2 tbsp butter",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Brown chicken and bacon in butter. Remove and sauté vegetables.",
      "Return chicken, add flour, wine, and broth. Simmer 1.5 hours.",
      "Add mushrooms, cook 20 minutes more. Serve hot."
    ]
  },
  {
    id: 44,
    title: "Crème Brûlée",
    description: "Classic French dessert with creamy custard and caramelized sugar top.",
    image: "https://www.allrecipes.com/thmb/y-S61IJkYyCUjTMGYqkaoJGwBrY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-228515-simple-creme-brulee-dessert-dmfs-4x3-821623e7a86548eeb89370ac23d5f251.jpg",
    cookTime: 90,
    servings: 4,
    cuisine: "French",
    diet: "Vegetarian",
    rating: 4.9,
    ingredients: [
      "2 cups heavy cream",
      "5 egg yolks",
      "1/2 cup sugar",
      "1 tsp vanilla extract",
      "Extra sugar for topping"
    ],
    instructions: [
      "Whisk yolks and sugar. Heat cream and vanilla, combine with yolks.",
      "Pour into ramekins, bake in water bath at 325°F for 40 min.",
      "Chill, then sprinkle sugar and caramelize with torch."
    ]
  },
  {
    id: 45,
    title: "Bouillabaisse",
    description: "Traditional Provençal fish stew with saffron and herbs.",
    image: "https://assets.epicurious.com/photos/61f423f29c9591f7270e22c6/16:9/w_5842,h_3286,c_limit/Bouillabaise_RECIPE_20220125_1776_V1_final.jpg",
    cookTime: 90,
    servings: 6,
    cuisine: "French",
    diet: null,
    rating: 4.8,
    ingredients: [
      "1 kg mixed fish",
      "12 mussels",
      "12 shrimp",
      "2 leeks, sliced",
      "2 tomatoes, chopped",
      "1 onion, chopped",
      "2 cloves garlic",
      "1/2 tsp saffron",
      "1/2 cup olive oil",
      "1 liter fish stock",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Sauté leeks, onion, garlic, and tomatoes. Add fish, shellfish, saffron, stock, and simmer. Serve with crusty bread."
    ]
  },
  {
    id: 46,
    title: "Soupe à l'oignon (French Onion Soup)",
    description: "Rich soup of caramelized onions, beef broth, and melted cheese.",
    image: "https://www.seriouseats.com/thmb/xo2aRvBxNaMMxMSTT_od8UUDuME=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-french-onion-soup-recipe-hero-01-cbeea4db88344d00bc2254d4d2df602e.jpg",
    cookTime: 90,
    servings: 6,
    cuisine: "French",
    diet: "Vegetarian",
    rating: 4.8,
    ingredients: [
      "6 onions, thinly sliced",
      "2 tbsp butter",
      "1 tbsp olive oil",
      "2 tbsp flour",
      "8 cups beef broth",
      "1/2 cup white wine",
      "1 baguette, sliced",
      "2 cups gruyere cheese, grated",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Caramelize onions in butter and oil. Add flour, wine, and broth. Simmer. Top with bread and cheese, broil until melted."
    ]
  },
  // Mediterranean
  {
    id: 51,
    title: "Greek Salad",
    description: "A refreshing salad with tomatoes, cucumber, olives, and feta cheese.",
    image: "https://www.thehungrybites.com/wp-content/uploads/2017/07/Authentic-Greek-salad-horiatiki-featured.jpg",
    cookTime: 15,
    servings: 4,
    cuisine: "Mediterranean",
    diet: "Vegetarian",
    rating: 4.6,
    ingredients: [
      "2 tomatoes, chopped",
      "1 cucumber, sliced",
      "1/2 red onion, sliced",
      "1/2 cup kalamata olives",
      "100g feta cheese, cubed",
      "2 tbsp olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Combine tomatoes, cucumber, onion, and olives in a bowl.",
      "Add feta cheese.",
      "Whisk olive oil, vinegar, oregano, salt, and pepper. Pour over salad and toss gently."
    ]
  },
  {
    id: 55,
    title: "Moussaka",
    description: "Layered eggplant casserole with ground lamb and béchamel sauce.",
    image: "https://www.recipetineats.com/tachyon/2019/03/Greek-Moussaka_3-re-edited-SQ.jpg",
    cookTime: 90,
    servings: 8,
    cuisine: "Mediterranean",
    diet: null,
    rating: 4.8,
    ingredients: [
      "2 eggplants, sliced",
      "500g ground lamb",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "2 cups tomato sauce",
      "1 cup béchamel sauce",
      "1/2 cup parmesan cheese",
      "2 tbsp olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Fry eggplant slices. Cook lamb with onion, garlic, and tomato sauce. Layer with béchamel and cheese. Bake until golden."
    ]
  },
  // Spanish
  {
    id: 62,
    title: "Tortilla Española",
    description: "Spanish omelette with potatoes and onions.",
    image: "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
    cookTime: 40,
    servings: 4,
    cuisine: "Spanish",
    diet: "Vegetarian",
    rating: 4.7,
    ingredients: [
      "4 potatoes, thinly sliced",
      "1 onion, thinly sliced",
      "6 eggs",
      "1/2 cup olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Fry potatoes and onions in olive oil until soft.",
      "Beat eggs, combine with potatoes and onions, season.",
      "Cook in a skillet until set, flip to cook both sides."
    ]
  },
  {
    id: 65,
    title: "Churros",
    description: "Fried dough pastry dusted with sugar, served with chocolate sauce.",
    image: "https://www.homecookingadventure.com/wp-content/uploads/2021/06/homemade_eggless_churros_main.webp",
    cookTime: 40,
    servings: 6,
    cuisine: "Spanish",
    diet: null,
    rating: 4.8,
    ingredients: [
      "1 cup flour",
      "1 cup water",
      "2 tbsp sugar",
      "1/2 tsp salt",
      "2 tbsp butter",
      "Oil for frying",
      "1/2 cup sugar (for dusting)",
      "Chocolate sauce for serving"
    ],
    instructions: [
      "Boil water, butter, sugar, and salt. Stir in flour. Pipe and fry dough. Dust with sugar, serve with chocolate sauce."
    ]
  },
  // Korean
  {
    id: 71,
    title: "Bibimbap",
    description: "Korean rice bowl with assorted vegetables, beef, and spicy gochujang sauce.",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/09/BibimbapKoreanMixedRice-6a656fe.jpg",
    cookTime: 40,
    servings: 4,
    cuisine: "Korean",
    diet: null,
    rating: 4.7,
    ingredients: [
      "2 cups cooked rice",
      "200g beef, sliced",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "1 cup spinach",
      "4 eggs",
      "1 cup bean sprouts",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tbsp gochujang",
      "1 clove garlic, minced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Sauté beef with soy sauce, garlic, and pepper. Sauté each vegetable separately with a little oil and salt.",
      "Fry eggs sunny side up.",
      "To serve, place rice in bowls, arrange vegetables and beef on top, add egg, and drizzle with gochujang and sesame oil."
    ]
  },
  {
    id: 72,
    title: "Kimchi Jjigae",
    description: "Spicy Korean stew with kimchi, pork, and tofu.",
    image: "https://christieathome.com/wp-content/uploads/2023/12/tuna-kimchi-jjigae13.jpg",
    cookTime: 40,
    servings: 4,
    cuisine: "Korean",
    diet: null,
    rating: 4.8,
    ingredients: [
      "2 cups kimchi, chopped",
      "200g pork belly, sliced",
      "200g tofu, cubed",
      "1 onion, sliced",
      "2 cups water",
      "1 tbsp gochugaru (Korean chili flakes)",
      "1 tbsp soy sauce",
      "2 green onions, sliced"
    ],
    instructions: [
      "Sauté pork and onion. Add kimchi, water, gochugaru, and soy sauce. Simmer 20 min.",
      "Add tofu and green onions, cook 10 min more. Serve hot."
    ]
  },
  {
    id: 73,
    title: "Japchae",
    description: "Korean glass noodles stir-fried with vegetables and beef.",
    image: "https://images.getrecipekit.com/20240228032059-andy-20cooks-20-20japchae.jpg?aspect_ratio=4:3&quality=90&width=1200",
    cookTime: 35,
    servings: 4,
    cuisine: "Korean",
    diet: null,
    rating: 4.7,
    ingredients: [
      "200g sweet potato noodles",
      "100g beef, sliced",
      "1 carrot, julienned",
      "1 bell pepper, sliced",
      "1 onion, sliced",
      "2 cups spinach",
      "2 tbsp soy sauce",
      "1 tbsp sugar",
      "1 tbsp sesame oil",
      "1 clove garlic, minced"
    ],
    instructions: [
      "Cook noodles. Stir-fry beef and vegetables. Add noodles, soy sauce, sugar, and sesame oil. Toss to combine."
    ]
  },
  {
    id: 75,
    title: "Bulgogi",
    description: "Marinated and grilled Korean beef slices.",
    image: "https://static01.nyt.com/images/2023/11/14/multimedia/JM-Bulgogi-qmfj/JM-Bulgogi-qmfj-mediumThreeByTwo440.jpg",
    cookTime: 40,
    servings: 4,
    cuisine: "Korean",
    diet: null,
    rating: 4.9,
    ingredients: [
      "500g beef sirloin, thinly sliced",
      "1/4 cup soy sauce",
      "2 tbsp sugar",
      "2 tbsp sesame oil",
      "4 cloves garlic, minced",
      "1 onion, sliced",
      "2 green onions, sliced",
      "1 tbsp sesame seeds",
      "1/2 tsp black pepper"
    ],
    instructions: [
      "Marinate beef with all ingredients. Grill or pan-fry until cooked. Serve with rice."
    ]
  },
  {
    id: 81,
    title: "Pad Thai",
    description: "Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce.",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2024-04-pad-thai-190%2Fpad-thai-190-251",
    cookTime: 30,
    servings: 4,
    cuisine: "Thai",
    diet: null,
    rating: 4.8,
    ingredients: [
      "200g rice noodles",
      "150g shrimp, peeled",
      "100g tofu, cubed",
      "2 eggs",
      "1 cup bean sprouts",
      "2 green onions, sliced",
      "1/4 cup roasted peanuts, chopped",
      "2 tbsp tamarind paste",
      "2 tbsp fish sauce",
      "1 tbsp sugar",
      "2 tbsp vegetable oil",
      "Lime wedges"
    ],
    instructions: [
      "Soak rice noodles in warm water until soft. Drain.",
      "Heat oil in a wok. Add tofu and shrimp, cook until shrimp is pink.",
      "Push to the side, scramble eggs in the pan.",
      "Add noodles, tamarind paste, fish sauce, and sugar. Toss to combine.",
      "Add bean sprouts and green onions. Serve with peanuts and lime."
    ]
  },
  {
    id: 82,
    title: "Green Curry",
    description: "Spicy Thai green curry with chicken and vegetables.",
    image: "https://hot-thai-kitchen.com/wp-content/uploads/2022/09/vegan-green-curry-sq-1.jpg",
    cookTime: 35,
    servings: 4,
    cuisine: "Thai",
    diet: null,
    rating: 4.7,
    ingredients: [
      "400g chicken breast, sliced",
      "2 tbsp green curry paste",
      "1 can coconut milk",
      "1 bell pepper, sliced",
      "1 zucchini, sliced",
      "1 cup Thai basil leaves",
      "2 tbsp fish sauce",
      "1 tbsp sugar",
      "1 tbsp vegetable oil"
    ],
    instructions: [
      "Heat oil, add curry paste, then chicken. Add coconut milk, vegetables, fish sauce, and sugar. Simmer 15 min. Stir in basil before serving."
    ]
  },
  {
    id: 83,
    title: "Mango Sticky Rice",
    description: "Sweet Thai dessert with coconut sticky rice and fresh mango.",
    image: "https://www.allrecipes.com/thmb/dDEZtABzmstRfYwbs4DfMREcRhg=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/AR-150313-thai-sweet-sticky-rice-with-mango-khao-neeo-mamuang-ddmfs-4x3-hero-0da7a9b26cce4d07aea44f2f2b6abd95.jpg",
    cookTime: 30,
    servings: 4,
    cuisine: "Thai",
    diet: "Vegan",
    rating: 4.8,
    ingredients: [
      "1 cup glutinous rice",
      "1 can coconut milk",
      "1/4 cup sugar",
      "1/2 tsp salt",
      "2 ripe mangoes, sliced"
    ],
    instructions: [
      "Cook rice. Heat coconut milk with sugar and salt. Mix with rice. Serve with mango slices."
    ]
  },
  {
    id: 85,
    title: "Panang Curry",
    description: "Rich Thai curry with coconut milk, beef, and peanuts.",
    image: "https://hot-thai-kitchen.com/wp-content/uploads/2013/10/panang-pork-sq.jpg",
    cookTime: 40,
    servings: 4,
    cuisine: "Thai",
    diet: null,
    rating: 4.8,
    ingredients: [
      "400g beef, sliced",
      "2 tbsp panang curry paste",
      "1 can coconut milk",
      "1/4 cup peanuts, chopped",
      "1 bell pepper, sliced",
      "2 tbsp fish sauce",
      "1 tbsp sugar",
      "1 tbsp oil"
    ],
    instructions: [
      "Heat oil, add curry paste, then beef. Add coconut milk, peanuts, bell pepper, fish sauce, and sugar. Simmer until thick."
    ]
  },
  // American
  {
    id: 91,
    title: "Classic Cheeseburger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and onion on a toasted bun.",
    image: "https://img.taste.com.au/TDf6WRg0/taste/2016/11/classic-cheeseburgers-109385-1.jpeg",
    cookTime: 20,
    servings: 4,
    cuisine: "American",
    diet: null,
    rating: 4.6,
    ingredients: [
      "500g ground beef",
      "4 slices cheddar cheese",
      "4 burger buns",
      "Lettuce leaves",
      "1 tomato, sliced",
      "1 onion, sliced",
      "Salt and pepper to taste",
      "Ketchup, mustard, mayonnaise"
    ],
    instructions: [
      "Form beef into 4 patties, season with salt and pepper.",
      "Grill or pan-fry patties to desired doneness. Top with cheese to melt.",
      "Toast buns. Assemble burgers with lettuce, tomato, onion, and condiments."
    ]
  },
  {
    id: 92,
    title: "Mac and Cheese",
    description: "Classic American comfort food with creamy cheese sauce.",
    image: "https://www.allrecipes.com/thmb/MkbGgNcGadAWdYw0aRZbo8WapHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/237311-slow-cooker-mac-and-cheese-DDMFS-4x3-9b4a15f2c3344c1da22b034bc3b35683.jpg",
    cookTime: 30,
    servings: 4,
    cuisine: "American",
    diet: "Vegetarian",
    rating: 4.7,
    ingredients: [
      "250g elbow macaroni",
      "2 cups cheddar cheese, shredded",
      "2 cups milk",
      "2 tbsp butter",
      "2 tbsp flour",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook macaroni. Make cheese sauce with butter, flour, milk, and cheese. Combine with pasta and serve."
    ]
  },
  {
    id: 93,
    title: "Apple Pie",
    description: "Classic American dessert with spiced apples in a flaky crust.",
    image: "https://www.southernliving.com/thmb/bbDY1d_ySIrCFcq8WNBkR-3x6pU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2589601_Mailb_Mailbox_Apple_Pie_003-da802ff7a8984b2fa9aa0535997ab246.jpg",
      cookTime: 90,
      servings: 8,
    cuisine: "American",
    diet: null,
    rating: 4.9,
      ingredients: [
      "2 pie crusts",
      "6 apples, sliced",
      "3/4 cup sugar",
      "2 tbsp flour",
      "1 tsp cinnamon",
      "1/4 tsp nutmeg",
      "1 tbsp lemon juice",
      "1 egg, beaten"
      ],
      instructions: [
      "Mix apples with sugar, flour, cinnamon, nutmeg, and lemon juice. Fill crust, top with second crust, seal, and brush with egg. Bake at 425°F for 45-50 min."
    ]
  },
  {
    id: 94,
    title: "Buffalo Wings",
    description: "Crispy chicken wings tossed in spicy buffalo sauce.",
    image: "https://www.allrecipes.com/thmb/2xyo81ibKdZDGpuKvYPbmBOQ5-I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/151266-boneless-buffalo-wings-DDMFS-4x3-403-e644c300766146e8b9b7054e792891b6.jpg",
    cookTime: 50,
    servings: 4,
    cuisine: "American",
    diet: null,
    rating: 4.7,
      ingredients: [
      "1 kg chicken wings",
      "1/2 cup hot sauce",
      "1/4 cup butter",
      "1 tbsp vinegar",
      "1 tsp garlic powder",
      "Salt and pepper to taste",
      "Oil for frying"
      ],
      instructions: [
      "Fry wings until crispy. Melt butter with hot sauce, vinegar, and garlic powder. Toss wings in sauce and serve."
    ]
  },
  {
    id: 95,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with creamy Caesar dressing, croutons, and parmesan.",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
    cookTime: 20,
    servings: 4,
    cuisine: "American",
    diet: "Vegetarian",
    rating: 4.6,
      ingredients: [
      "1 head romaine lettuce",
      "1/2 cup Caesar dressing",
      "1 cup croutons",
      "1/4 cup grated parmesan cheese"
      ],
      instructions: [
      "Toss lettuce with dressing, croutons, and parmesan. Serve chilled."
    ]
  },
  {
    id: 97,
    title: "Clam Chowder",
    description: "Creamy soup with clams, potatoes, and bacon.",
    image: "https://www.savingdessert.com/wp-content/uploads/2012/02/New-England-Clam-Chowder-8.jpg",
      cookTime: 60,
      servings: 6,
    cuisine: "American",
    diet: null,
    rating: 4.7,
      ingredients: [
      "500g clams",
      "2 potatoes, diced",
      "1 onion, chopped",
      "2 cups milk",
      "1 cup cream",
      "4 slices bacon, chopped",
      "2 tbsp flour",
      "2 tbsp butter",
      "Salt and pepper to taste"
      ],
      instructions: [
      "Cook bacon, add onion and potatoes. Stir in flour, add milk and cream. Add clams, simmer until thick."
    ]
  },
  // Middle Eastern
  {
    id: 101,
    title: "Chicken Shawarma",
    description: "Spiced grilled chicken served in pita with garlic sauce and veggies.",
    image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/07/Chicken-Shawarma-3-480x270.jpg",
      cookTime: 60,
      servings: 4,
    cuisine: "Middle Eastern",
    diet: null,
    rating: 4.8,
      ingredients: [
      "500g chicken thighs",
      "2 tbsp shawarma spice mix",
      "1/2 cup yogurt",
      "2 tbsp lemon juice",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Pita bread, lettuce, tomato, cucumber, garlic sauce"
      ],
      instructions: [
      "Marinate chicken in spices, yogurt, lemon, and garlic for 2 hours. Grill and slice. Serve in pita with veggies and sauce."
    ]
  },
  {
    id: 102,
    title: "Hummus",
    description: "Creamy dip made from blended chickpeas, tahini, lemon, and garlic.",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-08-hummus%2Fhummus-165",
      cookTime: 10,
    servings: 6,
    cuisine: "Middle Eastern",
    diet: "Vegan",
    rating: 4.9,
      ingredients: [
      "2 cups cooked chickpeas",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "2 cloves garlic",
      "1/4 cup olive oil",
      "Salt to taste"
      ],
      instructions: [
      "Blend all ingredients until smooth. Drizzle with olive oil to serve."
    ]
  },
  {
    id: 103,
    title: "Tabbouleh",
    description: "Fresh salad of parsley, bulgur, tomato, cucumber, and lemon.",
    image: "https://www.eatingwell.com/thmb/_HvC1fw9Ak7d9RrG8YSl7r6b1sY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/parsley-tabbouleh-252109-3x2-8aea0ca17ffc461faa56c1abada36c61.jpg",
    cookTime: 25,
      servings: 4,
    cuisine: "Middle Eastern",
    diet: "Vegan",
    rating: 4.7,
      ingredients: [
      "1 cup bulgur wheat",
      "2 cups parsley, chopped",
      "2 tomatoes, diced",
      "1 cucumber, diced",
      "2 green onions, sliced",
      "1/4 cup lemon juice",
      "1/4 cup olive oil",
      "Salt and pepper to taste"
      ],
      instructions: [
      "Soak bulgur in hot water 15 min. Drain. Mix with remaining ingredients and chill."
    ]
  },
  {
    id: 105,
    title: "Fattoush",
    description: "Fresh salad with toasted pita, tomatoes, cucumber, and sumac.",
    image: "https://urbanfarmandkitchen.com/wp-content/uploads/2023/11/lebanese-fattoush-4.jpg",
      cookTime: 20,
      servings: 4,
    cuisine: "Middle Eastern",
    diet: "Vegan",
    rating: 4.8,
      ingredients: [
      "2 pita breads, toasted and broken",
      "2 tomatoes, chopped",
      "1 cucumber, chopped",
      "1/2 red onion, sliced",
      "1/4 cup parsley, chopped",
      "1/4 cup mint, chopped",
      "2 tbsp olive oil",
      "2 tbsp lemon juice",
      "1 tsp sumac",
      "Salt and pepper to taste"
      ],
      instructions: [
      "Combine all ingredients in a bowl. Toss and serve immediately."
    ]
  },
];

export const seasonalRecipes = {
  // Holiday Collections
  thanksgiving: {
    title: "Thanksgiving Recipes",
    description: "Traditional and modern recipes perfect for your Thanksgiving feast",
    recipes: [
      {
        id: "thanksgiving-1",
        title: "Classic Roasted Turkey",
        description: "A perfectly seasoned and roasted turkey with crispy skin and juicy meat.",
        image: "https://images.ctfassets.net/lufu0clouua1/2cSQKvJYskEqgyaAYawE48/7b71e49f5de264f38541c055926f8f5a/classic-roast-turkey.jpg",
        cookTime: 240,
        servings: 12,
        cuisine: "American",
        diet: null,
        rating: 4.9,
        ingredients: [
          "1 whole turkey (12-14 lbs)",
          "1/2 cup butter, softened",
          "2 tbsp fresh rosemary, chopped",
          "2 tbsp fresh sage, chopped",
          "2 tbsp fresh thyme, chopped",
          "1 onion, quartered",
          "1 lemon, quartered",
          "4 cloves garlic",
          "Salt and pepper to taste",
          "2 cups chicken broth"
        ],
        instructions: [
          "Preheat oven to 325°F (165°C). Remove turkey from packaging and pat dry with paper towels.",
          "Mix softened butter with chopped herbs. Gently separate skin from meat and spread herb butter under the skin.",
          "Season the cavity with salt and pepper, then stuff with onion, lemon, and garlic.",
          "Place turkey on a roasting rack in a large roasting pan. Pour chicken broth into the bottom of the pan.",
          "Roast for 3-4 hours, basting every 30 minutes with pan juices, until internal temperature reaches 165°F (74°C).",
          "Let rest for 20 minutes before carving and serving."
        ]
      },
      {
        id: "thanksgiving-2",
        title: "Creamy Mashed Potatoes",
        description: "Smooth and creamy mashed potatoes with butter and cream.",
        image: "https://pekis.net/sites/default/files/styles/325x325/public/2025-01/Perfect%20Mashed%20Potatoes%20Creamy%20and%20Smooth.webp?itok=8QHO11hS",
        cookTime: 30,
        servings: 8,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.8,
        ingredients: [
          "3 lbs Yukon Gold potatoes, peeled and cubed",
          "1/2 cup heavy cream",
          "1/4 cup butter",
          "1/4 cup sour cream",
          "Salt and pepper to taste",
          "2 tbsp fresh chives, chopped"
        ],
        instructions: [
          "Place potatoes in a large pot and cover with cold water. Add a generous pinch of salt.",
          "Bring to a boil and cook until potatoes are tender, about 15-20 minutes.",
          "Drain potatoes and return to the pot. Mash with a potato masher.",
          "Heat cream and butter in a small saucepan until butter melts.",
          "Gradually add the cream mixture to the potatoes, mashing until smooth and creamy.",
          "Stir in sour cream and season with salt and pepper. Garnish with chives and serve hot."
        ]
      },
      {
        id: "thanksgiving-3",
        title: "Green Bean Casserole",
        description: "Classic green bean casserole with crispy fried onions.",
        image: "https://www.allrecipes.com/thmb/L8lXtN9h0u_Mp3SQl55IpmlMubE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-13660-green-bean-casserole-i-VAT-4x3-c6fafe7e10c1430e9965a40e814b8840.jpg",
        cookTime: 45,
        servings: 8,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.7,
        ingredients: [
          "2 lbs fresh green beans, trimmed",
          "2 cans cream of mushroom soup",
          "1/2 cup milk",
          "1 cup crispy fried onions",
          "1/2 cup shredded cheddar cheese",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C). Bring a large pot of salted water to boil.",
          "Blanch green beans for 3-4 minutes, then drain and plunge into ice water to stop cooking.",
          "In a large bowl, mix cream of mushroom soup with milk until smooth.",
          "Add green beans to the soup mixture and season with salt and pepper.",
          "Transfer to a 9x13 inch baking dish and top with shredded cheese.",
          "Bake for 25 minutes, then top with crispy fried onions and bake for 5 more minutes until golden."
        ]
      }
    ]
  },
  christmas: {
    title: "Christmas Desserts",
    description: "Festive and delicious desserts to sweeten your holiday celebrations",
    recipes: [
      {
        id: "christmas-1",
        title: "Gingerbread Cookies",
        description: "Classic spiced gingerbread cookies with royal icing decoration.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRbmP3YNN5VRbpUdIj_SJl9ySVncpNFlBRg&s",
        cookTime: 60,
        servings: 24,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.9,
        ingredients: [
          "3 cups all-purpose flour",
          "1 tsp baking soda",
          "1/2 tsp salt",
          "2 tsp ground ginger",
          "1 tsp ground cinnamon",
          "1/2 tsp ground cloves",
          "1/2 cup butter, softened",
          "1/2 cup brown sugar",
          "1/2 cup molasses",
          "1 egg",
          "1 tsp vanilla extract"
        ],
        instructions: [
          "In a large bowl, whisk together flour, baking soda, salt, and spices.",
          "In another bowl, cream butter and brown sugar until light and fluffy.",
          "Beat in molasses, egg, and vanilla extract until well combined.",
          "Gradually add the flour mixture to the wet ingredients, mixing until a dough forms.",
          "Divide dough in half, wrap in plastic wrap, and refrigerate for 1 hour.",
          "Preheat oven to 350°F (175°C). Roll out dough on a floured surface and cut into shapes.",
          "Bake for 8-10 minutes until edges are firm. Cool completely before decorating."
        ]
      },
      {
        id: "christmas-2",
        title: "Eggnog Cheesecake",
        description: "Creamy cheesecake flavored with traditional eggnog spices.",
        image: "https://www.foodandwine.com/thmb/ixkuCgOlLX7OEVr1ohElxm_FDvM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eggnog-cheesecake-FT-RECIPE0822-2000-ced2169fec4347f4a5007884b4d6171c.jpg",
        cookTime: 90,
        servings: 12,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.8,
        ingredients: [
          "2 cups graham cracker crumbs",
          "1/2 cup butter, melted",
          "1/4 cup sugar",
          "3 packages cream cheese, softened",
          "1 cup sugar",
          "3 eggs",
          "1/2 cup eggnog",
          "1 tsp vanilla extract",
          "1/2 tsp ground nutmeg",
          "1/4 tsp ground cinnamon"
        ],
        instructions: [
          "Preheat oven to 325°F (165°C). Mix graham cracker crumbs, melted butter, and 1/4 cup sugar.",
          "Press mixture into the bottom of a 9-inch springform pan. Bake for 10 minutes, then cool.",
          "Beat cream cheese and 1 cup sugar until smooth. Add eggs one at a time, beating well after each.",
          "Stir in eggnog, vanilla, nutmeg, and cinnamon until well combined.",
          "Pour filling over crust and bake for 50-60 minutes until center is almost set.",
          "Cool completely, then refrigerate for at least 4 hours before serving."
        ]
      },
      {
        id: "christmas-3",
        title: "Peppermint Bark",
        description: "Layered chocolate bark with crushed peppermint candies.",
        image: "https://www.allrecipes.com/thmb/OGJHHUTIV0ySW0YHH7Nk8WDyM9g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-217827-peppermint-bark-VAT-hero-4x3-bdc910f9fd6240688d803ff59ecfc098.jpg",
        cookTime: 30,
        servings: 16,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.7,
        ingredients: [
          "12 oz dark chocolate, chopped",
          "12 oz white chocolate, chopped",
          "1/2 cup crushed peppermint candies",
          "1 tsp peppermint extract",
          "1 tbsp vegetable oil"
        ],
        instructions: [
          "Line a 9x13 inch baking sheet with parchment paper.",
          "Melt dark chocolate with 1/2 tbsp oil in a double boiler until smooth.",
          "Spread dark chocolate evenly over the prepared baking sheet and refrigerate for 15 minutes.",
          "Melt white chocolate with remaining oil and peppermint extract until smooth.",
          "Spread white chocolate over the dark chocolate layer.",
          "Immediately sprinkle crushed peppermint candies over the top and press gently.",
          "Refrigerate for 1 hour until firm, then break into pieces and serve."
        ]
      }
    ]
  },
  // Seasonal Ingredients Spotlight
  summerBerries: {
    title: "Summer Berries Collection",
    description: "Fresh and vibrant recipes featuring the best of summer berries",
    recipes: [
      {
        id: "summer-1",
        title: "Mixed Berry Pavlova",
        description: "Light and airy meringue dessert topped with fresh summer berries.",
        image: "https://driscolls.imgix.net/-/media/assets/recipes/mixed-berry-pavlova.ashx",
        cookTime: 120,
        servings: 8,
        cuisine: "Australian",
        diet: "Vegetarian",
        rating: 4.9,
        ingredients: [
          "6 egg whites",
          "1 1/2 cups sugar",
          "1 tsp vanilla extract",
          "1 tsp white vinegar",
          "1 tsp cornstarch",
          "2 cups heavy cream",
          "2 tbsp powdered sugar",
          "2 cups mixed berries (strawberries, blueberries, raspberries)",
          "Fresh mint leaves for garnish"
        ],
        instructions: [
          "Preheat oven to 250°F (120°C). Line a baking sheet with parchment paper.",
          "Beat egg whites until soft peaks form. Gradually add sugar, beating until stiff peaks form.",
          "Fold in vanilla, vinegar, and cornstarch. Spoon meringue onto prepared baking sheet, forming a circle.",
          "Bake for 1 1/2 hours, then turn off oven and let cool completely inside.",
          "Whip cream with powdered sugar until soft peaks form.",
          "Top meringue with whipped cream and arrange berries on top. Garnish with mint and serve immediately."
        ]
      },
      {
        id: "summer-2",
        title: "Strawberry Spinach Salad",
        description: "Fresh spinach salad with strawberries, nuts, and balsamic vinaigrette.",
        image: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/02/Strawberry-Spinach-Salad-Recipe.jpg",
        cookTime: 15,
        servings: 4,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.6,
        ingredients: [
          "6 cups fresh spinach leaves",
          "2 cups fresh strawberries, sliced",
          "1/2 cup sliced almonds, toasted",
          "1/4 cup crumbled feta cheese",
          "1/4 cup balsamic vinegar",
          "1/4 cup olive oil",
          "1 tbsp honey",
          "1 tsp Dijon mustard",
          "Salt and pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine spinach, strawberries, almonds, and feta cheese.",
          "In a small bowl, whisk together balsamic vinegar, olive oil, honey, and Dijon mustard.",
          "Season vinaigrette with salt and pepper to taste.",
          "Drizzle vinaigrette over salad and toss gently to combine.",
          "Serve immediately while spinach is crisp and berries are fresh."
        ]
      },
      {
        id: "summer-3",
        title: "Blueberry Lemon Muffins",
        description: "Moist and tender muffins bursting with fresh blueberries and lemon zest.",
        image: "https://brunchandbatter.com/wp-content/uploads/2021/07/Blueberry-Lemon-Muffins-FI.jpg",
        cookTime: 25,
        servings: 12,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.8,
        ingredients: [
          "2 cups all-purpose flour",
          "1/2 cup sugar",
          "2 tsp baking powder",
          "1/2 tsp salt",
          "1/2 cup butter, melted",
          "2 eggs",
          "1 cup milk",
          "1 tsp vanilla extract",
          "1 tbsp lemon zest",
          "1 1/2 cups fresh blueberries",
          "2 tbsp sugar for topping"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C). Line a muffin tin with paper liners.",
          "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
          "In another bowl, whisk together melted butter, eggs, milk, vanilla, and lemon zest.",
          "Gently fold wet ingredients into dry ingredients until just combined.",
          "Carefully fold in blueberries, being careful not to overmix.",
          "Divide batter among muffin cups and sprinkle with sugar.",
          "Bake for 18-20 minutes until golden brown and a toothpick comes out clean."
        ]
      }
    ]
  },
  autumnHarvest: {
    title: "Autumn Harvest Collection",
    description: "Warm and comforting recipes featuring fall's bounty of pumpkins, apples, and root vegetables",
    recipes: [
      {
        id: "autumn-1",
        title: "Pumpkin Spice Latte Cake",
        description: "Moist pumpkin cake with coffee-flavored frosting and warm spices.",
        image: "https://static01.nyt.com/images/2023/10/30/multimedia/30GERARD-HARVESTrex2-cake-vbjg/30HARVESTrex2-cake-vbjg-jumbo.jpg",
        cookTime: 60,
        servings: 12,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.9,
        ingredients: [
          "2 cups all-purpose flour",
          "1 1/2 cups sugar",
          "1 tsp baking soda",
          "1/2 tsp salt",
          "2 tsp ground cinnamon",
          "1 tsp ground ginger",
          "1/2 tsp ground nutmeg",
          "1/4 tsp ground cloves",
          "1 cup pumpkin puree",
          "1/2 cup vegetable oil",
          "2 eggs",
          "1/2 cup strong brewed coffee, cooled",
          "1 tsp vanilla extract"
        ],
        instructions: [
          "Preheat oven to 350°F (175°C). Grease and flour a 9x13 inch baking pan.",
          "In a large bowl, whisk together flour, sugar, baking soda, salt, and spices.",
          "In another bowl, whisk together pumpkin puree, oil, eggs, coffee, and vanilla.",
          "Gradually add wet ingredients to dry ingredients, mixing until just combined.",
          "Pour batter into prepared pan and bake for 30-35 minutes until a toothpick comes out clean.",
          "Cool completely before frosting with coffee-flavored cream cheese frosting."
        ]
      },
      {
        id: "autumn-2",
        title: "Apple Cider Braised Pork",
        description: "Tender pork shoulder braised in apple cider with fall vegetables.",
        image: "https://assets.bonappetit.com/photos/65948ded2d63effd7aeb6f4a/1:1/w_2560%2Cc_limit/20231109-v0224-COZY-7606.jpg",
        cookTime: 180,
        servings: 6,
        cuisine: "American",
        diet: null,
        rating: 4.8,
        ingredients: [
          "3 lbs pork shoulder, cut into chunks",
          "2 tbsp olive oil",
          "1 onion, diced",
          "2 carrots, diced",
          "2 celery stalks, diced",
          "3 cloves garlic, minced",
          "2 cups apple cider",
          "1 cup chicken broth",
          "2 tbsp apple cider vinegar",
          "2 bay leaves",
          "1 tsp dried thyme",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Season pork with salt and pepper. Heat oil in a large Dutch oven over medium-high heat.",
          "Brown pork in batches until golden on all sides. Remove and set aside.",
          "Add onion, carrots, and celery to the pot and cook until softened, about 5 minutes.",
          "Add garlic and cook for 30 seconds until fragrant.",
          "Return pork to the pot and add apple cider, chicken broth, vinegar, bay leaves, and thyme.",
          "Bring to a boil, then reduce heat and simmer covered for 2-3 hours until pork is tender.",
          "Remove bay leaves and serve hot with mashed potatoes or polenta."
        ]
      },
      {
        id: "autumn-3",
        title: "Roasted Root Vegetables",
        description: "Colorful medley of roasted root vegetables with herbs and olive oil.",
        image: "https://giveitsomethyme.com/wp-content/uploads/2021/10/balsamic-roasted-root-vegetables.jpg",
        cookTime: 45,
        servings: 6,
        cuisine: "American",
        diet: "Vegan",
        rating: 4.7,
        ingredients: [
          "1 lb carrots, peeled and cut into chunks",
          "1 lb parsnips, peeled and cut into chunks",
          "1 lb sweet potatoes, peeled and cut into chunks",
          "1 lb beets, peeled and cut into chunks",
          "1/4 cup olive oil",
          "2 tbsp fresh rosemary, chopped",
          "2 tbsp fresh thyme, chopped",
          "4 cloves garlic, minced",
          "Salt and pepper to taste",
          "2 tbsp balsamic vinegar"
        ],
        instructions: [
          "Preheat oven to 425°F (220°C). Line a large baking sheet with parchment paper.",
          "In a large bowl, combine all vegetables with olive oil, herbs, garlic, salt, and pepper.",
          "Spread vegetables in a single layer on the prepared baking sheet.",
          "Roast for 35-40 minutes, stirring halfway through, until vegetables are tender and caramelized.",
          "Drizzle with balsamic vinegar and serve hot as a side dish."
        ]
      }
    ]
  },
  valentinesDay: {
    title: "Valentine's Day Romance",
    description: "Romantic and elegant recipes perfect for a special Valentine's Day dinner",
    recipes: [
      {
        id: "valentine-1",
        title: "Chocolate Covered Strawberries",
        description: "Fresh strawberries dipped in rich dark chocolate with decorative drizzles.",
        image: "https://www.allrecipes.com/thmb/v9ncEt1CoTDG6lJwt1_CBl8syr8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21712-chocolate-covered-strawberries-ddmfs-3X4-1770-d4b548d24adf4a348f47310dfda96e63.jpg",
        cookTime: 30,
        servings: 4,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.9,
        ingredients: [
          "1 lb fresh strawberries, washed and dried",
          "8 oz dark chocolate, chopped",
          "2 oz white chocolate, chopped",
          "1 tbsp coconut oil",
          "Sprinkles or edible glitter for decoration",
          "Parchment paper"
        ],
        instructions: [
          "Line a baking sheet with parchment paper. Melt dark chocolate with 1/2 tbsp coconut oil in a double boiler.",
          "Hold each strawberry by the stem and dip into melted chocolate, leaving the top exposed.",
          "Place dipped strawberries on parchment paper and refrigerate for 10 minutes.",
          "Melt white chocolate with remaining coconut oil and drizzle over strawberries.",
          "Add sprinkles or edible glitter while chocolate is still wet.",
          "Refrigerate for 30 minutes until chocolate is set. Serve chilled."
        ]
      },
      {
        id: "valentine-2",
        title: "Beef Tenderloin with Red Wine Sauce",
        description: "Elegant beef tenderloin with a rich red wine reduction sauce.",
        image: "https://static01.nyt.com/images/2019/02/20/dining/20nigellarex-horizontal/merlin_150586146_70e47f46-ab23-4191-ba03-c1f0b34a6e47-square640.jpg",
        cookTime: 45,
        servings: 2,
        cuisine: "American",
        diet: null,
        rating: 4.8,
        ingredients: [
          "2 beef tenderloin steaks (6-8 oz each)",
          "2 tbsp olive oil",
          "2 tbsp butter",
          "2 shallots, minced",
          "2 cloves garlic, minced",
          "1 cup red wine",
          "1 cup beef broth",
          "2 tbsp balsamic vinegar",
          "1 tbsp fresh rosemary, chopped",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Season steaks with salt and pepper. Heat olive oil in a large skillet over high heat.",
          "Sear steaks for 3-4 minutes per side for medium-rare. Remove and let rest.",
          "In the same skillet, melt butter and sauté shallots until soft, about 3 minutes.",
          "Add garlic and cook for 30 seconds. Add red wine and scrape up browned bits.",
          "Add beef broth, balsamic vinegar, and rosemary. Simmer until sauce reduces by half.",
          "Return steaks to skillet and warm through. Serve with sauce spooned over top."
        ]
      },
      {
        id: "valentine-3",
        title: "Raspberry Champagne Sorbet",
        description: "Light and refreshing sorbet with fresh raspberries and champagne.",
        image: "https://kalejunkie.com/wp-content/uploads/2024/03/KJ_Raspberry-Sorbet-Champagne-Floats-8-640x853.jpg",
        cookTime: 240,
        servings: 4,
        cuisine: "French",
        diet: "Vegan",
        rating: 4.7,
        ingredients: [
          "2 cups fresh raspberries",
          "1/2 cup sugar",
          "1/2 cup water",
          "1/2 cup champagne or sparkling wine",
          "1 tbsp lemon juice",
          "Fresh mint leaves for garnish"
        ],
        instructions: [
          "In a small saucepan, combine sugar and water. Bring to a boil and simmer for 5 minutes.",
          "In a blender, puree raspberries until smooth. Strain through a fine mesh sieve.",
          "Combine raspberry puree, sugar syrup, champagne, and lemon juice.",
          "Pour into an ice cream maker and churn according to manufacturer's instructions.",
          "Transfer to a freezer-safe container and freeze for at least 4 hours.",
          "Serve in chilled glasses garnished with fresh mint leaves."
        ]
      }
    ]
  },
  easter: {
    title: "Easter Celebration",
    description: "Traditional and festive recipes perfect for Easter brunch and dinner",
    recipes: [
      {
        id: "easter-1",
        title: "Hot Cross Buns",
        description: "Traditional spiced sweet buns with dried fruit and a cross on top.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuBEkR6sZYIGI6-9rfvqlWNRj1g01Pb9VNw&s",
        cookTime: 180,
        servings: 12,
        cuisine: "British",
        diet: "Vegetarian",
        rating: 4.9,
        ingredients: [
          "4 cups all-purpose flour",
          "1/4 cup sugar",
          "1 tsp salt",
          "2 tsp active dry yeast",
          "1 tsp ground cinnamon",
          "1/2 tsp ground nutmeg",
          "1/4 tsp ground cloves",
          "1 cup warm milk",
          "1/4 cup butter, melted",
          "1 egg",
          "1/2 cup mixed dried fruit",
          "1/4 cup candied orange peel"
        ],
        instructions: [
          "In a large bowl, combine flour, sugar, salt, yeast, and spices.",
          "Add warm milk, melted butter, and egg. Mix until a dough forms.",
          "Knead dough for 10 minutes until smooth. Add dried fruit and orange peel.",
          "Place in a greased bowl, cover, and let rise for 1 hour.",
          "Shape into 12 balls and place on a baking sheet. Let rise for 30 minutes.",
          "Make a cross on each bun with a knife. Bake at 375°F for 20-25 minutes.",
          "Cool and serve warm with butter."
        ]
      },
      {
        id: "easter-2",
        title: "Deviled Eggs",
        description: "Classic deviled eggs with a creamy filling and paprika garnish.",
        image: "https://www.recipetineats.com/tachyon/2025/02/Devilled-eggs_8.jpg?resize=500%2C375",
        cookTime: 20,
        servings: 6,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.8,
        ingredients: [
          "6 large eggs",
          "1/4 cup mayonnaise",
          "1 tsp Dijon mustard",
          "1 tsp white vinegar",
          "1/4 tsp salt",
          "1/8 tsp black pepper",
          "Paprika for garnish",
          "Fresh chives for garnish"
        ],
        instructions: [
          "Place eggs in a saucepan and cover with cold water. Bring to a boil.",
          "Remove from heat, cover, and let stand for 12 minutes.",
          "Drain and cool eggs in ice water. Peel and cut in half lengthwise.",
          "Remove yolks and place in a bowl. Mash with a fork.",
          "Add mayonnaise, mustard, vinegar, salt, and pepper. Mix until smooth.",
          "Fill egg whites with yolk mixture. Garnish with paprika and chives.",
          "Refrigerate until ready to serve."
        ]
      },
      {
        id: "easter-3",
        title: "Lemon Ricotta Pancakes",
        description: "Light and fluffy pancakes with fresh lemon and creamy ricotta.",
        image: "https://www.kyleecooks.com/wp-content/uploads/2019/05/Lemon-Ricotta-Pancakes-37.jpg",
        cookTime: 25,
        servings: 4,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.7,
        ingredients: [
          "1 1/2 cups all-purpose flour",
          "1/4 cup sugar",
          "2 tsp baking powder",
          "1/2 tsp salt",
          "1 cup ricotta cheese",
          "3/4 cup milk",
          "2 eggs, separated",
          "1/4 cup fresh lemon juice",
          "1 tbsp lemon zest",
          "1 tsp vanilla extract",
          "Butter for cooking",
          "Maple syrup for serving"
        ],
        instructions: [
          "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
          "In another bowl, whisk together ricotta, milk, egg yolks, lemon juice, zest, and vanilla.",
          "Gently fold wet ingredients into dry ingredients until just combined.",
          "Beat egg whites until stiff peaks form. Fold into batter.",
          "Heat a griddle or large skillet over medium heat. Melt butter.",
          "Pour 1/4 cup batter for each pancake. Cook until bubbles form, then flip.",
          "Cook until golden brown. Serve with maple syrup."
        ]
      }
    ]
  },
  springFresh: {
    title: "Spring Fresh Collection",
    description: "Light and vibrant recipes featuring fresh spring vegetables and herbs",
    recipes: [
      {
        id: "spring-1",
        title: "Asparagus Risotto",
        description: "Creamy risotto with fresh asparagus and parmesan cheese.",
        image: "https://marleyspoon.com/media/recipes/57371/main_photos/large/bacon_asparagus_risotto-8583ec91e4a83500d0be2240264c2d83.jpeg",
        cookTime: 35,
        servings: 4,
        cuisine: "Italian",
        diet: "Vegetarian",
        rating: 4.8,
        ingredients: [
          "1 1/2 cups arborio rice",
          "1 lb fresh asparagus, trimmed and cut into 1-inch pieces",
          "1 onion, finely diced",
          "2 cloves garlic, minced",
          "1/2 cup white wine",
          "4 cups vegetable broth, hot",
          "1/2 cup grated parmesan cheese",
          "2 tbsp butter",
          "2 tbsp olive oil",
          "1/4 cup fresh parsley, chopped",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Heat olive oil in a large pan over medium heat. Add onion and cook until soft, about 5 minutes.",
          "Add garlic and cook for 30 seconds until fragrant. Add rice and stir for 2 minutes.",
          "Pour in white wine and stir until absorbed. Add hot broth one ladle at a time.",
          "After 15 minutes, add asparagus pieces and continue cooking.",
          "Cook until rice is creamy and al dente, about 20 minutes total.",
          "Remove from heat and stir in butter, parmesan, and parsley. Season with salt and pepper."
        ]
      },
      {
        id: "spring-2",
        title: "Pea and Mint Soup",
        description: "Fresh and vibrant soup with spring peas and mint.",
        image: "https://marleyspoon.com/media/recipes/91896/main_photos/large/super_green_pea_and_mint_soup-522a3ad4d51d65d087589db5009bed94.jpeg",
        cookTime: 25,
        servings: 4,
        cuisine: "British",
        diet: "Vegan",
        rating: 4.6,
        ingredients: [
          "2 cups fresh or frozen peas",
          "1 onion, diced",
          "2 cloves garlic, minced",
          "4 cups vegetable broth",
          "1/4 cup fresh mint leaves",
          "2 tbsp olive oil",
          "1/2 cup coconut milk",
          "1 tbsp lemon juice",
          "Salt and pepper to taste",
          "Fresh mint and pea shoots for garnish"
        ],
        instructions: [
          "Heat olive oil in a large pot over medium heat. Add onion and cook until soft.",
          "Add garlic and cook for 30 seconds. Add peas and vegetable broth.",
          "Bring to a boil, then reduce heat and simmer for 10 minutes.",
          "Add mint leaves and cook for 2 more minutes.",
          "Blend soup until smooth using an immersion blender or regular blender.",
          "Stir in coconut milk and lemon juice. Season with salt and pepper.",
          "Serve hot garnished with fresh mint and pea shoots."
        ]
      },
      {
        id: "spring-3",
        title: "Strawberry Spinach Salad",
        description: "Fresh spinach salad with strawberries, goat cheese, and balsamic vinaigrette.",
        image: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/02/Strawberry-Spinach-Salad-Recipe.jpg",
        cookTime: 15,
        servings: 4,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.7,
        ingredients: [
          "6 cups fresh spinach leaves",
          "2 cups fresh strawberries, sliced",
          "1/2 cup crumbled goat cheese",
          "1/4 cup sliced almonds, toasted",
          "1/4 cup balsamic vinegar",
          "1/4 cup olive oil",
          "1 tbsp honey",
          "1 tsp Dijon mustard",
          "Salt and pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine spinach, strawberries, goat cheese, and almonds.",
          "In a small bowl, whisk together balsamic vinegar, olive oil, honey, and mustard.",
          "Season vinaigrette with salt and pepper to taste.",
          "Drizzle vinaigrette over salad and toss gently to combine.",
          "Serve immediately while spinach is crisp and strawberries are fresh."
        ]
      }
    ]
  },
  winterComfort: {
    title: "Winter Comfort Collection",
    description: "Warm and hearty recipes perfect for cold winter days",
    recipes: [
      {
        id: "winter-1",
        title: "Beef and Barley Soup",
        description: "Hearty soup with tender beef, barley, and winter vegetables.",
        image: "https://thecozyapron.com/wp-content/uploads/2018/09/beef-barley-soup_thecozyapron_1.jpg",
        cookTime: 120,
        servings: 6,
        cuisine: "American",
        diet: null,
        rating: 4.8,
        ingredients: [
          "1 lb beef chuck, cut into cubes",
          "1 cup pearl barley",
          "2 carrots, diced",
          "2 celery stalks, diced",
          "1 onion, diced",
          "3 cloves garlic, minced",
          "8 cups beef broth",
          "2 tbsp tomato paste",
          "2 bay leaves",
          "1 tsp dried thyme",
          "2 tbsp olive oil",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Heat olive oil in a large Dutch oven over medium-high heat.",
          "Season beef with salt and pepper. Brown beef in batches until golden.",
          "Add onion, carrots, and celery. Cook until vegetables soften, about 5 minutes.",
          "Add garlic and cook for 30 seconds. Add tomato paste and stir for 1 minute.",
          "Add beef broth, barley, bay leaves, and thyme. Bring to a boil.",
          "Reduce heat and simmer covered for 1-2 hours until beef and barley are tender.",
          "Remove bay leaves and season with salt and pepper before serving."
        ]
      },
      {
        id: "winter-2",
        title: "Butternut Squash Mac and Cheese",
        description: "Creamy mac and cheese with roasted butternut squash and sage.",
        image: "https://www.southernliving.com/thmb/aPYQUerc79uU9KuHYrqshBcsn6Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27347_Butternut_Squash_Mac_And_Cheese_002-b8b810a33ba64c57a834e1c537622a75.jpg",
        cookTime: 45,
        servings: 6,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.7,
        ingredients: [
          "1 lb elbow macaroni",
          "1 small butternut squash, peeled and cubed",
          "2 cups shredded cheddar cheese",
          "1 cup milk",
          "2 tbsp butter",
          "2 tbsp flour",
          "2 tbsp fresh sage, chopped",
          "1/4 cup breadcrumbs",
          "2 tbsp olive oil",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Preheat oven to 400°F (200°C). Toss butternut squash with olive oil, salt, and pepper.",
          "Roast squash for 25-30 minutes until tender and caramelized.",
          "Cook macaroni according to package directions. Drain and set aside.",
          "In a large pot, melt butter over medium heat. Add flour and whisk for 1 minute.",
          "Gradually add milk, whisking constantly until sauce thickens.",
          "Add cheese and stir until melted. Add roasted squash and sage.",
          "Fold in cooked macaroni. Transfer to a baking dish and top with breadcrumbs.",
          "Bake for 15 minutes until bubbly and golden."
        ]
      },
      {
        id: "winter-3",
        title: "Hot Chocolate with Marshmallows",
        description: "Rich and creamy hot chocolate topped with homemade marshmallows.",
        image: "https://www.glutenfreealchemist.com/wp-content/uploads/2021/10/baileys-hot-chocolate-FI-scaled.jpg",
        cookTime: 15,
        servings: 4,
        cuisine: "American",
        diet: "Vegetarian",
        rating: 4.9,
        ingredients: [
          "4 cups whole milk",
          "1/2 cup heavy cream",
          "1/2 cup dark chocolate, chopped",
          "1/4 cup cocoa powder",
          "1/4 cup sugar",
          "1 tsp vanilla extract",
          "1/4 tsp salt",
          "Homemade marshmallows or store-bought",
          "Whipped cream for topping",
          "Chocolate shavings for garnish"
        ],
        instructions: [
          "In a medium saucepan, heat milk and cream over medium heat until steaming.",
          "Add chopped chocolate and whisk until melted and smooth.",
          "Whisk in cocoa powder, sugar, vanilla, and salt until well combined.",
          "Continue heating until hot but not boiling, about 5 minutes.",
          "Pour into mugs and top with marshmallows, whipped cream, and chocolate shavings.",
          "Serve immediately while hot and comforting."
        ]
      }
    ]
  }
};

export default recipes; 