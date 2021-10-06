const express = require('express');
const auth = express.Router();

auth.post('/sign-in', (req, res, next) => {
    res.send('sign-in');
});

auth.post('/sign-up', (req, res, next) => {
    res.send('sign-up');
});

module.exports = auth;
