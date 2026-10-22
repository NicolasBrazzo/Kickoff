# Piano: design system e landing in Kickoff

Ogni fase è un compito piccolo e verificabile, da fare in una sessione pulita di Claude Code. Per ogni fase:

1. Crea un ramo o assicurati di aver fatto commit della fase precedente.
2. Apri Claude Code nella radice del repo. Se la sessione precedente era su altro, usa `/clear`.
3. Attiva la modalità piano (`Shift+Tab` finché vedi "plan mode on") e incolla il prompt della fase.
4. Leggi il piano che propone. Correggilo prima di approvarlo, è il momento in cui costa meno.
5. Approva e lascialo lavorare. Alla fine controlla gli screenshot e prova tu nel browser.
6. Commit. Se qualcosa non va, torna indietro con `/rewind` o con git.

Gli screenshot chiesti nelle verifiche richiedono che Claude Code possa usare il browser: installa l'estensione Claude in Chrome e avvia con `claude --chrome`, oppure attivala una volta per tutte da `/chrome`. Tieni acceso `npm run dev` nel client. Senza l'estensione, fai tu gli screenshot e incollali nella sessione.

---

## Fase 0: decisioni prese

Sono già scritte in `CLAUDE.md`, sezione "Decisioni di prodotto":

- Il nome del prodotto è **Kickoff**.
- I testi della landing restano come sono: le funzioni che descrivono e che mancano nel backend verranno aggiunte.
- Il bottone "Verifica prenotazione" resta nella pagina di login.

---

## Fase 1: token e font

```
Leggi la skill design-system e index.css. Voglio applicare i token del design system all'intero client, senza ancora toccare le pagine.

- Installa @fontsource/young-serif e @fontsource-variable/instrument-sans e rimuovi @fontsource-variable/geist.
- Riscrivi client/src/index.css come descritto nella sezione "Implementazione in questo progetto" della skill: token in @theme, variabili shadcn rimappate, via lo sfondo sfumato, le utility indaco e il tema .dark.
- Le classi primary-button, box e modal-* sono usate nelle pagine: non rompere le pagine. Ridefiniscile sopra i nuovi token come soluzione temporanea; le sostituiremo nella fase 2.

Verifica: npm run lint e npm run build passano. Mostrami uno screenshot di /login e di /fields.
```

## Fase 2: componenti base

```
Leggi la skill design-system. Restilizza i componenti base secondo la sezione "Componenti":

- src/components/ui/button.jsx: varianti default (primario), light, ghost, destructive, link; taglie default 52px e sm 44px.
- src/components/ui/input.jsx, select.jsx, textarea.jsx: aspetto input della skill.
- src/components/ui/calendar.jsx: colori e raggi dei token.
- src/components/Modal.jsx e src/components/Loader.jsx: sopra i token, usando Button e Input di ui/.
- Sostituisci nelle pagine gli usi di primary-button, box, modal-input ecc. con i componenti, poi elimina quelle utility da index.css.

Non cambiare la logica delle pagine, solo l'aspetto.
Verifica: lint e build passano; screenshot di /fields con il modal di modifica aperto.
```

## Fase 3a: landing, struttura e routing

```
Leggi la skill design-system e il riferimento reference/landing.html. Crea la landing in React, per ora SENZA animazioni allo scroll e senza la sezione della formazione.

- Routing: la landing va su "/", il login su "/login". Aggiorna PrivateRoute (redirect a /login), il link in Register.jsx e ogni altro riferimento a "/".
- Struttura dei file come in "Struttura consigliata della landing" della skill. Testi e dati in content.js.
- Sezioni: navbar, hero (con pannello del calendario e notifica), soluzione, giornata tipo, FAQ, banda finale, footer. Copia testi e misure dal riferimento.
- "Registra il tuo campo" porta a /register, "Accedi" a /login.

Verifica: lint e build passano; screenshot della landing intera a 1440px e a 390px, confrontati con il riferimento aperto nel browser. Elenca le differenze che trovi e correggile.
```

## Fase 3b: strisce dell'erba

```
Leggi la skill design-system. Aggiungi alla landing le strisce dell'erba animate della hero, come nel riferimento (classe .turf): motivo ancorato alla finestra, 8 secondi per ciclo, rispetto di prefers-reduced-motion. Mettile in src/components/landing/landing.css.
Verifica: lint e build passano; descrivi come hai controllato che il loop non abbia scatti.
```

## Fase 3c: formazione 4-3-3

```
Leggi la skill design-system e nel riferimento la sezione con classe .xp e lo script in fondo al file. Ricrea la sezione FormationReveal subito dopo la hero:

- Hook src/hooks/useScrollProgress.js che, dato un ref, calcola il progresso dello scroll e scrive --p ed --e sull'elemento senza setState, con requestAnimationFrame e rimozione dei listener allo smontaggio.
- Le 11 card e i 12 blocchi vanno generati da array in content.js, con posizioni, direzioni, velocità e rotazioni identiche al riferimento.
- La hero e il campo devono formare un'unica superficie verde: angoli e strisce come nel riferimento.
- prefers-reduced-motion: niente voli, solo dissolvenza.

Verifica: lint e build passano; screenshot a tre punti dello scroll (inizio, metà, fine animazione) a 1440px e 390px.
```

## Fase 3d: rifiniture della landing

```
Leggi la skill design-system. Aggiungi le comparse allo scroll delle sezioni con IntersectionObserver (non animation-timeline), i meta tag SEO e di anteprima social in index.html (lang="it", title, description) e controlla l'accessibilità: un solo h1, link e bottoni veri, aria-label sulle icone senza testo, contrasti.
Verifica: lint e build passano; elenco dei controlli fatti.
```

## Fase 4: login e registrazione

```
Leggi la skill design-system. Ridisegna Login.jsx e Register.jsx con lo stile della landing: pannello verde turf a sinistra con logo e una frase, form su sfondo cream a destra; su mobile il form occupa tutto lo schermo. Usa i componenti di ui/. Non toccare la logica di autenticazione. Il bottone "Verifica prenotazione" resta nella pagina di login, sotto il form, come azione secondaria (variante ghost).
Verifica: lint e build passano; screenshot a 1440px e 390px, con un errore di login visibile.
```

## Fase 5: struttura dell'app

```
Leggi la skill design-system. Crea un layout per le pagine private con la Sidebar a sinistra e il contenuto a destra, e usalo in App.jsx per tutte le rotte protette.
- Sidebar: sostituisci le voci di esempio con quelle reali (Dashboard, Campi, Clienti, Prenotazioni, Operatori solo per admin), rimuovi l'emoji del logo, evidenzia la voce attiva in base alla rotta, mostra nome utente e logout in fondo.
- Su mobile la sidebar diventa una barra superiore con menu a comparsa.
Verifica: lint e build passano; screenshot di /dashboard a 1440px e 390px, con il menu mobile aperto.
```

## Fase 6: pagine dell'app, una alla volta

Ripeti questo prompt per Dashboard, Campi, Clienti, Prenotazioni e Operatori, una pagina per sessione.

```
Leggi la skill design-system. Ridisegna src/pages/[PAGINA].jsx: titolo di pagina, azione principale in alto a destra, contenuti in card chiare o in tabella, stati vuoti e di caricamento curati, conferme di eliminazione nel Modal invece di window.confirm. Non cambiare chiamate API né logica.
Verifica: lint e build passano; screenshot con dati, senza dati e durante il caricamento.
```

## Fase 7: revisione finale

```
Usa un subagente per controllare tutto il client rispetto alla skill design-system: colori fuori palette, emoji, gradienti, componenti che non usano ui/, contrasti, aree toccabili sotto i 44px, animazioni senza prefers-reduced-motion. Riporta solo problemi reali, con file e riga.
```
