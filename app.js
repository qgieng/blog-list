const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const  config  = require('./utils/config');
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')


const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(message=>{
    logger.info("connected to MongoDB: ")
})
.catch(error=>{
    logger.info(`Error connecting to MongoDB ${error.message}`)
})


app.use(cors())
app.use(express.json())

app.use(blogRouter)





module.exports = app;
