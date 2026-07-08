import type { EventItem } from '../types'
import { EventRow } from './EventRow'

interface EventsTableProps {
  events: EventItem[]
  loading: boolean
  onToggleStatus: (ev: EventItem) => void
  onDelete: (id: string) => void
}

export function EventsTable({ events, loading, onToggleStatus, onDelete }: EventsTableProps) {
  if (loading) return <p>Caricamento…</p>
  if (events.length === 0) return <p className="empty">Nessun evento. Aggiungine uno qui sopra.</p>

  return (
    <table className="events">
      <thead>
        <tr><th>Titolo</th><th>Data</th><th>Stato</th><th></th></tr>
      </thead>
      <tbody>
        {events.map((ev) => (
          <EventRow key={ev.id} event={ev} onToggleStatus={onToggleStatus} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  )
}