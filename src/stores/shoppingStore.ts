import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useShoppingStore = defineStore('shopping', () => {
  const items = ref<Record<string, boolean>>({})
  const weekLabel = ref<string>('Week of ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))

  const toggle = (id: string) => {
    items.value[id] = !items.value[id]
  }

  const resetWeek = () => {
    Object.keys(items.value).forEach(key => {
      items.value[key] = false
    })
    weekLabel.value = 'Week of ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const checkedCount = computed(() => {
    return Object.values(items.value).filter(checked => checked).length
  })

  const totalCount = computed(() => {
    return Object.keys(items.value).length
  })

  return {
    items,
    weekLabel,
    toggle,
    resetWeek,
    checkedCount,
    totalCount
  }
}, {
  persist: true
})
