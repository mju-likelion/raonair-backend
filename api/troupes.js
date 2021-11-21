const express = require('express');
const Troupe = require('../models/troupe');
const troupes = express.Router();

// 극단 조회
troupes.get('/:troupeid', async(req, res, next) => {
    try{
        const { troupeid } = req.params;
        const exTroupe = await Troupe.findOne({
            where: {id: troupeid}
        });
        res.json({
            name: exTroupe.name,
            type: exTroupe.type,
            logo: exTroupe.logo
        });
    }
    catch(err){
        err();
    }
})

// 극단 추가
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
