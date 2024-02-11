const aut_boton = document.getElementById('autentificar');
const usuario = document.getElementById('i_usuario');
const contra = document.getElementById('i_contra');
let errores = '', error = false;

aut_boton.addEventListener('click', ()=>{
    autentificar(aut_boton);
});

function autentificar(elem){
    if(usuario.value == ''){
        error = true;
        errores += 'Haz dejado el usuario en blanco\n';
        // usuario.className += '' //clase que marca un error como que no existe de bootstrap
    }
    if(contra.value == ''){
        error = true;
        errores += 'Haz dejado la contraseña en blanco\n';
        // usuario.className += '' //clase que marca un error como que no existe de bootstrap
    }
    if(error){
        alert(errores + 'No puedes dejar ninguno de los parametros en blanco');
        error = false;
    }else{
        localStorage.setItem('usuario', usuario.value);
        elem.parentNode.submit();
    }
    
}