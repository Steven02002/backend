const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('./db');

// Ruta para obtener datos
router.get('/marcas', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT MarcaID, Nombre FROM marcas');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message});
  }
});

module.exports = router;
