const { Access } = require("../models/model");

controllerAccess = {
  create: async (accessData) => {
    try {
      await Access.create(accessData);
      return accessData;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let accessDeleted = await Access.destroy({
        where: {
          id: id,
        },
      });
      return accessDeleted;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, data) => {
    try {
      const access = await Access.update(data, { where: { id: id } });
      return access;
    } catch (error) {
      console.log(error);
    }
  },

  index: async () => {
    try {
      let access = await Access.findAll();

      access.map((item) => {
        console.log(item);
      });
      return access;
    } catch (error) {
      console.log(error);
    }
  },

  show: async (id) => {
    let access = await Access.findOne({
      where: {
        id: id,
      },
    });
    return access;
  },
};

module.exports = controllerAccess;
