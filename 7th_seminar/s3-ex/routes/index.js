var express = require('express');
var router = express.Router();
const ImageController = require('../controllers/image.js')
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user'));
router.post('/image', AuthMiddleware.checkToken, upload.single, ImageController.single);
router.post('/images', AuthMiddleware.checkToken, upload.many, ImageController.array);

module.exports = router;
