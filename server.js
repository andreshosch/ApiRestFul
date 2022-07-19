const express = require("express");
const { Router } = express;
const app = express();
const routerProductos = Router();
const contenedor = require('./archivos')
const Archivos = new contenedor('productos.json')
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ESCUCHANDO EN PUERTO 8080
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});
server.on("error", error => console.log(`Error: ${error}`))

app.use("/api/productos", routerProductos);

//TRAER TODOS LOS PRODUCTOS CON METODO GET
routerProductos.get("/", (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    Archivos.getAll()
        .then((products) => res.json(products))
})

//TRAER UN PRODUCTO POR ID
routerProductos.get("/:id", (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    const id = req.params.id
    Archivos.getById(id)
        .then((products) => res.json(products))

})

//GUARDAR NUEVO PRODUCTO
routerProductos.post("/", (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    Archivos.save(req.body)
        .then((products) => res.json(products))
})

//ACTUALIZAR PRODUCTO MEDIANTE ID
routerProductos.put("/:id", (req, res) => {
    Archivos.updateProduct(req.params.id, req.body)
        .then((product) => res.json(product))
        .catch(res.json({ error: "producto no encontrado" }))
})

//ELIMINAR PRODUCTO POR ID
routerProductos.delete("/:id", (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    Archivos.deleteById(req.params.id)

    .then((products) => res.json(products))
})