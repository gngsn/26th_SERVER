const util = require('../modules/utils/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/utils/responseMessage');

module.exports = {
    single: async (req, res) => {
        const image = req.file;
        if (image === undefined) {
            return res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, MSG.IMAGE_NOT_FOUND));
        }
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.SAVE_IMAGE_SUCCESS, {
            image: image.location
        }));
    },
    array: async (req, res) => {
        const images = req.files;
        if (images === undefined) {
            return res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, MSG.IMAGE_NOT_FOUND));
        }
        const location = images.map(img => img.location);
        res.status(CODE.OK).send(util.success(CODE.OK, images.length + '개의 '+ MSG.SAVE_IMAGE_SUCCESS, {
            images: location
        }));
    }
}