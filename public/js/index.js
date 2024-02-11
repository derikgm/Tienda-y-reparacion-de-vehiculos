const aut_boton = document.getElementById('aut_boton');
const crear_boton = document.getElementById('crear_boton');
const usuario_info = document.getElementById('usuario_info');
const desc_boton = document.getElementById('desc_boton');
let usuario = localStorage.getItem('usuario');

usuario_info.hidden = true;

desc_boton.addEventListener('click',()=>{
    localStorage.removeItem('usuario');
    cambioValores();
});

if(usuario){
    usuario_info.innerHTML = usuario;
    cambioValores();
}

// Funciones

function cambioValores(){
    usuario_info.hidden = !usuario_info.hidden;
    aut_boton.hidden =  !aut_boton.hidden;
    crear_boton.hidden =  !crear_boton.hidden;
}