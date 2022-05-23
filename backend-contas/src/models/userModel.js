const userModel = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "Usuarios",
    {
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
      },
      perfil_id: {
        type: DataTypes.INTEGER,
      },
    },

    {
      tableName: "usuarios",
    }
  );

  return UserModel;
};

module.exports = userModel;
