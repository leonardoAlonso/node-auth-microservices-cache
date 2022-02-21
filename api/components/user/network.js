const express = require('express');

const secure = require('./secure')
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list)
router.get('/:id', get)
router.delete('/:id', remove)
router.post('/', upset)
router.put('/', secure('update'), upset)

function list (req, res, next) {
    controller.list()
        .then((list) => {
            response.success(req, res, list);
        })
        .catch(next);
}

function get (req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user)
        })
        .catch(next);
};

 function remove (req, res, next) {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, 'removed')
        })
        .catch(next);
}

function upset (req, res, next) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next);
};

module.exports = router;
