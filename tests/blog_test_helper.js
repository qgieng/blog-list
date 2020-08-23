const Blog = require('../models/blog');

const initialBlog = [
    {title: "Test Blog1",
    author:"Tester 1",
    url:"https://blog.author.test.com",
    likes: 2
    },
    {title: "Test Blog2",
    author:"Tester 2",
    url:"https://blog.author.test.two.com",
    likes: 1
    }
]

const blogsInDB = async ()=>{
    const blogs = await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
}

module.exports = {
    initialBlog, blogsInDB
}
