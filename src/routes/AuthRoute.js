const { LoginGET, SignUpGET, LoginPOST, SignUpPOST } = require("../controllers/AuthController");

const router = require("express").Router();

router.get("/login", LoginGET);
router.get("/signup", SignUpGET);
router.post("/login", LoginPOST);
router.post("/signup", SignUpPOST);

module.exports = {
    path: "/",
    router
}