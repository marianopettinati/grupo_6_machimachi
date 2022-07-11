window.addEventListener('load', () => {
    
    let errors = [];

    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^([0-9]{8,12})$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const extensionRegex = /\.(jpe?g|png|gif)$/i;

    let name = document.querySelector('#name');
    let nameError = document.querySelector('.name-error');
    let last_name = document.querySelector('#last_name');
    let lastNameError = document.querySelector('.last-name-error');
    let email = document.querySelector('#email');
    let emailError = document.querySelector('.email-error');
    let phone = document.querySelector('#phone');
    let phoneError = document.querySelector('.phone-error');
    let password = document.querySelector('#password');
    let passwordError = document.querySelector('.password-error');
    let img = document.querySelector('#user-img');
    let imgError = document.querySelector('.img-error');

    let formulario = document.querySelector('form.register');

    let checkName = () => {
        name.addEventListener('blur', () => {
            if(!nameRegex.test(name.value)){
                errors.push(nameError);
                nameError.style.display = "block";
                name.style.backgroundColor = '#e23f30';
                if(name.value.length == 0){
                    nameError.innerHTML = "*El campo nombre es requerido";
                }
                else if(name.value.length != 0 && name.value.length < 2){
                    nameError.innerHTML = "*El campo nombre debe tener almenos 2 caracteres";
                }
                else if(name.value.length > 30){
                    nameError.innerHTML = "*El campo nombre debe tener hasta 30 caracteres";
                }
                else {
                    nameError.innerHTML = "*El campo nombre debe tener solo letras";
                }
            }
            else{
                let error = errors.indexOf(nameError);
                error > -1 && errors.splice(error, 1);
                name.style.backgroundColor = '#E1E1E1';
                nameError.innerHTML = "";
                nameError.style.display = "none";
            }
        });
    }

    let checkLastName = () => {
        last_name.addEventListener('blur', () => {
            if(!nameRegex.test(last_name.value)){
                errors.push(lastNameError);
                lastNameError.style.display = "block";
                last_name.style.backgroundColor = '#e23f30';
                if(last_name.value.length == 0){
                    lastNameError.innerHTML = "*El campo apellido es requerido";
                }
                else if(last_name.value.length != 0 && last_name.value.length < 2){
                    lastNameError.innerHTML = "*El campo apellido debe tener almenos 2 caracteres";
                }
                else if(last_name.value.length > 30){
                    lastNameError.innerHTML = "*El campo apellido debe tener hasta 30 caracteres";
                }
                else {
                    lastNameError.innerHTML = "*El campo apellido debe tener solo letras";
                }
            }
            else{
                let error = errors.indexOf(lastNameError);
                error > -1 && errors.splice(error, 1);
                last_name.style.backgroundColor = '#E1E1E1';
                lastNameError.innerHTML = "";
                lastNameError.style.display = "none";
            }
        });
    }

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

    let checkPhone = () => {
        phone.addEventListener('blur', () => {
            if(!phoneRegex.test(phone.value)){
                errors.push(phoneError);
                phoneError.style.display = "block";
                phone.style.backgroundColor = '#e23f30';
                if(phone.value.length == 0){
                    phoneError.innerHTML = "*El campo telefono es requerido";
                }
                else {
                    phoneError.innerHTML = "*El telefono debe ser válido";
                }
            }
            else{
                let error = errors.indexOf(phoneError);
                error > -1 && errors.splice(error, 1);
                phone.style.backgroundColor = '#E1E1E1';
                phoneError.innerHTML = "";
                phoneError.style.display = "none";
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

    let checkImg = () => {
        img.addEventListener('blur', () => {
            if(!extensionRegex.test(img.value)){
                errors.push(imgError);
                imgError.style.display = "block";
                img.style.backgroundColor = '#e23f30';
                if(img.value.length == 0){
                    imgError.innerHTML = "*El campo imágen es requerido";
                }
                else {
                    imgError.innerHTML = "*El imágen debe ser .jpg o .jpeg o .png o .gift";
                }
            }
            else{
                let error = errors.indexOf(imgError);
                error > -1 && errors.splice(error, 1);
                img.style.backgroundColor = '#E1E1E1';
                imgError.innerHTML = "";
                imgError.style.display = "none";
            }
        });
    }

    checkName();
    checkLastName();
    checkEmail();
    checkPhone();
    checkPassword();
    checkImg();

    formulario.addEventListener('submit', (e) => {
        if(errors.length > 0 || !nameRegex.test(name.value) || nameRegex.test(last_name.value) || !emailRegex.test(email.value) 
        || !phoneRegex.test(phone.value) || !passwordRegex.test(password.value) || !extensionRegex.test(img.value)){
            e.preventDefault();
            if(name.value.length == 0){
                nameError.style.display = "block";
                name.style.backgroundColor = '#e23f30';
                nameError.innerHTML = "*El campo nombre es requerido";
            }
            if(last_name.value.length == 0){
                lastNameError.style.display = "block";
                last_name.style.backgroundColor = '#e23f30';
                lastNameError.innerHTML = "*El campo apellido es requerido";
            }
            if(email.value.length == 0){
                emailError.style.display = "block";
                email.style.backgroundColor = '#e23f30';
                emailError.innerHTML = "*El campo email es requerido";
            }
            if(phone.value.length == 0){
                phoneError.style.display = "block";
                phone.style.backgroundColor = '#e23f30';
                phoneError.innerHTML = "*El campo telefono es requerido";
            }
            if(password.value.length == 0){
                passwordError.style.display = "block";
                password.style.backgroundColor = '#e23f30';
                passwordError.innerHTML = "*El campo contraseña es requerido";
            }
            if(img.value.length == 0){
                imgError.style.display = "block";
                img.style.backgroundColor = '#e23f30';
                imgError.innerHTML = "*El campo imágen es requerido";
            }
        }
        
    })
 
})
