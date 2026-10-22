const express = require("express");
const {
  getClients,
  getClientById,
  addNewClient,
  updateClientById,
  deleteClientById,
} = require("../models/clients.model");
const protect = require("../middleware/auth");

const router = express.Router();

// GET /clients - lista di tutti i clienti
router.get("/", protect, async (req, res) => {
  try {
    const clients = await getClients();
    return res.json({
      ok: true,
      data: clients,
    });
  } catch (err) {
    console.error("GET CLIENTS ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// GET /clients/:id - dettaglio cliente
router.get("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid client id",
      });
    }

    const client = await getClientById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        error: "Client not found",
      });
    }

    return res.json({
      ok: true,
      data: client,
    });
  } catch (err) {
    console.error("GET CLIENT BY ID ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// POST /clients - aggiungi nuovo cliente
router.post("/", protect, async (req, res) => {
  try {
    const { name, surname, phone, email, note } = req.body;

    if (!name || !surname || !phone || !email) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }

    const client = await addNewClient(name, surname, phone, email, note || null);

    return res.status(201).json({
      ok: true,
      data: client,
    });
  } catch (err) {
    console.error("ADD NEW CLIENT ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// PUT /clients/:id - modifica cliente
router.put("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, surname, phone, email, note } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid client id",
      });
    }

    if (!name || !surname || !phone || !email) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }

    const updated = await updateClientById(
      id,
      name,
      surname,
      phone,
      email,
      note || null
    );

    if (!updated) {
      return res.status(404).json({
        ok: false,
        error: "Client not found",
      });
    }

    return res.json({
      ok: true,
      data: updated,
    });
  } catch (err) {
    console.error("UPDATE CLIENT ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// DELETE /clients/:id - elimina cliente
router.delete("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid client id",
      });
    }

    const deleted = await deleteClientById(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        error: "Client not found",
      });
    }

    return res.json({
      ok: true,
      data: deleted,
    });
  } catch (err) {
    console.error("DELETE CLIENT ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
