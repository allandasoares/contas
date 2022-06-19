const { Expense } = require("../models/model");

controllerExpense = {
  create: async (expenseData) => {
    try {
      await Expense.create(expenseData);
      return expenseData;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let expenseDeleted = await Expense.destroy({
        where: {
          id: id,
        },
      });
      return expenseDeleted;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, data) => {
    try {
      const expense = await Expense.update(data, { where: { id: id } });
      return expense;
    } catch (error) {
      console.log(error);
    }
  },

  index: async () => {
    try {
      let expenses = await Expense.findAll({
        include: ["categoria", "banco"],
      });

      expenses.map((item) => {
        console.log(item);
      });
      return expenses;
    } catch (error) {
      console.log(error);
    }
  },

  show: async (id) => {
    let expense = await Expense.findByPk(id, {
      include: ["categoria", "banco"],
    });
    return expense;
  },
};

module.exports = controllerExpense;
