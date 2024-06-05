const express = require('express');
const router = express.Router();
const Marca = require('../models/brand');  // Asegúrate de ajustar la ruta según tu estructura de archivos

router.get('/', async (req, res, next) => {
    try {
        const marcas = await Marca.findAll();
        res.status(200).json(marcas);
    } catch (error) {
        console.error("Error when trying to fetch marcas:", error);
        res.status(500).json({ message: "Error al obtener los marcas", error: error.message });
    }
});


module.exports = router;
