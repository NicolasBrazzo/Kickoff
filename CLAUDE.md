# Kickoff

Gestionale per centri sportivi: campi, clienti, prenotazioni, operatori.
Monorepo con due cartelle indipendenti, ognuna con il suo `package.json`:

- `client/`: React 19, Vite 7, Tailwind CSS v4, shadcn/ui (stile radix-nova), React Router 7, TanStack Query, lucide-react. JavaScript, niente TypeScript.
- `server/`: Node 18, Express 4, JWT, Supabase/MySQL. Endpoint documentati in `server/endpoints.md`.

## Comandi

- Client: `cd client && npm run dev` · `npm run lint` · `npm run build`
- Server: `cd server && npm run dev`

## Convenzioni del client

- Alias `@` = `client/src`.
- Le pagine stanno in `src/pages/` ed esportano componenti con nome (`export const Login = () => ...`).
- Le chiamate API passano dai file in `src/services/` e si usano con `useQuery` / `useMutation` di TanStack Query. Niente fetch diretti nei componenti.
- I componenti shadcn stanno in `src/components/ui/`: si modificano lì, non si duplicano.
- Notifiche con `src/utils/toast.js`.
- Testi dell'interfaccia in italiano.

## Decisioni di prodotto

- Il nome del prodotto è **Kickoff**, in ogni testo e nel logo.
- La landing descrive anche funzioni non ancora presenti nel backend: prenotazione in autonomia dei giocatori, promemoria automatici, slot liberati dopo una disdetta. Sono funzioni previste: non cambiare quei testi e non implementarle senza richiesta esplicita.
- Il bottone "Verifica prenotazione" resta nella pagina di login.

## Regole per l'interfaccia

- IMPORTANT: per qualsiasi lavoro su stili, componenti visivi, pagine o landing segui la skill `design-system` (`.claude/skills/design-system/SKILL.md`). Il riferimento visivo approvato è `.claude/skills/design-system/reference/landing.html`.
- Mai emoji nell'interfaccia: usa sempre icone di `lucide-react`.
- Mai gradienti di colore.
- Non toccare `server/` durante il lavoro di design, salvo richiesta esplicita.

## Prima di dire che hai finito

- `npm run lint` e `npm run build` dentro `client/` devono passare senza errori.
- Per le modifiche visive mostra uno screenshot del risultato, a 1440px e a 390px di larghezza, usando gli strumenti del server MCP `playwright`.
