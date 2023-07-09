const { Pool } = require('pg');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'safalkarkey777',
});

//create instance of an express app to handle html requests
const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
//host static files
app.use(express.static(path.join(__dirname)));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name} = req.body; // Extract form data

  const sql = 'INSERT INTO users (name) VALUES ($1)';
  const values = [name];

  //process values sent from html form
  pool.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved successfully');
      res.status(200).send('Data saved successfully');
      // res.redirect('/index.html');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});