const express = require("express");
const path = require("path");
const fs = require("fs");

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
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// GET NOTES

app.get("/api/notes", (req, res) => {
  let notes = fs.readFileSync("./db/db.json", "utf8");
  notes = JSON.parse(notes);
  // console.log(notes);

  res.json(notes);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// unique id
const newUuid = () => {
  let letters = "6b13e2d0f4c5a".split("");
  let indexLengthArr = [8, 4, 4, 4, 12];
  let res = ["", "", "", "", ""];
  for (let i = 0; i < indexLengthArr.length; i++) {
    let indexLength = indexLengthArr[i];
    for (let j = 0; j < indexLength; j++) {
      let randomIndex = Math.floor(Math.random() * indexLength);
      res[i] += letters[randomIndex];
    }
  }
  return res.join("-");
};

app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user

  const newNotes = req.body;
  let notes = fs.readFileSync("./db/db.json", "utf8");
  notes = JSON.parse(notes);
  req.body.id = newUuid();
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));

  // console.log(newNotes);
  notes = JSON.parse(notes);
  // db.json.push(newNotes);
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  let notes = fs.readFileSync("./db/db.json", "utf8");
  notes = JSON.parse(notes);

  let browserId = req.params.id;

  notes = notes.filter((note) => {
    return note.id != browserId;
  });
  // console.log(notes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));

  // console.log(newNotes);
  notes = JSON.parse(notes);
  // db.json.push(newNotes);
  res.json(notes);
});

// kicks off server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
