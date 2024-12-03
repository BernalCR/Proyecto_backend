import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewRoutes from "./routes/view.routes.js";

// Creo una instancia de nuestro servidor con Express
const app = express();

// Indicamos cual es el directorio public
app.use(express.static(__dirname + "/public"));

// Inicializamos el  motor que vamos a utilizar (en este caso handlebars)
app.engine("handlebars", handlebars.engine())
// Indicamos en qué parte del proyecto estarán las vistas
app.set('views', __dirname + '/views')
// Arranca el motor que inicializamos anteriormente
app.set('view engine', 'handlebars')

// configuracion para recibir archivos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = 8080;

app.get("/ping", (req, res) =>{
    res.send("pong")
})

app.use("/api/products", productsRouter)
app.use("/api/cart", cartsRouter)
app.use("/products", viewRoutes)

// Iniciando socket.io
const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando por el puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

// creamos el canal de comunicacion
socketServer.on('connection', socket=>{
    socket.on("addProd", data => {
        console.log("data")
        console.log(data)
        socketServer.emit('addingProd', data)
    })
})