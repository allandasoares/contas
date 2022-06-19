const { Bank } = require("../models/model");

controllerBank = {
  create: async (bankData) => {
    try {
      await Bank.create(bankData);
      return bankData;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let bankDeleted = await Bank.destroy({
        where: {
          id: id,
        },
      });
      return bankDeleted;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, data) => {
    try {
      const bank = await Bank.update(data, { where: { id: id } });
      return bank;
    } catch (error) {
      console.log(error);
    }
  },

  index: async () => {
    try {
      let bank = await Bank.findAll();

      bank.map((item) => {
        console.log(item);
      });
      return bank;
    } catch (error) {
      console.log(error);
    }
  },

  show: async (id) => {
    let bank = await Bank.findOne({
      where: {
        id: id,
      },
    });
    return bank;
  },
};

module.exports = controllerBank;
