const Router = require("koa-router");
const { register, login } = require("../controller/user.controller");
const {
  validateUser,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const router = new Router({ prefix: "/user" });

// 注册接口
router.post("/register", validateUser, verifyUser, cryptPassword, register);

// 登录接口
router.post("/login", verifyLogin, login);

module.exports = router;
