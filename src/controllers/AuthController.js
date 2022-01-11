const { compareHash, genHash } = require("../modules/bcrypt");
const { genToken } = require("../modules/jwt");
const { LoginValidation, SignUpValidation } = require("../modules/validations");

module.exports = {
    LoginGET(req, res) {
        res.render("login");
    },
    SignUpGET(req, res) {
        res.render("signup");
    },
    async LoginPOST(req, res) {
        try {
            let { username, password } = await LoginValidation(req.body);
            let user = await req.psql.users.findOne({
                where: {
                    username,
                },
                raw: true
            })
            if (!user) {
                throw new Error("User is not registered!");
            }
            let pass = compareHash(password, user.password);
            if (!pass) {
                throw new Error("Password is not valid");
            }

            let token = genToken({
                username,
                full_name: user.full_name
            })
            res.status(200).cookie("token", token).redirect("/")
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
        }
    },
    async SignUpPOST(req, res) {
        try {
            let { username, password, full_name } = await SignUpValidation(req.body);
            let pass = await genHash(password)
            let user = await req.psql.users.create({
                username, password: pass, full_name
            })
            console.log(user);
            let token = genToken({
                username,
                full_name
            })
            res.status(200).cookie("token", token).redirect("/");
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
        }
    }
}