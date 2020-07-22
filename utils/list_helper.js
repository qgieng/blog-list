const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) =>{
    return blogs.reduce( 
        (sum,blog)=>sum+blog.likes ,
        0)
}

const favoriteBlog = (blogs) =>{
    blogs.sort((a,b)=>{
        return b.likes - a.likes;
    })
    return {
        title:blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes}
};

const mostBlogs = (blogs)=> {
    var dictionary = new Map()
    var max_val= 0;
    var max_key;
    blogs.forEach(blog=>
        dictionary[blog.author]= 0)
    blogs.forEach(blog=>{
        dictionary[blog.author]+= 1;
        if(dictionary[blog.author] > max_val){
            max_key = blog.author;
            max_val= dictionary[blog.author];
        }
    })
    return {author:max_key,
        blogs:max_val}
}

const mostLikes = (blogs)=> {
    var dictionary = new Map()
    var max_val= 0;
    var max_key;
    blogs.forEach(blog=>
        dictionary[blog.author]= 0)
    blogs.forEach(blog=>{
        dictionary[blog.author]+= blog.likes;
        if(dictionary[blog.author] > max_val){
            max_key = blog.author;
            max_val= dictionary[blog.author];
        }
    })
    return {author:max_key,
        likes:max_val}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}