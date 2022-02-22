const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLE = 'user'


module.exports = function(injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('../../../store/dummy');
    }

    function list () {
        return store.list(TABLE);
    }

    function get (id) {
        return store.get(TABLE, id);
    }

    async function upsert (body) {
        const user = {
            name: body.name,
            username: body.username
        }
        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLE, user);
    }

    function remove (id) {
        return store.get(TABLE, id);
    }

    function following(id) {
        const join = {
        }
        join[TABLE] = 'user_to';
        const query = {user_from: id}
        return store.query(TABLE + '_follow', query, join)
    }

    return {
        list,
        get,
        upsert,
        remove,
        following
    }
}
