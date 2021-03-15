const logger = require('./logger')
const morgan = require('morgan');
const blog_helper = require('./blog_helper');

const tokenExtractor = (request, response, next)=>{
    request.token =  blog_helper.getTokenFrom(request)
    next();
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({
         error: 'malformatted id' 
        })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ 
        error: error.message 
      })  
    }else if(error.name === 'JsonWebTokenError'){
      return response.status(401).json({
        error: 'invalid token'
    })
    }
  
    next(error)
  }

  morgan.token('bodydata', (req , res) => {
    return JSON.stringify(req.body);
  });
  
  const morgan_logger = morgan(':method :url :status :res[content-length] - :response-time ms :bodydata');





  module.exports = {
    errorHandler,
    tokenExtractor,
    morgan_logger
  }