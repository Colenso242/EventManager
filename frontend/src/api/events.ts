import type { EventItem } from '../types'

const BASE = '/api/events'

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Richiesta fallita: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

export function listEvents(): Promise<EventItem[]> {
  return fetch(BASE).then((r) => handle<EventItem[]>(r))
}
