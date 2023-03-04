const db = require('../config/db');

const User = {
  create: function(user, cb) {
    db.query('INSERT INTO users SET ?', user, function(err, result) {
      if (err) return cb(err);
      return cb(null, result.insertId);
    });
  },

  findById: function(id, cb) {
    db.query('SELECT * FROM users WHERE id = ?', id, function(err, result) {
      if (err) return cb(err);
      return cb(null, result[0]);
    });
  },

  findAll: function(cb) {
    db.query('SELECT * FROM users', function(err, result) {
      if (err) return cb(err);
      return cb(null, result);
    });
  },

  update: function(user, cb) {
    db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, user.password, user.id], function(err, result) {
      if (err) return cb(err);
      return cb(null, result.affectedRows);
    });
  },

  delete: function(id, cb) {
    db.query('DELETE FROM users WHERE id = ?', id, function(err, result) {
      if (err) return cb(err);
      return cb(null, result.affectedRows);
    });
  }
};

module.exports = User;
