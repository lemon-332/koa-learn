const { getUserInfo } = require("../service/user.service");

const validateUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    // ctx.status = 400;
    // ctx.body = {
    //   code: "10001",
    //   message: "用户名或密码不能为空",
    //   data: null,
    // };
    ctx.app.emit("error", "user_name or password is empty", ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  if (getUserInfo({ user_name })) {
    ctx.status = 409;
    ctx.body = {
      code: "10002",
      message: "用户名已存在",
      data: null,
    };
    return;
  }
  await next();
};
module.exports = {
  validateUser,
  verifyUser,
};
