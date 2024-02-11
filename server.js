'use strict'

const app = require('./app');

// app.

const server = app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en localhost:'+app.get('port'));
});