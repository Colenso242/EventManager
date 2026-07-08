import type { EventItem } from '../types'
import { StatusBadge } from './StatusBadge'

interface EventRowProps {
  event: EventItem
  onToggleStatus: (ev: EventItem) => void
  onDelete: (id: string) => void
}

export function EventRow({ event, onToggleStatus, onDelete }: EventRowProps) {
  return (
    <tr>
      <td>{event.title}</td>
      <td>{event.date}</td>
      <td>
        <StatusBadge status={event.status} onToggle={() => onToggleStatus(event)} />
      </td>
      <td>
        <button className="delete" onClick={() => onDelete(event.id)}>Elimina</button>
      </td>
    </tr>
  )
}