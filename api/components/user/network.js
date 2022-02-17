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

function list (req, res) {
    controller.list()
        .then((list) => {
            response.success(req, res, list);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function get (req, res) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
};

 function remove (req, res)  {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, 'removed')
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function upset (req, res) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
};

module.exports = router;
