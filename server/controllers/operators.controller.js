const express = require("express");
const bcrypt = require("bcrypt");

const {
  getOperators,
  getOperatorById,
  findOperatorByEmail,
  addNewOperator,
  updateOperatorById,
  deleteOperatorById,
} = require("../models/operators.model");
const { validatePassword } = require("../utils/validatePassword");
const protect = require("../middleware/auth");
const { SALT_ROUNDS } = require("../config/jwt");

const router = express.Router();

const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({
      ok: false,
      error: "Forbidden: admin access required",
    });
  }
  next();
};

// GET /operators - lista di tutti gli operatori
router.get("/", protect, requireAdmin, async (req, res) => {
  try {
    const operators = await getOperators();
    return res.json({
      ok: true,
      data: operators,
    });
  } catch (err) {
    console.error("GET OPERATORS ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// POST /operators - aggiungi nuovo operatore
router.post("/", protect, requireAdmin, async (req, res) => {
  try {
    const { name, surname, email, password, admin } = req.body;

    // Validazione base
    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }

    // Validazione email semplice
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid email format",
      });
    }

    // Validazione password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length) {
      return res.status(400).json({
        ok: false,
        error: passwordErrors,
      });
    }

    // Email UNIQUE
    const existing = await findOperatorByEmail(email);
    if (existing) {
      return res.status(409).json({
        ok: false,
        error: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const operator = await addNewOperator(
      name,
      surname,
      email,
      hashedPassword,
      admin
    );

    return res.status(201).json({
      ok: true,
      data: operator,
    });
  } catch (err) {
    console.error("ADD NEW OPERATOR ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// PUT /operators/:id - modifica operatore
router.put("/:id", protect, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, surname, email, password, admin } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid operator id",
      });
    }

    if (!name || !surname || !email) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }

    // Controllo che l'operatore esista
    const existingOperator = await getOperatorById(id);
    if (!existingOperator) {
      return res.status(404).json({
        ok: false,
        error: "Operator not found",
      });
    }

    // Controllo univocità email se cambiata
    if (email !== existingOperator.email) {
      const emailOwner = await findOperatorByEmail(email);
      if (emailOwner) {
        return res.status(409).json({
          ok: false,
          error: "Email already in use",
        });
      }
    }

    let hashedPassword;

    if (password) {
      const passwordErrors = validatePassword(password);
      if (passwordErrors.length) {
        return res.status(400).json({
          ok: false,
          error: passwordErrors,
        });
      }

      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updated = await updateOperatorById(
      id,
      name,
      surname,
      email,
      hashedPassword,
      admin
    );

    return res.json({
      ok: true,
      data: updated,
    });
  } catch (err) {
    console.error("UPDATE OPERATOR ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// DELETE /operators/:id - elimina operatore
router.delete("/:id", protect, requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid operator id",
      });
    }

    const deleted = await deleteOperatorById(id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        error: "Operator not found",
      });
    }

    return res.json({
      ok: true,
      data: deleted,
    });
  } catch (err) {
    console.error("DELETE OPERATOR ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
