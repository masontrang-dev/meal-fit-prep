import type { MealPlanDay } from '@/types/meal.types'

export const weeklyMealPlan: MealPlanDay[] = [
  {
    day: 'Monday',
    lunch: {
      proteinType: 'fish',
      label: 'Salmon',
      detail: 'Baked with lemon-dill sauce'
    },
    dinner: {
      proteinType: 'chicken-thigh',
      label: 'Chicken Thighs',
      detail: 'Soy-garlic-ginger marinade'
    },
    grain: 'Brown Rice'
  },
  {
    day: 'Tuesday',
    lunch: {
      proteinType: 'chicken-thigh',
      label: 'Chicken Thighs',
      detail: 'Smoked paprika marinade'
    },
    dinner: {
      proteinType: 'fish',
      label: 'Cod',
      detail: 'Pan-seared with mango salsa'
    },
    grain: 'Quinoa'
  },
  {
    day: 'Wednesday',
    lunch: {
      proteinType: 'chicken-breast',
      label: 'Chicken Breast',
      detail: 'Lime-cumin marinade'
    },
    dinner: {
      proteinType: 'cast-iron',
      label: 'Steak',
      detail: 'Cast iron seared, chimichurri'
    },
    grain: 'Lentils'
  },
  {
    day: 'Thursday',
    dayNote: 'Use leftover steak from Wednesday',
    lunch: {
      proteinType: 'steak',
      label: 'Steak',
      detail: 'Sliced over greens'
    },
    dinner: {
      proteinType: 'chicken-thigh',
      label: 'Chicken Thighs',
      detail: 'Balsamic-herb marinade'
    },
    grain: 'Brown Rice'
  },
  {
    day: 'Friday',
    lunch: {
      proteinType: 'chicken-breast',
      label: 'Chicken Breast',
      detail: 'Honey-mustard glaze'
    },
    dinner: {
      proteinType: 'flex',
      label: 'Flex Meal',
      detail: 'Leftovers or emergency meal'
    },
    grain: 'Jasmine Rice'
  },
  {
    day: 'Saturday',
    dayNote: 'Taco night or dining out',
    lunch: {
      proteinType: 'flex',
      label: 'Flex Meal',
      detail: 'Leftovers or light meal'
    },
    dinner: {
      proteinType: 'flex',
      label: 'Tacos or Out',
      detail: 'Ground turkey tacos or restaurant'
    },
    grain: 'Black Beans'
  }
]
