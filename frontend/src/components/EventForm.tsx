import { useState } from 'react'

interface EventFormProps {
  onSubmit: (input: { title: string; date: string }) => void | Promise<void>
}

export function EventForm({ onSubmit }: EventFormProps) {
  // Campi del form di creazione.
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    await onSubmit({ title: title.trim(), date })
    setTitle('')
    setDate('')
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Titolo evento" value={title}
        onChange={(e) => setTitle(e.target.value)} maxLength={200} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Aggiungi</button>
    </form>
  )
}