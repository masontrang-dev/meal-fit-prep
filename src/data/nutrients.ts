import type { NutrientRow } from '@/types/meal.types'

export const nutrientStatus: NutrientRow[] = [
  {
    nutrient: 'Protein',
    status: 'good',
    statusLabel: 'Excellent',
    sources: 'Fish, chicken, steak, lentils, quinoa',
    notes: '~120–150g daily from varied sources'
  },
  {
    nutrient: 'Omega-3 Fatty Acids',
    status: 'good',
    statusLabel: 'Strong',
    sources: 'Salmon (2× weekly)',
    notes: 'EPA/DHA from fish, consider flax or chia for ALA'
  },
  {
    nutrient: 'Fiber',
    status: 'good',
    statusLabel: 'Good',
    sources: 'Brown rice, quinoa, lentils, broccoli',
    notes: '25–30g daily target, well-covered by grains + veg'
  },
  {
    nutrient: 'Iron',
    status: 'good',
    statusLabel: 'Adequate',
    sources: 'Steak, lentils, quinoa, chicken thighs',
    notes: 'Heme iron from meat, non-heme from legumes'
  },
  {
    nutrient: 'Vitamin D',
    status: 'watch',
    statusLabel: 'Monitor',
    sources: 'Salmon, fortified foods',
    notes: 'Consider supplement if limited sun exposure'
  },
  {
    nutrient: 'Calcium',
    status: 'watch',
    statusLabel: 'Low-Moderate',
    sources: 'Broccoli, lentils, fortified foods',
    notes: 'Add Greek yogurt or fortified almond milk if needed'
  },
  {
    nutrient: 'Vitamin B12',
    status: 'good',
    statusLabel: 'Excellent',
    sources: 'Fish, chicken, steak',
    notes: 'Animal proteins provide ample B12'
  },
  {
    nutrient: 'Magnesium',
    status: 'good',
    statusLabel: 'Good',
    sources: 'Quinoa, lentils, brown rice, broccoli',
    notes: '~300–400mg daily from whole grains + legumes'
  },
  {
    nutrient: 'Potassium',
    status: 'watch',
    statusLabel: 'PKD Concern',
    sources: 'Lentils, potatoes, bananas',
    notes: 'Limit high-K foods if PKD stage 3+. Consult nephrologist.'
  },
  {
    nutrient: 'Sodium',
    status: 'good',
    statusLabel: 'Controlled',
    sources: 'Low-sodium soy sauce, minimal added salt',
    notes: 'DASH-friendly: <2,300mg daily, ideally <1,500mg'
  },
  {
    nutrient: 'Folate',
    status: 'good',
    statusLabel: 'Strong',
    sources: 'Lentils, broccoli, quinoa',
    notes: 'Legumes and greens provide excellent folate'
  },
  {
    nutrient: 'Zinc',
    status: 'good',
    statusLabel: 'Adequate',
    sources: 'Steak, chicken, lentils',
    notes: 'Animal proteins are primary zinc source'
  }
]
