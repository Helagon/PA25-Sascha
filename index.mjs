import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Ordner "public" für statische Dateien freigeben
app.use(express.static(path.join(__dirname, "public")));

// Beispiel für weitere Route
app.get("/info", (req, res) => {
  res.send("<h2>Dies ist eine zusätzliche Seite</h2>");
});

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
