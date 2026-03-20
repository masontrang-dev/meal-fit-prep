import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MarinadeId } from '@/types/meal.types'

export const useMealStore = defineStore('meal', () => {
  const selectedMarinade = ref<MarinadeId | null>(null)
  const selectedVegetable = ref<string>('broccoli')

  const setMarinade = (id: MarinadeId | null) => {
    selectedMarinade.value = id
  }

  const setVegetable = (name: string) => {
    selectedVegetable.value = name
  }

  return {
    selectedMarinade,
    selectedVegetable,
    setMarinade,
    setVegetable
  }
}, {
  persist: true
})
