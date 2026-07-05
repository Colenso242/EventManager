import { useEffect, useState } from 'react'
import { EventStatus, type EventItem } from './types'
import {
  createEvent,
  deleteEvent,
  listEvents,
  updateEvent,
} from './api/events'
import './App.css'

function statusLabel(s: EventStatus): string {
  return s === EventStatus.Completed ? 'Completato' : 'In programma'
}

function App() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Campi del form di creazione.
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  async function refresh() {
    try {
      setLoading(true)
      setEvents(await listEvents())
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore sconosciuto')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    try {
      await createEvent({ title: title.trim(), date, status: EventStatus.Scheduled })
      setTitle('')
      setDate('')
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore sconosciuto')
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
      setError(e instanceof Error ? e.message : 'Errore sconosciuto')
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteEvent(id)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore sconosciuto')
    }
  }

  return (
    <main className="container">
      <h1>Event Manager</h1>

      <form className="create-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Titolo evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Aggiungi</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Caricamento…</p>
      ) : events.length === 0 ? (
        <p className="empty">Nessun evento. Aggiungine uno qui sopra.</p>
      ) : (
        <table className="events">
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Data</th>
              <th>Stato</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.title}</td>
                <td>{ev.date}</td>
                <td>
                  <button
                    className={`status status-${ev.status}`}
                    onClick={() => toggleStatus(ev)}
                    title="Cambia stato"
                  >
                    {statusLabel(ev.status)}
                  </button>
                </td>
                <td>
                  <button className="delete" onClick={() => handleDelete(ev.id)}>
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

export default App