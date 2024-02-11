const i_cliente = document.getElementById('cliente');
const i_CI = document.getElementById('i_CI');
const i_edad = document.getElementById('i_edad');
const i_direccion = document.getElementById('i_direccion');
const i_telefono = document.getElementById('i_telefono');
const i_usuario = document.getElementById('i_usuario');
const i_contra = document.getElementById('i_contra');
const i_contraR = document.getElementById('i_contraR');
const crear_boton = document.getElementById('crear_boton');
let aux_edad = '', aux_CI = '', aux_tel = '', aux_usu = '';

crear_boton.addEventListener('click',() =>{
    activar_validacion(crear_boton.parentNode);
});
/*
Asignacion de validacion para no escribir valores errores en los inputs
Estos algorimos usan la validacion usando un sistema de tamaño en los caracteres
Caracteres especiales < numeros < Mayusculas < minusculas
*/
i_edad.addEventListener('input',(elem)=>{ 
    if(elem.data > '9' || elem.data < '0'){
        i_edad.value = aux_edad;
    }
    aux_edad = i_edad.value;
});
i_CI.addEventListener('input',(elem)=>{
    if(elem.data > '9' || elem.data < '0'){
        i_CI.value = aux_CI;
    }
    aux_CI = i_CI.value;
});
i_telefono.addEventListener('input',(elem)=>{
    if(elem.data > '9' || elem.data < '0'){
        i_telefono.value = aux_tel;
    }
    aux_tel = i_telefono.value;
});
i_usuario.addEventListener('input',(elem)=>{
    if( 
    ((elem.data < '0'|| elem.data > '9') && 
    (elem.data < 'a' || elem.data > 'z') && 
    (elem.data < 'A' || elem.data > 'Z')) ||
    (aux_usu.length >= 15)){
        i_usuario.value = aux_usu;
    }
    aux_usu = i_usuario.value;
});

// Funciones

function activar_validacion(formulario){
    alert('Completa los espacios en blanco antes de que caiga a golpes\nATTP: el programador')
    formulario.submit();
}



