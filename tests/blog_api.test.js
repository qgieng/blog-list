const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const helper = require('./blog_test_helper');
const Blog = require('../models/blog.js');
const User = require('../models/user');
const bcrypt = require('bcrypt')

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
    
})



describe("bloglist user validation", ()=>{

    beforeEach(async ()=>{
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', passwordHash})
    
        await user.save()
    
      })

    test("checking if password is incorrect length", async ()=>{
        const newUser  = {
            username: "root",
            name: "password_length_3",
            password:"abc"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    })

    test("checking if username is correct length", async ()=>{
        const newUser  = {
            username: "roo",
            name: "user_length_3",
            password:"abcdef"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test("checking if username and password is passed", async ()=>{
        const newUser  = {
            username: "testuser",
            name: "correct_pass",
            password:"abcdef"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })


})


afterAll(() => {
    mongoose.connection.close()
  })