import {
  Bell,
  CalendarCheck,
  CalendarX,
  Clock,
  LayoutGrid,
  MessageSquare,
  Phone,
  RotateCcw,
  Smartphone,
} from "lucide-react";

// Testi e dati della landing: le sezioni li leggono da qui e li generano con map

export const navLinks = [
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Vantaggi", href: "#vantaggi" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  titleLines: ["Meno telefonate.", "Più partite."],
  lead: "Kickoff raccoglie le prenotazioni del tuo campo in un unico calendario online. I giocatori prenotano da soli, tu pensi al resto.",
  primaryCta: "Registra il tuo campo",
  secondaryCta: "Guarda come funziona",
  strip: [
    "Pronto in pochi minuti",
    "Nessuna app da installare",
    "Prenotazioni aperte giorno e notte",
  ],
};

// Stati degli slot: b = prenotato, f = libero, n = appena prenotato
export const bookingPanel = {
  title: "Oggi",
  meta: "Martedì 21 · 3 campi",
  hours: ["17", "18", "19", "20", "21", "22"],
  rows: [
    { field: "Calcetto", slots: ["b", "b", "f", "b", "n", "f"] },
    { field: "Tennis", slots: ["f", "b", "b", "b", "f", "f"] },
    { field: "Basket", slots: ["b", "f", "f", "b", "b", "f"] },
  ],
  legend: { f: "Libero", b: "Prenotato", n: "Appena prenotato" },
};

export const bookingToast = {
  title: "Nuova prenotazione",
  detail: "Calcetto · 21:00 · Luca R.",
  time: "ora",
};

export const problem = {
  eyebrow: "Il problema",
  title: "Gestire gli orari non dovrebbe essere un secondo lavoro.",
  items: [
    {
      icon: Phone,
      title: "Il telefono non smette mai",
      text: "Chiamate e messaggi a ogni ora solo per sapere se il campo è libero.",
    },
    {
      icon: CalendarX,
      title: "Le doppie prenotazioni",
      text: "Agenda, fogli Excel, chat: basta una svista e due squadre arrivano alla stessa ora.",
    },
    {
      icon: Clock,
      title: "I buchi dell'ultimo minuto",
      text: "Chi disdice tardi lascia un orario vuoto che nessuno riesce più a riempire.",
    },
  ],
};

// Campo che si apre allo scroll: 12 tessere (griglia 4x3, in ordine di riga)
// e 11 giocatori in 4-3-3. ux/uy = direzione di volo, s = quanto lontano, r = rotazione finale
export const formation = {
  label: "La squadra di oggi",
  meta: "11 prenotazioni, 4 campi",
  hint: "Scorri",
  tiles: [
    { ux: -0.75, uy: -0.66, s: 1 },
    { ux: -0.35, uy: -0.94, s: 1.15 },
    { ux: 0.35, uy: -0.94, s: 1.1 },
    { ux: 0.75, uy: -0.66, s: 1.05 },
    { ux: -1, uy: 0, s: 1.1 },
    { ux: -0.97, uy: -0.25, s: 1.3 },
    { ux: 0.97, uy: 0.25, s: 1.25 },
    { ux: 1, uy: 0, s: 1.05 },
    { ux: -0.75, uy: 0.66, s: 1.15 },
    { ux: -0.35, uy: 0.94, s: 1.05 },
    { ux: 0.35, uy: 0.94, s: 1.2 },
    { ux: 0.75, uy: 0.66, s: 1 },
  ],
  players: [
    { left: 26, top: 18, ux: -0.6, uy: -0.8, r: -18, s: 1.1, sport: "Tennis", time: "18:00", name: "Giulia M." },
    { left: 50, top: 15, ux: 0, uy: -1, r: 6, s: 1.25, sport: "Calcetto", time: "21:00", name: "Luca R.", isNew: true },
    { left: 74, top: 18, ux: 0.6, uy: -0.8, r: 20, s: 1.05, sport: "Padel", time: "19:30", name: "Andrea B." },
    { left: 30, top: 41, ux: -0.91, uy: -0.41, r: -24, s: 1.2, sport: "Basket", time: "20:00", name: "Sara T." },
    { left: 50, top: 38, ux: 0.25, uy: -0.97, r: 12, s: 1.35, sport: "Calcetto", time: "17:00", name: "Marco D." },
    { left: 70, top: 41, ux: 0.91, uy: -0.41, r: 16, s: 1.15, sport: "Tennis", time: "09:00", name: "Elena P." },
    { left: 14, top: 62, ux: -0.95, uy: 0.32, r: -30, s: 1, sport: "Padel", time: "12:30", name: "Paolo F." },
    { left: 38, top: 67, ux: -0.58, uy: 0.82, r: -10, s: 1.3, sport: "Calcetto", time: "22:00", name: "Davide C." },
    { left: 62, top: 67, ux: 0.58, uy: 0.82, r: 14, s: 1.1, sport: "Basket", time: "16:00", name: "Chiara L." },
    { left: 86, top: 62, ux: 0.95, uy: 0.32, r: 28, s: 1.05, sport: "Tennis", time: "11:00", name: "Fabio N." },
    { left: 50, top: 85, ux: -0.2, uy: 0.98, r: -8, s: 1.2, sport: "Calcetto", time: "20:00", name: "Simone G." },
  ],
};

export const solution = {
  eyebrow: "La soluzione",
  title: "Un calendario che lavora al posto tuo.",
  lead: "Tutti i tuoi campi, tutti gli orari, in un'unica pagina che i tuoi clienti possono consultare quando vogliono.",
  features: [
    {
      icon: CalendarCheck,
      title: "Prenotazioni sempre aperte",
      text: "I giocatori vedono gli orari liberi e prenotano in autonomia, anche di notte.",
    },
    {
      icon: Bell,
      title: "Promemoria automatici",
      text: "Un messaggio prima della partita riduce chi si dimentica di presentarsi.",
    },
    {
      icon: RotateCcw,
      title: "Orari liberati subito",
      text: "Se qualcuno disdice, lo slot torna disponibile per tutti in un attimo.",
    },
    {
      icon: LayoutGrid,
      title: "Ogni sport, un solo posto",
      text: "Calcetto, tennis, padel, basket: ogni campo con le sue regole e i suoi orari.",
    },
  ],
};

export const timeline = {
  eyebrow: "Come funziona",
  title: "Un martedì qualsiasi, con Kickoff.",
  steps: [
    {
      icon: Smartphone,
      time: "08:12",
      text: "Luca prenota il calcetto delle 21:00 dal telefono, mentre fa colazione.",
    },
    {
      icon: MessageSquare,
      time: "08:12",
      text: "Ti arriva la notifica. Nessuna chiamata da richiamare.",
    },
    {
      icon: Bell,
      time: "18:00",
      text: "Kickoff ricorda a Luca e alla sua squadra la partita di stasera.",
    },
    {
      icon: RotateCcw,
      time: "19:30",
      text: "Il tennis delle 20:00 viene disdetto. Lo slot si libera e dopo 12 minuti è di nuovo prenotato.",
      highlight: true,
    },
  ],
};

export const faq = {
  title: "Domande frequenti",
  contactPrefix: "Non trovi la risposta?",
  contactLabel: "Scrivici",
  contactHref: "#", // da collegare alla pagina contatti
  items: [
    {
      question: "Devo installare qualcosa?",
      answer: "No. Kickoff funziona dal browser, su computer e telefono. Anche i tuoi clienti prenotano senza scaricare app.",
    },
    {
      question: "I miei clienti devono registrarsi?",
      answer: "Basta nome e numero di telefono alla prima prenotazione. Dalla seconda, due tocchi.",
    },
    {
      question: "Posso gestire più campi e sport diversi?",
      answer: "Sì. Ogni campo ha i suoi orari, durate e prezzi.",
    },
    {
      question: "Posso bloccare orari per corsi o tornei?",
      answer: "Sì, puoi riservare fasce ricorrenti che non compaiono come disponibili.",
    },
  ],
};

export const ctaBand = {
  title: "Il prossimo weekend, lascia che prenotino da soli.",
  text: "Registra il tuo campo oggi e condividi il link con i tuoi clienti.",
  cta: "Registra il tuo campo",
};

// Gli href "#" sono segnaposto per pagine non ancora esistenti
export const footer = {
  tagline: "Il calendario per chi gestisce campi sportivi.",
  columns: [
    {
      title: "Prodotto",
      links: [
        { label: "Come funziona", href: "#come-funziona" },
        { label: "Vantaggi", href: "#vantaggi" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi siamo", href: "#" },
        { label: "Contatti", href: "#" },
      ],
    },
    {
      title: "Legale",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Termini", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Kickoff",
};
