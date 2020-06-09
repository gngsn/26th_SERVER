const util = require('../modules/util');
const CODE = require('../modules/statusCode');

module.exports = {
    array: async (req, res) => {
        const images = req.files;
        console.log(images);
        if (images === undefined) {
            return res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, "이미지를 첨부해주세요."));
        }
        const location = images.map(img => img.location);
        res.status(CODE.OK).send(util.success(CODE.OK, images.length + "개의 이미지 저장 성공 ", {
            image: location
        }));
    }
}