const { DataTypes } = require('sequelize');
const sequelize = require('../../database');


const Producto = sequelize.define('Producto', {
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProveedorID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FechaVencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  MarcaID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CodigoBarras: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  UbicacionID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Opciones adicionales
  tableName: 'Productos',
  timestamps: false // Para no requerir los campos createdAt y updatedAt
});

// Sincronizar el modelo con la base de datos
Producto.sync().then(() => {
  console.log('Modelo Producto sincronizado con éxito.');
}).catch((error) => {
  console.error('Error al sincronizar el modelo Producto:', error);
});
module.exports = Producto;
