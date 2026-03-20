import type { GrainOrLegume } from "@/types/meal.types";

export const grainsAndLegumes: GrainOrLegume[] = [
  {
    id: "brown-rice",
    name: "Brown Rice",
    category: "grain",
    keyNutrients:
      "Fiber, magnesium, B vitamins. Slower digesting than white rice — sustained energy for training.",
    cookMethod: "Rice cooker · 45–50 min. Cook large batch Sunday — keeps 5 days refrigerated.",
    cookTime: "45–50 min",
    weeklyUse: "Mon + Tue meals. Base for any bowl.",
    badge: "best",
  },
  {
    id: "quinoa",
    name: "Quinoa",
    category: "grain",
    rinseWarning: true,
    keyNutrients:
      "Complete protein (~8g/cup cooked). Only grain with all 9 essential amino acids. High iron and magnesium.",
    cookMethod: "Rice cooker or stovetop · 15–18 min. Cook Sunday — keeps 5–6 days.",
    cookTime: "15–18 min",
    weeklyUse: "Wed + Thu meals. Especially good with fish.",
    badge: "best",
  },
  {
    id: "lentils",
    name: "Green / Brown Lentils",
    category: "legume",
    keyNutrients:
      "18g protein + 16g fiber per cup cooked. Cheapest protein source on this list. Very filling. No soaking needed.",
    cookMethod:
      "Stovetop · Sauté onion + garlic in olive oil 3 min → add 1.5 cups lentils + 3 cups broth + cumin + salt → simmer covered 22 min. Cook Sunday.",
    cookTime: "22 min",
    weeklyUse: "Thu + Fri + Sat meals. Excellent base for bowl or side.",
    badge: "best",
  },
  {
    id: "jasmine-rice",
    name: "Jasmine Rice",
    category: "grain",
    keyNutrients:
      "Lighter and easier to digest. Lower fiber than brown but still a clean whole-food carb. Good post-workout option.",
    cookMethod: "Rice cooker · 20 min. Swap in any week you want something lighter.",
    cookTime: "20 min",
    weeklyUse: "Optional. Good for taco night or when you want a lighter side.",
    badge: "good",
  },
  {
    id: "pinto-beans",
    name: "Dried Pinto Beans (Refried)",
    category: "legume",
    keyNutrients:
      "High fiber + plant protein. Homemade version has zero additives. Freezes perfectly in portions.",
    cookMethod:
      "Soak overnight → simmer 1 hr with onion + garlic + cumin → mash. Make a large batch, freeze in portions — future weeks are zero effort.",
    cookTime: "1 hr",
    weeklyUse: "Saturday taco night. Freeze leftovers for future weeks.",
    badge: "make",
  },
  {
    id: "black-beans",
    name: "Canned Black Beans",
    category: "legume",
    keyNutrients: "Drain and rinse removes most sodium. Zero-effort backup side.",
    cookMethod: "Zero cook — drain, rinse, optionally warm with cumin + garlic powder.",
    cookTime: "0 min",
    weeklyUse: "Any day as a quick side. Good with brown rice on Tue.",
    badge: "good",
  },
  {
    id: "chickpeas",
    name: "Chickpeas",
    category: "legume",
    keyNutrients: "15g protein + 13g fiber per cup cooked. High in iron and folate.",
    cookMethod:
      "ROASTED (best early in week — crispy texture): Drain and rinse canned chickpeas. Pat completely dry with paper towel — critical for crispiness. Toss with 1 tbsp olive oil + 1 tsp smoked paprika + ½ tsp cumin + ½ tsp garlic powder + ½ tsp salt. Spread in single layer on foil-lined sheet pan. Roast at 425°F for 25–30 min, shake pan halfway. Cook Sunday alongside proteins. Keeps 2 days crispy, re-roast at 425°F for 5 min to partially restore crunch. Best as: salad topper, bowl addition, snack. · SAUTÉED WITH AROMATICS (best later in week — warm side): Drain and rinse canned chickpeas. Heat 1 tbsp olive oil in pan over medium heat. Sauté diced onion + 2 garlic cloves 3 min until soft. Add chickpeas + 1 tsp cumin + ½ tsp smoked paprika + splash of broth + salt. Cook 8–10 min until warmed through and slightly softened. Cook Sunday or fresh mid-week in 15 min. Keeps 5 days refrigerated. Best as: warm side alongside fish or chicken.",
    cookTime: "25–30 min (roasted) or 15 min (sautéed)",
    weeklyUse: "Roasted: Sunday prep, salad topper or snack. Sautéed: warm side any day.",
    badge: "best",
  },
];
