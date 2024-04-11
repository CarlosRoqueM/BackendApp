const db = require('../config/config');

const User = {};

User.create = (user, result) => {
    const sql = `INSERT INTO users(
        email,
        name,
        lastname1,
        lastname2,
        phone,
        location,
        image,
        imageback,
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
            user.name,
            user.lastname1,
            user.lastname2,
            user.phone,
            user.location,
            user.image,
            user.imageback,
            user.password,
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