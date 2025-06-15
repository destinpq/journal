export interface WeightEntry {
  id: string
  date: Date
  weight: number // e.g., in kg
}

export interface ExerciseEntry {
  id: string
  date: Date
  description: string
  duration?: number // in minutes
}

export interface JournalEntry {
  id: string
  date: Date
  title?: string
  content: string
}
