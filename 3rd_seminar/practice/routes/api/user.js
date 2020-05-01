var express = require('express');
var router = express.Router();
let User = require('../../models/user');
let util = require('../../modules/util');
let statusCode = require('../../modules/statusCode');
let resMessage = require('../../modules/responseMessage');

/* 
    ✔️ sign up
    METHOD : POST
    URI : localhost:3000/api/user/signup
    REQUEST BODY : id, name, password, email
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : All User Data
*/
// 3단계
router.post('/signup', async (req, res) => {
    const {
        id,
        name,
        password,
        email
    } = req.body;
    // request data 확인 - 없다면 Bad Request 반환
    if (!id || !name || !password || !email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, 'BAD REQUEST'));
        return;
    }
    //already ID
    if (User.filter(user => user.id == id).length > 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, 'ALREADY ID'));
        return;
    }
    User.push({
        id,
        name,
        password,
        email
    });
    res.status(statusCode.OK)
        .send(util.RESPONSE(statusCode.OK, '회원가입에 성공했습니다.', id));
});


module.exports = router;













// 1단계
// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     User.push({id, name, password, email});
//     res.status(200).send(User);
// });


// 2단계
// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     // request data 확인 - 없다면 Bad Request 반환
//     if ( !id || !name || !password || !email ) {
//         return res.status(400).send({ message: 'BAD REQUEST' });
//     }
//     //already ID
//     if (User.filter(user => user.id == id).length > 0) {
//         return res.status(400).send({ message: 'ALREADY ID' });
//     }
//     User.push({id, name, password, email});
//     res.status(200).send(User);
// });