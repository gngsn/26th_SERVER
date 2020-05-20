const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey').secretKey;
const options = secretKey.options;

module.exports = {
    sign: async (user) => {
        const payload = {
            idx: user.userIdx,
            name: user.name
        };
        const result = {
            token: jwt.sign(payload, secretKey, options),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
            console.log('jwt.js - decoded : ', decoded);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    }
}