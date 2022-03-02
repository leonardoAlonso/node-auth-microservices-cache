// const store = require('../../../store/remote-mysql');
const config = require('../../../config');

let store;
if (config.remoteDB) {
    store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');
}

const controller = require('./controller');

module.exports = controller(store);
