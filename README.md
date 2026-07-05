# Event Manager

Piccola app per gestire eventi: backend ASP.NET Core (API REST + SQLite) e frontend React (SPA in `frontend/`).

## Prerequisiti

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20+ (con npm)

## Avvio in sviluppo

Dalla cartella del progetto:

```bash
dotnet run --launch-profile http
```

Questo comando:

1. installa le dipendenze npm in `frontend/` se mancano;
2. avvia il backend su `http://localhost:5187` (il database SQLite `events.db` viene creato automaticamente al primo avvio);
3. tramite SpaProxy lancia il dev server Vite su `http://localhost:5173`.

Apri **http://localhost:5173** nel browser: le chiamate `/api` vengono inoltrate automaticamente al backend.

## API

| Metodo | Rotta | Descrizione |
|--------|-------|-------------|
| GET | `/api/events` | Elenco eventi ordinato per data |
| GET | `/api/events/{id}` | Singolo evento |
| POST | `/api/events` | Crea un evento |
| PUT | `/api/events/{id}` | Aggiorna un evento |
| DELETE | `/api/events/{id}` | Elimina un evento |

Un evento ha `id` (GUID), `title` (max 200 caratteri), `date` (formato `yyyy-MM-dd`) e `status` (`0` = in programma, `1` = completato).

## Struttura

```
EventManager/
├── Controllers/     # API controller 
├── Models/          # Entità
├── Persistence/     # DbContext EF Core
├── frontend/        # SPA React + Vite + TypeScript
└── events.db        # DB Sqlite (creato al primo avvio)
```
