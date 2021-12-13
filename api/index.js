const express = require('express');
const authRouter = require('./auth');
const playRouter = require('./plays');
const troupeRouter = require('./troupes');
const starRouter = require('./star');
const commentRouter = require('./comment');
const theaterRouter = require('./theater');
const personRouter = require('./person');
const roleRouter = require('./role');
// const adminRouter = require('./admin');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/plays', playRouter);
api.use('/troupes', troupeRouter);
api.use('/star', starRouter);
api.use('/comment', commentRouter);
api.use('/theater', theaterRouter);
api.use('/person', personRouter);
api.use('/role', roleRouter);

module.exports = api;
