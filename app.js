const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');

//const { sequelize } =require('./models');

const app = express();
app.set('port', process.env.PORT || 8000);
// sequelize.sync({ force: false })
//     .then(() => {
//         console.log('데이터베이스 연결 성공');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
    res.status(err.status || 500);
    res.send('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
