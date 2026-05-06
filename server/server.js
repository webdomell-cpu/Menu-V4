const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

let settings = {
  backgroundType: "color",
  backgroundColor: "#0f1f1a",
  backgroundImage: "",
  cardColor: "#163326",
  textColor: "#ffffff"
};

let menuData = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  title: "Artikel " + (i + 1),
  text: "Leckeres Produkt",
  price: (i + 3) + "€",
  image: i < 8
    ? "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    : "https://images.unsplash.com/photo-1550547660-d9450f859349",
  sticker: true,
  stickerType: "circle",
  stickerColor: "#ffcc00"
}));

app.get("/api/menu", (req, res) => res.json({ menuData, settings }));

app.post("/api/menu", (req, res) => {
  menuData = req.body.menuData;
  settings = req.body.settings;

  wss.clients.forEach(c => {
    if (c.readyState === 1) {
      c.send(JSON.stringify({ menuData, settings }));
    }
  });

  res.sendStatus(200);
});

wss.on("connection", ws => {
  ws.send(JSON.stringify({ menuData, settings }));
});

server.listen(process.env.PORT || 3000);
