const db = require('../config/config');

const Rol = {};

Rol.create = (id_user, id_rol, result) => {
    const sql = `
    INSERT INTO
        user_has_roles
        (
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES
        (
            ?, ?, ?, ?
        )`;

    db.query(sql, [id_user, id_rol, new Date(), new Date()], (err, res) => {
        if (err) {
            console.log(`Error: `, err);
            result(err, null);
        } else {
            console.log(`Usuario obtenido: `, res.insertId);
            result(null, res.insertId);
        }

    })
}
//este create es para los enfermeros
Rol.create2 = (id_user, id_rol, result) => {
    const sql = `
    INSERT INTO
        user_has_roles
        (
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES
        (
            ?, ?, ?, ?
        )`;

    db.query(sql, [id_user, id_rol, new Date(), new Date()], (err, res) => {
        if(err){
            console.log(`Error: `, err);
            result(err, null);
        }else{
            console.log(`Usuario obtenido: `, id_user);
            result(null, id_user);
        }
    
        }
    )
}

Rol.getAll = (result) => {
    const sql = `
    SELECT            
        CONVERT(id, char) AS id,
        name
    FROM
        roles
    ORDER BY
        id
    `;
    db.query(sql, (err, roles) => {
        if(err){
            console.log(`Error: `, err);
            result(err, null);
        }else{
            console.log(`Roles: `, roles);
            result(null, roles);
        }
    }
    )

}

module.exports = Rol;