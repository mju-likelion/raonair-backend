const express = require('express');
const Star = require('../models/star');
const star = express.Router();

//디비에 로우 생성
star.get('/:id', async (req, res, next) => {
    await Star.create({
        star: req.params.id,
    })
    res.send("디비에" + req.params.id + "번째 star 테이블 생성");
});

module.exports = star;
