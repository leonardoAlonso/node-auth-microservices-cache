const fetch = require("node-fetch");

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    function list(table) {
        return req('GET', table);
    }

    function get(table, id) {
        console.log(id)
        if (id) {
            table = `${table}/${id}`;
        }
        return req('GET', table);
    }

    function insert(table, data) {
        console.log(data)
        return req('POST', table, data);
    }

    function update(table, data) {
        return req('PUT', table, data);
    }

    function upsert(table, data) {
        console.log(data)
        if (data.id) {
            return update(table, data);
        }
        return insert(table, data);
    }

    // function query(table, query, join) {}

    function req(method, table, data) {
        let url = URL + '/' + table;

        return new Promise((resolve, reject) => {
            console.log(url)
            fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => {
                return response.json();
            }).then(json => {
                resolve(json);
            }).catch(err => {
                reject(err.message)
            });
        });
    }

    return {
        list,
        get,
        upsert,
    }
}

module.exports = createRemoteDB;
