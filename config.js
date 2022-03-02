module.exports = {
    remoteDB: process.env.REMOTEDB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'leo',
        password: process.env.MYSQL_PASSWORD || 'aea4f8261e',
        database: process.env.MYSQL_DB || 'node_microservices',
    },
    mysqlService: {
        host: process.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3001
    },
    post:{
        port: process.env.POST_PORT || 3002
    }
}