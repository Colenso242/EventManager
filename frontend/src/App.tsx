import { useEvents } from './hooks/useEvents'
import { EventForm } from './components/EventForm'
import { EventsTable } from './components/EventsTable'
import { ErrorMessage } from './components/ErrorMessage'
import './App.css'

function App() {
  const { events, loading, error, createEvent, toggleStatus, deleteEvent } = useEvents()

  return (
    <main className="container">
      <h1>Event Manager</h1>
      <EventForm onSubmit={createEvent} />
      <ErrorMessage message={error} />
      <EventsTable
        events={events}
        loading={loading}
        onToggleStatus={toggleStatus}
        onDelete={deleteEvent}
      />
    </main>
  )
}
export default App
