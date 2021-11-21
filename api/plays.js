const express = require('express');
const Play = require('../models/play');
const Admin = require('../models/admin');
const plays = express.Router();

//연극 정보 저장
// 접근 권한이 있고 + 디비에 존재하지 않는 연극인 경우 디비에 저장
plays.post('/:playid', (req, res, next) => {
    const { title, start_date, end_date, running_time, troupe } = req.body;
    const id = req.params.playid;
    const exPlay = Play.findOne({ where: { id }});

    Admin.create({
        name: "a",
        nickname: "aa",
        email: "ypd06021@naver.com",
    })
    console.log("1. 어드민 정보 저장");

    const exAdmin = Admin.findOne({ where: { id }});

    //접근 권한이 있는 경우
    if (exAdmin) {
        console.log("2. 접근 권한 있음 -> 연극 존재 여부 확인");

        //이미 존재하는 연극인 경우 -> 에러
        if (exPlay){
            return res.status(409).json({
                message: '이미 존재하는 연극정보 입니다.',
            });
        }
        // 존재하지 않는 연극인 경우 -> 디비에 연극 정보 생성
        try {
            await Play.create({
                id: id,
                title: title,
                start_date: start_date,
                end_date: end_date,
                running_time: running_time,
                troupe: troupe,
            })
            console.log("디비에 연극 정보 저장");
        }
        catch {
            return res.status(409).json({
                message: '이미 존재하는 연극정보 입니다.',
            });
        }
    }
    // 접근 권한이 없는 경우
    else {

    }
});

//연극 정보 불러오기(연극개별페)
plays.get('/:playid',(req, res, next) => {
    const { title } = req.body;
    const exPlay = Play.findOne({ where: { title }});
    if (!exPlay){
        return res.status(400).json({
            message: '존재하지 않는 연극입니다.',
        });
    }
    return res.status(200).json({
        title,
        start_date,
        end_date,
        running_time,
        troupe,
    });
})

//연극 정보 수정
plays.post('/:playid',(req, res, next) => {
    
})
module.exports = plays;
