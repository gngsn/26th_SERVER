var express = require('express');
var router = express.Router();

router.use('/post', require('./post'));

module.exports = router;
