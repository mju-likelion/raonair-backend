const express = require('express');
const User  = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { isNativeError } = require('util/types');
const { getMaxListeners } = require('process');
const dotenv = require('dotenv');
const { token } = require('morgan');
const redis = require("redis");
const redisClient = redis.createClient({ host : "127.0.0.1", port : 6379, db : 0 });

// const emailsendhtml = require('../templates/emailsend')

const auth = express.Router();

//회원가입
auth.post('/sign-up', async ( req, res, next ) => {
    const { name, nickname, email, password, emailConfirmed } = req.body;
    try{
        const exUser = await User.findOne({ where: { email }});
        //이미 존재하는 아이디인 경우
        if (exUser){
            return res.status(409).json({
                message: '이미 존재하는 이메일 입니다.',
            });
        }
        // 디비에 사용자 정보 생성
        const hash = await bcrypt.hash(password, 15);
        await User.create({
            name,
            nickname,
            email,
            password: hash,
            emailConfirmed: false,
        })
        console.log("1. 연결된 디비에 로우 생성, 이메일 보내야함");

        //토큰 발행
        const emailtoken = crypto.randomBytes(20).toString("hex");
        console.log("2. 토큰 발행 : " + emailtoken);
        
        //토큰 redis에 저장
        redisClient.setex(email, 50, emailtoken); // 소멸시간 설정
        //redis에 토큰 잘 들어갔는지 확인
        redisClient.get(email, function(err, redistoken) {
            console.log("redis에 저장된 토큰은" + redistoken);
        });

        async function main() {
            console.log("3. 이메일 샌드 함수 들어옴");

            try {
                dotenv.config();
                const transporter = nodemailer.createTransport({
                    service: 'naver',
                    host: 'smtp.naver.com',
                    port: 587,
                    auth: {
                    user: process.env.MAIL_EMAIL,
                    pass: process.env.MAIL_PASSWORD
                    }
                });
                console.log("4. transporter까진 정상");

                const emailSend = await transporter.sendMail({
                    from: process.env.MAIL_EMAIL, // 메일 발신 주소
                    to: email,                  // 메일 수신 주소
                    subject: "라온에어 이메일 인증",    // 제목
                    // text: emailtoken,           // 텍스트 
                    // html: emailtoken,            // html로 토큰만 보내기
                    html: emailsendhtml //html로 이메일인증 링크 보내기
                });
                return res.status(200).json({
                    message: '이메일 보내기 성공!'
                });
                console.log("5. 메일 보내기 성공");
            } catch (error) {
                console.log("이메일인증실패");
            }
        };
        main();

        console.log("6. 이메일 보냈고, 토큰은? " + emailtoken);
    }
    catch (error){
        console.log(error);
        return next(error);
    }
}); 


//이메일 인증
auth.post('/email-verify/:emailtoken', async (req, res, next) => {
    const { emailtoken } = req.params; //수신자 메일로 보냈던 토큰을 파라미터로 받아옴(사용자)
    const { email } = req.body;
    
    // 받아온 이메일, 보낸 토큰, 보관 토큰 확인
    console.log("이메일:" + email + "보낸 토큰:" + emailtoken);
    redisClient.get(email, function(err, redistoken) {
        console.log("redis 토근은" + redistoken);
    });;

    const exUser = await User.findOne({ where: { email }});

    redisClient.get(email, function (err,redistoken) {
        if(err) throw err;
        
        // 인증성공 : 디비에 사용자 정보 존재 + 보관한 토큰이 not null + 보관한 토큰과 발급한 토큰이 같으면
        if( redistoken !== null && emailtoken == redistoken && exUser) {
            console.log("이메일토큰:" + emailtoken + "보관토큰" + redistoken)
            User.update({  
                emailConfirmed: "1",
            }, {
                where: { email: email },
            });
            return res.status(200).json({
                message: '이메일 인증 성공!'
            });
        } else {
            console.log("토큰다름, 디비 로우 삭제해야함");
            User.destroy({  
                where: { email: email },
            });
            console.log("디비에 로우 삭제 완료");
            return res.status(410).json({
                message: "유효하지 않은 토큰 : 이메일 인증 실패"
            });
        }
    })
});


//로그인
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


//비밀번호 찾기
//디비에 존재하는 이메일이면 메일로 비밀번호재설정하는 링크보내기
auth.post('/find-password/user/:userid', async (req, res, next) => {
    const { email } = req.body;
    const exUser = await User.findOne({ where: { email }});
    if (!exUser){
        return res.status(400).json({
            message: '가입하지 않은 아이디입니다.',
        });
    }
    //이메일 존재하면 비밀번호 변경 메일 발송
    try {
        const transporter = nodemailer.createTransport({
            service: 'naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD
            }
        });
        const emailSend = await transporter.sendMail({
            from: "ypd06021@naver.com",     // 메일 발신 주소
            to: email,                      //메일 수신 주소
            subject: "라온에어 비밀번호 찾기",    // 제목
            html: '<p>아래의 버튼을 클릭해주세요 !</p>' +
            "<a href='http://localhost:8000/api/auth/reset-pw'>비밀번호 변경하기</a>" //비밀번호 변경 링크 보내기
        });

        console.log("메일로 비밀번호 재설정 링크 보내기 성공");
        return res.status(200).json({
            message: '메일로 비밀번호 재설정 링크 보내기 성공',
        });
    } catch (error) {
        console.log("올바르지 않은 이메일 주소입니다.");
        return next(error);
    }
});

//비밀번호 초기화
auth.post('/reset-password', async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const resetpw = await bcrypt.hash(password, 15);
        await User.update({
            password: resetpw,
        }, {
            where: { email: email },
        });
        res.send("디비에 비밀번호 변경 성공");
    } catch (error){
        console.log(error);
        return next(error);
    }
});

module.exports = auth;