const express = require('express');
const plays = express.Router();

plays.get('/:id', (req, res, next) => {
    res.send(req.params.id);
});

module.exports = plays;
