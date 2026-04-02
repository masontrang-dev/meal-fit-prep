import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/overview',
    },
    {
      path: '/overview',
      name: 'overview',
      component: () =>
        import(
          /* webpackChunkName: "overview" */
          '../views/meal/OverviewView.vue'
        ),
    },
    {
      path: '/meal/breakfasts',
      name: 'breakfasts',
      component: () =>
        import(
          /* webpackChunkName: "breakfasts" */
          '../views/meal/BreakfastsView.vue'
        ),
    },
    {
      path: '/meal/shopping',
      name: 'shopping-list',
      component: () =>
        import(
          /* webpackChunkName: "shopping" */
          '../views/meal/ShoppingListView.vue'
        ),
    },
    {
      path: '/meal/prep',
      name: 'prep-day',
      component: () =>
        import(
          /* webpackChunkName: "prep" */
          '../views/meal/PrepDayView.vue'
        ),
    },
    {
      path: '/meal/plan',
      name: 'meal-plan',
      component: () =>
        import(
          /* webpackChunkName: "plan" */
          '../views/meal/MealPlanView.vue'
        ),
    },
    {
      path: '/meal/fridge',
      name: 'fridge',
      component: () =>
        import(
          /* webpackChunkName: "fridge" */
          '../views/meal/PlanView.vue'
        ),
    },
    {
      path: '/meal/cast-iron',
      name: 'cast-iron',
      component: () =>
        import(
          /* webpackChunkName: "cast-iron" */
          '../views/meal/CastIronView.vue'
        ),
    },
    {
      path: '/meal/sauces',
      name: 'sauces',
      component: () =>
        import(
          /* webpackChunkName: "sauces" */
          '../views/meal/SaucesView.vue'
        ),
    },
    {
      path: '/meal/nutrients',
      name: 'nutrients',
      component: () =>
        import(
          /* webpackChunkName: "nutrients" */
          '../views/meal/NutrientsView.vue'
        ),
    },
    {
      path: '/meal/storage',
      name: 'storage',
      component: () =>
        import(
          /* webpackChunkName: "storage" */
          '../views/meal/StorageView.vue'
        ),
    },
    {
      path: '/fitness',
      name: 'fitness',
      component: () =>
        import(
          /* webpackChunkName: "fitness" */
          '../views/fitness/FitnessView.vue'
        ),
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
