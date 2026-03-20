import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { shoppingList } from "@/data/shopping";
import { getSauceById } from "@/data/sauces";
import type { GeneratedPlan } from "@/types/randomizer.types";
import type { ShoppingItem, Sauce } from "@/types/meal.types";

export const useShoppingStore = defineStore(
  "shopping",
  () => {
    const items = ref<Record<string, boolean>>({});
    const weekLabel = ref<string>(
      "Week of " + new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    );
    const dynamicItems = ref<ShoppingItem[]>([]);
    const sauceItems = ref<Array<{ id: string; name: string; batchable: boolean }>>([]);
    const batchedSauces = ref<Record<string, boolean>>({});

    // Initialize items from shopping data if not already populated
    const initializeItems = () => {
      if (Object.keys(items.value).length === 0) {
        shoppingList.forEach((item) => {
          items.value[item.id] = false;
        });
      }
    };

    // Call initialization immediately
    initializeItems();

    const toggle = (id: string) => {
      items.value[id] = !items.value[id];
    };

    const resetWeek = () => {
      Object.keys(items.value).forEach((key) => {
        items.value[key] = false;
      });
      Object.keys(batchedSauces.value).forEach((key) => {
        batchedSauces.value[key] = false;
      });
      weekLabel.value =
        "Week of " + new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const toggleSauceBatch = (sauceId: string) => {
      batchedSauces.value[sauceId] = !batchedSauces.value[sauceId];
    };

    // Helper to extract ingredients from a sauce
    const extractSauceIngredients = (sauce: Sauce): ShoppingItem[] => {
      const ingredients: ShoppingItem[] = [];

      sauce.ingredients.forEach((ingredient) => {
        const ingredientId = `sauce-${sauce.id}-${ingredient.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        // Determine category based on ingredient type
        let category = "Pantry";
        if (
          [
            "garlic",
            "onion",
            "ginger",
            "lemon",
            "lime",
            "parsley",
            "cilantro",
            "dill",
            "thyme",
            "rosemary",
            "mango",
            "jalapeño",
          ].some((fresh) => ingredient.name.toLowerCase().includes(fresh))
        ) {
          category = "Vegetables";
        } else if (
          ["butter", "yogurt", "ranch"].some((dairy) =>
            ingredient.name.toLowerCase().includes(dairy),
          )
        ) {
          category = "Dairy";
        }

        ingredients.push({
          id: ingredientId,
          category,
          name: ingredient.name,
          quantity: `${ingredient.amount} ${ingredient.unit}`,
        });
      });

      return ingredients;
    };

    // Update shopping list based on confirmed FridgeEngine plan
    const updateFromPlan = (plan: GeneratedPlan) => {
      const newDynamicItems: ShoppingItem[] = [];

      // Batch fish
      const fishName =
        plan.batchFishVariety.charAt(0).toUpperCase() + plan.batchFishVariety.slice(1);
      newDynamicItems.push({
        id: `fish-${plan.batchFishVariety}`,
        category: "Proteins",
        name: `${fishName} fillets`,
        quantity: "1.5 lbs (fresh or frozen)",
      });

      // Batch chicken
      const chickenType = plan.batchChickenCut === "thighs" ? "Chicken thighs" : "Chicken breast";
      newDynamicItems.push({
        id: `chicken-${plan.batchChickenCut}`,
        category: "Proteins",
        name: `${chickenType} (boneless, skinless)`,
        quantity: plan.batchChickenCut === "thighs" ? "2 lbs" : "1.5 lbs",
      });

      // Cast iron protein
      if (plan.castIronProtein === "shrimp") {
        newDynamicItems.push({
          id: "shrimp",
          category: "Proteins",
          name: "Frozen raw shrimp, peeled and deveined",
          quantity: "1–1.5 lbs",
        });
      } else if (
        plan.castIronProtein === "flank-steak" ||
        plan.castIronProtein === "sirloin-steak"
      ) {
        const steakType = plan.castIronProtein === "flank-steak" ? "Flank steak" : "Sirloin steak";
        newDynamicItems.push({
          id: `steak-${plan.castIronProtein}`,
          category: "Proteins",
          name: steakType,
          quantity: "1–1.25 lbs",
        });
      } else if (
        plan.castIronProtein !== plan.batchFishVariety &&
        ["salmon", "tilapia", "cod", "mahi-mahi"].includes(plan.castIronProtein)
      ) {
        const castFishName =
          plan.castIronProtein.charAt(0).toUpperCase() + plan.castIronProtein.slice(1);
        newDynamicItems.push({
          id: `fish-cast-${plan.castIronProtein}`,
          category: "Proteins",
          name: `${castFishName} fillets (for cast iron)`,
          quantity: "0.75 lb",
        });
      }

      // Roasting vegetables (2 slots)
      const vegMap: Record<string, { name: string; quantity: string }> = {
        broccoli: { name: "Broccoli florets", quantity: "2 bags (pre-cut)" },
        asparagus: { name: "Asparagus", quantity: "1 bunch" },
        zucchini: { name: "Zucchini", quantity: "2 medium" },
        "green-beans": { name: "Green beans", quantity: "1 lb (fresh or frozen)" },
        cauliflower: { name: "Cauliflower florets", quantity: "1 head or 1 bag pre-cut" },
        "brussels-sprouts": { name: "Brussels sprouts", quantity: "1 lb" },
        "snap-peas": { name: "Snap peas", quantity: "1 bag (pre-washed)" },
        "bok-choy": { name: "Baby bok choy", quantity: "4–6 heads" },
        "stir-fry-blend": { name: "Frozen stir-fry vegetable blend", quantity: "1 bag" },
      };
      const veg1 = vegMap[plan.roastingVeg1];
      if (veg1) {
        newDynamicItems.push({
          id: `veg-${plan.roastingVeg1}`,
          category: "Vegetables",
          name: veg1.name,
          quantity: veg1.quantity,
        });
      }
      const veg2 = vegMap[plan.roastingVeg2];
      if (veg2) {
        newDynamicItems.push({
          id: `veg-${plan.roastingVeg2}`,
          category: "Vegetables",
          name: veg2.name,
          quantity: veg2.quantity,
        });
      }

      // Grains (2 slots)
      const grainMap: Record<string, { name: string; quantity: string }> = {
        "brown-rice": { name: "Brown rice", quantity: "2 cups dry" },
        quinoa: { name: "Quinoa", quantity: "1.5 cups dry" },
        "jasmine-rice": { name: "Jasmine rice (white)", quantity: "1.5 cups dry" },
      };
      const grain1 = grainMap[plan.grain1];
      if (grain1) {
        newDynamicItems.push({
          id: `grain-${plan.grain1}`,
          category: "Grains & Legumes",
          name: grain1.name,
          quantity: grain1.quantity,
        });
      }
      const grain2 = grainMap[plan.grain2];
      if (grain2) {
        newDynamicItems.push({
          id: `grain-${plan.grain2}`,
          category: "Grains & Legumes",
          name: grain2.name,
          quantity: grain2.quantity,
        });
      }

      // Legume
      const legumeMap: Record<string, { name: string; quantity: string }> = {
        lentils: { name: "Green or brown lentils (dry)", quantity: "1.5 cups dry" },
        "black-beans": { name: "Canned black beans", quantity: "2 cans (15 oz each)" },
        chickpeas: { name: "Canned chickpeas", quantity: "2 cans (15 oz each)" },
        "pinto-beans": { name: "Dried pinto beans", quantity: "1 lb bag" },
      };
      const legume = legumeMap[plan.legume];
      if (legume) {
        newDynamicItems.push({
          id: `legume-${plan.legume}`,
          category: "Grains & Legumes",
          name: legume.name,
          quantity: legume.quantity,
        });
      }

      // Dynamic sauce ingredients extraction
      const selectedSauces = [plan.batchFishSauce, plan.batchChickenSauce, plan.castIronSauce];

      const newSauceItems: Array<{ id: string; name: string; batchable: boolean }> = [];

      selectedSauces.forEach((sauceId) => {
        try {
          const sauce = getSauceById(sauceId);
          if (sauce) {
            newSauceItems.push({
              id: sauce.id,
              name: sauce.name,
              batchable: sauce.storage.batchable,
            });

            // Initialize batched status if not exists
            if (!(sauce.id in batchedSauces.value)) {
              batchedSauces.value[sauce.id] = false;
            }

            // Only add ingredients if sauce is NOT already batched
            if (!batchedSauces.value[sauce.id]) {
              const sauceIngredients = extractSauceIngredients(sauce);
              newDynamicItems.push(...sauceIngredients);
            }
          }
        } catch (error) {
          console.warn(`Sauce not found: ${sauceId}`);
        }
      });

      sauceItems.value = newSauceItems;
      dynamicItems.value = newDynamicItems;

      // Initialize checked state for new items
      newDynamicItems.forEach((item) => {
        if (!(item.id in items.value)) {
          items.value[item.id] = false;
        }
      });
    };

    const allItems = computed(() => {
      // Combine static standing items with dynamic plan items
      const standingItems = shoppingList.filter((item) =>
        ["garlic", "onion", "lemon", "parsley", "olive-oil", "sesame-oil", "soy-sauce"].includes(
          item.id,
        ),
      );

      return [...dynamicItems.value, ...standingItems];
    });

    const checkedCount = computed(() => {
      return Object.values(items.value).filter((checked) => checked).length;
    });

    const totalCount = computed(() => {
      return allItems.value.length;
    });

    return {
      items,
      weekLabel,
      dynamicItems,
      sauceItems,
      batchedSauces,
      allItems,
      toggle,
      toggleSauceBatch,
      resetWeek,
      updateFromPlan,
      checkedCount,
      totalCount,
    };
  },
  {
    persist: true,
  },
);
