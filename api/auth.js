const express = require('express');
const User  = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            emailConfirmed: false,
        })
        res.send("성공");
    }
    catch (error){
        console.log(error);
        return next(error);
    }
}); 

auth.post('/sign-in', async (req, res, next) => {
    const { email, password } = req.body;
    const exUser = await User.findOne({ where: { email }});
    if (!exUser){
        return res.status(400).json({
            message: '아이디가 존재하지 않습니다.',
        });
    }
    const isEqualPw = await bcrypt.compare(password, exUser.password);
    if (isEqualPw){
        // 토큰 발급
        try{
            const token = jwt.sign({
                email: exUser.email,
                nickname: exUser.nickname,
            }, process.env.JWT_SECRET, {
                expiresIn: '10m',
                issuer: 'raonair',
            });
            return res.status(200).json({
                message: '로그인 성공!!',
                token,
            });
        }
        catch(error){
            console.error(error);
        }
    }else{
        return res.status(404).json({
            message: '로그인 실패!!',
        });
    }
});

module.exports = auth;
