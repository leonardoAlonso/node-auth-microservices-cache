const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table/:id', get);
router.get('/:table', list);
router.post('/:table', insert);
router.put('/:table', upsert);

async function list(req, res, next) {
    const data = await Store.list(req.params.table);
    response.success(req, res, data, 200)
}
async function get(req, res, next) {
    const data = await Store.get(req.params.table, req.params.id);
    response.success(req, res, data, 200)
}
async function insert(req, res, next) {
    console.log(req.body)
    const data = await Store.insert(req.params.table, req.body);
    response.success(req, res, data, 200)
}
async function upsert(req, res, next) {
    const data = await Store.upsert(req.params.table, req.body);
    response.success(req, res, data, 200)
}

module.exports = router;
