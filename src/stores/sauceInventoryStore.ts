import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSauceInventoryStore = defineStore('sauceInventory', () => {

  // Record of sauce id → in-stock boolean
  const inventory = ref<Record<string, boolean>>({})

  function markInStock(sauceId: string) {
    inventory.value[sauceId] = true
  }

  function markUsedUp(sauceId: string) {
    inventory.value[sauceId] = false
  }

  function isInStock(sauceId: string): boolean {
    return inventory.value[sauceId] === true
  }

  function toggleStock(sauceId: string) {
    inventory.value[sauceId] = !inventory.value[sauceId]
  }

  // Returns all sauce ids currently in stock
  const inStockSauces = computed(() =>
    Object.entries(inventory.value)
      .filter(([_, inStock]) => inStock)
      .map(([id]) => id)
  )

  return { inventory, markInStock, markUsedUp, isInStock, toggleStock, inStockSauces }

}, {
  persist: true
})
