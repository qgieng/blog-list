const User = require('../models/user');
const bcrypt = require('bcrypt');
const UserRouter = require('express').Router();

UserRouter.get('/', async (request, response)=>{
    const users = await User.find({});
    response.json(users);
})

UserRouter.post('/',  async (request, response,next)=>{
    const body = request.body;

    if(body.password === undefined || body.password.length < 4){
        return response.
        status(401).
        json({error:"password length < 4. required password with length greater than 4"})
    }

    if(body.username === undefined || body.username.length < 4){
        return response.
        status(401).
        json({error:"username length < 4. required username with length greater than 4"})
    }

    saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = user.save()
    response.json(savedUser);
   
});






module.exports = UserRouter;