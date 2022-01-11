const { checkToken } = require("../modules/jwt");
module.exports = async (req, res, next) => {
    try {
        let token = req?.cookies?.token;
        if (!token) {
            res.redirect("/login");
            return;
        }
        console.log(token);
        let data = checkToken(token);
        if (!data) {
            res.redirect("/signup");
            return;
        }
        req.user = data;
        next();
    } catch (e) {
        console.log(e + " ");
    }
}