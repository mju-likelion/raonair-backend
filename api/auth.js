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


const auth = express.Router();

//회원가입
//이메일에 토큰 담긴 링크를 보내서 걔가 이메일 검증 라우터를 찌르도록.

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

        //이메일 샌드 로직 -> 파라미터로 받아온 이메일로 샌드, 파라미터에 왜 email이면 오류고 emailtoken이면 성공인거지 ? 아악
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
                    from: "ypd06021@naver.com", // 메일 발신 주소
                    to: email,                  // 메일 수신 주소
                    subject: "email-verify",    // 제목
                    // text: emailtoken,           // 텍스트 
                    html: emailtoken,            // html body
                });
                
                console.log("5. 메일 보내기 성공");
                res.send("회원가입 끝 메일 검증해야함 (디비생성하고 메일 보내기 성공)");
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
//-> api에 토큰 넣기 o + email-confirmed 수정 o + 테이블 삭제 
auth.post('/email-verify/:emailtoken', async (req, res, next) => {
    const { emailtoken } = req.params; //수신자 메일로 보냈던 토큰을 파라미터로 받아옴
    // const token = ; // 보관해놓은 토큰
    const { email, token } = req.body;
    console.log(emailtoken);
    console.log(email);
    if( emailtoken == token )
    {
        // 토큰이 일치하면 email-confirmed 1로 변경
        await User.update({
            emailConfirmed: "1",
        }, {
            where: { email: email},
        });
        return res.status(200).json({
            message: '이메일 인증 성공!'
        });
    }
    //이메일 인증 실패 -> 회원가입 때 입력받은 테이블 로우 전체 삭제 ?
    console.log("토큰다름, 디비 로우 삭제해야함");
    await User.destroy({
        where: { email: email },
    });
    return res.status(410).json({
        message: "유효하지 않은 토큰 : 이메일 인증 실패"
    });
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
            console.log(exUser.email);
            console.log(exUser.nickname);
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
            return res.status(500).json({
                code: 500,
                message: '서버에러',
            })
        }
    }else{
        return res.status(404).json({
            message: '로그인 실패!!',
        });
    }
});


//비밀번호 찾기 -> 일단 비밀번호 이메일로 보내주는거 구현, 이후 이메일에서 링크 누르면 비밀번호 재설정할 수 있게 ?
auth.post('/search-pw', async (req, res, next) => {
    const { email } = req.body;
    const exUser = await User.findOne({ where: { email }});

    async function main(email) {

        console.log("이메일 샌드 함수 들어옴");
        try {
            console.log("트라이 들어옴");
            const transporter = nodemailer.createTransport({
                service: 'naver',
                host: 'smtp.naver.com',
                port: 587,
                auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASSWORD
                }
            });
            console.log("transporter까진 정상");

            const emailSend = await transporter.sendMail({
                from: "ypd06021@naver.com",     // 메일 발신 주소
                to: email,                      //메일 수신 주소
                subject: "라온에어 비밀번호 찾기",    // 제목
                // text: emailtoken,            // 텍스트
                html: exUser.password,          // html body
            });

            console.log("메일로 비밀번호 보내기 성공");
            res.send(exUser.password);
            return res.status(200).json({
                message: '메일로 비밀번호 보내기 성공',
            });
        } catch (error) {
            console.log("가입한 적 없거나 올바르지 않은 이메일 주소입니다.");
        }
    };
    main();
});


//비밀번호 초기화 !
//이메일이 일치하는 디비의 비밀번호 칸을 입력받은 비밀번호로 업데이트 : req.body로 이메일 받아오는게 맞는지.
auth.post('/reset-pw', async (req, res, next) => {
    const { name, nickname, email, password } = req.body;
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




/* 수정사항
1. 회원가입 : 토큰을 이메일검증 찌르는 '링크'로 보내기 
2. 이메일샌드 : 메일 발신 주소 그대로 냅둬야하나 ?
3. 이메일검증 : 발행할 토큰 Redis에 보관, 꺼내오기?  + 테이블 삭제
4. 로그인 : -
5. 비밀번호 찾기 : 비밀번호재설정 찌르는 링크로 보내기 
6. 비밀번호 재설정 : 디비에 담긴 비밀번호 로우만 테이블 수정 o
*/
