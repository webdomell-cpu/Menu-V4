const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(express.static("public"));

const FILE = "data.json";

// Daten laden
app.get("/data", async (req, res) => {
  try {
    const data = await fs.readJson(FILE);
    res.json(data);
  } catch {
    res.json({ menu: [], settings: {} });
  }
});

// Speichern
app.post("/save", async (req, res) => {
  await fs.writeJson(FILE, req.body, { spaces: 2 });
  io.emit("update");
  res.send("ok");
});

// Remote Steuerung
app.post("/remote", (req, res) => {
  io.emit("remote", req.body);
  res.send("ok");
});

server.listen(3000, () => console.log("Server läuft auf Port 3000"));
