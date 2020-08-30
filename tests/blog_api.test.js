const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const helper = require('./blog_test_helper');
const Blog = require('../models/blog.js');
const User = require('../models/user');

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



describe("bloglist user validation", ()=>{

    beforeEach(async ()=>{
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', passwordHash})
    
        await user.save()
    
      })

    test("checking if password is correct length", async ()=>{

    })

    test("checking if username is correct length", async ()=>{

    })

    test("checking if username and password is passed", async ()=>{

    })


})


afterAll(() => {
    mongoose.connection.close()
  })