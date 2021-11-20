const express = require('express');
const Comment = require('../models/comment');
const comment = express.Router();

//디비에 로우 생성
comment.get('/:id', async (req, res, next) => {
    try {
        await Comment.create({
            comment: 'aa',
        })
        res.send("디비에" + req.params.id + "번째 comment 테이블 생성");
    }
    catch {

    }
});

module.exports = comment;
