const express = require('express')
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/v1', userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});