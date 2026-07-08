  import type { EventStatus } from '../types'
import { statusLabel } from '../lib/statusLabel'

interface StatusBadgeProps {
  status: EventStatus
  onToggle: () => void
}

export function StatusBadge({ status, onToggle }: StatusBadgeProps) {
  return (
    <button className={`status status-${status}`} onClick={onToggle} title="Cambia stato">
      {statusLabel(status)}
    </button>
  )
}