const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'carlos99',
    database: 'app'
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABASE CONECTED');
});

module.exports = db;