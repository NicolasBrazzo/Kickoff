const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createOperator, findOperatorByEmail } = require("../models/user.model");
const { validatePassword } = require("../utils/validatePassword");
const protect = require("../middleware/auth");

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SALT_ROUNDS,
} = require("../config/jwt");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password, admin } = req.body;

    // 🔹 Validazione base dei campi
    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }
    
    // 🔹 Validazione email (rimane semplice)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,  
        error: "Invalid email format",
      });
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length) {
      return res.status(400).json({
        ok: false,
        error: passwordErrors,
      });
    }

    const existingOperator = await findOperatorByEmail(email);
    if (existingOperator) {
      return res.status(409).json({
        ok: false,
        error: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createOperator(name, surname, email, hashedPassword, admin);
    const token = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        admin: user.admin
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      ok: true,
      token,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Missing credentials",
      });
    }

    const operator = await findOperatorByEmail(email);

    if (!operator) {
      return res.status(401).json({
        ok: false,
        error: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, operator.password);

    if (!match) {
      return res.status(401).json({
        ok: false,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        sub: operator.id,
        name: operator.name,
        surname: operator.surname,
        email: operator.email,
        admin: operator.admin
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      ok: true,
      token,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});


/**
 * =========================
 * ME
 * =========================
 *
 * Qui NON facciamo query al DB.
 * Usiamo i dati già validati dal middleware.
 *
 * protect:
 *  - legge header Authorization
 *  - verifica il token
 *  - inserisce req.user
 */
router.get("/me", protect, (req, res) => {
  return res.json({
    ok: true,
    user: req.user,
  });
});


/**
 * =========================
 * LOGOUT
 * =========================
 *
 * Con JWT stateless non esiste vero logout server-side.
 * Il client deve solo cancellare il token.
 */
router.post("/logout", (req, res) => {
  return res.json({ ok: true });
});


module.exports = router;
