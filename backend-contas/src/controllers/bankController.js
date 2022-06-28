const { Bank } = require("../models/model");
const APIReturnMessage = require("../utils/APIReturnMessage");

controllerBank = {
  create: async (bankData) => {
    try {
      const bank = await Bank.create(bankData);
      if (bank) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "O banco foi criado com sucesso",
          data: bank,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível criar o banco",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao criar o banco",
        data: null,
      });
    }
  },

  delete: async (id) => {
    try {
      let bankDeleted = await Bank.destroy({
        where: {
          id: id,
        },
      });

      if (bankDeleted) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Banco excluído com sucesso",
          data: bankDeleted,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível excluir o banco",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao excluir o banco",
        data: null,
      });
    }
  },

  update: async (id, data) => {
    try {
      const bank = await Bank.update(data, { where: { id: id } });
      
      if (bank) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Banco editado com sucesso",
          data: bank,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Banco não cadastrado",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao editar o banco",
        data: null,
      });
    }
  },

  index: async () => {
    try {
      let bank = await Bank.findAll();

      if (bank) {
        bank.map((item) => {
          console.log(item);
        });

        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar bancos",
          data: bank,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar bancos",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar bancos",
        data: null,
      });
    }
  },

  show: async (id) => {
    try {
      let bank = await Bank.findOne({
        where: {
          id: id,
        },
      });

      if (bank) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar banco",
          data: bank,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Banco não cadastrado",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar banco",
        data: null,
      });
    }
  },
};

module.exports = controllerBank;
