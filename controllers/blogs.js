const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require('../models/user');
const blogRouter = require("express").Router();
const jwt = require('jsonwebtoken');
const helper = require('../utils/blog_helper.js');
const logger = require("../utils/logger");
const { info } = require("../utils/logger");

blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
    response.json(blogs);
})

blogRouter.post("/api/blogs", async (request, response) => {
    const body = request.body;

    //const token = helper.getTokenFrom(request);
   
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!(request.token  && decodedToken)){
        return response.
            status(401).
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
     console.log(savedBlog)
     response.json(savedBlog);
})


blogRouter.put('/api/blogs/:id', async (request, response)=>{
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!(request.token  && decodedToken)){
        return response.
            status(401).
            json({
                error: 'token missing or invalid'}
                )
    }
    const updatedBlog = {
        ...request.body,
        likes: request.body.likes+1,
    }

    const likedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog);
    if(!likedBlog){
        console.log("Like request not valid")
        return response.status(400).json({
            error:'blog id does not exist'
        })
    }

    return likedBlog
})

blogRouter.delete('/api/blogs/:id', async (request, response)=>{
   
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!(request.token  && decodedToken)){
        return response.
            status(401).
            json({
                error: 'token missing or invalid'}
                )
    }
    const deletedBlog = await Blog.findById(request.params.id);
    if(!deletedBlog){
        console.log("Delete Request not valid")
        return response.status(400).json({
            error:'blog id does not exist'
        })
    }
    const loggedUser = await  User.findById(decodedToken.id);

    //remove post association from user
    if(deletedBlog.user.toString() === loggedUser._id.toString()){
        await Blog.findByIdAndDelete(request.params.id);
        loggedUser.blogs = loggedUser.blogs.filter(blog_id=>{ 
            return request.params.id.toString() !== blog_id.toString();
        })
        
    }
    //save user
    loggedUser.save();
    response.json(deletedBlog)

})


module.exports  = blogRouter