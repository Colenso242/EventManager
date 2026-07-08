import { EventStatus } from '../types'

export function statusLabel(s: EventStatus): string {
  return s === EventStatus.Completed ? 'Completato' : 'In programma'
}
