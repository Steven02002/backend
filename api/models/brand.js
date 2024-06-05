const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Marca = sequelize.define('Marca', {
  MarcaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Si UbicacionID es un campo autoincremental
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING(255),
    allowNull: false  // Ajusta según las reglas de negocio, si puede ser null o no
  }
}, {
  // Opciones adicionales
  tableName: 'Marcas',  // Especifica el nombre de la tabla si es diferente al nombre del modelo
  timestamps: false  // Si la tabla no tiene campos 'createdAt' y 'updatedAt', se debe desactivar
});

// Sincronizar el modelo con la base de datos
Marca.sync().then(() => {
    console.log('Modelo Marca sincronizado con éxito.');
  }).catch((error) => {
    console.error('Error al sincronizar el modelo Marca:', error);
  });
  

module.exports = Marca;
