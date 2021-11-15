const express = require('express');
const Play = require('../models/play');
const plays = express.Router();

//연극 정보 저장
plays.post('/:id', (req, res, next) => {
    const { title, start_date, end_date, running_time, troupe } = req.body;
    const id = req.params.id;
    const exPlay = Play.findOne({ where: { id }});
        //이미 존재하는 아이디인 경우
        if (exPlay){
            return res.status(409).json({
                message: '이미 존재하는 연극정보 입니다.',
            });
        }
        // 디비에 연극 정보 생성
        Play.create({
            id: id,
            title: title,
            start_date: start_date,
            end_date: end_date,
            running_time: running_time,
            troupe: troupe,
        })
        console.log("디비에 연극 정보 저장");
});

//연극 정보 불러오기(연극개별페)
plays.get('/:id',(req, res, next) => {
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
plays.post('/:id',(req, res, next) => {
    
})
module.exports = plays;
