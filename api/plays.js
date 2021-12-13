const express = require('express');
const Play = require('../models/play');
const Admin = require('../models/admin');
const Comment = require('../models/comment');
const { title } = require('process');
const { resourceLimits } = require('worker_threads');

const plays = express.Router();
const admins = express.Router();

// 연극 정보 저장
// 접근 권한이 있고 + 디비에 존재하지 않는 연극인 경우 디비에 저장
plays.post('/create/:playid', async (req, res, next) => {
    const { title, price, running_time, troupe, location, poster, yes24_external_link, playDB_external_link, cultureGov_external_link } = req.body;
    const id = req.params.playid;

    const exAdmin = await Admin.findOne({ where: { id }});
    const exPlay = await Play.findOne({ where: { title }});

    try {
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
    }
    catch (error) {
        return next(error);
    }
});

// 어드민, 연극 정보 수동 저장
plays.post('/data', async (req, res, next) => {
    const { title, price, running_time, troupe, location, poster, yes24_external_link, playDB_external_link, cultureGov_external_link } = req.body;
    
    Admin.create({
        name: "a",
        nickname: "aa",
        email: "aa@naver.com",
    })

    Admin.create({
        name: "b",
        nickname: "bb",
        email: "bb@naver.com",
    })

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

//연극 정보 조회(연극개별페)
//req.body로 받아온 title로 조회
plays.post('/read', async (req, res, next) => {
    const { title } = req.body;

    try {
        const exPlay = await Play.findOne({ where: { title }});
        if (!exPlay){
            return res.status(400).json({
                message: '존재하지 않는 연극입니다.',
            });
        }
        const play = await Play.findOne({ where: {title},
            attributes: ['price', 'poster', 'running_time', 'location', 'poster', 'yes24_external_link', 'playDB_external_link', 'cultureGov_external_link'],
        });

        return res.status(200).json({
            message: "조회성공",
            price: play.price,
            running_time: play.running_time,
            location: play.location,
            poster: play.poster,
            yes24_external_link: play.yes24_external_link,
            playDB_external_link: play.playDB_external_link,
            cultureGov_external_link: play.cultureGov_external_link
        });
    }
    catch (error) {
        return next(error);
    }
});

//연극 정보 수정
//req.body의 title로 디비에 연극 존재 여부 확인, 수정
plays.post('/update', async (req, res, next) => {
    const { title, price, running_time, troupe, location, poster, yes24_external_link, playDB_external_link, cultureGov_external_link } = req.body;
    const exPlay = await Play.findOne({ where: { title }});
        
    try {
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
            where: { title: title },
        });
        return res.status(200).json({
            message: "수정 완료"
        });
    }
    catch (error) {
        return next(error);
    }
});

// 연극 댓글 페이징
plays.get('/:id/comment/:page', async(req, res, next)=> {
    try{
        const playId = req.params.id;
        const pageNum = req.params.page;
        const commentLimit = 5 * pageNum;

        const commentList = await Comment.findAll({
            where: {play: playId}
        });
        
        const newCommentList = [];

        // 현재 페이지에서 보여줄 데이터의 갯수만큼
        for (step = commentLimit-5 ; step < commentLimit; step++){
            newCommentList.push(commentList[step]);
        }

        // limit 보다 적은 수의 데이터가 있거나, limit 다음 데이터가 없는 경우 '더 이상 표시할 데이터가 없습니다.'
        // 만약 newCommentList에 null이 있는 경우 (더 이상 보여줄 데이터 없음) 존재하는 값들만 반환
        if ((newCommentList.includes(undefined, 0) == true) || (commentList[commentLimit+1] == undefined)){
            const resultComment = newCommentList.filter((element, i) => element != null);
            res.json({
                'data': resultComment,
                message: 'success',
                'next': '더이상 표시할 데이터가 없습니다.',
                status: 201
            });   
        }else{ // 더 표시할 데이터가 있는 경우
            res.json({
                'data': newCommentList,
                message: 'success',
                'next' : '더 표시할 데이터가 있습니다.',
                status: 201
            });
        }
    }
    catch(err){
        next(err);
    }
});

module.exports = plays;
