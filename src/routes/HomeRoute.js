const { HomeGET, UserGET } = require("../controllers/HomeController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/", AuthMiddleware, HomeGET);
router.get("/:username", AuthMiddleware, UserGET);

module.exports = {
    path: "/",
    router
}