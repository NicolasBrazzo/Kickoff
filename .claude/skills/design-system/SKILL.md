---
name: design-system
description: Design system di Kickoff (token, tipografia, componenti, animazioni) e landing di riferimento. Usala per qualsiasi lavoro di interfaccia nel client: landing, pagine dell'app, componenti, stili, index.css.
---

# Design system di Kickoff

Il riferimento visivo approvato è `reference/landing.html` (in questa cartella). È la fonte di verità per aspetto, testi della landing e animazioni: quando questo documento e il file non coincidono, vale il file. Aprilo e leggilo prima di costruire una sezione della landing.

## Carattere

Tre parole guidano ogni scelta:

- **Semplice**: testi brevi, azioni chiare, leggibile su mobile.
- **Tranquillo**: animazioni morbide e lente, niente effetti appariscenti, titoli serif dalle forme rotonde.
- **Arioso**: tanto spazio tra le sezioni e attorno ai contenuti.

Il tono di riferimento è quello del sito Rolex: calma e pulizia. Il tono dei testi è diretto e caldo, in italiano.

## Colori

| Token | Valore | Uso |
|---|---|---|
| `cream` | `#E6E5DC` | Sfondo di pagina. Testo e bottoni chiari su superfici scure |
| `paper` | `#F3F2EC` | Superfici chiare dell'app: card, popover, tabelle (derivato, schiarisce cream) |
| `ink` | `#122020` | Testo principale, navbar, pannelli scuri |
| `forest` | `#1F3B2D` | Bottone primario, card scure, elementi attivi |
| `turf` | `#1D3829` | Grandi superfici verdi: hero, campo, banda finale |
| `turf-stripe` | `#21402F` | Strisce dell'erba sopra `turf` |
| `leaf` | `#2F5A3C` | Hover dei link, puntino delle etichette, anello di focus |
| `sage` | `#B9CF9A` | Accenti su sfondo scuro: icone, spunte, elementi attivi nella sidebar |
| `stone` | `#3E4B4B` | Testo secondario su sfondo chiaro |
| `signal` | `#F03117` | SOLO punto del logo e stato "appena prenotato" / nuova prenotazione |
| `danger` | `#B42318` | Azioni distruttive ed errori dei form (derivato, distinto da signal) |

Bordi: `rgba(18,32,32,.16)` su chiaro, `rgba(230,229,220,.12)` su scuro. Testo secondario su scuro: `cream` all'opacità .72-.80.

Regole:

- Il verde è il colore della marca. Il rosso `signal` è un segnale, non una decorazione: mai su bottoni, sfondi o grandi superfici.
- Mai gradienti di colore. L'unica eccezione tecnica sono le strisce dell'erba, fatte con un `repeating-linear-gradient` a bordi netti che si vede come strisce piene.
- Contrasto minimo 4.5:1 per il testo. `signal` non passa come colore di testo su `cream`: usalo solo per punti, slot e piccoli indicatori.

## Tipografia

- **Titoli**: Young Serif, peso 400 (è l'unico disponibile). Classe `font-serif`.
- **Testo**: Instrument Sans, pesi 400 / 500 / 600. Classe `font-sans`, predefinita.
- Font installati in locale con Fontsource, non da Google Fonts.

| Ruolo | Dimensione | Altri valori |
|---|---|---|
| H1 | `clamp(46px, 7vw, 92px)` | interlinea 1, tracking -0.02em |
| H2 | `clamp(34px, 4.6vw, 58px)` | interlinea 1.05, tracking -0.015em |
| H3 | 26px | serif |
| Lead | `clamp(17px, 1.5vw, 20px)` | interlinea 1.55, colore `stone` |
| Testo | 16-17px | interlinea 1.6 |
| Etichetta (eyebrow) | 13px, peso 600 | maiuscolo, tracking .08em, puntino `leaf` di 8px a sinistra |

Nell'app i titoli di pagina usano H2 o una versione più piccola (32-40px). Mai titoli in grassetto pesante.

## Forma, spazio, layout

- Raggio: 12px per contenitori, card e pannelli; 10px per bottoni, input e toast; cerchio pieno per i contenitori delle icone.
- Ombre leggerissime, solo su elementi flottanti o in hover: `0 8px 20px rgba(18,32,32,.10)`.
- Bordi sottili, 1px.
- Container: larghezza massima 1240px, margini laterali 20px su mobile e 40px da 768px in su.
- Griglia rigida: 4 colonne su mobile, 12 da 768px, gap 16 / 24px.
- Sezioni della landing: padding verticale 96px su mobile, 150px su desktop.
- Layout allineato a sinistra. Niente composizioni centrate, tranne elementi singoli come la formazione.
- Mobile first. Aree toccabili di almeno 44px.

## Componenti

**Bottone**
- Primario: sfondo `forest`, testo `cream`, altezza 52px (44px la versione piccola), raggio 10px, peso 600. Hover: sfondo `ink`, sale di 1px, ombra leggera; la freccia a destra, se c'è, scorre di 3px.
- Chiaro, per superfici scure: sfondo `cream`, testo `ink`. Hover: sfondo bianco.
- Ghost: bordo 1px trasparente al 24-34%, testo del colore del contesto. Hover: bordo pieno.
- Distruttivo: testo e bordo `danger`, sfondo trasparente.

**Card scura (marketing)**: sfondo `forest`, testo `cream`, raggio 12px, padding 28px. Icona in un cerchio di 48px con bordo `cream` al 18% e icona `sage`. Hover: sale di 4px; il cerchio si riempie di `sage` e l'icona diventa `ink`.

**Card chiara (app)**: sfondo `paper`, bordo 1px, raggio 12px, padding 20-24px. Titolo in serif.

**Input, select, textarea**: sfondo bianco, bordo 1px `rgba(18,32,32,.22)`, raggio 10px, altezza 44px, label sopra in 14px peso 500. Focus: anello di 2px `leaf` al 40%. Errore: bordo e messaggio `danger`.

**Navbar della landing**: barra fissa in alto, sfondo `ink` al 94% con blur, raggio 12px, larghezza massima 1120px, staccata di 20-24px dai bordi. Logo a sinistra, link al centro (nascosti su mobile), "Accedi" e bottone chiaro a destra.

**Sidebar dell'app**: sfondo `ink`, testo `cream`; voce attiva con sfondo `forest` e icona `sage`. Coerente con la navbar della landing.

**Etichetta (eyebrow)**: vedi Tipografia.

**FAQ**: `<details>` / `<summary>` nativi. Separatori 1px, domanda in 18-21px peso 500, chevron dentro un cerchio di 36px che ruota di 180° quando è aperta. In hover il cerchio si riempie di `forest`.

**Timeline**: punti di 44px con icona, linea verticale 1px che li collega. Orari in serif 30px.

**Stati di uno slot di prenotazione**, validi anche per il calendario dell'app:
- libero: bordo tratteggiato;
- prenotato: pieno, `cream` su scuro o `forest` chiaro su chiaro;
- appena prenotato: `signal`, con una pulsazione morbida dell'alone.

**Logo**: la parola "Kickoff" in serif, con il punto finale in `signal` ("Kickoff.").

## Icone

Solo `lucide-react`, tratto 1.5-2, dimensione 18-24px. Mai emoji, in nessun punto dell'interfaccia, nemmeno come segnaposto.

## Animazioni

- Durate 200-350ms con `ease` per hover e transizioni.
- Comparsa allo scroll: dal basso di 24-28px con dissolvenza. Usa `IntersectionObserver`: la funzione CSS `animation-timeline: view()` usata nel riferimento non funziona su Firefox.
- Strisce dell'erba: motivo condiviso, ancorato alla finestra (`background-attachment: fixed`), che scorre da destra a sinistra in 8 secondi per ciclo con `background-position-x` da 0 a -184.03px. Lo stesso motivo copre la hero e il campo della formazione, così passano dall'una all'altro senza interruzioni.
- Formazione 4-3-3: la sezione resta bloccata a schermo pieno (`position: sticky`) per circa 1100px di scroll. Dopo un primo 10% fermo, 12 blocchi dello sfondo e 11 card volano verso l'esterno, con curva ease-in-out e velocità e rotazioni diverse, e fanno emergere la sezione "Il problema". Posizioni, direzioni, velocità e rotazioni di ogni elemento sono nel riferimento. In React va fatto con un hook che scrive le variabili CSS `--p` ed `--e` direttamente sull'elemento tramite ref, senza `setState`, per non rirenderizzare a ogni scroll.
- Sempre `prefers-reduced-motion`: niente strisce in movimento né voli; la formazione si dissolve e basta.

## Implementazione in questo progetto

Il progetto usa Tailwind v4 e shadcn/ui: il design system va espresso lì, non in CSS separato. Fa eccezione la landing, che tiene le animazioni complesse in un `landing.css` dedicato.

In `client/src/index.css`:

1. Togli lo sfondo sfumato del `body`, le utility `primary-button`, `box` e `modal-*` basate sull'indaco, i colori grigi di default e il tema `.dark`, che l'app non usa.
2. Aggiungi i token:

```css
@theme {
  --color-cream: #E6E5DC;
  --color-paper: #F3F2EC;
  --color-ink: #122020;
  --color-forest: #1F3B2D;
  --color-turf: #1D3829;
  --color-turf-stripe: #21402F;
  --color-leaf: #2F5A3C;
  --color-sage: #B9CF9A;
  --color-stone: #3E4B4B;
  --color-signal: #F03117;
  --color-danger: #B42318;
  --font-serif: "Young Serif", Georgia, serif;
  --font-sans: "Instrument Sans", system-ui, sans-serif;
}
```

3. Rimappa le variabili di shadcn sui token, così i componenti in `src/components/ui/` si adeguano da soli:

| Variabile shadcn | Valore |
|---|---|
| `--background` | cream |
| `--foreground` | ink |
| `--card`, `--popover` | paper |
| `--card-foreground`, `--popover-foreground` | ink |
| `--primary` / `--primary-foreground` | forest / cream |
| `--secondary`, `--muted`, `--accent` | `#DCDDD2` |
| `--secondary-foreground`, `--accent-foreground` | ink |
| `--muted-foreground` | stone |
| `--destructive` | danger |
| `--border` | `rgba(18,32,32,.16)` |
| `--input` | `rgba(18,32,32,.22)` |
| `--ring` | leaf |
| `--radius` | `0.75rem` |
| `--sidebar` / `--sidebar-foreground` | ink / cream |
| `--sidebar-primary` / `--sidebar-accent` | sage / forest |
| `--sidebar-border` | `rgba(230,229,220,.10)` |

4. Togli `@fontsource-variable/geist` e il relativo `--font-sans` in `@theme inline`.

## Struttura consigliata della landing

`src/pages/Landing.jsx` compone le sezioni in `src/components/landing/`:

- `LandingNav`
- `Hero`, che contiene `BookingPanel` e `BookingToast`
- `FormationReveal`, che contiene `PlayerCard` e la sezione del problema
- `Solution`, che contiene `FeatureCard`
- `DayTimeline`
- `Faq`
- `CtaBand`
- `LandingFooter`

Testi, card della formazione, FAQ e tappe della timeline in un file di dati (`src/components/landing/content.js`), generati con `map`. Le animazioni in `src/components/landing/landing.css` e nell'hook `src/hooks/useScrollProgress.js`.

## Da non fare

- Gradienti, emoji, colori fuori palette, i grigi o l'indaco di default di shadcn e Tailwind.
- Layout centrati, titoli pesanti, ombre marcate.
- Il rosso `signal` su bottoni o grandi superfici.
- Animazioni veloci, che rimbalzano o partono da sole in loop. Le uniche in loop sono le strisce dell'erba e la pulsazione dello slot "appena prenotato".
