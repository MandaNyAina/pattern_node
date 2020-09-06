const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const C = require('./app_modules/constante');

// config app
const app = express();
const port = C.PORT;
const prefix = C.PREFIX;

// middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes file

// routes

// set static file
app.use(`${prefix}/public`, express.static(__dirname+'/assets'));

// run server
app.listen(port, () => {
    console.log(`Server run at ${port}`);
})