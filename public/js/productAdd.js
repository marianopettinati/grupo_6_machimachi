window.addEventListener('load', () => {
    
    let errors = [];

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,20}$/;
    const descriptionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ!@#$%^&*\s]{20,300}$/;
    const priceRegex = /^([0-9]{2,5})$/; 
    const imgRegex = /\.(jpe?g|png|gif)$/i;

    let name = document.querySelector('#name');
    let nameError = document.querySelector('.name-error');
    let description = document.querySelector('#description');
    let descriptionError = document.querySelector('.description-error');
    let price = document.querySelector('#price');
    let priceError = document.querySelector('.price-error');
    let img = document.querySelector('#product-img');
    let imgError = document.querySelector('.img-error');

    let formulario = document.querySelector('form.productAdd');

    let checkName = () => {
        name.addEventListener('blur', () => {
            if(!nameRegex.test(name.value)){                
                errors.push(nameError);
                nameError.style.display = "block";
                name.style.backgroundColor = '#e23f30';
                if(name.value.length == 0){
                    nameError.innerHTML = "*El campo nombre es requerido";
                }
                else if(name.value.length != 0 && name.value.length < 5){
                    nameError.innerHTML = "*El campo nombre debe tener al menos 5 caracteres";
                }
                else if(name.value.length > 20){
                    nameError.innerHTML = "*El campo nombre debe tener hasta 20 caracteres";
                }
                else {
                    nameError.innerHTML = "*El campo nombre debe contener solo letras";
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

    let checkDescription = () => {
        description.addEventListener('blur', () => {
            if(!descriptionRegex.test(description.value)){
                errors.push(descriptionError);
                descriptionError.style.display = "block";
                description.style.backgroundColor = '#e23f30';
                if(description.value.length == 0){
                    descriptionError.innerHTML = "*El campo descripción es requerido";
                }
                if(description.value.length != 0 && description.value.length < 20){
                    descriptionError.innerHTML = "*La descripción debe tener al menos 20 caracteres";
                }
                if(description.value.length > 300){
                    descriptionError.innerHTML = "*La descripción debe tener un máximo de 300 caracteres";
                }
            }
            else{
                let error = errors.indexOf(descriptionError);
                error > -1 && errors.splice(error, 1);
                description.style.backgroundColor = '#E1E1E1';
                descriptionError.innerHTML = "";
                descriptionError.style.display = "none";
            }
        });
    }

    let checkPrice = () => {
        price.addEventListener('blur', () => {
            if(!priceRegex.test(price.value)){
                errors.push(priceError);
                priceError.style.display = "block";
                price.style.backgroundColor = '#e23f30';
                if(price.value.length == 0){
                    priceError.innerHTML = "*El campo precio es requerido";
                }
                else {
                    priceError.innerHTML = "*El precio debe ser válido";
                }
            }
            else{
                let error = errors.indexOf(priceError);
                error > -1 && errors.splice(error, 1);
                price.style.backgroundColor = '#E1E1E1';
                priceError.innerHTML = "";
                priceError.style.display = "none";
            }
        });
    }

    let checkImg = () => {
        img.addEventListener('blur', () => {
            if(!imgRegex.test(img.value)){
                errors.push(imgError);
                imgError.style.display = "block";
                img.style.backgroundColor = '#e23f30';
                if(img.value.length == 0){
                    imgError.innerHTML = "*El campo imagen es requerido";
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
    checkDescription();
    checkPrice();
    checkImg();

    formulario.addEventListener('submit', (e) => {
        if(errors.length > 0 || !nameRegex.test(name.value) || !descriptionRegex.test(description.value) || !imgRegex.test(img.value)){
            e.preventDefault();
            if(name.value.length == 0){
                nameError.style.display = "block";
                name.style.backgroundColor = '#e23f30';
                nameError.innerHTML = "*El campo nombre es requerido";
            }           
            if(description.value.length == 0){
                descriptionError.style.display = "block";
                description.style.backgroundColor = '#e23f30';
                descriptionError.innerHTML = "*El campo descripción es requerido";
            }
            if(price.value.length == 0){
                priceError.style.display = "block";
                price.style.backgroundColor = '#e23f30';
                priceError.innerHTML = "*El campo precio es requerido";
            }
            if(img.value.length == 0){
                imgError.style.display = "block";
                img.style.backgroundColor = '#e23f30';
                imgError.innerHTML = "*El campo imagen es requerido";
            }
        }
        
    })
 
})
