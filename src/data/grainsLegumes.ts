import type { GrainOrLegume } from '@/types/meal.types'

export const grainsAndLegumes: GrainOrLegume[] = [
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    category: 'grain',
    keyNutrients: 'Fiber, manganese, selenium',
    cookMethod: '2:1 water ratio, simmer 45 min',
    cookTime: '45 min',
    weeklyUse: '2–3 meals',
    badge: 'best'
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'grain',
    rinseWarning: true,
    keyNutrients: 'Complete protein, iron, magnesium',
    cookMethod: '2:1 water ratio, simmer 15 min, rest 5 min',
    cookTime: '20 min',
    weeklyUse: '2 meals',
    badge: 'best'
  },
  {
    id: 'jasmine-rice',
    name: 'Jasmine Rice (White)',
    category: 'grain',
    keyNutrients: 'Quick energy, low fiber',
    cookMethod: '1.5:1 water ratio, simmer 15 min',
    cookTime: '15 min',
    weeklyUse: '1 meal',
    badge: 'good'
  },
  {
    id: 'lentils',
    name: 'Lentils (Green or Brown)',
    category: 'legume',
    keyNutrients: 'Protein, fiber, folate, iron',
    cookMethod: '3:1 water ratio, simmer 20–25 min',
    cookTime: '25 min',
    weeklyUse: '1–2 meals',
    badge: 'best'
  },
  {
    id: 'pinto-beans',
    name: 'Pinto Beans',
    category: 'legume',
    keyNutrients: 'Protein, fiber, potassium',
    cookMethod: 'Canned (rinse) or dry (soak overnight, cook 90 min)',
    cookTime: '5 min (canned)',
    weeklyUse: '1 meal',
    badge: 'good'
  },
  {
    id: 'black-beans',
    name: 'Black Beans',
    category: 'legume',
    keyNutrients: 'Protein, fiber, antioxidants',
    cookMethod: 'Canned (rinse) or dry (soak overnight, cook 90 min)',
    cookTime: '5 min (canned)',
    weeklyUse: '1 meal',
    badge: 'good'
  }
]
