const db = require('../config/db');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  db.query(`INSERT INTO users(username, email, password) VALUES('${username}', '${email}', '${password}')`, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const newUser = {
        "user_id": result.insertId,
        "username": username,
        "email": email
      }
      res.status(201).json(newUser);
    }
  })
}

const getAllUsers = async (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else if (result.length === 0) {
      res.status(404).json({ "message": "No user found!" })
    } else {
      res.status(200).json(result);
    }
  })
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM users WHERE user_id='${id}'`, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else if (result.length === 0) {
      res.status(404).json({ "message": "User not found!" });
    } else {
      res.status(200).json(result);
    }
  })
}

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  db.query(`UPDATE users SET username='${username}', email='${email}', password='${password}' WHERE user_id='${id}'`, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else if (result.affectedRows === 0) {
      res.status(404).json({ "message": "User not found" });
    } else {
      res.status(200).json(result);
    }
  })
}

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM users WHERE user_id='${id}'`, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else if (result.affectedRows === 0) {
      res.status(404).json({ "message": "No user found!" })
    } else {
      res.status(200).json(result)
    }
  })
}

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById }
