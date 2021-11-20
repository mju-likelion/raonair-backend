const express = require('express');
const Troupe = require('../models/troupe');
const troupes = express.Router();

// api/troupes/
troupes.get('/:id', (req, res, next) => {

    res.send(req.params.id);

});

module.exports = troupes;
