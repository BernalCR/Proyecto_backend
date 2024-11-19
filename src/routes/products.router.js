import { Router } from "express";
import ProductsManager from "../services/ProductManager.js";

// Requisitos de esta api:
// 1) La ruta raíz GET / deberá listar todos los productos de la base.Agregue un query params limit cuya funcion sea el maximo de productos a traer.
// 2) La ruta GET /:pid deberá traer sólo el producto con el id proporcionado.
// 3) La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: Number (autogenerado)
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean (es true por defecto)
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto.
// 4) La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
// 5) La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

const router = Router();

const productsManager = new ProductsManager();

// listar
router.get("/", async(req, res) =>{
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productsManager.getAllProducts(limit);
        res.json(products);
    } catch (error) {
        console.error(error);
    }
})

// Obtener 1
router.get("/:pid", async(req, res) =>{
    try {
        const id = parseInt(req.params.pid);
        const product = await productsManager.getProductById(id);

        if(!product) return res.status(400).send("Producto no encontrado");
        
        res.json(product);
    } catch (error) {
        console.error(error);
    }
})

// Crear
router.post("/", async(req, res) =>{
    try {
        const {title, description, code, price, stock, category, thumbnails} = req.body;
        if(!title || !description || !code || !price || !stock || !category) return res.status(400).send("Todos los campos son obligatorios menos el thumbnails");

        const newProduct = await productsManager.addProduct({title, description, code, price, stock, category, thumbnails});

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
    }
})

// Editar
router.put("/:pid", async (req, res) =>{
    try {
        const productId = parseInt(req.params.pid);

        const updatedProduct = await productsManager.updateProduct(productId, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
})

//Eliminar
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productsManager.deleteProduct(productId);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
})
export default router;
