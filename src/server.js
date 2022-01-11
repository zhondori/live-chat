const express = require("express");
const { readdir } = require("fs");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const { Server } = require("socket.io")
const { PORT } = require("../config");
const postgres = require("./modules/postgres");
const CookieParser = require("cookie-parser");
const { checkToken } = require("./modules/jwt");

async function server() {
    const app = express();
    const httpServer = http.createServer(app);
    // Socket.io Initialization
    const io = new Server(httpServer);
    // settings;
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    // middlewares;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(async (req, res, next) => {
        let psql = await postgres();
        req.psql = psql;
        next();
    })
    app.use(morgan("tiny"));
    app.use(CookieParser());
    // Socket
    io.on("connection", async (socket) => {
        let token = checkToken(socket.handshake.headers.cookie.split("=")[1]);
        if(token) {
            let psql = await postgres();
            let user = await psql.users.findOne({
                where: {
                    username: token.username
                },
                raw: true
            })
            socket.on("message", async (text, to_id) => {
                console.log(to_id, text);
                let msg = await psql.messages.create({
                    text,
                    from_id: user.user_id,
                    to_id
                })
                io.emit("message", text, to_id);
            })
        }
    })
    // routes
    readdir(path.join(__dirname, "routes"), (err, files) => {
        if (!err) {
            files.forEach(file => {
                const routePath = path.join(__dirname, "routes", file);
                const Router = require(routePath);
                if (Router.router && Router.path) {
                    app.use(Router.path, Router.router);
                }
            })
        }
    });

    // listen
    httpServer.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`));
}

server();