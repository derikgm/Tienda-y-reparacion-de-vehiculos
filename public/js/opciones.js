const tbody= document.getElementById('tbody');
const tbody_facturas = document.getElementById('tbody_facturas');
const b_comprar = document.getElementById('b_comprar');
const b_facturas = document.getElementById('b_facturas');
const b_opciones = document.getElementById('b_opciones');
const b_paga = document.getElementById('b_paga');
const d_comprar = document.getElementById('d_comprar');
const d_facturas = document.getElementById('d_facturas');
const d_opciones = document.getElementById('d_opciones');
const ventana_modal = document.getElementById('modalSheet');
const i_targeta = document.getElementById('i_targeta');
const titulo_modal = document.getElementById('titulo_modal');
const id_paga = document.getElementById('id_paga');
const buscar_modal = document.getElementById('buscar_modal');
const collapse = document.getElementById('collapse');
const nombre_usuario = localStorage.getItem('usuario');
let idF_aux ='', idMicF = '', tr_aux, clienteCI = localStorage.getItem('clienteCi'), mat_aux;
let ajax_compra = new XMLHttpRequest();
let ajax_facturas = new XMLHttpRequest();
let ajax_paga = new XMLHttpRequest();
let compra_iniciado = true, facturas_iniciado = true, asc = 1;
let datos_compra, datos_factura, ultima_funcion;

// Listeners
b_comprar.addEventListener('click', ()=>{
  cambio(d_comprar);
  collapse.click();
  if(compra_iniciado){
    ajax_compra.open('GET', '/obtener-autos', true);
    ajax_compra.send(null);
  }
}, true);
b_facturas.addEventListener('click', ()=>{
  cambio(d_facturas);
  collapse.click();
  if(facturas_iniciado){
    ajax_facturas.open('GET', '/obtener-facturas/'+ nombre_usuario, true);
    ajax_facturas.send(null);
  }
}, true);
b_opciones.addEventListener('click', ()=>{
  cambio(d_opciones);
  collapse.click();
}, true);
i_targeta.addEventListener('input',(elem)=>valid_numeros(elem,i_targeta));

ajax_compra.addEventListener('load', mostrar_compra, true);
ajax_facturas.addEventListener('load', mostrar_facturas, true);

if(localStorage.getItem('direccion')=='compra')
  b_comprar.click();
else if(localStorage.getItem('direccion')=='factura')
  b_facturas.click();
else
  b_opciones.click();

// Funciones
function mostrar_compra(e){
    compra_iniciado = false;

    tbody.innerHTML = '';
    datos_compra = JSON.parse(e.target.responseText);

    for (const i of datos_compra.rows) {
        tbody.innerHTML += `<tr>
        <td>${i.matricula}</td>
        <td>${i.marca}</td>
        <td>${i.modelo}</td>
        <td>${i.precio}$</td>
        <td><button type="button" class="btn btn-outline-success"
            onclick = "mostrar_modal(true,this.parentNode.parentNode.children[0])">Comprar</td>
      </tr>`;
    }
    ajax_compra.abort();
}
function mostrar_facturas(e){
    facturas_iniciado = false;

    datos_factura = (JSON.parse(e.target.responseText)).rows;

    document.getElementById('a_id').click();

    ajax_facturas.abort();
}
function cambio(div){
  d_comprar.hidden = true;
  d_facturas.hidden = true;
  d_opciones.hidden = true;

  div.hidden = false;
}
function ordenar(funcion){
  ultima_funcion = funcion;
  datos_factura.sort(funcion);   
  imprimir();
}
function imprimir(){  
  let valor, paga;
  tbody_facturas.innerHTML = '';

  if(datos_factura.length == 0){
    document.getElementById('zona_tabla').innerHTML = '<h1 class="text-white text-center">¡No tienes facturas, genial!</h1>'
  }else{
    for (const i of datos_factura) {
      valor = (i.paternidad == null) ? 'Padre' : i.paternidad;
      paga = (i.tipo_pago == 'Targeta') ? `<button type="button" class="btn btn-sm btn-outline-success"
      onclick = "mostrar_modal(false,this.parentNode.parentNode.children[0])">Pagar</button>` : '(Solo en efectivo)';

      tbody_facturas.innerHTML += `<tr>
      <td>${i.id}</td>
      <td>${i.tipo_pago}</td>
      <td>${i.anio}-${i.mes}-${i.dia}</td>
      <td>${i.monto_total}$</td>
      <td>${valor}</td>
      <td>${paga}</td>
      </tr>`;
    }
  }
}
function cambio_orden(btn){
  btn.innerHTML = (btn.innerHTML == 'Ascendente')? 'Descendente' : 'Ascendente';
  asc *= -1;
  ordenar(ultima_funcion);
}
function mostrar_modal(operacion, id){
  tr = id.parentNode;

  // true: compra
  if(operacion){
    ventana_modal.style.display = 'inline-block';
    titulo_modal.innerHTML = 'Comprar auto';
    id_paga.innerHTML = 'Matricula del producto: ' + '<b>' + id.innerHTML + '</b>';
    b_paga.innerHTML = 'Comprar';
    mat_aux = id.parentNode.children[0].innerHTML;
  // false: paga
  }else{
    b_paga.innerHTML = 'Pagar';
    let id_fac = '';

    idF_aux = tr.children[4].innerHTML;
    idMicF = id.innerHTML;

    ventana_modal.style.display = 'inline-block';
    titulo_modal.innerHTML = 'Realizar Paga';

    if(idF_aux != 'Padre')
      id_fac = idF_aux + '-';

    id_fac += idMicF;
    id_paga.innerHTML = 'Id de la factura: ' + '<b>' + id_fac + '</b>';
  }
}
function pagar(operacion){
  if(i_targeta.value != ''){

    if(operacion == 'Pagar'){
      ajax_paga.open('DELETE',`/eliminar-fac/${idF_aux}/${idMicF}/${clienteCI}`,true);
    }else{
      ajax_paga.open('DELETE',`/comprar_coche/${mat_aux}`,true);
    }
    ajax_paga.send(null);
    tr.hidden = true;
    ventana_modal.style.display = 'none';
    ajax_paga.abort();
  }else{
    alert('No puedes dejar el formulario de la targeta en blanco');
  }  
}
function buscar_segun(){
  let checkboxes = [];

  let aux = document.querySelectorAll('input[type="checkbox"]');

  aux.forEach((input)=>{
    if(input.checked){
        checkboxes.push(input.name);      
    }
  });
  
  /** EXPLICACION
   * Para trabajar y enviar datos de mejor manera via ajax con post es necesario definirle
   * que los datos se enviaran via json para que el servidor pueda trabajarles, para ello
   * se usa setRequestHeader (establecer lector de peticion) con el Content-Type, y 
   * application/json, para que defina que va a enviar un json, luego es solo parciar
   * del arreglo al objeto json con el stringify
   */
  ajax_compra.open('POST', '/buscar_segun', true);
  ajax_compra.setRequestHeader('Content-Type', 'application/json');
  ajax_compra.send(JSON.stringify({ 
    checkboxes: checkboxes
  }));

  buscar_modal.style.display = 'none';
}