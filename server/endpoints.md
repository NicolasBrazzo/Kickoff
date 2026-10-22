## Endpoints disponibili

### Autenticazione (`/auth`)
- **POST `/auth/register`**: registra un nuovo operatore e restituisce un token JWT.
- **POST `/auth/login`**: autentica un operatore esistente e restituisce un token JWT.
- **GET `/auth/me`** (protetto): restituisce i dati dell’utente autenticato dal token.
- **POST `/auth/logout`**: termina la sessione lato client (JWT stateless, nessuna revoca server).

### Clienti (`/clients`) – tutte le rotte protette
- **GET `/clients`**: restituisce la lista di tutti i clienti.
- **GET `/clients/:id`**: restituisce il dettaglio di un singolo cliente.
- **POST `/clients`**: crea un nuovo cliente.
- **PUT `/clients/:id`**: aggiorna i dati di un cliente esistente.
- **DELETE `/clients/:id`**: elimina un cliente.

### Campi (`/fields`) – tutte le rotte protette
- **GET `/fields`**: restituisce la lista di tutti i campi sportivi.
- **GET `/fields/:id`**: restituisce il dettaglio di un singolo campo.
- **POST `/fields`**: crea un nuovo campo.
- **PUT `/fields/:id`**: aggiorna i dati di un campo esistente.
- **DELETE `/fields/:id`**: elimina un campo.

### Prenotazioni (`/reservations`) – tutte le rotte protette salvo verifica codice
- **GET `/reservations`**: restituisce la lista di tutte le prenotazioni.
- **GET `/reservations/:id`**: restituisce il dettaglio di una singola prenotazione.
- **POST `/reservations`**: crea una nuova prenotazione con controllo di sovrapposizione oraria.
- **PUT `/reservations/:id`**: aggiorna una prenotazione esistente.
- **DELETE `/reservations/:id`**: elimina una prenotazione.
- **GET `/reservations/verify-reservation/:reservation_code`** (pubblico): verifica una prenotazione a partire dal codice di prenotazione.

### Operatori (`/operators`) – tutte le rotte protette e riservate ad admin
- **GET `/operators`**: restituisce la lista di tutti gli operatori (solo admin).
- **POST `/operators`**: crea un nuovo operatore con validazione password ed email unica (solo admin).
- **PUT `/operators/:id`**: aggiorna i dati di un operatore, con controllo email unica e password opzionale (solo admin).
- **DELETE `/operators/:id`**: elimina un operatore (solo admin).

