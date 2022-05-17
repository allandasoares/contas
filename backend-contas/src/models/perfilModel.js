const perfilModel = (sequelize, DataTypes) => {
  const PerfilModel = sequelize.define(
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
  return PerfilModel;
};

module.exports = perfilModel;
