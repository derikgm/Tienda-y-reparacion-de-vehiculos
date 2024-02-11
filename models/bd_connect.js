const {Client} = require('pg');

const client = new Client ({
    user: 'postgres',
    host: "localhost",
    database: "carshop",
    password: "123",
    port: 5432
});

client.connect().then(()=>{
    console.log('Conexion exitosa con la base de datos ' + client.database);
}).catch(()=>{
    console.log('No se pudo establecer la conexion con la base de datos');
});

module.exports = client;