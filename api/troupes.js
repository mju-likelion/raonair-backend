const express = require('express');
const Troupe = require('../models/troupe');
const troupes = express.Router();

// 극단 조회
troupes.get('/:troupeId', async(req, res, next) => {
    try{
        const { troupeId } = req.params;
        const exTroupe = await Troupe.findOne({
            where: {id: troupeId}
        });
        res.json({
            name: exTroupe.name,
            type: exTroupe.type,
            logo: exTroupe.logo
        });
    }
    catch(err){
        next(err);
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

// 극단 수정
troupes.put('/:troupeId/updating', async(req, res, next) => {
    try{
        const { troupeId } = req.params;
        const { name, type, logo} = req.body;
        const exTroupe = await Troupe.findOne({
            where: {id: troupeId}
        });
        if(exTroupe){
            await Troupe.update(
                {name, type, logo}, {where: {id: troupeId}}
            );
        }
        else{
            res.status(401);
            return res.json({
                message: 'no existing troupe',
                status: 401
            })
        }
        res.json({
            message: 'success', 
            status: 201
        });
    }
    catch(err){
        next(err);
    }
} )

module.exports = troupes;
