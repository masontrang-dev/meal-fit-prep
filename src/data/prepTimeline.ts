import type { PrepStep } from '@/types/meal.types'

export const sundayPrepSteps: PrepStep[] = [
  {
    id: 'step-1',
    elapsedMin: 0,
    duration: '15 min',
    title: 'Prep Proteins',
    body: 'Remove all proteins from packaging. Pat dry with paper towels. **Portion fish** into 2 servings. **Trim chicken** if needed. Season steak lightly with salt and pepper, set aside for cast iron prep.',
    dotColor: 'var(--blue)'
  },
  {
    id: 'step-2',
    elapsedMin: 15,
    duration: '10 min',
    title: 'Marinade Prep',
    body: 'Choose **one Sunday marinade** (soy-garlic-ginger or smoked paprika). Mix ingredients in a bowl. Place chicken thighs in a zip-top bag or container, pour marinade over, massage to coat. Refrigerate.',
    dotColor: 'var(--orange)'
  },
  {
    id: 'step-3',
    elapsedMin: 25,
    duration: '20 min',
    title: 'Cook Grains & Legumes',
    body: 'Start **brown rice** (2 cups dry, 4 cups water, 45 min). While rice cooks, rinse and cook **quinoa** (1 cup dry, 2 cups water, 20 min). Cook **lentils** (1 cup dry, 3 cups water, 25 min). All can simmer simultaneously.',
    dotColor: 'var(--green)'
  },
  {
    id: 'step-4',
    elapsedMin: 45,
    duration: '15 min',
    title: 'Prep Vegetables',
    body: 'Wash and cut **broccoli** (or your chosen vegetable) into florets. Store in container with damp paper towel. Prep any additional vegetables for the week. Slice bell peppers, trim green beans, etc.',
    dotColor: 'var(--green)'
  },
  {
    id: 'step-5',
    elapsedMin: 60,
    duration: '10 min',
    title: 'Portion & Store',
    body: 'Divide cooked grains and legumes into **6 containers** (lunch + dinner portions). Let cool slightly before sealing. Label containers with day and grain type. Stack in fridge.',
    dotColor: 'var(--gold)'
  },
  {
    id: 'step-6',
    elapsedMin: 70,
    duration: '5 min',
    title: 'Cast Iron Setup',
    body: 'Place **cast iron skillet** on stovetop. Add thin layer of oil. Heat on medium for 2 minutes, wipe out excess. This pre-seasons the pan for Wednesday\'s steak. Store covered until Wednesday.',
    dotColor: 'var(--cast)'
  }
]
