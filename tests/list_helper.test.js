const listHelper = require('../utils/list_helper');
const totalLikes = listHelper.totalLikes;



test('dummy returns one', () =>{
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});


describe('total likes tests',()=>{

    test('testing totalLikes with zero blogs',()=>{
        let blogs = []
        const result = totalLikes(blogs);
        expect(result).toBe(0);
    });

    test('testing totalLikes with zero blogs',()=>{
        let blogs = [
            {likes: 2},
            {likes: 1}
        ]

        const result = totalLikes(blogs);
        expect(result).toBe(3);
    });

    test('testing totalLikes with zero blogs',()=>{
        let blogs = [
            {likes: 2}
        ]

        const result = totalLikes(blogs);
        expect(result).toBe(2);
    });
});
