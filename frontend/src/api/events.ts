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

export function createEvent(input: Omit<EventItem, 'id'>): Promise<EventItem> {
  return fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then((r) => handle<EventItem>(r))
}

export async function updateEvent(ev: EventItem): Promise<void> {
  const res = await fetch(`${BASE}/${ev.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ev),
  })
  if (!res.ok) throw new Error(`Aggiornamento fallito: ${res.status}`)
}

export async function deleteEvent(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Eliminazione fallita: ${res.status}`)
}