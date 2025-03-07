const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExist,
  userNotExisted,
  userPasswordInvalid,
} = require("../constant/err.type");

const validateUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  if (await getUserInfo({ user_name })) {
    ctx.app.emit("error", userAlreadyExist, ctx);
    return;
  }
  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash: 加密后的密码
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  const res = await getUserInfo({ user_name });
  if (!res) {
    return ctx.app.emit("error", userNotExisted, ctx);
  }
  if (!bcrypt.compareSync(password, res.password)) {
    return ctx.app.emit("error", userPasswordInvalid, ctx);
  }
  await next();
};

module.exports = {
  validateUser,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
