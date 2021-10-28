const express = require('express');
const authRouter = require('./auth');
const playRouter = require('./plays');
const troupeRouter = require('./troupes');
const starRouter = require('./star');
const commentRouter = require('./comment');
const staffRouter = require('./staff');
const theaterRouter = require('./theater');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/plays', playRouter);
api.use('/troupes', troupeRouter);
api.use('/star', starRouter);
api.use('/comment', commentRouter);
api.use('/staff', staffRouter);
api.use('/theater', theaterRouter);

module.exports = api;
