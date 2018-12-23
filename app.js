// 1) Me traigo express
const express = require("express");
// 2) Me traigo bodyparser
const bodyParser = require("body-parser");
// 3) Me traigo las rutas que necesito "escuchar"
const indexRoutes = require("./routes/indexRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const vendorRoutes = require("./routes/vendorRoutes");
const apiRoutes = require("./routes/apiRoutes");

const path = require("path");

// 4) Defino mi aplicacion con express
const app = express();

// 5) Le digo a mi servidor que use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// 6) Le digo a mi servidor que cuando el cliente haga una peticion
// vaya a buscar la ruta correspondiente

app.use("/", indexRoutes); //solo barra, va a index
app.use("/api", apiRoutes);


app.listen(3003, function() {
    console.log("Server listening port 3003")
})

//module.exports = app;