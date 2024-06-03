const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('../db');

// Ruta para registrar un nuevo cliente
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, secondLastName, ciNit, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const pool = await poolPromise;
        const resultCliente = await pool.request()
            .input('Nombre', sql.NVarChar, firstName)
            .input('PrimerApellido', sql.NVarChar, lastName)
            .input('SegundoApellido', sql.NVarChar, secondLastName)
            .input('Ci_Nit', sql.NVarChar, ciNit)
            .input('Telefono', sql.NVarChar, phone)
            .query('INSERT INTO Clientes (Nombre, PrimerApellido, SegundoApellido, Ci_Nit, Telefono) OUTPUT INSERTED.ClienteID VALUES (@Nombre, @PrimerApellido, @SegundoApellido, @Ci_Nit, @Telefono)');
        
        const clienteID = resultCliente.recordset[0].ClienteID;

        await pool.request()
            .input('Correo', sql.NVarChar, email)
            .input('Contrasena', sql.NVarChar, hashedPassword)
            .input('Rol', sql.NVarChar, 'Cliente')
            .input('ClienteID', sql.Int, clienteID)
            .query('INSERT INTO CuentasUsuario (Correo, Contrasena, Rol, ClienteID) VALUES (@Correo, @Contrasena, @Rol, @ClienteID)');

        res.status(201).send({ message: 'Cliente registrado exitosamente' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
