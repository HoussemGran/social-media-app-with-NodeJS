
const mysql = require('mysql');

const conn = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'houssem0123',
    database:'socialapp'

});

conn.connect(err=>{

    if(!err) console.log('connected to the data base');
    else ('error while connecting');
});

module.exports = conn;