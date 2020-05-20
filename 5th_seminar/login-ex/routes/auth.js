const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const jwt = require('../modules/jwt');

router.get('/local', async (req, res) => {
    var token = req.headers.token;
        if (!token) {
            return res.json(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token);
        console.log(user);
        if (user == this.TOKEN_EXPIRED) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }
        if (user == this.TOKEN_INVALID) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        if (user.idx == undefined) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        return res.json(util.success(statusCode.OK, '인증에 성공했습니다.'));
});

module.exports = router;