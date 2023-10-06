const express = require('express')
const connectDB = require('../backend/config/db');
const user_routes = require('../backend/routes/user.routes');
require('dotenv').config()
const app = express()
const port = 4000;

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/user', user_routes)

app.listen(port, () => {
    console.log("le server est lancé sur le port: " + port);
})