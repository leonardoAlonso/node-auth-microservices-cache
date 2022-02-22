module.exports = {
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
        port: process.env.MYSQL_SERVICE_PORT || 3001
    }
}