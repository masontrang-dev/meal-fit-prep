import type { Vegetable } from '@/types/meal.types'

export const vegetables: Vegetable[] = [
  {
    name: 'Broccoli',
    tag: 'default',
    prepNote: 'Cut into florets, stems optional',
    cookNote: 'Roast at 425°F for 18–22 min, or steam 5–7 min'
  },
  {
    name: 'Cauliflower',
    tag: 'swap',
    prepNote: 'Cut into florets',
    cookNote: 'Roast at 425°F for 25–30 min until golden'
  },
  {
    name: 'Green Beans',
    tag: 'swap',
    prepNote: 'Trim ends',
    cookNote: 'Roast at 425°F for 15–18 min, or sauté 8 min'
  },
  {
    name: 'Brussels Sprouts',
    tag: 'swap',
    prepNote: 'Halve, remove outer leaves',
    cookNote: 'Roast at 425°F for 20–25 min, cut side down'
  },
  {
    name: 'Asparagus',
    tag: 'swap',
    prepNote: 'Snap off woody ends',
    cookNote: 'Roast at 425°F for 12–15 min, or grill 5 min'
  },
  {
    name: 'Zucchini',
    tag: 'swap',
    prepNote: 'Slice into rounds or half-moons',
    cookNote: 'Roast at 425°F for 15–18 min, or sauté 6 min'
  },
  {
    name: 'Bell Peppers',
    tag: 'swap',
    prepNote: 'Slice into strips, remove seeds',
    cookNote: 'Roast at 425°F for 20 min, or sauté 8 min'
  },
  {
    name: 'Carrots',
    tag: 'wildcard',
    prepNote: 'Peel and slice into coins or sticks',
    cookNote: 'Roast at 425°F for 25–30 min'
  }
]
