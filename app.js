const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('express-async-errors');
const  config  = require("./utils/config")
const middleware = require('./utils/middleware')
const logger = require("./utils/logger")
const blogRouter = require("./controllers/blogs")
const UserRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')
const mongoUrl = config.MONGODB_URI


mongoose.set('useCreateIndex', true);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(message=>{
        logger.info("connected to MongoDB: ")
    })
    .catch(error=>{
        logger.info(`Error connecting to MongoDB ${error.message}`)
    })


app.use(cors())
app.use(express.json())
app.use(middleware.morgan_logger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter)
app.use(blogRouter)
app.use('/api/users', UserRouter)

app.use(middleware.errorHandler)


module.exports = app
