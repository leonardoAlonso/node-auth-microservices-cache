const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf)

    connection.connect((err) => {
        if (err) {
            console.error('[dberror]', err);
            setTimeout(handleCon, 2000)
        } else {
            console.log('[db] Connected')
        }
    });

    connection.on('error', error => {
        console.error('[dberror]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err
        }
    });
}

handleCon();

function list (table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data)
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data)
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            console.log(err)
            if (err) return reject(err);
            resolve(result)
        })
    })
}

async function upsert (table, data) {
    let row = [];
    if (data.id) {
        row = await get(table, data.id)
    }
    if (row.length > 0){
        return update(table, data)
    }
    return insert(table, data);
}

function query(table, query, join=false) {
    let joinQuery = '';
    if (join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, data) => {
            if (err) return reject(err);
            resolve(data[0] || null);
        })
    })
}


module.exports = {
    list,
    get,
    upsert,
    query
}