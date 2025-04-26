require("dotenv").config();
const bcrypt = require("bcrypt");
module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(),
    JWT_KEY: process.env.JWT_KEY,
    DB_SYNC: process.env.DB_SYNC,
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASS: process.env.EMAIL_PASS,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
}