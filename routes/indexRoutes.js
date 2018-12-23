// 1) Primero me traigo express
// nombreModulo = require("modulo")
const express = require("express");
// 2) Pedirle a expreass el Router
const router = express.Router();
// 3) Me traigo path
const path = require("path");


// Firma del get => ("/nombreRuta", (req, res) => {})
  router.get("/users/new", function (req, res) {
   // router.get("/api/users/new", function (req, res) { asi estaba antes
  res.sendFile(path.join(__dirname, "..", "", "new.html"));
  // (__dirname, "..", "", "new.html") --->  ".." <-salis un nivel , "" <-si hay que meterse
  // en otra carpeta va aca y si no es asi, podria volar las comillas vacias
})

/*
  router.get("/api/users/test", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "", "test.html"));
  // res.send(__dirname)
  // con esto  res.send(__dirname), te devuelve la ruta
  // C:\Users\Liliana\Desktop\ada2018\TP 4\routes
  //res.sendFile()
})*/

router.get("/users", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "", "user.html"));
})

router.get("/users/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "", "edit.html"));
});

router.post("/api/users/new", (req, res)=> {
  let newUser = {
    name: req.body.nombre,
    lastName: req.body.apellido,
    phone: req.body.telefono
  }
  users.push(newUser)
res.send(req.body);
})

module.exports = router;