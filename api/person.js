const express = require('express');
const Person = require('../models/person');
const person = express.Router();

//디비에 로우 생성
person.get('/:id', async (req, res, next) => {
    await Person.create({
        name: 'aaa',
    })
    res.send("디비에" + req.params.id + "번째 person 테이블 생성");
});

module.exports = person;
