import type { Sauce } from '@/types/meal.types'

export const sauces: Sauce[] = [
  {
    id: 'lemon-dill',
    name: 'Lemon-Dill Sauce',
    bestFor: 'Salmon, cod',
    proteinCategory: 'fish',
    ingredients: [
      { amount: '3 tbsp', name: 'Greek yogurt' },
      { amount: '1 tbsp', name: 'lemon juice' },
      { amount: '1 tbsp', name: 'fresh dill, chopped' },
      { amount: '1 clove', name: 'garlic, minced' },
      { amount: '¼ tsp', name: 'salt' }
    ],
    storage: {
      locations: ['fridge'],
      batchable: false,
      shelfLife: '3 days',
      note: 'Make fresh, yogurt-based'
    },
    applicationNote: 'Drizzle over cooked fish just before serving'
  },
  {
    id: 'mango-salsa',
    name: 'Mango Salsa',
    bestFor: 'White fish, salmon',
    proteinCategory: 'fish',
    ingredients: [
      { amount: '1 cup', name: 'mango, diced' },
      { amount: '¼ cup', name: 'red onion, minced' },
      { amount: '2 tbsp', name: 'cilantro, chopped' },
      { amount: '1 tbsp', name: 'lime juice' },
      { amount: '1', name: 'jalapeño, minced (optional)' }
    ],
    storage: {
      locations: ['fridge'],
      batchable: false,
      shelfLife: '2 days',
      note: 'Best fresh, fruit oxidizes'
    },
    applicationNote: 'Spoon over fish after plating'
  },
  {
    id: 'garlic-butter',
    name: 'Garlic Butter',
    bestFor: 'Any fish',
    proteinCategory: 'fish',
    ingredients: [
      { amount: '3 tbsp', name: 'butter' },
      { amount: '3 cloves', name: 'garlic, minced' },
      { amount: '1 tbsp', name: 'parsley, chopped' },
      { amount: '1 tsp', name: 'lemon zest' }
    ],
    storage: {
      locations: ['fridge', 'pantry'],
      batchable: true,
      shelfLife: '1 week (fridge)',
      note: 'Can make compound butter log'
    },
    applicationNote: 'Melt over hot fish or add to pan while cooking'
  },
  {
    id: 'honey-mustard',
    name: 'Honey-Mustard Glaze',
    bestFor: 'Chicken thighs, chicken breast',
    proteinCategory: 'chicken',
    ingredients: [
      { amount: '2 tbsp', name: 'Dijon mustard' },
      { amount: '2 tbsp', name: 'honey' },
      { amount: '1 tbsp', name: 'olive oil' },
      { amount: '1 tsp', name: 'apple cider vinegar' },
      { amount: '¼ tsp', name: 'black pepper' }
    ],
    storage: {
      locations: ['fridge', 'pantry'],
      batchable: true,
      shelfLife: '2 weeks',
      note: 'Stable ingredients'
    },
    applicationNote: 'Brush on during last 5 min of cooking'
  },
  {
    id: 'peanut-sauce',
    name: 'Peanut Sauce',
    bestFor: 'Chicken thighs',
    proteinCategory: 'chicken',
    ingredients: [
      { amount: '3 tbsp', name: 'peanut butter' },
      { amount: '2 tbsp', name: 'soy sauce' },
      { amount: '1 tbsp', name: 'lime juice' },
      { amount: '1 tbsp', name: 'honey' },
      { amount: '1 tsp', name: 'sesame oil' },
      { amount: '1 clove', name: 'garlic, minced' },
      { amount: '2 tbsp', name: 'water (to thin)' }
    ],
    storage: {
      locations: ['fridge'],
      batchable: true,
      shelfLife: '5 days',
      note: 'Thickens when cold, add water to reheat'
    },
    applicationNote: 'Drizzle over chicken or serve on the side'
  },
  {
    id: 'buffalo-ranch',
    name: 'Buffalo-Ranch',
    bestFor: 'Chicken breast, chicken thighs',
    proteinCategory: 'chicken',
    ingredients: [
      { amount: '3 tbsp', name: 'hot sauce (Frank\'s)' },
      { amount: '2 tbsp', name: 'ranch dressing' },
      { amount: '1 tbsp', name: 'butter, melted' }
    ],
    storage: {
      locations: ['fridge'],
      batchable: false,
      shelfLife: '3 days',
      note: 'Dairy-based, use quickly'
    },
    applicationNote: 'Toss chicken in sauce after cooking'
  },
  {
    id: 'chimichurri',
    name: 'Chimichurri',
    bestFor: 'Steak (sirloin, flank)',
    proteinCategory: 'steak',
    ingredients: [
      { amount: '1 cup', name: 'parsley, chopped' },
      { amount: '¼ cup', name: 'olive oil' },
      { amount: '3 tbsp', name: 'red wine vinegar' },
      { amount: '4 cloves', name: 'garlic, minced' },
      { amount: '1 tsp', name: 'red pepper flakes' },
      { amount: '½ tsp', name: 'salt' }
    ],
    storage: {
      locations: ['fridge'],
      batchable: true,
      shelfLife: '1 week',
      note: 'Oil-based, very stable'
    },
    applicationNote: 'Spoon over sliced steak just before serving'
  },
  {
    id: 'red-wine-reduction',
    name: 'Red Wine Reduction',
    bestFor: 'Steak',
    proteinCategory: 'steak',
    ingredients: [
      { amount: '½ cup', name: 'red wine' },
      { amount: '2 tbsp', name: 'balsamic vinegar' },
      { amount: '1 tbsp', name: 'butter' },
      { amount: '1 tsp', name: 'fresh thyme' },
      { amount: '1', name: 'shallot, minced' }
    ],
    storage: {
      locations: ['fridge'],
      batchable: false,
      shelfLife: '3 days',
      note: 'Best made fresh'
    },
    applicationNote: 'Simmer until reduced by half, drizzle over steak'
  },
  {
    id: 'garlic-herb-butter',
    name: 'Garlic-Herb Butter',
    bestFor: 'Steak',
    proteinCategory: 'steak',
    ingredients: [
      { amount: '4 tbsp', name: 'butter, softened' },
      { amount: '3 cloves', name: 'garlic, minced' },
      { amount: '1 tbsp', name: 'parsley, chopped' },
      { amount: '1 tsp', name: 'rosemary, chopped' },
      { amount: '¼ tsp', name: 'black pepper' }
    ],
    storage: {
      locations: ['fridge', 'pantry'],
      batchable: true,
      shelfLife: '2 weeks (fridge)',
      note: 'Roll into log, slice as needed'
    },
    applicationNote: 'Place pat on hot steak, let melt'
  }
]
