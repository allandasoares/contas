const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/model");

controllerUser = {
  create: async (userData) => {
    try {
      const crypt = await bcrypt.hash(userData.senha, 10);
      userData.senha = crypt;

      await User.create(userData);
      return userData;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let userDeleted = await User.destroy({
        where: {
          id: id,
        },
      });
      return userDeleted;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, userData) => {
    try {
      const crypt = await bcrypt.hash(userData.senha, 10);
      userData.senha = crypt;

      const user = await User.update(userData, {
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  },

  index: async () => {
    try {
      let users = await User.findAll({
        include: ["perfil", "acessos"],
      });

      users.map((item) => {
        console.log(item);
      });
      return users;
    } catch (error) {
      console.log(error);
    }
  },

  show: async (id) => {
    try {
      let user = await User.findByPk(id, {
        include: ["perfil", "acessos"],
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  },

  check: async (userData) => {
    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    try {
      if (await bcrypt.compare(userData.senha, user.senha)) {
        const token = jwt.sign({ userId: User.id }, process.env.JWT_SECRET, {
          expiresIn: 300,
        });
        return { auth: true, token: token };
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controllerUser;
