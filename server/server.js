const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const JWT = require('jsonwebtoken');
var cors = require('cors')
//dot env config
dotenv.config();

//Database connection
connectDB();

//rest object
const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));




//rest object
const port = process.env.PORT;
 

//Routes
app.use('/api/v1/auth',authRoutes);

//rest api
app.get("/",(req,res)=>{
    res.send({
        message:"welcome to ecommerce app"
    });
});


app.listen(port,()=>{
    console.log('server is running on port ',port);
});