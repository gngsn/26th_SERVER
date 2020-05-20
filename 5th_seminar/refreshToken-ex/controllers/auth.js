const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    localVerify : async (req, res) => {
        var token = req.headers.token;
            if (!token) {
                return res.json(util.fail(statusCode.BAD_REQUEST, MSG.EMPTY_TOKEN));
            }
            const user = await jwt.verify(token);
            if (user == TOKEN_EXPIRED) {
                return res.json(util.fail(statusCode.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
            }
            if (user == TOKEN_INVALID) {
                return res.json(util.fail(statusCode.UNAUTHORIZED, MSG.INVALID_TOKEN));
            }
            if (user.userIdx == undefined) {
                return res.json(util.fail(statusCode.UNAUTHORIZED, MSG.INVALID_TOKEN));
            }
            return res.json(util.success(statusCode.OK, MSG.AUTH_SUCCESS));
    },
    localReIssue : async (req, res) => {
        const refreshToken = req.headers.refreshtoken;
        if (!refreshToken) {
            return res.json(util.fail(statusCode.BAD_REQUEST, MSG.EMPTY_TOKEN));
        }
        const newToken = await jwt.refresh(refreshToken);
        if (newToken == TOKEN_EXPIRED) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
        }
        if (newToken == TOKEN_INVALID) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, MSG.ISSUE_SUCCESS, {accessToken: newToken}));
    }
}