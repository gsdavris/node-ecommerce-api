const express = require( 'express');
// import mongoose
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const expressValidator = require('express-validator');

// load env variables
require('dotenv').config();
// import routes
const authRoutes =  require('./routes/auth');
const userRoutes =  require('./routes/user');
const categoryRoutes =  require('./routes/category');
const productRoutes =  require('./routes/product');



// app
const app = express();

// db connection
mongoose
    .connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    )
    .then(() => console.log('DB Connected'))
   
mongoose.connection.on('error', err => {
console.log(`DB connection error: ${err.message}`)
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());



// routes middlewares
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port  ${port}`);
});