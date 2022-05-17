const usuariosModel = (sequelize, DataTypes) => {
  const UsuariosModel = sequelize.define(
    "Usuarios",
    {
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
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

  return UsuariosModel;
};

module.exports = usuariosModel;
