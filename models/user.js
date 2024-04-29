const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findByID = (id, result) => {
    const sql = `
    SELECT 
        id,
        email,
        dni,
        name,
        lastname1,
        lastname2,
        phone,
        location,
        password,
        image
    FROM 
     users 
    WHERE 
    id = ?`;

    db.query(sql, [id], (err, user) => {
        if(err){
            console.log(`Error: `, err);
            result(err, null);
        }else{
            console.log(`Usuario: `, user[0]);
            result(null, user[0]);
        }
    }
    );
}   

User.findByEmail = (email, result) => {
    const sql = `
    SELECT
        id,
        email,
        dni,
        name,
        lastname1,
        lastname2,
        phone,
        location,
        password,
        image
    FROM
        users
    WHERE
        email = ?`;

    db.query(sql, [email], (err, user) => {
        if(err){
            console.log(`Error: `, err);
                result(err, null);
        }else{                
            console.log(`Usuario: `, user[0]);
            result(null, user[0]);
            }
    });
}        

User.create = async (user, result) => {

    //Encriptacion del password
    const hash = await bcrypt.hash(user.password, 10);

    const sql = `INSERT INTO users(
        email,
        dni,
        name,
        lastname1,
        lastname2,
        phone,
        location,
        image,
        password,
        created_at,
        updated_at
    )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.email,
            user.dni,
            user.name,
            user.lastname1,
            user.lastname2,
            user.phone,
            user.location,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log(`Error: `, err);
                result(err, null);
            }else{
                console.log(`Id del nuevo ususario: `, res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

module.exports = User;