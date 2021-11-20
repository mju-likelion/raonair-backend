const express = require('express');
const troupes = express.Router();

troupes.get('/:id', (req, res, next) => {
    res.send(req.params.id);
});

module.exports = troupes;
