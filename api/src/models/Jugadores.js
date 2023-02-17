const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('jugadores', {
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    timestamps: false,
  }
  );
};