const express = require("express");
const fs = require("fs-extra");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });
const FILE = "data.json";

// LOAD
app.get("/data", async (req, res) => {
  try {
    const data = await fs.readJson(FILE);
    res.json(data);
  } catch {
    res.json({ menu: Array(16).fill({}), settings: {} });
  }
});

// SAVE
app.post("/save", async (req, res) => {
  await fs.writeJson(FILE, req.body, { spaces: 2 });
  io.emit("update");
  res.send("ok");
});

// IMAGE UPLOAD
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ path: "/" + req.file.path });
});

// REMOTE
app.post("/remote", (req, res) => {
  io.emit("remote", req.body);
  res.send("ok");
});

server.listen(3000, () => console.log("Server läuft"));
