const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

router.get('/local', async (req, res) => {
    var token = req.headers.token;
        if (!token) {
            return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token);
        if (user == TOKEN_EXPIRED) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
        }
        if (user == TOKEN_INVALID) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        if (user.idx == undefined) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        return res.json(util.success(CODE.OK, MSG.AUTH_SUCCESS));
});
module.exports = router;