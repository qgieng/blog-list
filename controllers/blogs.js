const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require('../models/user');
const blogRouter = require("express").Router();
const jwt = require('jsonwebtoken');
const helper = require('../utils/blog_helper.js');
const logger = require("../utils/logger");

blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
    response.json(blogs);
})

blogRouter.post("/api/blogs", async (request, response) => {
    const body = request.body;

    //const token = helper.getTokenFrom(request);
    logger.info('request _token' ,request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!(request.token  && decodedToken)){
        return response.
            status(404).
            json({
                error: 'token missing or invalid'}
                )
    }
  
          
    const oneUser =await User.findById(decodedToken.id);
    const blog = new Blog({
        ...request.body,
        user:oneUser._id 
    })
     const savedBlog = await blog.save();

     oneUser.blogs = oneUser.blogs.concat(savedBlog.id);
     await oneUser.save();
     response.json(savedBlog);
})


blogRouter.put('/:id', async (request, response)=>{
    
})


module.exports  = blogRouter