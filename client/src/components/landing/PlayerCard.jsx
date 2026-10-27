// Carta di un giocatore della formazione: posizione e volo arrivano come variabili CSS
export const PlayerCard = ({ left, top, ux, uy, r, s, sport, time, name, isNew }) => (
  <div
    className="kick-pc absolute flex flex-col justify-between rounded-[10px] bg-cream text-ink shadow-[0_12px_28px_rgba(0,0,0,.22)]"
    style={{ left: `${left}%`, top: `${top}%`, "--ux": ux, "--uy": uy, "--r": `${r}deg`, "--s": s }}
  >
    <span className="kick-pc-top flex items-center justify-between gap-1 font-semibold uppercase tracking-[0.04em] text-stone">
      {sport}
      {isNew && <span className="size-[7px] flex-none rounded-full bg-signal" />}
    </span>
    <span className="kick-pc-time font-serif leading-none">{time}</span>
    <span className="kick-pc-name truncate text-stone">{name}</span>
  </div>
);
