// diverse importer
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config(); // Ladda miljövariabler från .env-filen

const express = require("express");
const cors = require("cors");
const dummy = require("./dummy.json");
const customers = require("./customer.json");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.PGURI,
});

// edpoints

app.get("/", (req, res) => {
  res.send({ hello: " World!" });
});

// hämta användare från dummy
app.get("/dummy", (req, res) => {
  console.log(dummy);

  res.json(dummy);
});
// skapa användarkonto - POST
app.post("/api/subscribers", (req, res) => {
  const newSubscriber = req.body;
  res
    .status(201)
    .json({ message: "Subscriber created successfully", data: newSubscriber });
});

// /api/customers - GET
app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customer");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Error fetching customers" });
  }
  console.log(customers);
});

// /api/customers - POST
app.post("/api/customers", async (req, res) => {
  const { company_id, name, phone, address, email } = req.body;
  try {
    const result = await pool.query(
      " INSERT INTO customer (company_id, name, phone, address, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [company_id, name, phone, address, email]
    );
    res.status(201).json(result.rows[0]);

    // res.json(result.rows);
  } catch (error) {
    console.error("Error inserting customer:", error);
    res.status(500).json({ error: "Error inserting customer" });
  }
  console.log(customers);
});

// Företag kan registrera sig

app.registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO company (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [name, email, hashedPassword]
    );
    res.status(201).json({ companyId: result.rows[0].id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

app.loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM company WHERE email = $1`, [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const company = result.rows[0];
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: company.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// hämta alla företag från Company-tabellen
app.get("/api/companies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM company");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Error fetching companies" });
  }
});

// // Skapa en ny post i Company-tabellen
// app.post("/api/companies", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const result = await pool.query(
//       "INSERT INTO company (name, email, password) VALUES ($1, $2, $3) RETURNING *",
//       [name, email, password]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error("Error inserting company:", error);
//     res.status(500).json({ error: "Error inserting company" });
//   }
// });

app.listen(port, () => {
  console.log(`redo på http://localhost:${port}`);
});
