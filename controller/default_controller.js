'use strict'

let pathUrl;
let consulta;
const path = require('path');
const default_model = require('../models/default_model');
const default_controller = () => {};

default_controller.index = (req,res,next)=>{
    pathUrl = path.join(__dirname, '..', 'public', 'html', 'index.html');
    res.sendFile(pathUrl);
}
default_controller.login = (req,res,next)=>{
    pathUrl = path.join(__dirname, '..', 'public', 'html', 'login.html');
    res.sendFile(pathUrl);
}
default_controller.creacion = (req,res,next)=>{
    pathUrl = path.join(__dirname, '..', 'public', 'html', 'creacion.html');
    res.sendFile(pathUrl);
}
default_controller.reparacion = (req,res,next)=>{
    pathUrl = path.join(__dirname, '..', 'public', 'html', 'reparacion.html');
    res.sendFile(pathUrl);
}
default_controller.opciones = (req,res,next)=>{
    pathUrl = path.join(__dirname, '..', 'public', 'html', 'opciones.html');
    res.sendFile(pathUrl);
}
default_controller.obtener_autos = (req,res,next)=>{
    default_model.query(`select * from coche where estado = 'Venta' order by RANDOM() limit 15`,(err,valores)=>{
        if(err){
            console.log('hubo un error');
        }else{
            res.send(valores);
        }
    });
}
default_controller.obtener_facturas = (req,res,next)=>{
    consulta = `SELECT * FROM obtener_facturas('${req.params.nombre_usuario}')`;

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('hubo un error');
        }else{
            res.send(valores);
        }
    });
}
default_controller.obtener_ci = (req,res,next)=>{
    consulta = `SELECT clienteci FROM usuario
                where nombre_usuario = '${req.params.nombre_usuario}'`;

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('hubo un error');
        }else{
            res.send(valores);
        }
    });
}
default_controller.eliminar_factura = (req,res,next)=>{
    
    // Validacion de la targeta de pago
    // Usar API para descontar dinero de la targeta

    let macro_fac_id = req.params.macro_fac;
    let micro_fac_id = req.params.micro_fac;
    let clienteci = req.params.clienteCi;


    if(macro_fac_id == 'Padre'){
        consulta = `delete from factura 
        where id = ${micro_fac_id} and clienteci = '${clienteci}'`;
    }else{
        consulta = `delete from micro_factura where
                    id = ${micro_fac_id} and facturaid = ${macro_fac_id}`;
    }

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('hubo un error en la eliminacion');
        }
    });
}
default_controller.comprar_coche = (req,res,next)=>{

    // Validacion de la targeta de pago
    // Usar API para descontar dinero de la targeta

    consulta = `delete from coche where matricula = '${req.params.matricula}'`;
    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('Ocurrio un error eliminando coches');
        }
    });
}
default_controller.buscar_segun = (req,res,next) =>{
    let valores = req.body.checkboxes;
    let consulta = `select * from coche where estado = 'Venta' and (`;

    valores.forEach((elemento)=>{
        if(elemento != valores[0]){
            consulta += ' or ';
        }
        if(elemento.includes('between')){
            consulta += 'precio ' + elemento;
        }else{
            consulta += `marca = '${elemento}'`;
        }
    });
    consulta += ') order by RANDOM() limit 15';

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('ocurrio un error');
        }else{
            res.send(valores);
        }
    });
}
default_controller.obtener_usuario = (req,res,next) =>{
    let nombre = req.params.nombre_usuario;
    consulta = `Select nombre_usuario from usuario where nombre_usuario = '${nombre}'`;

    default_model.query(consulta, (err, valores)=>{
        if(err){
            console.log('Error');
        }else{
            res.send(valores);
        }
    });
}
default_controller.crear_usuario = (req,res,next) =>{
    let datos = req.body;
    
    consulta = `insert into cliente values ('${datos.Carnet}',current_date, 
    '${datos.Telefono}', '${datos.Direccion}', ${datos.Edad}, '${datos.Nombre}'); 
    insert into usuario values ('${datos.Nombre_usuario}','${datos.Contra}','${datos.Carnet}');`

    console.log(consulta);

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('Ocurrio un error a la hora de crear la cuenta');
        }
        else{
            console.log('exito');
            res.redirect('/');
        }
    })
}
default_controller.autentificar_usuario = (req,res,next)=>{
    let nombre = req.params.usuario;
    let contra = req.params.contra;

    consulta = `select nombre_usuario from usuario
    where nombre_usuario = '${nombre}' and contra = '${contra}'`;

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('Ocurrio un error a la hora de buscar');
        }else{
            res.send(valores);
        }
    })
}
default_controller.error404 = (req,res,next)=>{
    let direccion = path.join(__dirname,'..','public','html','error404.html');
    res.sendFile(direccion);
}


module.exports = default_controller;