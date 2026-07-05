import { useEffect, useState } from 'react'
import { EventStatus, type EventItem } from './types'
import { listEvents } from './api/events'
import './App.css'

function statusLabel(s: EventStatus): string {
  return s === EventStatus.Completed ? 'Completato' : 'In programma'
}

function App() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carica l'elenco degli eventi dal backend.
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

  return (
    <main className="container">
      <h1>Event Manager</h1>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Caricamento…</p>
      ) : events.length === 0 ? (
        <p className="empty">Nessun evento.</p>
      ) : (
        <table className="events">
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Data</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.title}</td>
                <td>{ev.date}</td>
                <td>
                  <span className={`status status-${ev.status}`}>
                    {statusLabel(ev.status)}
                  </span>
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