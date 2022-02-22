const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure')


const router = express.Router();

router.get('/', list)
router.get('/:id', get)
router.post('/', secure('logged'), upset)
router.put('/', secure('update'), upset)


function get(req, res, next) {
    controller.get(req.params.id)
        .then(data => {
            response.success(req, res, data, 200)
        }).catch(next);
}

function list (req, res, next) {
    controller.list()
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function upset(req, res, next) {
    controller.upsert(req.user.id, req.body)
        .then(data => {
            response.success(req, res, data, 201)
        }).catch(next)
}

module.exports = router;
