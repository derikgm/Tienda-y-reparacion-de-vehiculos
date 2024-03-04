const i_cliente = document.getElementById('i_cliente');
const i_CI = document.getElementById('i_CI');
const i_edad = document.getElementById('i_edad');
const i_direccion = document.getElementById('i_direccion');
const i_telefono = document.getElementById('i_telefono');
const i_usuario = document.getElementById('i_usuario');
const i_contra = document.getElementById('i_contra');
const i_contraR = document.getElementById('i_contraR');
const crear_boton = document.getElementById('crear_boton');
const ventana_modal = document.getElementById('modalSheet');
const s_num = document.getElementById('s_num');
const s_mayus = document.getElementById('s_mayus');
const s_minus = document.getElementById('s_minus');
const s_ce = document.getElementById('s_ce');
const formulario = document.getElementById('formulario');
const ajax_creacion = new XMLHttpRequest();

crear_boton.addEventListener('click',() =>{
    activar_validacion(crear_boton.parentNode);
});

// LISTENERS
ajax_creacion.addEventListener('load',validar_usuario,true);

/*
Asignacion de validacion para no escribir valores errores en los inputs
Estos algorimos usan la validacion usando un sistema de tamaño en los caracteres
Caracteres especiales < numeros < Mayusculas < minusculas
*/
i_edad.addEventListener('input',(elem)=>valid_numeros(elem,i_edad));
i_CI.addEventListener('input',(elem)=>valid_numeros(elem,i_CI,11));
i_telefono.addEventListener('input',(elem)=>valid_numeros(elem,i_telefono));
i_usuario.addEventListener('input',(elem)=>valid_usuario(elem,i_usuario));
i_cliente.addEventListener('input',(elem)=>valid_caracteres(elem,i_cliente, 60));

i_edad.addEventListener('focus',()=>{des_bordando(i_edad)},true)
i_CI.addEventListener('focus',()=>{des_bordando(i_CI)},true)
i_telefono.addEventListener('focus',()=>{des_bordando(i_telefono)},true)
i_usuario.addEventListener('focus',()=>{des_bordando(i_usuario)},true)
i_cliente.addEventListener('focus',()=>{des_bordando(i_cliente)},true)
i_direccion.addEventListener('focus',()=>{des_bordando(i_direccion)},true)
i_contra.addEventListener('focus',()=>{des_bordando(i_contra)},true)
i_contraR.addEventListener('focus',()=>{des_bordando(i_contraR)},true)

i_usuario.addEventListener('focusout',()=>{
    ajax_creacion.open('GET', '/obtener_usuario/'+i_usuario.value,true);
    ajax_creacion.send(null);
},true);
// validar CI
i_CI.addEventListener('focusout',()=>{
    // validar carnet
    if(i_CI.value.length == 11){
        mostrar_valid(i_CI);
        i_CI.continuar = true;
    }else{
        mostrar_error(i_CI);
        i_CI.parentNode.children[2].classList.remove('error_h');
        i_CI.parentNode.children[2].classList.add('error');
        i_CI.continuar = false;
    }
},true);
// validar contra
i_contra.addEventListener('input',validar_contra_completa,true);
// validar edad
i_edad.addEventListener('focusout',()=>{
    if(i_edad.value > 18 && i_edad.value < 130 ){
        mostrar_valid(i_edad);
        i_edad.continuar = false;
    }else{
        mostrar_error(i_edad);
        i_edad.parentNode.children[3].hidden = false;
        i_edad.parentNode.children[2].hidden = true;
        i_edad.continuar = true;
    }
});
// Validar nombre del cliente
i_cliente.addEventListener('focusout',()=>{
    if(i_cliente.value.length > 3){
        mostrar_valid(i_cliente);
        i_cliente.continuar = true;
    }else{
        mostrar_error(i_cliente);
        i_cliente.parentNode.children[3].hidden = false;
        i_cliente.parentNode.children[2].hidden = true;
        i_cliente.continuar = false;
    }
});
// Validar dirrecion
i_direccion.addEventListener('focusout',()=>{
    if(i_direccion.value.length > 9 && i_direccion.value.length < 250){
        i_direccion.continuar = true;
        mostrar_valid(i_direccion);
    }else{
        mostrar_error(i_direccion);
        i_direccion.parentNode.children[3].hidden = false;
        i_direccion.parentNode.children[2].hidden = true;
        i_direccion.continuar = false;
    }
});
// validar contra repetida
i_contraR.addEventListener('input',validar_contra_rep,true)
i_telefono.addEventListener('input',()=>{
    if(i_telefono.value.length >= 8 || i_telefono.value.length == 0){
        des_bordando(i_telefono);
        i_telefono.continuar = true;
        mostrar_valid(i_telefono);
    }else{
        mostrar_error(i_telefono);
        i_telefono.continuar = false;
        i_telefono.parentNode.children[2].hidden = true;
        i_telefono.parentNode.children[3].hidden = false;
    }
},true);
// FUNCIONES
function activar_validacion(){
    let campos = document.querySelectorAll('input');
    let continuar = true;

    // verificar campos vacios
    campos.forEach((elem)=>{
        if(elem.value == '' && elem.name != 'Telefono'){
            mostrar_error(elem);
            elem.parentNode.children[2].classList.remove('error_h');
            elem.parentNode.children[2].classList.add('error');
            elem.continuar = false;
        }
        else{
            mostrar_valid(elem);
            elem.continuar = true;
        }
        if(elem.continuar == false){
            continuar = false;
        }
    });

    if(continuar){
        localStorage.setItem('usuario', i_usuario.value);
        formulario.submit();
    }
}

function des_bordando(input){
    input.classList.remove('is-invalid');
    input.classList.remove('bordeado-invalid');   
    input.classList.remove('is-valid');
    input.classList.remove('bordeado-valid');   
    input.classList.add('bordeado'); 
    input.parentNode.children[2].hidden = false;
    input.parentNode.children[2].classList.add('error_h');
    input.parentNode.children[2].classList.remove('error');

    for (let i = 3; i< input.parentNode.children.length; i++) {
        input.parentNode.children[i].hidden = true;
    }
}
function validar_contra(valor){
    let especial = false, mayus = false, numero = false, minus = false;
    s_minus.style.color = 'rgb(255, 20, 20)';
    s_mayus.style.color = 'rgb(255, 20, 20)';
    s_num.style.color = 'rgb(255, 20, 20)';
    s_ce.style.color = 'rgb(255, 20, 20)';

    for (const elem of valor) {
        if(elem <= 'z' && elem >= 'a'){
            minus =  true;
            s_minus.style.color = 'rgb(0, 50, 0)';
        }
        else if(elem <= 'Z' && elem >= 'A'){
            mayus =  true;
            s_mayus.style.color = 'rgb(0, 50, 0)';
        }
        else if(elem <= '9' && elem >= '0'){
            numero =  true;    
            s_num.style.color = 'rgb(0, 50, 0)';
        }
        else{
            especial = true;
            s_ce.style.color = 'rgb(0, 50, 0)';
        }
    }

    return especial && mayus && numero && minus;
}
function validar_contra_completa(){
    if(validar_contra(i_contra.value)){
        i_contra.continuar = true;
        des_bordando(i_contra);
        mostrar_valid(i_contra);

        validar_contra_rep();

        if(i_contraR.continuar){
            mostrar_valid(i_contraR);
        }

    }else{
        mostrar_error(i_contraR);
        mostrar_error(i_contra);
        i_contra.parentNode.children[4].hidden = false;
        i_contra.parentNode.children[2].hidden = true;
        i_contra.continuar = false;
    }
}
function validar_contra_rep(){
    if(i_contra.value == i_contraR.value){
        des_bordando(i_contra);
        des_bordando(i_contraR);
        mostrar_valid(i_contra);
        mostrar_valid(i_contraR);
        i_contraR.continuar = true;
    }else{
        mostrar_error(i_contraR);
        mostrar_error(i_contra);
        i_contraR.parentNode.children[3].hidden = false;
        i_contraR.parentNode.children[2].hidden = true;
        i_contra.parentNode.children[3].hidden = false;
        i_contra.parentNode.children[2].hidden = true;
        i_contraR.continuar = false;
    }
}
function mostrar_error(input){
    input.classList.remove('is-valid');
    input.classList.remove('bordeado-valid');
    input.classList.add('is-invalid');
    input.classList.add('bordeado-invalid');
}
function mostrar_valid(input){
    input.classList.remove('is-invalid');
    input.classList.remove('bordeado-invalid');
    input.classList.add('is-valid');
    input.classList.add('bordeado-valid');
}
function validar_usuario(e){
    let aux;

    aux = JSON.parse(e.target.responseText);

    if(aux.rows.length == 0){
        mostrar_valid(i_usuario);
        i_usuario.continuar = true;
    }else{
        mostrar_error(i_usuario);
        i_usuario.parentNode.children[3].hidden = false;
        i_usuario.parentNode.children[2].hidden = true;
        i_usuario.continuar = false;
    }

    ajax_creacion.abort();
}