// const express = require('express');
// const jwt = require('jsonwebtoken');
 
// //JWT 토큰 검증
// exports.verifyToken = (req, res, next) => {
//     try {
//         req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET== 'TokenExpiredError')
//         {
//             return res.status(419).json({
//                 code: 419,
//                 message: '만료된 토큰',
//             });
//         }
//         return res.status(401).json({
//             code: 401,
//             message: '유효하지않은 토큰',
//         });
//     }
// };