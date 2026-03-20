import type { Ingredient, Sauce } from "@/types/meal.types";

/**
 * Scale an ingredient quantity based on target protein weight and sauce scaling behavior
 */
export function scaleIngredient(
  ingredient: Ingredient,
  sauce: Sauce,
  targetLbs: number
): { amount: number; unit: string } {
  const multiplier = targetLbs / sauce.baseYieldLbs;

  let scaledAmount: number;

  switch (ingredient.scalingBehavior) {
    case "linear":
      scaledAmount = ingredient.amount * multiplier;
      break;

    case "fixed":
      scaledAmount = ingredient.amount;
      break;

    case "diminishing":
      const maxMultiplier = ingredient.maxMultiplier || 2.0;
      const cappedMultiplier = Math.min(multiplier, maxMultiplier);
      scaledAmount = ingredient.amount * cappedMultiplier;
      break;

    case "to-taste":
      scaledAmount = ingredient.amount;
      break;

    default:
      scaledAmount = ingredient.amount * multiplier;
  }

  return {
    amount: scaledAmount,
    unit: ingredient.unit,
  };
}

/**
 * Format a numeric amount as a fraction or mixed number for display
 */
export function formatAmount(amount: number, unit: string): string {
  // Handle to-taste specially
  if (unit === "to-taste") {
    return "to taste";
  }

  // Handle whole numbers
  if (Number.isInteger(amount)) {
    return amount.toString();
  }

  // Common fractions mapping
  const fractions: { [key: number]: string } = {
    0.125: "⅛",
    0.25: "¼",
    0.33: "⅓",
    0.333: "⅓",
    0.5: "½",
    0.66: "⅔",
    0.666: "⅔",
    0.67: "⅔",
    0.75: "¾",
  };

  // Check if it's close to a common fraction (within 0.01)
  for (const [decimal, fraction] of Object.entries(fractions)) {
    if (Math.abs(amount - parseFloat(decimal)) < 0.01) {
      return fraction;
    }
  }

  // Check for mixed numbers (e.g., 1.5 = 1½)
  const wholePart = Math.floor(amount);
  const fractionalPart = amount - wholePart;

  if (wholePart > 0 && fractionalPart > 0) {
    for (const [decimal, fraction] of Object.entries(fractions)) {
      if (Math.abs(fractionalPart - parseFloat(decimal)) < 0.01) {
        return `${wholePart}${fraction}`;
      }
    }
  }

  // If no fraction match, round to 1 decimal place
  return amount.toFixed(1);
}

/**
 * Format ingredient for display with scaled amount
 */
export function formatIngredient(
  ingredient: Ingredient,
  sauce: Sauce,
  targetLbs: number
): string {
  const scaled = scaleIngredient(ingredient, sauce, targetLbs);
  const formattedAmount = formatAmount(scaled.amount, scaled.unit);

  // Handle special cases
  if (scaled.unit === "to-taste") {
    return `${ingredient.name} (to taste)`;
  }

  if (scaled.unit === "piece") {
    const pieces = Math.round(scaled.amount);
    return `${pieces} ${ingredient.name}`;
  }

  if (scaled.unit === "clove") {
    const cloves = Math.round(scaled.amount);
    return `${cloves} ${scaled.unit}${cloves > 1 ? "s" : ""} ${ingredient.name}`;
  }

  if (scaled.unit === "pinch") {
    return `${formattedAmount} ${scaled.unit} ${ingredient.name}`;
  }

  return `${formattedAmount} ${scaled.unit} ${ingredient.name}`;
}

/**
 * Get all ingredients for a sauce scaled to target weight
 */
export function getScaledIngredients(
  sauce: Sauce,
  targetLbs: number
): Array<{ formatted: string; ingredient: Ingredient; scaled: { amount: number; unit: string } }> {
  return sauce.ingredients.map((ingredient) => {
    const scaled = scaleIngredient(ingredient, sauce, targetLbs);
    const formatted = formatIngredient(ingredient, sauce, targetLbs);
    return { formatted, ingredient, scaled };
  });
}
