const express = require('express');

const response = require('../../../network/response')

const router = express.Router();

router.get('/', (req, res) => {
    response.success(req, res, "todo ok")
});

module.exports = router;
