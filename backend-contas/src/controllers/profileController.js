const { Profile } = require("../models/model");

controllerProfile = {
  create: async (profileData) => {
    try {
      await Profile.create(profileData);
      return profileData;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id) => {
    try {
      let profileDeleted = await Profile.destroy({
        where: {
          id: id,
        },
      });
      return profileDeleted;
    } catch (error) {
      console.log(error);
    }
  },

  update: async (id, data) => {
    try {
      const profile = await Profile.update(data, { where: { id: id } });
      return profile;
    } catch (error) {
      console.log(error);
    }
  },

  index: async () => {
    try {
      let profiles = await Profile.findAll({ include: "acessos" });

      profiles.map((item) => {
        console.log(item);
      });
      return profiles;
    } catch (error) {
      console.log(error);
    }
  },

  show: async (id) => {
    let profile = await Profile.findByPk(id, { include: "acessos" });
    return profile;
  },
};

module.exports = controllerProfile;
