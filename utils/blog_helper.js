const { model } = require("../models/blog");
const logger = require("./logger");

const getTokenFrom = request => {  
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

        return authorization.substring(7)
      }  
    return null
}

module.exports  = {
    getTokenFrom
}