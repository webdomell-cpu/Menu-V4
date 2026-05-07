const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

const FILE = "data.json";

// Standard-Daten (16 Artikel)
function getDefaultData() {
  return {
    menuData: Array.from({ length: 16 }, (_, i) => ({
      title: "Produkt " + (i + 1),
      text: "Leckeres Beispielprodukt Beschreibung",
      price: (i + 1) + ".99€",
      image: "https://via.placeholder.com/300x200",
      highlight: false,
      effect: "zoom"
    })),
    settings: {}
  };
}

// GET
app.get("/api/menu", (req, res) => {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify(getDefaultData(), null, 2));
  }
  res.json(JSON.parse(fs.readFileSync(FILE)));
});

// POST
app.post("/api/menu", (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
