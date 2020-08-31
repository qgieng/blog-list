const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require('../models/user');
const blogRouter = require("express").Router();

blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
    response.json(blogs);
})

blogRouter.post("/api/blogs", async (request, response) => {
    const oneUser = await User.findOne({});
    const blog = new Blog({
        ...request.body,
        user:oneUser._id 
    })
     const savedBlog = await blog.save();

     oneUser.blogs = oneUser.blogs.concat(savedBlog.id);
     await oneUser.save();
     response.json(savedBlog);
})


module.exports  = blogRouter