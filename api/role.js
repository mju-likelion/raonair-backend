const express = require('express');
const Role = require('../models/role');
const role = express.Router();

//디비에 로우 생성
role.get('/:id', async (req, res, next) => {
    await Role.create({
        type: '감독',
    })
    res.send("디비에" + req.params.id + "번째 star 테이블 생성");
});

module.exports = role;
