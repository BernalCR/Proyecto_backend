import { Router } from "express";
import CartManager from "../services/CartManager";

// Requisitos de esta api:
// 1) La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number
// products: Array que contendrá objetos que representen cada producto
// 2) La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
// 3) La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO 
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 





const router = Router();

const cartManager = new CartManager();

// Crear carrito
router.post("/", async(req, res) =>{
    try {
        const newCart = await productsManager.addProduct({title, description, code, price, stock, category, thumbnails});
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
    }
})

// Obtener productos de carrito
router.get("/:pid", async(req, res) =>{
    try {
        const id = parseInt(req.params.pid);
        const cart = await productsManager.getCart(id);

        if(!cart) return res.status(400).send("Carrito no encontrado");
        
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
})

// Agregar producto a carrito



export default router;