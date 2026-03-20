export interface CookConfig {
  tempF: number | null; // null = stovetop or cast iron — no oven temp
  durationMin: number; // minutes
  durationMax: number; // minutes
}

export const standardCookConfig: Record<string, CookConfig> = {
  fish: { tempF: 400, durationMin: 12, durationMax: 15 },
  "chicken-thighs": { tempF: 375, durationMin: 35, durationMax: 40 },
  "chicken-breast": { tempF: 375, durationMin: 25, durationMax: 30 },
  broccoli: { tempF: 425, durationMin: 18, durationMax: 18 },
  "roasting-veg": { tempF: 400, durationMin: 15, durationMax: 22 },
  "cast-iron-steak": { tempF: null, durationMin: 3, durationMax: 4 }, // high heat, per side
  "cast-iron-shrimp": { tempF: null, durationMin: 2, durationMax: 3 }, // high heat, per side
  "cast-iron-chicken": { tempF: null, durationMin: 4, durationMax: 5 }, // high heat, per side
  lentils: { tempF: null, durationMin: 22, durationMax: 22 }, // stovetop
  "brown-rice": { tempF: null, durationMin: 45, durationMax: 50 }, // rice cooker
  quinoa: { tempF: null, durationMin: 15, durationMax: 18 }, // rice cooker or stovetop
  "jasmine-rice": { tempF: null, durationMin: 20, durationMax: 20 }, // rice cooker
};
