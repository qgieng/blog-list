const User = require('../models/user');
const bcrypt = require('bcrypt');
const UserRouter = require('express').Router();

UserRouter.get('/', async (request, response)=>{
    const users = await User.find({});
    response.json(users);
})

UserRouter.post('/', async (request, response)=>{
    const body = request.body;

    saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = user.save();

    response.json(savedUser);
});






module.exports = UserRouter;