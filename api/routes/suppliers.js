const express = require('express');
const router = express.Router();
const Proovedor = require('../models/supplier');  // Asegúrate de ajustar la ruta según tu estructura de archivos

router.get('/', async (req, res, next) => {
    try {
        const proovedores = await Proovedor.findAll();
        res.status(200).json(proovedores);
    } catch (error) {
        console.error("Error when trying to fetch proovedores:", error);
        res.status(500).json({ message: "Error al obtener los proovedores", error: error.message });
    }
});


module.exports = router;
