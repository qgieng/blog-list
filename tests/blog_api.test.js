const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const helper = require('./blog_test_helper');
const Blog = require('../models/blog.js');

const api = supertest(app);
beforeEach(async ()=>{
    await Blog.deleteMany({});

    const BlogObj = helper.initialBlog.map(blog=> new Blog(blog));
    const promiseArray = BlogObj.map(blog => blog.save());
    await Promise.all(promiseArray);
})

test('blog testing step1: ', async ()=>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlog.length)
})


test('blog testing step2: unique identifier id name', async ()=>{
    const blogs = await api.get('api/blogs')
    expect(blogs).toBeDefined('id')
})