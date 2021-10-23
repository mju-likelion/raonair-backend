const express = require('express');
const authRouter = require('./auth');
const playRouter = require('./plays');
const troupeRouter = require('./troupes');
const starRouter = require('./star');
const commentRouter = require('./comment');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/plays', playRouter);
api.use('/troupes', troupeRouter);
api.use('/star', starRouter);
api.use('/comment', commentRouter);

module.exports = api;
