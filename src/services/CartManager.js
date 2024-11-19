import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');

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

        this.carts.push(newCart);

        this.saveFile();

        return newCart;
    }

    async getCart(id){
        return this.carts.find(cart => cart.id === id)
    }
}


