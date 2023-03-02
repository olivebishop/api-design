const express = require('express');
const db = require('./config/db.js');
const app = express()
require('dotenv').config()
const port = process.env.PORT;

// Get all users
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }else{
      console.log(result);
      res.status(200).json(result);
    }
  });
})

// Get a specific user by id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      console.log(result);
      res.status(200).json(result[0]);
    }
  });
})

// Create a new user
app.post('/users', (req, res) =>{
  const { fullname, username, email, password } = req.body;
  db.query("INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)", [fullname, username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log(result);
      res.status(201).json({ message: "User created successfully" });
    }
  });
})

// Update an existing user by id
app.put('/users/:id', (req, res) =>{
  const userId = req.params.id;
  const { fullname, username, email, password } = req.body;
  db.query("UPDATE users SET fullname = ?, username = ?, email = ?, password = ? WHERE id = ?", [fullname, username, email, password, userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      console.log(result);
      res.status(200).json({ message: "User updated successfully" });
    }
  });
})

// Delete a user by id
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      console.log(result);
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
