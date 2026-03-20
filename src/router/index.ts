import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/meal/proteins",
    },
    {
      path: "/meal/proteins",
      name: "proteins-grains",
      component: () => import("../views/meal/ProteinsGrainsView.vue"),
    },
    {
      path: "/meal/shopping",
      name: "shopping-list",
      component: () => import("../views/meal/ShoppingListView.vue"),
    },
    {
      path: "/meal/prep",
      name: "prep-day",
      component: () => import("../views/meal/PrepDayView.vue"),
    },
    {
      path: "/meal/plan",
      name: "meal-plan",
      component: () => import("../views/meal/MealPlanView.vue"),
    },
    {
      path: "/meal/cast-iron",
      name: "cast-iron",
      component: () => import("../views/meal/CastIronView.vue"),
    },
    {
      path: "/meal/sauces",
      name: "sauces",
      component: () => import("../views/meal/SaucesView.vue"),
    },
    {
      path: "/meal/nutrients",
      name: "nutrients",
      component: () => import("../views/meal/NutrientsView.vue"),
    },
    {
      path: "/meal/storage",
      name: "storage",
      component: () => import("../views/meal/StorageView.vue"),
    },
    {
      path: "/fitness",
      name: "fitness",
      component: () => import("../views/fitness/FitnessView.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
