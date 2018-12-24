// 1) Recuperar el parametro id de la url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
//const otro = urlParams.get("otro"); se pueden tener varios parametos
// 2) Recuperar los nodos con jQuery de mi HTML
const $nombre = $('input[name="nombre"]');
const $apellido = $('input[name="apellido"]');
const $telefono = $('input[name="telefono"]');
const $email = $('input[name="email"]');
// 3) Le pido al servidor la info del usuario con ese id
$.ajax(`/api/users/${id}`).done(function(user) {
  $nombre.val(user.nombre);
  $apellido.val(user.apellido);
  $telefono.val(user.telefono);
  $email.val(user.email);
});

const validarNumero = /^\d+$/;
const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$('#btn-edit').on('click', function(){
  if (!validarNumero.test($telefono.val())) {
    alert("Solo numeros")
    return;
  }
  if (!validarEmail.test($email.val())) {
    alert("E-mail inválido")
    return;
  }
const editedUser = {
nombre: $nombre.val(),
apellido: $apellido.val(),
telefono: $telefono.val(),
email: $email.val()
}

$.ajax(`http://localhost:3003/api/users/${id}`, {
  method: "PUT",
  data: editedUser,

  success: function() {
    alert("Cambios guardados")
    location.href = `/users`;
   }
})
})