const sequelize = require("../config/sequelize");
const Sequelize = require("sequelize");

const UserModel = require("./User");
const User = UserModel(sequelize, Sequelize.DataTypes);

const ProfileModel = require("./Profile");
const Profile = ProfileModel(sequelize, Sequelize.DataTypes);

const AccessModel = require("./Access");
const Access = AccessModel(sequelize, Sequelize.DataTypes);

const CategoryModel = require("./Category");
const Category = CategoryModel(sequelize, Sequelize.DataTypes);

const ExpenseModel = require("./Expense");
const Expense = ExpenseModel(sequelize, Sequelize.DataTypes);

const BankModel = require("./Bank");
const Bank = BankModel(sequelize, Sequelize.DataTypes);

module.exports = {
  User,
  Profile,
  Access,
  Category,
  Expense,
  Bank,
};

User.belongsTo(Profile, {
  as: "perfil",
  foreignKey: "perfil_id",
});

Profile.belongsTo(Access, {
  as: "acessos",
  foreignKey: "acessos_id",
});

Expense.belongsTo(Category, {
  as: "categoria",
  foreignKey: "categoria_id",
});

Expense.belongsTo(Bank, {
  as: "banco",
  foreignKey: "banco_id",
});
