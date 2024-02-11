const tbody= document.getElementById('tbody');
const b_comprar = document.getElementById('b_comprar');
const b_facturas = document.getElementById('b_facturas');
const b_opciones = document.getElementById('b_opciones');
const d_comprar = document.getElementById('d_comprar');
const d_facturas = document.getElementById('d_facturas');
const d_opciones = document.getElementById('d_opciones');
const usuario = localStorage.getItem('usuario');
let ajax_compra = new XMLHttpRequest();
let ajax_facturas = new XMLHttpRequest();

console.log(usuario);

// Listeners
b_comprar.addEventListener('click', ()=>cambio(d_comprar), true);
b_facturas.addEventListener('click', ()=>cambio(d_facturas), true);
b_opciones.addEventListener('click', ()=>cambio(d_opciones), true);

ajax_compra.addEventListener('load', mostrar_compra, true);
ajax_facturas.addEventListener('load', mostrar_facturas, true);

ajax_compra.open('GET', '/obtener-autos', true);
ajax_compra.send(null);
// ajax_compra.open('GET', '/obtener-facturas', true);
// ajax_compra.send(null);

// Funciones
function mostrar_compra(e){
    let aux1,aux2;
    
    aux1 = JSON.parse(e.target.responseText);
 
    aux2 = aux1.rows;

    for (const i of aux2) {
        tbody.innerHTML += `<tr>
        <td>${i.matricula}</td>
        <td>${i.marca}</td>
        <td>${i.modelo}</td>
        <td>${i.precio}$</td>
        <td><button type="button" class="btn btn-outline-success">Comprar</td>
      </tr>`;
    }

}
function mostrar_facturas(e){
    let aux1,aux2;
    
    aux1 = JSON.parse(e.target.responseText);
 
    aux2 = aux1.rows;

    for (const i of aux2) {
        tbody.innerHTML += `<tr>
        <td>${i.matricula}</td>
        <td>${i.marca}</td>
        <td>${i.modelo}</td>
        <td>${i.precio}$</td>
        <td><button type="button" class="btn btn-outline-success">Comprar</td>
      </tr>`;
    }

}
function cambio(div){
  d_comprar.hidden = true;
  d_facturas.hidden = true;
  d_opciones.hidden = true;

  div.hidden = false;
}