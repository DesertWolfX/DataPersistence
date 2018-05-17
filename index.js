const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./Chinook_Sqlite_AutoIncrementPKs(2).sqlite');

// const query = `SELECT * FROM Artist LIMIT 5`;
// db.each(query, (err, row) => {
//   if (err) throw err;
//   console.log(row);
// });
//
//db.close();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/form', (req, res) => {
  db.run(
    `INSERT into Artist("ArtistId", "Name") VALUES(${req.body.artistID}, ${"req.body.name"})`,
    (err, row) => {
      if (err) throw err;
      res.redirect(303, '/success');
    }
  );
});

module.exports = app;
