// diverse importer
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const dummy = require("./dummy.json");

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

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

// /api/subscribers - GET

// /api/subscribers/:id - PUT

// /api/subscribers/:id - DELETE

// jag skickar upp detta senare ikväll

// tabeller

// kunder  - Jonas
// orderhistorik
// produkter
// nyhetsbrev
// kampanjer
app.listen(port, () => {
  console.log(`redo på http://localhost:${port}`);
});
