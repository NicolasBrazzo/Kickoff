require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./controllers/auth.controller");
const clientsRoutes = require("./controllers/clients.controller");
const fieldsRoutes = require("./controllers/fields.controller");
const reservationsRoutes = require("./controllers/reservations.controller");
const operatorsRoutes = require("./controllers/operators.controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/clients", clientsRoutes);
app.use("/fields", fieldsRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/operators", operatorsRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Middleware for server errors
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend ON at port ${PORT}`);
});
