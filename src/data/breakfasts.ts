import type { Breakfast } from "@/types/meal.types";

export const breakfasts: Breakfast[] = [
  {
    id: "steel-cut-oats",
    name: "Steel Cut Oats",
    subtitle: "Savory style — egg, soy sauce, hot sauce",
    icon: "🥣",
    description: `Less processed and slower digesting than rolled oats.
      Lower glycemic index means sustained energy with no mid-morning crash.
      Top with a fried egg, low-sodium soy sauce, and hot sauce.`,
    batchRecipe: {
      ingredients: [
        { amount: "1", unit: "cup", name: "steel cut oats" },
        { amount: "3", unit: "cup", name: "water" },
        { amount: "1", unit: "pinch", name: "salt" },
      ],
      steps: [
        "Combine oats, water, and salt in a medium pot",
        "Bring to a boil over medium-high heat",
        "Reduce to low, cover, simmer 22–25 min",
        "Cool 10 min before lidding and refrigerating",
      ],
      makes: "~3 large servings",
      keeps: "5 days refrigerated",
      reheating: "90 sec microwave with a splash of water",
      alternativeMethod: "Slow cooker overnight — same ratio, low 6–8 hrs",
    },
    nutrients: {
      protein: "~5g per serving (+6g with egg)",
      fiber: "~4g",
      omega3s: "Minimal",
      antioxidants: "Low on their own",
      glycemicIndex: "Low",
      morningPrepTime: "90 sec reheat",
    },
    toppings: ["Fried egg", "Low-sodium soy sauce", "Hot sauce"],
  },
  {
    id: "chia-pudding",
    name: "Chia Seed Pudding",
    subtitle: "With raspberries, blueberries, and granola",
    icon: "🫙",
    description: `Make 5 jars Sunday night — grab one each morning with zero effort.
      Add fruit and granola fresh each morning, not ahead of time.`,
    batchRecipe: {
      ingredients: [
        { amount: "3", unit: "tbsp", name: "chia seeds (per jar)" },
        { amount: "¾", unit: "cup", name: "milk — dairy, almond, or oat (per jar)" },
        { amount: "1", unit: "tbsp", name: "honey or maple syrup (per jar)" },
      ],
      steps: [
        "Line up 5 mason jars",
        "Add 3 tbsp chia seeds to each jar",
        "Add ¾ cup milk to each jar",
        "Add a small drizzle of honey or maple syrup",
        "Stir each jar well — chia seeds clump if unstirred",
        "Lid and refrigerate overnight",
      ],
      makes: "5 jars (Mon–Fri)",
      keeps: "5 days refrigerated (without toppings)",
      reheating: "No reheating — serve cold",
      alternativeMethod: null,
    },
    nutrients: {
      protein: "~5g per jar",
      fiber: "~10g — exceptionally high",
      omega3s: "High — one of the best plant-based sources",
      antioxidants: "High — from raspberries and blueberries",
      glycemicIndex: "Low — chia gel slows digestion",
      morningPrepTime: "Zero — grab from fridge",
    },
    toppings: ["Fresh raspberries", "Fresh blueberries", "Low-sugar granola"],
    granolaNotes:
      "Look for under 8g sugar per serving. Or make your own: rolled oats + honey + nuts + pinch of salt, baked at 325°F for 20 min. Keeps 2 weeks in a jar.",
  },
];
