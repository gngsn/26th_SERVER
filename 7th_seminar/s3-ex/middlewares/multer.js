const multer = require('multer');
const upload = require('../modules/multer');
const util = require('../modules/utils/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/utils/responseMessage');

module.exports = {
    single: async (req, res, next) => {
        await upload.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log('multer upload error : ', err);
                return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
            } else if (err) {
                console.log('unknown error : ', err);
                return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
            }
            next();
        });
    },
    many: (img) => {
        return async (req, res, next) => {
            await upload.array('images')(req, res, function (err) {
                // 요청 이미지 개수 제어
                if (req.files.length > img) {
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE + ` 이미지를 ${img}장만 보내주세요.`));
                }
                if (err instanceof multer.MulterError) {
                    console.log('multer upload error : ', err);
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
                } else if (err) {
                    console.log('unknown error : ', err);
                    return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.BAD_REQUEST_IMAGE));
                }
                next();
            });
        }
    }
}