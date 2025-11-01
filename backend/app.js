// Basic Lib Import
require('dotenv').config();
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');
const path = require("path");
const serverless = require("serverless-http")


// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Database Lib Import
const mongoose = require('mongoose');


// connection Mogodb Database
let URL = "mongodb+srv://<username>:<password>@cluster0.lduuwua.mongodb.net/Authentication?retryWrites=true&w=majority";
let option = { user: 'alamin1234', pass: 'alamin1234', autoIndex: true }
mongoose.connect(URL, option).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err)
})


// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser());



// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)


// Routing Implement
app.use("/api/v1", router);

// Undefined Route Implement
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not Found" })
})

module.exports = app;