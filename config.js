require("dotenv").config();
const { env } = process;
module.exports = {
    PORT: env.PORT,
    DB_URL: env.DB_URL,
    SECRET_KEY: env.SECRET_KEY
};