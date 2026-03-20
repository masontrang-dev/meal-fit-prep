import type { StorageRow } from '@/types/meal.types'

export const storageGuide: StorageRow[] = [
  {
    food: 'Cooked Fish',
    icon: '🐟',
    window: '3 days',
    notes: 'Reheat gently at 275°F for 10 min, or microwave 60 sec. Do not overheat.'
  },
  {
    food: 'Cooked Chicken',
    icon: '🍗',
    window: '4 days',
    notes: 'Reheat at 350°F for 12 min, or microwave 90 sec. Add splash of water to prevent drying.'
  },
  {
    food: 'Cooked Steak',
    icon: '🥩',
    window: '4 days',
    notes: 'Reheat at 250°F for 8 min, or microwave 45 sec. Slice before reheating for even warming.'
  },
  {
    food: 'Brown Rice',
    icon: '🍚',
    window: '5 days',
    notes: 'Microwave 90 sec with damp paper towel. Fluff with fork. Freezes well for 3 months.'
  },
  {
    food: 'Quinoa',
    icon: '🌾',
    window: '5 days',
    notes: 'Microwave 60–90 sec. Add 1 tsp water if dry. Freezes well.'
  },
  {
    food: 'Lentils',
    icon: '🫘',
    window: '5 days',
    notes: 'Microwave 90 sec. May need splash of water or broth. Freezes well.'
  },
  {
    food: 'Cooked Vegetables',
    icon: '🥦',
    window: '4 days',
    notes: 'Reheat at 400°F for 5–7 min to re-crisp, or microwave 60 sec. Best fresh.'
  },
  {
    food: 'Marinades (unused)',
    icon: '🧂',
    window: '1 week',
    notes: 'Store in sealed container. Do not reuse marinade that touched raw meat.'
  },
  {
    food: 'Sauces (yogurt-based)',
    icon: '🥫',
    window: '3 days',
    notes: 'Lemon-dill, ranch-based sauces. Do not freeze. Make fresh or in small batches.'
  },
  {
    food: 'Sauces (oil-based)',
    icon: '🫙',
    window: '1–2 weeks',
    notes: 'Chimichurri, garlic butter. Very stable. Bring to room temp before serving.'
  }
]
