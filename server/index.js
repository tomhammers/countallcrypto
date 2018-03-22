const express = require('express');
const bodyParser = require('body-parser');
const DataStore = require('nedb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// load the database file
const db = new DataStore({ filename: './database/portfolios.db', autoload: true });

// pass app and db instance to routes
require('./routes')(app, db);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
