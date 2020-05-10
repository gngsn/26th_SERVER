var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
var moment = require('moment');

router.get('/', async (req, res) => {
    const dto = await Post.findAll();
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_ALL_SUCCESS, dto));
});

router.get('/:idx', async (req, res) => {
    const idx = req.params.idx;
    const dto = await Post.find(idx);
    if (dto.length === 0) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.success(statusCode.BAD_REQUEST, resMessage.READ_FAIL, dto));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_SUCCESS, dto));
});

router.post('/', async (req, res) => {
    const {
        author,
        title,
        content
    } = req.body;
    var now = moment();
    const created = await now.format('YYYY-MM-DD');
    if (!author || !title || !content) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    const idx = await Post.write(author, title, content, created);
    if (!idx) {
        return res.status(statusCode.DB_ERROR)
            .send(util.success(statusCode.DB_ERROR, resMessage.WRITE_FAIL));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.WRITE_SUCCESS, idx));
});

router.put('/:idx', async (req, res) => {
    const idx = req.params.idx;
    const {
        author,
        title,
        content
    } = req.body;
    if (!idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    const dao = {author: author, title: title, content:content};
    const post = await Post.update(idx,dao);
    if (!post) {
        return res.status(statusCode.DB_ERROR)
            .send(util.success(statusCode.DB_ERROR, resMessage.UPDATE_FAIL));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.UPDATE_SUCCESS, post));
});

router.delete('/:idx', async (req, res) => {
    const idx = req.params.idx;
    if (!idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    await Post.delete(idx);
    res.status(statusCode.OK)
        .send(util.success(statusCode.NO_CONTENT, resMessage.DELETE_SUCCESS));
});


module.exports = router;
