const express = require('express');
const router = express.Router();
const Ubicacion = require('../models/location');  // Asegúrate de ajustar la ruta según tu estructura de archivos

router.get('/', async (req, res, next) => {
    try {
        const ubicaciones = await Ubicacion.findAll();
        res.status(200).json(ubicaciones);
    } catch (error) {
        console.error("Error when trying to fetch ubicaciones:", error);
        res.status(500).json({ message: "Error al obtener los ubicaciones", error: error.message });
    }
});


module.exports = router;
