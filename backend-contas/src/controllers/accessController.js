const { Access } = require("../models/model");
const APIReturnMessage = require("../utils/APIReturnMessage");

(controllerAccess = {
  create: async (accessData) => {
    try {
      const access = await Access.create(accessData);

      if (access) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "O acesso foi criado com sucesso",
          data: access,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível criar o acesso",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao criar o acesso",
        data: null,
      });
    }
  },

  delete: async (id) => {
    try {
      let accessDeleted = await Access.destroy({
        where: {
          id: id,
        },
      });

      if (accessDeleted) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "O acesso foi excluído com sucesso",
          data: accessDeleted,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível excluir o acesso",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao excluir o acesso",
        data: null,
      });
    }
  },

  update: async (id, data) => {
    try {
      const access = await Access.update(data, { where: { id: id } });

      if (access) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao editar acesso",
          data: access,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível editar o acesso",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao editar o acesso",
        data: null,
      });
    }
  },

  index: async () => {
    try {
      let access = await Access.findAll();

      access.map((item) => {
        console.log(item);
      });

      if (access) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar acessos",
          data: access,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar o acessos",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar o acessos",
        data: null,
      });
    }
  },

  show: async (id) => {
    try {
      let access = await Access.findOne({
        where: {
          id: id,
        },
      });

      if (access) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar acesso",
          data: access,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar o acesso",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar o acesso",
        data: null,
      });
    }
  },
}),
  (module.exports = controllerAccess);
