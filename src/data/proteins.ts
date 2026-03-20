import type { Protein } from "@/types/meal.types";

export const proteins: Protein[] = [
  {
    id: "fish",
    name: "Fish",
    icon: "🐟",
    mealsPerWeek: "4–5 meals · 2 people",
    weeklyQuantity: "~3–3.5 lbs/week",
    buyGuidance:
      "Frozen salmon fillets, tilapia, cod, or mahi-mahi. Individually vacuum-sealed — thaw overnight in fridge. No scaling, no deboning on standard fillets. Costco frozen salmon bag is best value. Trader Joe's individual fillets are convenient.\n\n**Eat earlier in the week** — cooked fish keeps only 3–4 days. Mon–Wed lunches and dinners are ideal.",
    cookMethod:
      "Pat dry, season (see Sauces tab), bake at 400°F for 12–15 min on foil-lined sheet pan. Don't crowd the pan.\n\n**Never reheated on high heat** — 50% microwave power, 90 sec. Or oven at 275°F covered with foil for 10 min.",
    storageNote: "Cooked fish keeps only 3–4 days. Eat Mon–Wed.",
    stats: ["~30g protein / 6oz", "Omega-3s"],
  },
  {
    id: "chicken-thigh",
    name: "Thighs",
    icon: "🍗",
    mealsPerWeek: "Best for Sunday batch",
    weeklyQuantity: "~2–2.5 lbs",
    buyGuidance:
      "**Why thighs for prep:** Higher fat content keeps them moist when reheated. Much harder to overcook than breast. Flavor holds better through day 4–5 in the fridge.\n\n**Amount:** ~2–2.5 lbs for Sunday batch. Reserve ~1 lb separately for Wednesday's cast iron marinade.",
    cookMethod:
      "**Cooking:** 375°F for 35–40 min. Season well and they're nearly impossible to ruin.",
    storageNote: "Keeps 4–5 days refrigerated. Most forgiving protein.",
    stats: ["~30g protein / 4oz", "Most forgiving"],
  },
  {
    id: "chicken-breast",
    name: "Breast",
    icon: "🍗",
    mealsPerWeek: "Best for cast iron or fresh cook",
    weeklyQuantity: "~1 lb",
    buyGuidance:
      "**Why breast for cast iron:** Leaner (better for weight loss goals), great when eaten fresh off the pan — no reheating dryness issue.\n\n**Prep tips if batch cooking:** Pound to even thickness before baking. Pull at exactly 165°F. Store with a little sauce in the container. Reheat at 50% microwave power only.\n\n**Optional:** One rotisserie chicken (~$7–8) = 4–5 shredded portions instantly for Mon–Tue lunches.",
    cookMethod: "Bake at 400°F for 18–20 min, or cast iron 5 min per side.",
    storageNote: "Best eaten fresh. If batch cooking, reheat at 50% power only.",
    stats: ["~35g protein / 4oz", "Leanest option"],
  },
  {
    id: "steak",
    name: "Steak — Always Cast Iron, Never Oven",
    icon: "🥩",
    mealsPerWeek: "2–3 meals · 2 people",
    weeklyQuantity: "1.5–2 lbs/week",
    buyGuidance:
      "Flank or sirloin — leaner cuts, excellent sliced thin over bowls. One 1.5–2 lb flank steak = 4–6 portions for two.\n\n**Why always cast iron:** The high dry heat of a cast iron creates the Maillard reaction crust that makes steak taste like steak. An oven can't replicate this on a thin cut. Flank and sirloin are ideal for the cast iron method.",
    cookMethod:
      "**Strategy:** Marinate Sunday (use a Sunday-safe marinade — see Cast Iron tab) and cook Wednesday for peak freshness and flavor. Leftovers serve as Thursday lunch.\n\n**Cook to medium** — not well done. A proper sear is fine; heavily blackened/charred is what to avoid. Rest 5 min before slicing.",
    storageNote: "Marinate Sunday, cook Wednesday. Leftovers = Thursday lunch.",
    stats: ["~32g protein / 4oz", "Iron + zinc"],
  },
];
