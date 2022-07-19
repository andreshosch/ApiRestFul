const fs = require('fs');
const { isObject } = require('util');

module.exports = class contenedor {
    constructor(productos) {
        this.productos = productos;
    }
    getAll = async() => {
        const contenido = await fs.promises.readFile(this.productos, 'utf-8')
        if (contenido) {
            return (JSON.parse(contenido))
        } else {
            console.log(`Error al querer leer el archivo `)
        }
    }
    save = async(object) => {
        try {
            const contenido = await fs.promises.readFile(this.productos, 'utf-8')
            const arrayEmpty = [];
            if (contenido.length === 0) {
                const id = 1;
                const newproduct = { title: object.title, price: object.price, thumbnail: object.thumbnail, id: id }
                arrayEmpty.push(newproduct)
                await fs.promises.writeFile(this.productos, JSON.stringify(arrayEmpty, null, 4))
            } else {
                const producto = JSON.parse(contenido)
                const id = producto.length() + 1;
                const newproduct = { title: object.title, price: object.price, thumbnail: object.thumbnail, id: id }
                producto.push(newproduct)
                await fs.promises.writeFile(this.productos, JSON.stringify(producto, null, 4))
            }
        } catch (err) {
            console.log(`Error al querer leer el archivo ${err}`)
        }
    }
    deleteAll() {
        const newArray = "";
        fs.writeFileSync(this.productos, newArray)
    }
    getById = async(number) => {
        try {
            const contenido = await fs.promises.readFile(this.productos, 'utf-8')
            const productos = JSON.parse(contenido);
            const findId = productos.findIndex(element => element.id == number)
            if (findId != -1) {
                return (productos[findId])
            } else {
                console.log(`No se encontro el producto`)
            }

        } catch (err) {
            console.log(`Error al querer leer el archivo ${err}`)
        }
    }
    deleteById = async(number) => {
        try {
            const contenido = await fs.promises.readFile(this.productos, 'utf-8')
            const productos = JSON.parse(contenido);


            if (parseInt(number) > productos.length) {
                console.log(`No se encontro el id ${number}`)

            } else {
                const findId = productos.filter(element => element.id != number)
                await fs.promises.writeFile(this.productos, JSON.stringify(findId, null, 4))
                return findId;
            }
        } catch (err) {
            console.log(`Error al querer leer el archivo ${err}`)
        }
    }
    getRandom = async() => {
        const contenido = await fs.promises.readFile(this.productos, 'utf-8')
        const producto = JSON.parse(contenido)
        const id = await (Math.floor(Math.random() * (producto.length)) + 1)
        if (id <= producto.length) {
            return (this.getById(id));
        } else
            console.log("error")
    }

    updateProduct = async(number, updates) => {
        try {
            const contenido = await fs.promises.readFile(this.productos, 'utf-8')
            const productos = JSON.parse(contenido);
            const findId = productos.findIndex(element => element.id == number)
            if (findId != -1) {
                productos[findId].title = updates.title;
                productos[findId].price = updates.price;
                productos[findId].thumbnail = updates.thumbnail;
                const newproduct = { title: productos[findId].title, price: productos[findId].price, thumbnail: productos[findId].thumbnail }
                    // productos.push(newproduct)
                await fs.promises.writeFile(this.productos, JSON.stringify(productos, null, 4))
                    // const newProduct = (JSON.stringify(productos, null, 4))
                    // await fs.promises.writeFile(this.productos, newProduct, 'utf-8')
                    // return (this.getById(number))
            } else {
                console.log(`No se encontro el producto`)
            }

        } catch (err) {
            console.log(`Error al querer leer el archivo ${err}`)
        }
    }
}