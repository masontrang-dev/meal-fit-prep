import type { NutrientRow } from "@/types/meal.types";

export const nutrientStatus: NutrientRow[] = [
  {
    nutrient: "Protein",
    status: "good",
    statusLabel: "Well covered",
    sources: "Fish, chicken, steak, lentils, quinoa",
    notes:
      "~100–130g/day from this plan. Discuss total protein target with nephrologist — PKD may warrant a more moderate level depending on your stage.",
  },
  {
    nutrient: "Omega-3s",
    status: "good",
    statusLabel: "Well covered",
    sources: "Salmon 3–4×/week",
    notes:
      "Actively reduces exercise-related inflammation and supports recovery between workouts. One of the most evidence-backed nutritional supports for your training level.",
  },
  {
    nutrient: "Fiber",
    status: "good",
    statusLabel: "Well covered",
    sources: "Lentils, brown rice, quinoa, broccoli, beans",
    notes:
      "25–35g/day target well met. Supports gut health, satiety, and blood sugar regulation — important for sustained energy during training.",
  },
  {
    nutrient: "Iron",
    status: "good",
    statusLabel: "Well covered",
    sources: "Steak 2×/week, lentils, quinoa",
    notes:
      "Heme iron from steak absorbs most efficiently. Non-heme iron from lentils + quinoa absorbs better when eaten alongside vitamin C — bell peppers and lemon juice in this plan help.",
  },
  {
    nutrient: "Magnesium",
    status: "good",
    statusLabel: "Good",
    sources: "Brown rice, lentils, salmon, quinoa",
    notes:
      "Important for muscle function, sleep quality, and energy production. Exercise increases magnesium needs — this plan covers it well.",
  },
  {
    nutrient: "Zinc",
    status: "good",
    statusLabel: "Good",
    sources: "Steak, chicken, lentils",
    notes: "Supports immune function and recovery. Well covered by 1–2 steak meals per week.",
  },
  {
    nutrient: "B Vitamins",
    status: "good",
    statusLabel: "Well covered",
    sources: "All animal proteins, lentils, quinoa",
    notes: "B12 (animal proteins only — well covered). B6 and folate from lentils and quinoa.",
  },
  {
    nutrient: "Vitamin D",
    status: "watch",
    statusLabel: "Worth monitoring",
    sources: "Salmon provides some",
    notes:
      "Most people are deficient. Salmon helps but likely not sufficient alone. Consider Vitamin D3 supplement (1,000–2,000 IU/day) — discuss with your doctor, especially relevant for PKD.",
  },
  {
    nutrient: "Potassium",
    status: "watch",
    statusLabel: "PKD: Discuss with doctor",
    sources: "Salmon, lentils, sweet potato, quinoa",
    notes:
      "These are moderate-to-high potassium foods. Depending on your GFR and labs, your nephrologist may advise limiting specific items.",
  },
  {
    nutrient: "Phosphorus",
    status: "watch",
    statusLabel: "PKD: Discuss with doctor",
    sources: "Fish, chicken, lentils",
    notes:
      "High-protein diets tend to be high in phosphorus. Monitor if your labs indicate elevated levels.",
  },
  {
    nutrient: "Sodium",
    status: "watch",
    statusLabel: "Actively manage",
    sources: "Soy sauce, seasoning blends",
    notes:
      "Use low-sodium soy sauce throughout. Season with herbs and citrus rather than extra salt. DASH target: under 1,500–2,300mg/day total.",
  },
  {
    nutrient: "Antioxidants",
    status: "low",
    statusLabel: "Improve with variety",
    sources: "Broccoli, bell peppers",
    notes:
      "Rotating vegetables week to week (see vegetable rotation in Proteins tab) significantly improves micronutrient diversity at no extra cost or effort.",
  },
];
