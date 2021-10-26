const express = require('express');
const Staff = require('../models/staff');
const staff = express.Router();

//디비에 로우 생성
staff.get('/:id', async (req, res, next) => {
    await Staff.create({
        staff: req.params.id,
    })
    res.send("디비에" + req.params.id + "번째 Staff 테이블 생성");
});

module.exports = staff;
