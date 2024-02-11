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
    default_model.query('select * from coche order by RANDOM() limit 15',(err,valores)=>{
        if(err){
            console.log('hubo un error');
        }else{
            res.send(valores);
        }
    });
}
default_controller.obtener_facturas = (req,res,next)=>{
    consulta = ``;

    default_model.query(consulta,(err,valores)=>{
        if(err){
            console.log('hubo un error');
        }else{
            res.send(valores);
        }
    });
}

module.exports = default_controller;