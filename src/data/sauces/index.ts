import type { Sauce } from "@/types/meal.types";
import { fishSauces } from "./fish";
import { chickenSauces } from "./chicken";
import { castIronSauces } from "./cast-iron";
import { shrimpSauces } from "./shrimp";

// Note: soy-garlic-ginger and lime-cumin are shared between cast-iron and shrimp sections
// They appear in castIronSauces with dualUse field set
// The shrimp section references these same sauce objects

export const allSauces: Sauce[] = [
  ...fishSauces,
  ...chickenSauces,
  ...castIronSauces,
  ...shrimpSauces,
];

// Section-specific exports
export { fishSauces, chickenSauces, castIronSauces, shrimpSauces };

// Helper to get sauces by section
export function getSaucesBySection(section: 'fish' | 'chicken' | 'cast-iron' | 'shrimp'): Sauce[] {
  return allSauces.filter(sauce => sauce.section === section);
}

// Helper to get sauce by ID
export function getSauceById(id: string): Sauce | undefined {
  return allSauces.find(sauce => sauce.id === id);
}
