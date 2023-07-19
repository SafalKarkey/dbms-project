/*
DBMS project to store data sent through html into a SQL server.
Server used: postgreSQL
Framework used: Express
*/ 

const { Pool } = require('pg');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//create instance of an express app to handle html requests
const app = express();

//host static files
//static files for client side is named public
//app.use provides middleware
app.use('/public', express.static(path.join(__dirname, '/static')));
//middleware to parse form submissions
app.use(bodyParser.urlencoded({ extended: true }));


//get(route, callback)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/dbms', (req, res)=>{
  res.send("dbms")
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name } = req.body; // Extract form data

  console.log(name);
  const sql = 'INSERT INTO users (name) VALUES ($1)';
  const values = [name];

  //process values sent from html form
  pool.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved successfully');
      res.redirect("public/index.html");
    }
  });
});

app.post('/delete-name', (req, res)=>{
  const { delname } = req.body;

  console.log(delname);
  const sql = 'DELETE FROM users WHERE name = $1';
  const values = [delname];

  pool.query(sql, values, (error, result)=>{
    if(error){
      console.error('Error deleting data: ', error);
      res.status(500).send('Couldnt delete');
    } else{
      console.log('Data deleted ($1) successfully');
      // res.status(200).send('Data deleted');
      res.redirect("public/index.html");
    }
  });
});

app.post('/clear', (req, res)=>{
  const { clear } = req.body;

  const sql = 'TRUNCATE TABLE users';
  // const values = [clear];

  pool.query(sql, (error, result)=>{
    if(error){
      console.error('Error deleting data: ', error);
      res.status(500).send('Couldnt delete');
    } else{
      console.log('Data deleted successfully');
      // res.status(200).send('Data deleted');
      res.redirect("public/index.html");
    }
  });
});

// Start the server
app.listen(3000, () => {
  
  console.log('Server started on port 3000');
});

app.get('/get-data', (req, res)=>{
  const sql = "SELECT name FROM users";
  pool.query(sql, (error, result) => {
    if(error){
      console.error('Error fetching user data: ', error);
      res.status(500).send('Error fetching user data');
    } else {
      const users = result.rows;
      res.json(users);
      // res.redirect('public/tableData.html');
      // res.redirect("index/html");
    }
  });
}); 