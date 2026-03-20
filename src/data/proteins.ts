import type { Protein } from '@/types/meal.types'

export const proteins: Protein[] = [
  {
    id: 'fish',
    name: 'Fish (Salmon or Cod)',
    icon: '🐟',
    mealsPerWeek: '2 meals',
    weeklyQuantity: '1.5 lbs',
    buyGuidance: 'Fresh or frozen fillets, skin-on or skinless',
    cookMethod: 'Bake at 400°F for 12–15 min, or pan-sear 4 min per side',
    storageNote: 'Use within 2 days if fresh, or freeze immediately',
    stats: [
      'High in omega-3 fatty acids',
      'Excellent source of vitamin D',
      'Low mercury options preferred'
    ]
  },
  {
    id: 'chicken-thigh',
    name: 'Chicken Thighs',
    icon: '🍗',
    mealsPerWeek: '2 meals',
    weeklyQuantity: '2 lbs boneless, skinless',
    buyGuidance: 'Boneless, skinless thighs — more forgiving than breast',
    cookMethod: 'Bake at 425°F for 22–25 min, or pan-sear 6 min per side',
    storageNote: 'Refrigerate up to 2 days raw, or freeze',
    stats: [
      'Higher fat content = more flavor',
      'Less likely to dry out',
      'Great for marinades'
    ]
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    icon: '🐔',
    mealsPerWeek: '1 meal',
    weeklyQuantity: '1 lb boneless, skinless',
    buyGuidance: 'Boneless, skinless breasts — pound to even thickness',
    cookMethod: 'Bake at 400°F for 18–20 min, or pan-sear 5 min per side',
    storageNote: 'Refrigerate up to 2 days raw, or freeze',
    stats: [
      'Leanest protein option',
      'Lower calorie than thighs',
      'Requires careful timing to avoid dryness'
    ]
  },
  {
    id: 'steak',
    name: 'Steak (Sirloin or Flank)',
    icon: '🥩',
    mealsPerWeek: '1 meal (Wednesday cast iron)',
    weeklyQuantity: '1–1.25 lbs',
    buyGuidance: 'Sirloin or flank steak, 1-inch thick',
    cookMethod: 'Cast iron only: 3–4 min per side for medium-rare',
    storageNote: 'Refrigerate up to 3 days raw, slice against the grain',
    stats: [
      'High in iron and B12',
      'Best with cast iron for crust',
      'Always Wednesday dinner'
    ]
  }
]
