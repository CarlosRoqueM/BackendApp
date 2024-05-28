const db = require('../config/config');

const Profile = {};

Profile.findByUser = (id_user, result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        name,
        lastname1,
        lastname2,
        age,
        image,
        CONVERT(id_user, char) AS id_user
    FROM
        profile
    WHERE
        id_user = ?
    `;
    db.query(sql, id_user, (err, data) => {
        if (err) {
            console.log(`Error: `, err);
            result(err, null);
        } else {
            result(null, data);
        }

    })
}


Profile.create = async (address, result) => {
    const sql = `
    INSERT INTO
        profile
        (
            name,
            lastname1,
            lastname2,
            age,
            image,
            id_user,
            created_at,
            updated_at
        )
    VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, ?
        )`;

    db.query(sql, [
        address.name, 
        address.lastname1,
        address.lastname2,
        address.age,
        address.image,
        address.id_user,  
        new Date(), 
        new Date()
    ], (err, res) => {
        if (err) {
            console.log(`Error: `, err);
            result(err, null);
        } else {
            console.log(`Id del nuevo perfil: `, res.insertId);
            result(null, res.insertId);
        }

    })
}

module.exports = Profile;