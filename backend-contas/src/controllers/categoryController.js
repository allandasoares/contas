const { Category } = require("../models/model");

controllerCategory = {
  create: async (categoryData) => {
    try {
      await Category.create(categoryData);

      return categoryData;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let categoryDeleted = await Category.destroy({
        where: {
          id: id,
        },
      });
      return categoryDeleted;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, data) => {
    try {
      const category = await Category.update(data, {
        where: { id: id },
      });
      return category;
    } catch (error) {
      console.log(error);
    }
  },

  index: async () => {
    try {
      let category = await Category.findAll();

      category.map((item) => {
        console.log(item);
      });
      return category;
    } catch (error) {
      console.log(error);
    }
  },

  show: async (id) => {
    let category = await Category.findOne({
      where: {
        id: id,
      },
    });
    return category;
  },
};

module.exports = controllerCategory;
