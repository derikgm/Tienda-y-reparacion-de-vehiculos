'use strict'

const default_controller = require('../controller/default_controller');
const express = require('express');
const router = express.Router();

router
    .get('/', default_controller.index)
    .get('/login',default_controller.login)
    .get('/creacion',default_controller.creacion)
    .get('/reparacion',default_controller.reparacion)
    .get('/opciones',default_controller.opciones)
    .get('/obtener-autos',default_controller.obtener_autos)
    .get('/obtener-facturas/:nombre_usuario',default_controller.obtener_facturas)
    .get('/obtener-ci/:nombre_usuario',default_controller.obtener_ci)
    .get('/obtener_usuario/:nombre_usuario',default_controller.obtener_usuario)
    .get('/autentificar_usuario/:usuario/:contra',default_controller.autentificar_usuario)
    .post('/buscar_segun',default_controller.buscar_segun)
    .post('/crear_usuario',default_controller.crear_usuario)
    .delete('/eliminar-fac/:macro_fac/:micro_fac/:clienteCi', default_controller.eliminar_factura)
    .delete('/comprar_coche/:matricula', default_controller.comprar_coche)
    .use(default_controller.error404);

module.exports = router;