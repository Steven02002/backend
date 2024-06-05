const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Ubicacion = sequelize.define('Ubicacion', {
  UbicacionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Si UbicacionID es un campo autoincremental
    allowNull: false
  },
  AlmacenID: {
    type: DataTypes.INTEGER,
    allowNull: false  // Ajusta según las reglas de negocio, si puede ser null o no
  },
  Descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false  // Ajusta según las reglas de negocio, si puede ser null o no
  }
}, {
  // Opciones adicionales
  tableName: 'Ubicaciones',  // Especifica el nombre de la tabla si es diferente al nombre del modelo
  timestamps: false  // Si la tabla no tiene campos 'createdAt' y 'updatedAt', se debe desactivar
});

// Sincronizar el modelo con la base de datos
Ubicacion.sync().then(() => {
    console.log('Modelo Ubicacion sincronizado con éxito.');
  }).catch((error) => {
    console.error('Error al sincronizar el modelo Ubicacion:', error);
  });
  

module.exports = Ubicacion;
