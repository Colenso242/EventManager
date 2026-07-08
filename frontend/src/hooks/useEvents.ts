import { useEffect, useState } from 'react'
import { EventStatus, type EventItem } from '../types'
import {
  createEvent as apiCreateEvent,
  deleteEvent as apiDeleteEvent,
  listEvents,
  updateEvent,
} from '../api/events'

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : 'Errore sconosciuto'
}

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    try {
      setLoading(true)
      setEvents(await listEvents())
      setError(null)
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function createEvent(input: { title: string; date: string }) {
    try {
      await apiCreateEvent({ ...input, status: EventStatus.Scheduled })
      await refresh()
    } catch (e) {
      setError(errorMessage(e))
    }
  }

  async function toggleStatus(ev: EventItem) {
    const next: EventItem = {
      ...ev,
      status:
        ev.status === EventStatus.Completed
          ? EventStatus.Scheduled
          : EventStatus.Completed,
    }
    try {
      await updateEvent(next)
      await refresh()
    } catch (e) {
      setError(errorMessage(e))
    }
  }

  async function deleteEvent(id: string) {
    try {
      await apiDeleteEvent(id)
      await refresh()
    } catch (e) {
      setError(errorMessage(e))
    }
  }

  return { events, loading, error, createEvent, toggleStatus, deleteEvent }
}