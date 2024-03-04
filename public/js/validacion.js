function valid_numeros(elem, input, longitud){  
    if(elem.data > '9' || elem.data < '0' || input.value.length > longitud)
        input.value = input.value.substring(0, input.value.length-1);        
}

function valid_usuario(elem, input){

    if(
        ((elem.data < '0'|| elem.data > '9') && 
        (elem.data < 'a' || elem.data > 'z') && 
        (elem.data < 'A' || elem.data > 'Z'))||
        (input.value.length > 15)){
            input.value = input.value.substring(0, input.value.length-1);
        }
}

function valid_caracteres(elem, input, longitud){
    if(
        (elem.data < 'a' || elem.data > 'z') && 
        (elem.data < 'A' || elem.data > 'Z') &&
        !(elem.data == ' ') &&
        !(elem.data >= 'á' && elem.data <= 'ú')
        || input.value.length > longitud){
            input.value = input.value.substring(0, input.value.length-1);
        }
}