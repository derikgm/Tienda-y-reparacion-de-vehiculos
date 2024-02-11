'use strict'

const conn = require('./bd_connect');
const default_model = ()=>{};

default_model.query = (query,callback) =>conn.query(query,callback);

module.exports = default_model;
