const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const dotenv = require('dotenv');

const { sequelize, User } = require('./models');
const user = require('./models/user');
const api = require('./api');
const app = express();


app.set('port', process.env.PORT || 8000);

sequelize.sync({ force: true })
    .then(() => {
        console.log('디비연결완료 : app.js에서 시퀄라이즈로 연결');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(morgan('dev'));
dotenv.config();

app.use(express.json());
app.use('/api', api);

// 404 middleware
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// error middleware
// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
//     res.status(err.status || 500);
//     res.send('error');
// });

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_DEV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(res.locals.message);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
