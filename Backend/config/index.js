const dotenv = require("dotenv").config();

const SERVER_PORT = process.env.PORT;

const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING
const REFRESH_TOKEN_ACCESS = process.env.REFRESH_TOKEN_ACCESS
const ACCESS_TOKEN_ACCESS = process.env.ACCESS_TOKEN_ACCESS
const BASE_URL = process.env.BASE_URL

module.exports = {
    SERVER_PORT,
    MONGODB_CONNECTIONSTRING,
    ACCESS_TOKEN_ACCESS,
    REFRESH_TOKEN_ACCESS,
    BASE_URL
}