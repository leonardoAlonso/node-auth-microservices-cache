const db = {
    user: [{
        id: '1',
        name: 'Leo'
    }]
};

async function list (table) {
    return db[table];
}

async function get (table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id) [0] || null
}

async function upsert (table, data) {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data)

    console.log(db)
}

async function remove (table, id) {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove
}
