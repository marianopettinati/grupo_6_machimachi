window.addEventListener('load', function() {
    let formulario = document.querySelector('form.register');
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
      
        let nombre = document.querySelector("input#name")
        if (nombre.length < 2) {
            alert ("El nombre debe tener un mínimo de dos caractéres")
        }
  
        let apellido = document.querySelector("input#last_name")
        if (apellido.length <2) {
            console.log ("El apellido debe tener un mínimo de dos caractéres")
        }
        
    })
  });