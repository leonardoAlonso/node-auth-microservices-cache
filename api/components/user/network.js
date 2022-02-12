const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
    controller.list()
        .then((list) => {
            response.success(req, res, list);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
});

router.get('/:id', (req, res) => {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
});

router.get('/:id/remove', (req, res) => {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, 'removed')
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
});

router.get('/upsert', (req, res) => {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
});

module.exports = router;
