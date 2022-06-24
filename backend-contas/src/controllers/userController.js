const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/model");
const APIReturnMessage = require("../utils/APIReturnMessage");

controllerUser = {
  create: async (userData) => {
    try {
      // Verifica se o usuário já existe
      let users = await User.findOne({
        where: {
          email: userData.email,
        },
      });

      if (users) {
        return APIReturnMessage({
          code: 403,
          success: false,
          message: "O usuário já possui uma conta vinculada a este e-mail",
          data: null,
        });
      }

      //Criar usuário
      const crypt = await bcrypt.hash(userData.senha, 10);
      userData.senha = crypt;
      createdUser = await User.create(userData);

      return APIReturnMessage({
        code: 201,
        success: true,
        message: "Usuário criado com sucesso!",
        data: createdUser,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: error,
        data: null,
      });
    }
  },

  delete: async (id) => {
    try {
      let userDeleted = await User.destroy({
        where: {
          id: id,
        },
      });

      if (userDeleted) {
        return APIReturnMessage({
          code: 201,
          success: true,
          message: "Usuário excluído com sucesso",
          data: null,
        });
      } else {
        return APIReturnMessage({
          code: 500,
          success: false,
          message: "O usuário não existe",
          data: null,
        });
      }
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao excluir usuário",
        data: error,
      });
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

      return APIReturnMessage({
        code: 201,
        success: true,
        message: "Usuário editado com sucesso",
        data: user,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao editar usuário",
        data: error,
      });
    }
  },

  index: async () => {
    try {
      let users = await User.findAll({
        include: "perfil",
      });

      users.map((item) => {
        // console.log(item);
      });

      return APIReturnMessage({
        code: 200,
        success: true,
        message: "Sucesso ao trazer usuários",
        data: users,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao carregar usuários",
        data: error,
      });
    }
  },

  show: async (id) => {
    try {
      let user = await User.findByPk(id, {
        include: "perfil",
      });

      if (user) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao trazer usuário",
          data: user,
        });
      } else{
        return APIReturnMessage({
          code: 403,
          success: false,
          message: "Usuário não existe",
          data: null,
        });
      }
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao trazer usuário",
        data: error,
      });
    }
  },

  check: async (userData) => {
    try {
      const user = await User.findOne({
        where: {
          email: userData.email,
        },
      });

      if (user) {
        if (await bcrypt.compare(userData.senha, user.senha)) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: 50000,
          });

          return APIReturnMessage({
            code: 200,
            success: true,
            message: "Usuário autenticado com sucesso",
            data: { token, userId: user.id },
          });
        } else {
          return APIReturnMessage({
            code: 403,
            success: false,
            message: "Dados incorretos",
            data: null,
          });
        }
      } else {
        return APIReturnMessage({
          code: 403,
          success: false,
          message: "O usuário não existe",
          data: null,
        });
      }
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao logar",
        data: error,
      });
    }
  },
};

module.exports = controllerUser;
