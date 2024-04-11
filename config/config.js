const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'app'
});

db.connect(function(err){
    if(err) throw err;
    console.log('DATABASE CONECTED');
});

module.exports = db;