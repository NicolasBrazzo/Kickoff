const express = require("express");
const {
  getAllFields,
  getFieldById,
  addNewField,
  updateFieldById,
  deleteFieldById,
} = require("../models/fields.model");
const protect = require("../middleware/auth");

const router = express.Router();

// GET /fields - lista di tutti i campi
router.get("/", protect, async (req, res) => {
  try {
    const fields = await getAllFields();
    return res.json({
      ok: true,
      data: fields,
    });
  } catch (err) {
    console.error("GET FIELDS ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// GET /fields/:id - dettaglio campo
router.get("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid field id",
      });
    }

    const field = await getFieldById(id);

    if (!field) {
      return res.status(404).json({
        ok: false,
        error: "Field not found",
      });
    }

    return res.json({
      ok: true,
      data: field,
    });
  } catch (err) {
    console.error("GET FIELD BY ID ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// POST /fields - aggiungi nuovo campo
router.post("/", protect, async (req, res) => {
  try {
    const { name, type, isCover, hourPrice, isActive } = req.body;

    if (!name || !type || !hourPrice) {
      return res.status(400).json({
        ok: false,
        error: "Missing required field",
      });
    }

    const field = await addNewField(
      name,
      type,
      isCover,
      hourPrice,
      isActive || false,
    );

    return res.status(201).json({
      ok: true,
      data: field,
    });
  } catch (err) {
    console.error("ADD NEW FIELD ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// PUT /fields/:id - modifica campo
router.put("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, type, isCover, hourPrice, isActive } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid field id",
      });
    }

    if (!name || !type || !hourPrice) {
      return res.status(400).json({
        ok: false,
        error: "Missing required field",
      });
    }

    const updated = await updateFieldById(
      id,
      name,
      type,
      isCover,
      hourPrice,
      isActive || false,
    );

    if (!updated) {
      return res.status(404).json({
        ok: false,
        error: "Field not found",
      });
    }

    return res.json({
      ok: true,
      data: updated,
    });
  } catch (err) {
    console.error("UPDATE FIELD ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// DELETE /fields/:id - elimina campo
router.delete("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid field id",
      });
    }

    const deleted = await deleteFieldById(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        error: "Field not found",
      });
    }

    return res.json({
      ok: true,
      data: deleted,
    });
  } catch (err) {
    console.error("DELETE FIELD ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
