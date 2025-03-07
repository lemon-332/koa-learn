const { createUser } = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EXPIRES_IE } = require("../config/config.default");

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: "创建成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 1. 获取用户信息 （token的payload中，记录id，User_name,password）
    const { password, ...res } = await getUserInfo({ user_name });
    // 2. 生成token
    ctx.body = {
      code: 0,
      message: "登录成功",
      result: {
        token: jwt.sign(res, JWT_SECRET, {
          expiresIn: EXPIRES_IE,
        }),
      },
    };
  }
}

module.exports = new UserController();
