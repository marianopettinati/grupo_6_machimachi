window.addEventListener('load', () => {
    
    let errors = [];

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ!@#$%^&*]{8,16}$/;
   
    let email = document.querySelector('#email');
    let emailError = document.querySelector('.email-error');
    let password = document.querySelector('#password');
    let passwordError = document.querySelector('.password-error');

    let formulario = document.querySelector('form.login');

    let checkEmail = () => {
        email.addEventListener('blur', () => {
            if(!emailRegex.test(email.value)){
                errors.push(emailError);
                emailError.style.display = "block";
                email.style.backgroundColor = '#e23f30';
                if(email.value.length == 0){
                    emailError.innerHTML = "*El campo email es requerido";
                }
                else {
                    emailError.innerHTML = "*El email debe ser válido";
                }
            }
            else{
                let error = errors.indexOf(emailError);
                error > -1 && errors.splice(error, 1);
                email.style.backgroundColor = '#E1E1E1';
                emailError.innerHTML = "";
                emailError.style.display = "none";
            }
        });
    }


    let checkPassword = () => {
        password.addEventListener('blur', () => {
            if(!passwordRegex.test(password.value)){
                errors.push(passwordError);
                passwordError.style.display = "block";
                password.style.backgroundColor = '#e23f30';
                if(password.value.length == 0){
                    passwordError.innerHTML = "*El campo contraseña es requerido";
                }
                if(password.value.length != 0 && password.value.length < 8){
                    passwordError.innerHTML = "*El campo contraseña debe tener almenos 8 caracteres";
                }
                if(password.value.length > 16){
                    passwordError.innerHTML = "*El campo contraseña debe tener hasta 16 caracteres";
                }
            }
            else{
                let error = errors.indexOf(passwordError);
                error > -1 && errors.splice(error, 1);
                password.style.backgroundColor = '#E1E1E1';
                passwordError.innerHTML = "";
                passwordError.style.display = "none";
            }
        });
    }

    checkEmail();
    checkPassword();

    formulario.addEventListener('submit', (e) => {
        if(errors.length > 0 ||  !emailRegex.test(email.value) || !passwordRegex.test(password.value) ){
            e.preventDefault();
            if(email.value.length == 0){
                emailError.style.display = "block";
                email.style.backgroundColor = '#e23f30';
                emailError.innerHTML = "*El campo email es requerido";
            }
            if(password.value.length == 0){
                passwordError.style.display = "block";
                password.style.backgroundColor = '#e23f30';
                passwordError.innerHTML = "*El campo contraseña es requerido";
            }
        }
    })
 
})
