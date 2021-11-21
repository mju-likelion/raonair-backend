const express = require('express');
const Troupe = require('../models/troupe');

const troupes = express.Router();


// api/troupes/숫자
troupes.get('/:id', (req, res, next) => {
     res.send(req.params.id);
    } 
);

// 조회

// 추가
troupes.post('/posting', async(req, res, next) => {
    try{
        const { name, type, logo} = req.body;
        await Troupe.create({
            name: name,
            type: type,
            logo: logo,
        });
        
        res.status(201);
        res.json({
            message: 'success', 
            status: 201
        });
    }
    catch(err){
        next(err);
    }
});

// 수정 - 값이 오면 그걸로 바꿔줌

module.exports = troupes;
