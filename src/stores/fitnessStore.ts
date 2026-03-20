import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFitnessStore = defineStore('fitness', () => {
  const milestones = ref<Record<number, boolean>>({})
  const workoutLog = ref<any[]>([])
  const currentWeek = ref<number>(1)

  const toggleMilestone = (index: number) => {
    milestones.value[index] = !milestones.value[index]
  }

  const setWeek = (week: number) => {
    if (week >= 1 && week <= 11) {
      currentWeek.value = week
    }
  }

  return {
    milestones,
    workoutLog,
    currentWeek,
    toggleMilestone,
    setWeek
  }
}, {
  persist: true
})
