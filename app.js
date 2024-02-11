'use strict'

// Base 
const express = require('express');
const restFull = require('express-method-override')('_method');
const port = (process.env.PORT || 3000);
// Direcciones
const public_dir = express.static(__dirname + '/public');
const views_dir = express.static(__dirname + '/views');
const default_router = require('./router/default_router');
const faviconURL = __dirname + '/public/image';//Terminar luego
// Extra
// const favicon = require('serve-favicon');
const body_parser = require('body-parser');
const app = express();

app
    // Sets
    .set('views', views_dir)
    .set('view engine', 'pug')
    .set('port', port)
    // Uses
    .use(body_parser.json({ extended: true }))
    .use(body_parser.urlencoded({ extended: true }))
    .use(restFull)
    .use(public_dir)
    .use(default_router);

module.exports = app;