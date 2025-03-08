const Router = require("koa-router");
const {
  register,
  login,
  changePassword,
} = require("../controller/user.controller");
const {
  validateUser,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/user" });

// 注册接口
router.post("/register", validateUser, verifyUser, cryptPassword, register);

// 登录接口
router.post("/login", verifyLogin, login);

router.patch("/updatePassword", auth, cryptPassword, changePassword);

module.exports = router;
