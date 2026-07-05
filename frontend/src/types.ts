// Rispecchia l'enum EventStatus del backend (serializzato come intero).
// Oggetto const invece di enum: il template Vite abilita erasableSyntaxOnly.
export const EventStatus = {
  Scheduled: 0,
  Completed: 1,
} as const

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]

export interface EventItem {
  id: string
  title: string
  date: string // formato ISO "yyyy-MM-dd" (DateOnly lato server)
  status: EventStatus
}