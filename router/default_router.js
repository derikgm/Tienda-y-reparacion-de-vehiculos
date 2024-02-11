'use strict'

const default_controller = require('../controller/default_controller');
const express = require('express');
const router = express.Router();
const public_dir = 'D:/Derik/Proyectos programacion/Web/Tienda y reparacion de vehiculos/public'; 

router
    .get('/', default_controller.index)
    .get('/login',default_controller.login)
    .get('/creacion',default_controller.creacion)
    .get('/reparacion',default_controller.reparacion)
    .get('/opciones',default_controller.opciones)
    .get('/obtener-autos',default_controller.obtener_autos)
    .get('/obtener-facturas',default_controller.obtener_facturas)
    .use((req,res,next)=>{
        res.render('error');
    });

module.exports = router;