import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080;

app.get("/ping", (req, res) =>{
    res.send("pong")
})

app.use("/api/products", productsRouter)
app.use("/api/cart", cartsRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando por el puerto ${PORT}`)
})