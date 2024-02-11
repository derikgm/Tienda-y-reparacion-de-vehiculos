'use strict'
// variables
const mpp = document.getElementById('d_montoPorPlazos')
const plazos = document.getElementById('i_plazos')
const siguiente_b =document.getElementById('siguiente_b');
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const i_paga = document.getElementById('i_paga');
const i_targeta = document.getElementById('i_targeta');
const volver_b = document.getElementById("volver_b");

if(i_paga.value == 'targeta'){
    i_targeta.parentNode.hidden = false;
}

// Asignaciones
i_paga.addEventListener('input',()=>{
    i_targeta.parentNode.hidden = !(i_paga.value == 'targeta');
});
siguiente_b.addEventListener('click', siguiente);


// Funciones
function siguiente(){
    cambio();
    for(let i = 1; i<= plazos.value; i++){
        mpp.innerHTML += `<div class="form-floating">
                                <input type="number" placeholder="Monto por plazo: ${i}" class="form-control" id="i_mpp${i}">                                        
                                <label for="i_mpp${i}">Monto por plazo: ${i}</label>
                            </div>`;
    }
}
function cambio(){
    form1.hidden = !form1.hidden;
    form2.hidden = !form2.hidden;
    mpp.innerHTML = '';
}