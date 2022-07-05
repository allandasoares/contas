const { Transation, Bank } = require("../models/model");
const APIReturnMessage = require("../utils/APIReturnMessage");

controllerTransation = {
  create: async (transationData) => {
    try {
      const transation = await Transation.create(transationData);
      const id = transationData.banco_id;
      const saldo_antigo = await Bank.findOne({
        where: {
          id: id,
        },
      });

      if (transation) {
        //Se for um recebimento
        if (
          transationData.tipo === "Recebimento" &&
          transationData.status === "Fechada"
        ) {
          const saldo_atual =
            Number(transationData.valor) + Number(saldo_antigo.saldo_atual);
          const valor = {
            saldo_atual: saldo_atual,
          };

          //Atualiza no banco
          await Bank.update(valor, {
            where: {
              id: id,
            },
          });
        }

        //Se for uma despesa
        if (
          transationData.tipo === "Despesa" &&
          transationData.status === "Fechada"
        ) {
          const saldo_atual =
            Number(saldo_antigo.saldo_atual) - Number(transationData.valor);
          const valor = {
            saldo_atual: saldo_atual,
          };

          //Atualiza no banco
          await Bank.update(valor, {
            where: {
              id: id,
            },
          });
        }

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
      const transationData = await Transation.findByPk(id, {
        include: ["categoria", "banco"],
      });
      const idBank = transationData.banco_id;
      const saldo_antigo = await Bank.findOne({
        where: {
          id: idBank,
        },
      });

      if (
        transationData.tipo === "Recebimento" &&
        transationData.status === "Fechada"
      ) {
        const saldo_atual =
          Number(saldo_antigo.saldo_atual) - Number(transationData.valor);
        const valor = {
          saldo_atual: saldo_atual,
        };

        //Atualiza no banco
        await Bank.update(valor, {
          where: {
            id: idBank,
          },
        });
      }

      if (
        transationData.tipo === "Despesa" &&
        transationData.status === "Fechada"
      ) {
        const saldo_atual =
          Number(saldo_antigo.saldo_atual) + Number(transationData.valor);
        const valor = {
          saldo_atual: saldo_atual,
        };

        //Atualiza no banco
        await Bank.update(valor, {
          where: {
            id: idBank,
          },
        });
      }

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
      const transationData = await Transation.findByPk(id, {
        include: ["categoria", "banco"],
      });
      const idBank = transationData.banco_id;
      const saldo_antigo = await Bank.findOne({
        where: {
          id: idBank,
        },
      });

      //Recebimento - Apenas mudou o valor
      if (
        transationData.tipo === "Recebimento" &&
        transationData.status === "Fechada" &&
        transationData.valor != data?.valor
      ) {
        const saldo_atual =
          Number(saldo_antigo.saldo_atual) -
          Number(transationData.valor) +
          Number(data.valor);
        const valor = {
          saldo_atual: saldo_atual,
        };

        //Atualiza no banco
        await Bank.update(valor, {
          where: {
            id: idBank,
          },
        });
      }

      //Despesa - Apenas mudou o valor
      if (
        transationData.tipo === "Despesa" &&
        transationData.status === "Fechada" &&
        transationData.valor != data?.valor
      ) {
        const saldo_atual =
          Number(saldo_antigo.saldo_atual) +
          Number(transationData.valor) -
          Number(data.valor);
        const valor = {
          saldo_atual: saldo_atual,
        };

        //Atualiza no banco
        await Bank.update(valor, {
          where: {
            id: idBank,
          },
        });
      }

      //Recebimento - Estava fechada e foi pra aberta
      if (
        transationData.tipo === "Recebimento" &&
        transationData.status === "Fechada" &&
        data?.status == "Aberta"
      ) {
        const saldo_atual =
          Number(saldo_antigo.saldo_atual) - Number(transationData.valor);
        const valor = {
          saldo_atual: saldo_atual,
        };

        //Atualiza no banco
        await Bank.update(valor, {
          where: {
            id: idBank,
          },
        });
      }

      //Recebimento - Estava aberta e foi pra fechada
      if (
        transationData.tipo === "Recebimento" &&
        transationData.status === "Aberta" &&
        data?.status == "Fechada"
      ) {
        //Se tiver mudado o valor
        if (data.valor) {
          const saldo_atual =
            Number(saldo_antigo.saldo_atual) + Number(data.valor);
          const valor = {
            saldo_atual: saldo_atual,
          };

          //Atualiza no banco
          await Bank.update(valor, {
            where: {
              id: idBank,
            },
          });
        } else {
          const saldo_atual =
            Number(saldo_antigo.saldo_atual) + Number(transationData.valor);
          const valor = {
            saldo_atual: saldo_atual,
          };

          //Atualiza no banco
          await Bank.update(valor, {
            where: {
              id: idBank,
            },
          });
        }
      }

      //Despesa - Estava fechada e foi pra aberta
      if (
        transationData.tipo === "Despesa" &&
        transationData.status === "Fechada" &&
        data?.status == "Aberta"
      ) {
        const saldo_atual =
          Number(saldo_antigo.saldo_atual) + Number(transationData.valor);
        const valor = {
          saldo_atual: saldo_atual,
        };

        //Atualiza no banco
        await Bank.update(valor, {
          where: {
            id: idBank,
          },
        });
      }

      //Despesa - Estava aberta e foi pra fechada
      if (
        transationData.tipo === "Despesa" &&
        transationData.status === "Aberta" &&
        data?.status == "Fechada"
      ) {
        //Se tiver mudado o valor
        if (data.valor) {
          const saldo_atual =
            Number(saldo_antigo.saldo_atual) - Number(data.valor);
          const valor = {
            saldo_atual: saldo_atual,
          };

          //Atualiza no banco
          await Bank.update(valor, {
            where: {
              id: idBank,
            },
          });
        } else {
          console.log("AQUIIIIIIIIIIIIII 6666666666666666666");
          //Se continuar o mesmo valor
          const saldo_atual =
            Number(saldo_antigo.saldo_atual) - Number(transationData.valor);
          const valor = {
            saldo_atual: saldo_atual,
          };

          //Atualiza no banco
          await Bank.update(valor, {
            where: {
              id: idBank,
            },
          });
        }
      }

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
          console.log("Item", item);
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

  dashboard: async () => {
    try {
      let transations = await Transation.findAll({
        include: ["categoria", "banco"],
      });
      let totalRecebimentos = 0;
      let totalDespesas = 0;
      let totalPendentes = 0;
      let totalContas = 0;
      let dash = {};

      if (transations) {
        //Se for recebimento
        let containerRec = transations.map((item) => {
          if (item.tipo === "Recebimento" && item.status === "Fechada") {
            return item.valor;
          } else {
            return 0;
          }
        });

        for (var i = 0; i < containerRec.length; i++) {
          totalRecebimentos += Number(containerRec[i]);
        }

        //Se for despesa
        let containerDes = transations.map((item) => {
          if (item.tipo === "Despesa" && item.status === "Fechada") {
            return item.valor;
          } else {
            return 0;
          }
        });

        for (var i = 0; i < containerDes.length; i++) {
          totalDespesas += Number(containerDes[i]);
        }


        //Se for aberta
        let containerPend = transations.map((item) => {
          if (item.tipo === "Despesa" && item.status === "Aberta") {
            return item.valor;
          } else {
            return 0;
          }
        });

        for (var i = 0; i < containerPend.length; i++) {
          totalPendentes += Number(containerPend[i]);
        }


        //Se for paga
        for (var i = 0; i < containerDes.length; i++) {
          totalContas += 1;
        }

        dash = {
          recebimentos: totalRecebimentos,
          despesas: totalDespesas,
          pendentes: totalPendentes,
          pagas: totalContas
        };

        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar transações",
          data: dash,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Dashboard vazia",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Erro ao buscar dashboard",
        data: null,
      });
    }
  },
};

module.exports = controllerTransation;
