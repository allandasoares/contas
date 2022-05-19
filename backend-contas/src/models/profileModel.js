//Create user model
const profile = (sequelize, DataTypes) => {
  const ProfileModel = sequelize.define(
    "Perfil",
    {
      tipo: {
        type: DataTypes.STRING,
      },
      acessos_id: {
        type: DataTypes.INTEGER,
      },
    },
    
    {
      tableName: "perfil",
    }
  );
  return ProfileModel;
};

module.exports = profile;
