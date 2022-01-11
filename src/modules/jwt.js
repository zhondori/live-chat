const { sign, verify } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
module.exports = {
    genToken(data) {
        return sign(data, SECRET_KEY);
    },
    checkToken(token) {
        try {
            return verify(token, SECRET_KEY);
        } catch (err) {
            return false;
        }
    }
}