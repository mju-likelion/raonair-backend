const express = require('express');
const Theater = require('../models/theater');
const theater = express.Router();

//디비에 로우 생성
theater.get('/:id', async (req, res, next) => {
    await Theater.create({
        name: req.params.id,
        address: req.params.id,
    })
    res.send("디비에" + req.params.id + "번째 Theater 테이블 생성");
});

module.exports = theater;
