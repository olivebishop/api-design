const db = require('../config/db');
const User = require('../models/User');

const  createUser =  async (req, res) => {
    const user = req.body;
    User.create(user, (err, result) => {
        if(err){
            res.status(400).json(err);
        }else{
            res.status(201).json({"message": "Successfully created!"});
        }
    })
}

const getAllUsers = async (req, res) => {
    User.findAll((err, result) => {
        if(err){
            res.status(400).json(err);
        }else if(result.length === 0){
            res.status(404).json({"message": "No user found!"})
        }else{
            res.status(200).json(result);
        }
      })
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    User.findById(id, (err, result) => {
      if(err){
          res.status(400).json(err);
      }
      else if(result.length === 0){
        res.status(404).json({"message": "User not found!"});
      }else{
          res.status(200).json(result);
      }
    })
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    user.id = id;
    User.update(user, (err, result) => {
        if(err){
            res.status(400).json(err);
        }else if(result.affectedRows === 0){
            res.status(404).json({"message": "User not found"});
        }else{
            res.status(200).json({"message": "Record updated!"});
        }
    })
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
        if(err){
            res.status(400).json(err);
        }else if(result.affectedRows === 0){
            res.status(404).json({"message": "No user found!"})
        }else{
            res.status(200).json({"message": "User Deleted!"})
        }
    })
}

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById}