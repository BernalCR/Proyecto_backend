import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.resolve('data', 'products.json');

export default class ProductsManager{
    constructor(){
        this.products = [];
        this.init();
    }

    async init(){
        try {
            const data = await fs.readFile(productsFilePath, "utf-8")
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    async saveFile(){
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.writeFile(productsFilePath, jsonData)
    }

    getAllProducts(limit){
        return (limit) ? this.products.slice(0, limit) : this.products;
    }

    getProductById(id){
        return this.products.find(product => product.id === id)
    }

    addProduct(prod){
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...prod,
            status: true,
        }

        this.products.push(newProduct);

        this.saveFile();

        return newProduct;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        const updatedProduct = {
            ...this.products[productIndex],
            ...updatedFields,
            id: this.products[productIndex].id, // Aseguramos que el ID no se actualice
        };


        this.products[productIndex] = updatedProduct;
        this.saveFile()
        return updatedProduct;
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        const deletedProduct = this.products.splice(productIndex, 1);
        this.saveFile()
        return deletedProduct[0];
    }
}




