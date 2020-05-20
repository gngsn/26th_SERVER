const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

router.get('/local', AuthController.localVerify);
router.get('/local/reissue', AuthController.localReIssue);

module.exports = router;