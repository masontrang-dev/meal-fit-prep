import type { Marinade } from "@/types/meal.types";

export const marinades: Marinade[] = [
  {
    id: "soy-garlic-ginger",
    name: "Soy-Garlic-Ginger",
    bestFor: "Chicken thighs, salmon",
    timing: "sunday",
    ingredients: [
      { amount: "3", unit: "tbsp", name: "low-sodium soy sauce" },
      { amount: "2", unit: "tbsp", name: "rice vinegar" },
      { amount: "1", unit: "tbsp", name: "sesame oil" },
      { amount: "3", unit: "clove", name: "garlic, minced" },
      { amount: "1", unit: "tbsp", name: "fresh ginger, grated" },
      { amount: "1", unit: "tsp", name: "honey" },
    ],
    note: "Marinate Sunday night for Monday/Tuesday meals. Works beautifully with both chicken and fish.",
  },
  {
    id: "smoked-paprika-garlic",
    name: "Smoked Paprika & Garlic",
    bestFor: "Chicken thighs, chicken breast",
    timing: "sunday",
    ingredients: [
      { amount: "2", unit: "tbsp", name: "olive oil" },
      { amount: "1", unit: "tbsp", name: "smoked paprika" },
      { amount: "4", unit: "clove", name: "garlic, minced" },
      { amount: "1", unit: "tsp", name: "cumin" },
      { amount: "½", unit: "tsp", name: "black pepper" },
      { amount: "¼", unit: "tsp", name: "cayenne (optional)" },
    ],
    note: "Bold, smoky flavor. Sunday marinade for early-week chicken meals.",
  },
  {
    id: "lime-cumin",
    name: "Lime-Cumin",
    bestFor: "Chicken breast, fish",
    timing: "tuesday",
    ingredients: [
      { amount: "3", unit: "tbsp", name: "lime juice (2 limes)" },
      { amount: "2", unit: "tbsp", name: "olive oil" },
      { amount: "1", unit: "tbsp", name: "ground cumin" },
      { amount: "3", unit: "clove", name: "garlic, minced" },
      { amount: "1", unit: "tsp", name: "chili powder" },
      { amount: "½", unit: "tsp", name: "salt" },
    ],
    note: "Bright, zesty marinade. Prep Tuesday night for Wednesday/Thursday meals.",
  },
  {
    id: "balsamic-herb",
    name: "Balsamic-Herb",
    bestFor: "Chicken thighs, steak",
    timing: "tuesday",
    ingredients: [
      { amount: "3", unit: "tbsp", name: "balsamic vinegar" },
      { amount: "2", unit: "tbsp", name: "olive oil" },
      { amount: "2", unit: "tsp", name: "Dijon mustard" },
      { amount: "3", unit: "clove", name: "garlic, minced" },
      { amount: "1", unit: "tbsp", name: "fresh rosemary, chopped" },
      { amount: "1", unit: "tsp", name: "dried thyme" },
    ],
    note: "Rich, savory marinade. Tuesday prep for mid-week proteins.",
  },
];
