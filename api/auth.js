//user
const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


auth.post('/sign-up', async (req, res, next)=> {
    res.send('sign-up')
    // const { name, email, nickname, password } = req.body;
    // try {
    //     const exUser = await User.findOne({ where: { email } });
    //     if (exUser) {
    //         return res.redirect('/sign-up?error=exist');
    //     }
    //     const hash = await bcrypt.hash(password, 12);
    //     await User.create({
    //         name,
    //         email,
    //         nickname,
    //         password: hash,
    //     });
    //     return res.redirect('/sign-up');
    // } catch (error) {
    //     console.error(error);
    //     return next(error);
    // }
});

auth.post('/sign-in', (req, res, next) => {
    res.send('sign-up')
    // passport.authenticate('local', (authError, user, info) => {
    //     if (authError) {
    //         console.error(authError);
    //         return next(authError);
    //     }
    //     if (!user) {
    //         return res.redirect('/?logincError=${info.message}');
    //     }
    //     console.log(req.login)
    // });
});

module.exports = auth;
