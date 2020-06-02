const MSG = require('../modules/responseMessage');
const CODE = require('../modules/statusCode');
const util = require('../modules/util');

const UserModel = require('../models/user');

module.exports = {
    updateProfile: async (req, res) => {
        const profileImg = req.file.path;
        const {
            name,
            email,
            phone
        } = req.body;

        if (profileImg !== undefined){
            profileImg = profileImg.location;
            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg'&& type !== 'png') {
                return res.status(statusCode.OK).send(util.successTrue(statusCode.OK, resMsg.UNSUPPORTED_TYPE));
            }
        }

        if (!name && !email && !phone && !profileImg)
            return res.status(statusCode.OK).send(util.successTrue(statusCode.OK, resMsg.NO_CHANGE));

        UserModel.updateProfile();
        const result = await UserModel.updateProfile(name, email, phone, profileImg, userIdx);
        res.status(200).send(util.success(CODE.OK, MSG.UPDATE_PROFILE_SUCCESS, result));
    }
}


module.exports = {
    updateProfile: async (req, res) => {
        // 데이터 받아오기
        // image 처리하기 - profileImage 위치데이터 설정, image type 체크
        // (선택)image 크기 체크
        // model로 넘겨주기
    }
}