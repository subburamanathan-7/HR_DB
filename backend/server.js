const express = require ('express');
const port = process.env.PORT || 5000

const colors = require('colors');
const dotenv = require('dotenv').config();

const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/dbconfig');
const cors = require('cors')


connectDB()
const app = express();

app.use(express.json()) //Body Parser
app.use(express.urlencoded({extended:false})) //urlEncoded
app.use(cors()) //Cross-Orgin Access



app.use('/api/database',require('./routes/contactRoutes'));
app.use('/api/volunteer',require('./routes/volunteerRoutes'));

app.use(errorHandler);//Overides default ErrorHandler
app.listen(port,()=> console.log(`App up and running on ${port}`))