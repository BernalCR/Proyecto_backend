import { Router } from "express";

const router = Router();

router.get("/", (req,res) =>{
    fetch('http://localhost:8080/api/products/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del producto');
        }
        return response.json(); // Parsear la respuesta a JSON
    })
    .then(data => {
        res.render('home', {productsArray: data});
    })
});
router.get("/realtime", (req,res) =>{
    res.render('realTimeProducts', {});
});

export default router;