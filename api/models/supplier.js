const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Proveedor = sequelize.define('Proveedor', {
  ProveedorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Direccion: {
    type: DataTypes.STRING(255),
    allowNull: true  // Ajustado para permitir nulos según la imagen
  },
  Telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  PrimerApellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  SegundoApellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Proveedores',
  timestamps: false
});

// Sincronizar el modelo con la base de datos
Proveedor.sync().then(() => {
  console.log('Modelo Proveedor sincronizado con éxito.');
}).catch((error) => {
  console.error('Error al sincronizar el modelo Proveedor:', error);
});

module.exports = Proveedor;
