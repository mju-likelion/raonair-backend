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

const emailsendhtml = require('../templates/emailsend')

const emailSend = express.Router();


const emailSend = async function main(email) {
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
};

module.exports = emailSend;