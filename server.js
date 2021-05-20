const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// HTML Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// API Routes
app.get("/api/notes", (req, res) => res.json(note));

// create notes with JSON input
app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNotes = req.body;

  console.log(newNotes);

  notes.push(newNotes);
  res.json(newNotes);
});
// kicks off server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
