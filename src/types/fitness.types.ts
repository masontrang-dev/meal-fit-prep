// Placeholder for fitness plan types
// To be implemented when fitness module requirements are finalized

export interface Milestone {
  id: number
  week: number
  description: string
  completed: boolean
}

export interface WorkoutLogEntry {
  date: string
  type: 'cardio' | 'strength' | 'combo' | 'rest'
  notes?: string
}

export type WorkoutPhase = 1 | 2 | 3
