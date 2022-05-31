//MODELO QUE REPRESENTA A UN USUARIO

//1. Guardar al usuario en la DB
//2. Buscar al usuario que se quiere loguear por email
//3. Buscar a un usuario por ID
//5. Eliminar a un usuario de la DB

const fs = require ('fs');

const User = {
    fileName: './data/users.json',

    getData: function(){
        return fs.readFileSync(this.fileName,'utf-8');
    },     


    create: function (userData) {

    }
}

console.log (User.getData());