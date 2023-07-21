const express = require('express');
const app = express();
const homeRoute = require('./routes/home');
const axios = require('axios');

require('dotenv').config({ path: './config/.env' })

//Midleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'));

//Routes
app.use('/', homeRoute)

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Listening to PORT: ${PORT}`)
})