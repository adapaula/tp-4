$("form button").click(function(){
    const nombre = $(".input-nombre").val();
    const apellido = $(".input-apellido").val();
    const telefono = $(".input-telefono").val();
    const email = $(".input-email").val();

    const validarNumero = /^\d+$/;
    const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (validarNumero.test(telefono) === false) {
        alert ("solo numeros")
        return;
    }
    if (validarEmail.test(email) === false) {
        alert ("el email es cualquier cosa")
        return;
    }
    let elNuevoUsuario =  {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
    };

    $.ajax("http://localhost:3003/users/new", {
    })
    $.ajax("http://localhost:3003/api/users", {
        method: "POST",
        data: elNuevoUsuario
    })
    .done(function(){
    alert("usuario creado")
      location.href = `/users`;
    })
    .fail(function(){
    alert("el usuario no se pudo crear")
    })
});


