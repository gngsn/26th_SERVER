const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('../modules/crypto');

const user = {
    signup : async (req, res) => {
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await User.checkUser(id)) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await crypto.encrypt(password);
        const idx = await User.signup(id, name, hashed, salt, email);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
                userId: idx
            }));
    },
    signin :  async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const user = await User.getUserById(id);
        if (user.length == 0) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
            return;
        }
        const hashed = await crypto.encryptWithSalt(password, user[0].salt);
        if (user[0].password !== hashed) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            return;
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
                userId: id
            }));
    },
    readProfile: async (req, res) => {
        const id = req.params.id;
        if (!id) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const userArray = await User.getUserById(id);
        if (userArray.length === 0) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
            return;
        }
        const user = userArray[0];
        const dto = {
            userIdx: user.id,
            id: user.id,
            name: user.name,
            email: user.email
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {
                user: dto
            }));
    }
}

module.exports = user;