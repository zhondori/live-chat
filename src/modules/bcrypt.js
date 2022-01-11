const bcrypt = require("bcrypt");

module.exports = {
    async genHash(data) {
        let salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(data, salt);
    },
    async compareHash(data, hash) {
        return await bcrypt.compare(data, hash);
    }
}