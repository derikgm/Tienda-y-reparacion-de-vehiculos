const aut_boton = document.getElementById('autentificar');
const formulario = document.getElementById('formulario');
const mensaje_e = document.getElementById('mensaje_e');
const usuario = document.getElementById('i_usuario');
const contra = document.getElementById('i_contra');
const ajax_login = new XMLHttpRequest();
let errores = '', error = false;

ajax_login.addEventListener('load', verificar, true);

aut_boton.addEventListener('click', autentificar,true);
usuario.addEventListener('focus',()=>{
    mensaje_e.classList.add('error_h');
    mensaje_e.classList.remove('error');
},true)

function autentificar(){
    if(usuario.value == ''){
        error = true;
        errores += 'Haz dejado el usuario en blanco\n';
    }
    if(contra.value == ''){
        error = true;
        errores += 'Haz dejado la contraseña en blanco\n';
    }
    if(error){
        alert(errores + 'No puedes dejar ninguno de los parametros en blanco');
        error = false;
    }else{
        ajax_login.open('GET', '/autentificar_usuario/'+usuario.value+'/'+contra.value,true);
        ajax_login.send(null);
    }
    
}
function verificar(e){
    let aux = JSON.parse(e.target.responseText);
    ajax_login.abort();

    if(aux.rows.length == 1){
        localStorage.setItem('usuario', usuario.value);
        formulario.submit();
    }else{
        mensaje_e.classList.remove('error_h');
        mensaje_e.classList.add('error');
    }

}