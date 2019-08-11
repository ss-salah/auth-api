const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true }, 
()=>{
    console.log('Connected to DB!');
});


// Middlewares
app.use(express.json());
// Route Middlewares
app.use('/api/user', authRoute);


//Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listenning on port ${port}`));