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

const DATA_FILE = "data.json";

app.get("/data", async (req, res) => {
  const data = await fs.readJson(DATA_FILE);
  res.json(data);
});

app.post("/save", async (req, res) => {
  await fs.writeJson(DATA_FILE, req.body, { spaces: 2 });
  io.emit("update");
  res.send("Saved");
});

app.post("/remote", (req, res) => {
  io.emit("remote", req.body);
  res.send("OK");
});

server.listen(3000, () => console.log("Server läuft auf 3000"));
