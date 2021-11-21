const express = require('express');

const Play = require('../models/play');
const Admin = require('../models/admin');
const { title } = require('process');

const plays = express.Router();
const admins = express.Router();

// 연극 정보 저장
// 접근 권한이 있고 + 디비에 존재하지 않는 연극인 경우 디비에 저장
plays.post('/create/:playid', async (req, res, next) => {
    const { title, price, running_time, troupe, location, poster, yes24_external_link, playDB_external_link, cultureGov_external_link } = req.body;
    const id = req.params.playid;

    const exAdmin = await Admin.findOne({ where: { id }});
    const exPlay = await Play.findOne({ where: { title }});

    //접근 권한이 있는 경우
    if (exAdmin) {
        // //이미 존재하는 연극인 경우 -> 에러
        if (exPlay){
            return res.status(409).json({
                message: '이미 존재하는 연극정보 입니다.',
            });
        }
        // 존재하지 않는 연극인 경우 -> 디비에 연극 정보 생성
        try {
            Play.create({
                // troupe: "a",
                // theater: "a",
                title: title,
                price: price,
                running_time: running_time,
                location: location,
                poster: poster,
                yes24_external_link: yes24_external_link,
                playDB_external_link: playDB_external_link,
                cultureGov_external_link: cultureGov_external_link
            })
            return res.status(200).json({
                message: '저장완료',
            });
        }
        catch {
            return res.status(409).json({
                message: '저장실패 ',
            });
        }
    }
    // 접근 권한이 없는 경우
    return res.status(409).json({
        message: '접근 권한 없음 ',
    });
});

// 연극 정보 수동 저장
plays.post('/data/1', async (req, res, next) => {
    const { title, price, running_time, troupe, location, poster, yes24_external_link, playDB_external_link, cultureGov_external_link } = req.body;
    
    // Admin.create({
    //     name: "a",
    //     nickname: "aa",
    //     email: "aa@naver.com",
    // })

    // Admin.create({
    //     name: "b",
    //     nickname: "bb",
    //     email: "bb@naver.com",
    // })

    // Play.create({
    //     // troupe: "a",
    //     // theater: "a",
    //     title: "c",
    //     price: price,
    //     running_time: running_time,
    //     location: "서울",
    //     poster: poster,
    //     yes24_external_link: yes24_external_link,
    //     playDB_external_link: playDB_external_link,
    //     cultureGov_external_link: cultureGov_external_link
    // })
    return res.status(200).json({
        message: '저장완료',
    });
})

//연극 정보 불러오기(연극개별페)
plays.get('/read/:playid', async (req, res, next) => {
    const title = req.params.playid;
    const exPlay = Play.findOne({ where: { title }});
    if (!exPlay){
        return res.status(400).json({
            message: '존재하지 않는 연극입니다.',
        });
    }
    return res.status(200).json({
        title,
        price,
        running_time,
        location,
        poster,
        yes24_external_link,
        playDB_external_link,
        cultureGov_external_link
    });
})

//연극 정보 수정
plays.post('/update/:playid', async (req, res, next) => {
    const id = req.params.playid;
    const { title, price, running_time, troupe, location, poster, yes24_external_link, playDB_external_link, cultureGov_external_link } = req.body;
    const exPlay = await Play.findOne({ where: { title }});
    
    // 존재하지 않는 연극이면
    if(!exPlay) {
        return res.status(400).json({
            message: "존재하지 않는 연극입니다"
        });
    }
    // 디비에 존재하면 수정
    await Play.update({
        title: title,
        price: price,
        running_time: running_time,
        location: location,
        poster: poster,
        yes24_external_link: yes24_external_link,
        playDB_external_link: playDB_external_link,
        cultureGov_external_link: cultureGov_external_link
    }, {
        where: { id: id },
    });
    return res.status(200).json({
        message: "수정 완료"
    });
})

module.exports = plays;
