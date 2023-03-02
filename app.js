const express = require('express')
const dotenv = require('dotenv');
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('./controller/UserController');

const app = express();
dotenv.config();

app.use(express.json())

app.get('/users', getAllUsers);

app.get('/users/:id', getUserById);

app.post('/users', createUser);

app.patch('/users/:id', updateUserById);

app.delete('/users/:id', deleteUserById)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}
)
