const { Profile } = require("../models/model");
const APIReturnMessage = require("../utils/APIReturnMessage");

controllerProfile = {
  create: async (profileData) => {
    try {
      const profile = await Profile.create(profileData);

      if (profile) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "O perfil foi criado com sucesso",
          data: profile,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível criar o perfil",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível criar o perfil",
        data: null,
      });
    }
  },

  delete: async (id) => {
    try {
      let profileDeleted = await Profile.destroy({
        where: {
          id: id,
        },
      });

      if (profileDeleted) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "O perfil foi excluído com sucesso",
          data: profileDeleted,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível excluir o perfil",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível excluir o perfil",
        data: null,
      });
    }
  },

  update: async (id, data) => {
    try {
      const profile = await Profile.update(data, { where: { id: id } });

      if (profile) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao editar peril",
          data: profile,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível editar o perfil",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível editar o perfil",
        data: null,
      });
    }
  },

  index: async () => {
    try {
      let profiles = await Profile.findAll({ include: "acessos" });

      profiles.map((item) => {
        console.log(item);
      });

      if (profiles) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar perfis",
          data: profiles,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar os perfis",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar os perfis",
        data: null,
      });
    }
  },

  show: async (id) => {
    try {
      let profile = await Profile.findByPk(id, { include: "acessos" });
      if (profile) {
        return APIReturnMessage({
          code: 200,
          success: true,
          message: "Sucesso ao buscar peril",
          data: profile,
        });
      }

      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar o perfil",
        data: null,
      });
    } catch (error) {
      return APIReturnMessage({
        code: 500,
        success: false,
        message: "Não foi possível buscar o perfil",
        data: null,
      });
    }
  },
};

module.exports = controllerProfile;
