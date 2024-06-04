const express = require('express');
const router = express.Router();
const Producto = require('../models/product');  // Asegúrate de ajustar la ruta según tu estructura de archivos

router.get('/', async (req, res, next) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error when trying to fetch products:", error);
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
});

router.post('/', async (req, res, next) => {
    try {
        // Crear un nuevo producto utilizando los datos enviados en el cuerpo de la solicitud
        const nuevoProducto = await Producto.create({
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Precio: req.body.Precio,
            Stock: req.body.Stock,
            ProveedorID: req.body.ProveedorID,
            FechaVencimiento: req.body.FechaVencimiento,
            MarcaID: req.body.MarcaID,
            CodigoBarras: req.body.CodigoBarras,
            UbicacionID: req.body.UbicacionID
        });
        
        // Si el producto se crea exitosamente, devolver los datos del producto creado
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error });
    }
});

router.get('/:productId', async (req, res, next) => {
    const id = req.params.productId;

    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error });
    }
});

router.patch('/:productId', async (req, res, next) => {
    const id = req.params.productId;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Actualizar los campos del producto con lo que venga en el cuerpo de la solicitud
        // Solo se actualizarán los campos que se envíen en el cuerpo de la solicitud
        const camposActualizados = {};
        if (req.body.Nombre) camposActualizados.Nombre = req.body.Nombre;
        if (req.body.Descripcion) camposActualizados.Descripcion = req.body.Descripcion;
        if (req.body.Precio) camposActualizados.Precio = req.body.Precio;
        if (req.body.Stock) camposActualizados.Stock = req.body.Stock;
        if (req.body.ProveedorID) camposActualizados.ProveedorID = req.body.ProveedorID;
        if (req.body.FechaVencimiento) camposActualizados.FechaVencimiento = req.body.FechaVencimiento;
        if (req.body.MarcaID) camposActualizados.MarcaID = req.body.MarcaID;
        if (req.body.CodigoBarras) camposActualizados.CodigoBarras = req.body.CodigoBarras;
        if (req.body.UbicacionID) camposActualizados.UbicacionID = req.body.UbicacionID;

        await producto.update(camposActualizados);
        res.status(200).json({ message: 'Product updated successfully', product: producto });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating the product', error: error });
    }
});

router.delete('/:productId', async (req, res, next) => {
    const id = req.params.productId;

    try {
        // Primero, intenta encontrar el producto por ID para asegurarse de que existe
        const producto = await Producto.findByPk(id);
        if (!producto) {
            // Si no se encuentra el producto, devuelve un error 404
            return res.status(404).json({ message: 'Product not found' });
        }

        // Si el producto existe, procede a eliminarlo
        await producto.destroy();
        // Devuelve una respuesta exitosa
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting the product', error: error });
    }
});

module.exports = router;
