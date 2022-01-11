const Op = require("sequelize").Op;

module.exports = {
    async HomeGET(req, res) {
        let users = await req.psql.users.findAll({
            raw: true,
            attributes: ["username", "full_name"],
            where: {
                username: {
                    [Op.not]: req.user.username
                }
            }
        });
        res.render("index", {
            users
        });
    },
    async UserGET(req, res) {
        try {
            let { username } = req.params;
            if(username === req.user.username) {
                res.redirect("/");
                return;
            }
            let user = await req.psql.users.findOne({
                where: {
                    username
                },
                raw: true
            })
            let users = await req.psql.users.findAll({
                where: {
                    username: {
                        [Op.ne]: req.user.username
                    }
                }
            });
            let messages = await req.psql.messages.findAll({
                where: {
                    [Op.or]: [
                        {
                            from_id: user.user_id,
                        },
                        {
                            to_id: user.user_id,
                        },
                    ]
                },
                raw: true
            })
            console.log(messages);
            res.render("chat", {
                opponent: user,
                users,
                messages
            })
        } catch (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            })
        }
    },
}