const aut_boton = document.getElementById('aut_boton');
const crear_boton = document.getElementById('crear_boton');
const usuario_info = document.getElementById('usuario_info');
const desc_boton = document.getElementById('desc_boton');
const a_factura = document.getElementById('a_factura');
const a_compra = document.getElementById('a_compra');
const a_opciones = document.getElementById('a_opciones');
const ajax_idUsuario = new XMLHttpRequest();
let usuario = localStorage.getItem('usuario');

ajax_idUsuario.addEventListener('load',guardar_id,true);

usuario_info.hidden = true;

// Listeners
desc_boton.addEventListener('click',()=>{
    localStorage.removeItem('usuario');
    cambioValores();
});
a_factura.addEventListener('click',()=>{
    localStorage.setItem('direccion','factura');
},true);
a_compra.addEventListener('click',()=>{
    localStorage.setItem('direccion','compra');
},true);
a_opciones.addEventListener('click',()=>{
    localStorage.setItem('direccion','opciones');
},true)

if(usuario){
    usuario_info.innerHTML = usuario;
    cambioValores();
    ajax_idUsuario.open('GET', '/obtener-ci/'+usuario, true);
    ajax_idUsuario.send(null);
}

// Funciones

function cambioValores(){
    usuario_info.hidden = !usuario_info.hidden;
    aut_boton.hidden =  !aut_boton.hidden;
    crear_boton.hidden =  !crear_boton.hidden;
}

function guardar_id(e){
    let aux, clienteCI;
    aux = JSON.parse(e.target.responseText);

    clienteCI = aux.rows[0].clienteci;
    localStorage.setItem('clienteCi', clienteCI);
}