const { Transation } = require("../models/model");
const APIReturnMessage = require("../utils/APIReturnMessage");

controllerTransation = {
  create: async (transationData) => {
    try {
      const transation = await Transation.create(transationData);

      if (transation) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao cadastrar uma nova transação",
          data: transation,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao cadastrar uma nova transação",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao cadastrar uma nova transação",
        data: null,
      });
    }
  },

  delete: async (id) => {
    try {
      let transationDeleted = await Transation.destroy({
        where: {
          id: id,
        },
      });

      if (transationDeleted) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao excluir a transação",
          data: transationDeleted,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao excluir a transação",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao excluir uma nova transação",
        data: null,
      });
    }
  },

  update: async (id, data) => {
    try {
      const transation = await Transation.update(data, { where: { id: id } });

      if (transation) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao editar a transação",
          data: transation,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao editar a transação",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao editar a transação",
        data: null,
      });
    }
  },

  index: async () => {
    try {
      let transations = await Transation.findAll({
        include: ["categoria", "banco"],
      });

      if (transations) {
        transations.map((item) => {
          console.log(item);
        });

        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar transações",
          data: transations,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Nenhuma despeza cadastrada",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar transações",
        data: null,
      });
    }
  },

  show: async (id) => {
    try {
      let transation = await Transation.findByPk(id, {
        include: ["categoria", "banco"],
      });

      if (transation) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar transação",
          data: transation,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Sem transação cadastrada",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar transação",
        data: null,
      });
    }
  },
};

module.exports = controllerTransation;
