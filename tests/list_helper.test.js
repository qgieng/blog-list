/* eslint-disable indent */
const listHelper = require("../utils/list_helper");
const totalLikes = listHelper.totalLikes;
const favoriteBlog = listHelper.favoriteBlog;
const mostBlogs = listHelper.mostBlogs;
const mostLikes = listHelper.mostLikes;

const blogs = [ 
    { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

test("dummy returns one", () =>{
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});


describe("total likes tests",()=>{

    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    test("testing totalLikes with zero blogs",()=>{
        let blogs = []
        const result = totalLikes(blogs);
        expect(result).toBe(0);
    });

    test("testing totalLikes with two blogs",()=>{
        let blogs = [
            {likes: 2},
            {likes: 1}
        ]

        const result = totalLikes(blogs);
        expect(result).toBe(3);
    });

    test("testing totalLikes with 1 blog",()=>{
        let blogs = [
            {likes: 2}
        ]

        const result = totalLikes(blogs);
        expect(result).toBe(2);
    });

   
    
    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test("when list of blogs have multiple entries", () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36);
    })

});


describe("favorite blogs",()=>{


    test("find favorite blog from list of blogs", ()=>{
        let result = favoriteBlog(blogs);
        const expectation = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }
        expect(result).toEqual(expectation);
    });


});



describe("most blogs",()=>{

    test("find the author with most blogs", ()=>{
        let result = mostBlogs(blogs);
        const expectation = {
            author: "Robert C. Martin",
            blogs: 3
          }
        expect(result).toEqual(expectation);
    });


});


describe("most blogs likes",()=>{
    

    test("find the author with most blogs likes", ()=>{
        let result = mostLikes(blogs);
        const expectation = {
            author: "Edsger W. Dijkstra",
            likes: 17
          }
        expect(result).toEqual(expectation);
    });


});

