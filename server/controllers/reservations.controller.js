const express = require("express");
const {
  getAllReservations,
  getReservationById,
  addNewReservation,
  updateReservationById,
  deleteReservationById,
  getReservationForUsers,
} = require("../models/reservations.model");
const protect = require("../middleware/auth");

const router = express.Router();

const normalizeTime = (timeString) => {
  if (!timeString) return timeString;

  // "HH:MM" → "HH:MM:00"
  if (/^\d{2}:\d{2}$/.test(timeString)) {
    return `${timeString}:00`;
  }

  // Già in formato "HH:MM:SS"
  if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
    return timeString;
  }

  // Qualsiasi altra forma, tronca ai primi 8 caratteri per sicurezza
  return timeString.substring(0, 8);
};

const getReservationByDateAndHour = async (date, start_hour) => {
  const normalizedStart = normalizeTime(start_hour);

  const reservations = await getAllReservations();

  return reservations.find((reservation) => {
    if (reservation.date !== date) return false;

    const dbStart = normalizeTime(reservation.start_hour);
    const dbEnd = normalizeTime(reservation.end_hour);

    // Non permettere nuove prenotazioni il cui orario di inizio
    // cade dentro un intervallo già occupato: [dbStart, dbEnd)
    return dbStart <= normalizedStart && normalizedStart < dbEnd;
  });
};

// GET /reservations - lista di tutte le prenotazioni
router.get("/", protect, async (req, res) => {
  try {
    const reservations = await getAllReservations();
    return res.json({
      ok: true,
      data: reservations,
    });
  } catch (err) {
    console.error("GET RESERVATIONS ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// GET /reservations/:id - dettaglio prenotazione
router.get("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid reservation id",
      });
    }

    const reservation = await getReservationById(id);

    if (!reservation) {
      return res.status(404).json({
        ok: false,
        error: "Reservation not found",
      });
    }

    return res.json({
      ok: true,
      data: reservation,
    });
  } catch (err) {
    console.error("GET RESERVATION BY ID ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// POST /reservations - aggiungi nuovo prenotazione
router.post("/", protect, async (req, res) => {
  try {
    const {
      date,
      start_hour,
      end_hour,
      status,
      client_id,
      field_id,
    } = req.body;

    if (
      !date ||
      !start_hour ||
      !end_hour ||
      !status ||
      !client_id ||
      !field_id
    ) {
      return res.status(400).json({
        ok: false,
        error: "Missing required reservation",
      });
    }

    const reservation_code = Math.random().toString(36).substring(2, 15);

    const normalizedStart = normalizeTime(start_hour);
    const normalizedEnd = normalizeTime(end_hour);

    // Controllo sugli orari per evitare sovrapposizioni basato solo sull'ora di inizio
    const existingReservation = await getReservationByDateAndHour(date, normalizedStart);

    if (existingReservation) {
      return res.status(400).json({
        ok: false,
        error: "Reservation already exists for this date and hour",
      });
    }   
    
    const reservation = await addNewReservation(
      date,
      normalizedStart,
      normalizedEnd,
      status,
      reservation_code,
      client_id,
      field_id,
    );

    return res.status(201).json({
      ok: true,
      data: reservation,
    });
  } catch (err) {
    console.error("ADD NEW RESERVATION ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// PUT /reservations/:id - modifica prenotazione
router.put("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      date,
      start_hour,
      end_hour,
      status,
      reservation_code,
      client_id,
      field_id,
    } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid reservation id",
      });
    }

    if (
      !date ||
      !start_hour ||
      !end_hour ||
      !status ||
      !reservation_code ||
      !client_id ||
      !field_id
    ) {
      return res.status(400).json({
        ok: false,
        error: "Missing required reservation",
      });
    }

    const normalizedStart = normalizeTime(start_hour);
    const normalizedEnd = normalizeTime(end_hour);

    const updated = await updateReservationById(
      id,
      date,
      normalizedStart,
      normalizedEnd,
      status,
      reservation_code,
      client_id,
      field_id,
    );

    if (!updated) {
      return res.status(404).json({
        ok: false,
        error: "Reservation not found",
      });
    }

    return res.json({
      ok: true,
      data: updated,
    });
  } catch (err) {
    console.error("UPDATE RESERVATION ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// DELETE /reservations/:id - elimina prenotazione
router.delete("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid reservation id",
      });
    }

    const deleted = await deleteReservationById(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        error: "Reservation not found",
      });
    }

    return res.json({
      ok: true,
      data: deleted,
    });
  } catch (err) {
    console.error("DELETE RESERVATION ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// GET /reservations/verify-reservation/:reservation_code - verifica prenotazione tramite codice prenotazione
router.get("/verify-reservation/:reservation_code", async (req, res) => {
  try {
    const reservation_code = req.params.reservation_code;

    const reservation = await getReservationForUsers(reservation_code);

    if (!reservation) {
      return res.status(404).json({
        ok: false,
        error: "Reservation not found or invalid",
      });
    }

    return res.json({
      ok: true,
      data: reservation,
    });
  } catch (err) {
    console.error("VERIFY RESERVATION ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
