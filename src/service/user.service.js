const User = require("../model/user.model");

class UserService {
  async createUser(user_name, password) {
    // 将用户信息存储到数据库中
    const res = await User.create({
      user_name,
      password,
      is_admin: 1,
    });
    return res.dataValues;
  }

  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });

    return res ? res.dataValues : null;
  }

  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };

    const newUser = {};

    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    const res = await User.update(newUser, {
      where: whereOpt,
    });

    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
