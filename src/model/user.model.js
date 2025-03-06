const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const User = seq.define(
  "tb_user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "用户id",
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户名",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "密码",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否为管理员，0不是，1是",
    },
  },
  {
    freezeTableName: true,
    updatedAt: "update_time",
    createdAt: "create_time",
  }
);

// 创建数据表
// User.sync({ force: true });

module.exports = User;
