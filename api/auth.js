const express = require('express');
const User  = require('../models/user');
const bcrypt = require('bcrypt');

const auth = express.Router();

auth.post('/sign-up', async ( req, res, next ) => {
    const { name, nickname, email, password, emailConfirmed } = req.body;
    try{
        const exUser = await User.findOne({ where: { email }});
        if (exUser){
            return res.redirect('/sign-up?error=exist');
        }
        const hash = await bcrypt.hash(password, 15);
        await User.create({
            name,
            nickname,
            email,
            password: hash,
            emailConfirmed,
        })
        res.send("성공");
    }
    catch (error){
        console.log(error);
        return next(error);
    }
}); 

auth.post('/sign-in', async (req, res, next) => {
    res.send("로그인");
});

module.exports = auth;
