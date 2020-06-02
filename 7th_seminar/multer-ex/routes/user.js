var express = require('express');
var router = express.Router()
const UserController = require('../controllers/user');
const multer = require('multer');
const upload = multer({
    dest: 'upload/'
});

router.post('/profile', upload.single('profile'), UserController.updateProfile);

module.exports = router;