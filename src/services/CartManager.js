import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');
const productsFilePath = path.resolve('data', 'products.json');

export default class CartManager{
    constructor(){
        this.carts = [];
        this.init();
    }

    async init(){
        try {
            const data = await fs.readFile(cartsFilePath, "utf-8")
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveFile(){
        const jsonData = JSON.stringify(this.carts, null, 2);
        await fs.writeFile(cartsFilePath, jsonData)
    }

    async addCart(){
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []
        }

        console.log(newCart);

        this.carts.push(newCart);

        this.saveFile();

        return newCart;
    }

    async getCart(id){
        return this.carts.find(cart => cart.id === id)
    }

    async addProductToCart(cartId, productId){
        const data = await fs.readFile(productsFilePath, "utf-8")
        const allProducts = JSON.parse(data);

        // Validacion de que el id del carrito exista
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) return {status: "error", msg: "carrito no existe"};

        // Validacion de que el id del producto exista
        const productToAdd = allProducts.find(product => product.id === productId)
        if(!productToAdd) return {status: "error", msg: "Producto no existe"};

        const cartProducts = cart.products;
        const index = cartProducts.findIndex(product => product.id === productId);
        if(index === -1){
            const newProduct = {
                id: productId,
                quantity: 1,
            }
            cartProducts.push(newProduct);
        }else{
            cartProducts[index].quantity += 1;
        }

        this.saveFile()

        return {status: "success", msg: "Producto añadido"};
    }
}


