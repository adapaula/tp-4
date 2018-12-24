const express = require("express");
const router = express.Router();

const users = [
    {
      id: 1,
      nombre: "Ada",
      apellido: "Lovelace",
      telefono: "1234567890",
      email: "contacto@gmail.com"
    },
    {
      id: 2,
      nombre: "Grace",
      apellido: "Hopper",
      telefono: "087654321",
      email: "contacto@hotmail.com"
    },
    {
      id: 3,
      nombre: "Hope",
      apellido: "Moon",
      telefono: "654321887",
      email: "contacto@hotmail.com"
    }
  ];
  
let contador = 4;

//validaciones
const validarNumero = /^\d+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    //search
router.get("/users", (req, res)=> {
    // para acceder a los query params usamos rec.query
    let search = req.query.search;
    //chequeo que search este definido y su longitud sea mayor a cero
    if (search && search.length > 0) {
    let usersFiltrados = [];
    search = search.toLowerCase();
    for(let i = 0; i < users.length; i++) {
        const nombre = users[i].nombre.toLowerCase();
        const apellido = users[i].apellido.toLowerCase();
        const telefono = users[i].telefono.toLowerCase();
        const email = users[i].email.toLowerCase();
        if(nombre.indexOf(search) >= 0 || apellido.indexOf(search) >= 0 || telefono.indexOf(search) >= 0 || email.indexOf(search) >= 0) {
           usersFiltrados.push(users[i]);
        }
    }
    return res.json(usersFiltrados);
    }
    res.json(users);    
 }) 

 router.delete("/users/:id", (req, res) => {
    // guardamos el id que nos llega por parametro   
    const userId = parseInt(req.params.id);
    // buscar en que ubicacion esta el usuario
     const userIndex = users.findIndex(u => u.id == userId);
    // borro el usuario de array
    users.splice(userIndex, 1);
    // mandar una respuesta
    res.json(users);
});

router.get("/users/:id", (req, res) => {
    // 0) Recupero el parametro id
    const userId = parseInt(req.params.id)
    // 1) findIndex
    // const userIndex = users.findIndex(user => user.id === userId)
    // 2) Devuelvo la posicion del array
    const user =  users.find(user => user.id === userId)
    res.json(user);
})

router.post('/users', function (req, res) {
  // la info que me llega desde la web
  // {   nombre: '',
  //     apellido: '',
  //     telefono: '',
  //     email: ''
  // }
const newUser = req.body;
if (newUser.nombre.length > 30) {
    return res.status(418).end('I’m a teapot');
}
if (newUser.apellido.length > 30) {
   return res.status(418).end('I’m a teapot');
}
if (!emailRegex.test(newUser.email)) {
    return res.status(418).end('I’m a teapot');
}
if (!validarNumero.test(newUser.telefono)) {
    return res.status(418).end("I’m a teapot")
}
newUser.id = contador++;
    // agrego el usuario al array global
    users.push(newUser);
    // le respondemos con el array de objetos
    res.json(newUser);
});

router.put("/users/:id", (req, res) =>{
    //necesito que la url que ingrese vaya a buscar cada usuario
    //(mis objetos), los encuentre y modifique ese atributo
    const id = parseInt(req.params.id)
    const editedUser = users.find(u => u.id === id)
    if (editedUser.nombre.length > 30) {
        return res.status(418).end('I’m a teapot');
    }
    if (editedUser.apellido.length > 30) {
        return res.status(418).end('I’m a teapot');
    }
    if (emailRegex.test(editedUser.email) === false) {
        return res.status(418).end('I’m a teapot');
    }
   
    editedUser.nombre = req.body.nombre || editedUser.nombre;
    editedUser.apellido = req.body.apellido || editedUser.apellido;
    editedUser.email = req.body.email || editedUser.email;
    editedUser.telefono = req.body.telefono || editedUser.telefono;
   
    res.json(editedUser)
   })

module.exports = router;