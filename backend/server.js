const express = require('express')
const connectDB = require('../backend/config/db');
const user_routes = require('../backend/routes/user.routes');
const funiture_routes = require('../backend/routes/furniture.routes');
require('dotenv').config()
const app = express()
const port = 4000;
const cors = require('cors')

// connecttion mongo DB
connectDB()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())

// routes
app.use('/user', user_routes)
app.use('/furniture', funiture_routes)

app.listen(port, () => {
    console.log("le server est lancé sur le port: " + port);
})