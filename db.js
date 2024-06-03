const sql = require('mssql');

// Configuración de la conexión
const config = {
    user: 'sa', // El usuario de la base de datos
    password: 'Univalle2024', // La contraseña de la base de datos
    server: 'localhost', // El servidor de la base de datos
    database: 'HardwareStore', // El nombre de la base de datos
    options: {
      encrypt: false, // Para Azure, si no usas Azure puedes establecerlo en false
      enableArithAbort: false,
    },
  };
  

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Conexión a la base de datos SQL Server establecida.');
    return pool;
  })
  .catch((err) => {
    console.error('Error en la conexión a la base de datos SQL Server:', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
