require('dotenv').config();

const config = {
    env: process.env.ENV,
    port: process.env.PORT,
    cors: process.env.CORS, 
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}

module.exports = { config };