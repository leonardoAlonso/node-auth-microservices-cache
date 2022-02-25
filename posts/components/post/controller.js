const auth = require('../../../auth');
const { nanoid } = require('nanoid');


const TABLE = 'post';

module.exports = function(injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert (user_id, body) {
        const post = {
            text: body.text,
            user: user_id
        }
        if (body.id) {
            post.id = body.id
        } else {
            post.id = nanoid();
        }

        return store.upsert(TABLE, post);
    }

    return {
        list,
        get,
        upsert
    }
}
