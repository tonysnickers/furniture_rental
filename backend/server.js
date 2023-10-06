const express = require('express')
const app = express()
const port = 4000;
const user_routes = require('../backend/routes/user.routes')

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/user', user_routes)

app.listen(port, () => {
    console.log("le server est lancé sur le port: " + port);
})