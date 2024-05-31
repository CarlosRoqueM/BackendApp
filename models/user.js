const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

/*---- Traer datos de los enfermeros por roles --------- */

User.findByRoles = (id_rol, result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.dni,
        U.name,
        U.lastname1,
        U.lastname2,
        U.phone,
        U.location,
        U.image,
        U.description, 
        U.price,
        U.experience,

        CONVERT(R.id, char) AS id_rol
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON 
        UHR.id_rol = R.id
    WHERE
        id_rol = 1
    GROUP BY
        U.id;
    `;
    db.query(sql, [id_rol], (err, users) => {
        if(err){
            console.log(`Error: `, err);
            result(err, null);
        }else{
            console.log(`Usuarios: `, users);
            result(null, users);
        }
    });
}

/*---- Traer datos de los enfermeros--------- */

User.getAllNurses = (result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.dni,
        U.name,
        U.lastname1,
        U.lastname2,
        U.phone,
        U.location,
        U.image,
        U.description, 
        U.price,
        U.experience
        FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        UHR.id_rol = R.id
    WHERE
        R.id = 1
    GROUP BY
        U.id;
    `;
    db.query(sql, (err, users) => {
        if(err){
            console.log(`Error: `, err);
            result(err, null);
        }else{
            console.log(`Usuarios: `, users);
            result(null, users);
        }
    });
}

/*------- BUSQUEDA DE ENFERMEROS POR APELLIDO */

User.findByLastName = (lastname1, result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.dni,
        U.name,
        U.lastname1,
        U.lastname2,
        U.phone,
        U.location,
        U.image
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        UHR.id_rol = R.id
    WHERE
        R.id = 1 AND LOWER(U.lastname1) LIKE ?
    GROUP BY
        U.id;
    `;

    db.query(sql, [`${lastname1.toLowerCase()}`], (err, users) => {
        if(err){
            console.log(`Error: `, err);
            result(err, null);
        }else{
            console.log(`Usuarios: `, users);
            result(null, users);
        }
    });
}

User.findByID = (id, result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.dni,
        U.name,
        U.lastname1,
        U.lastname2,
        U.phone,
        U.location,
        U.password,
        U.image,
        JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route 
            )
        ) AS roles
    FROM
        users AS U
    INNER JOIN
		user_has_roles AS UHR
	ON
		UHR.id_user = U.id
    INNER JOIN
		roles AS R
	ON 
		UHR.id_rol = R.id 
    WHERE 
        U.id = ?
    GROUP BY
		U.id
    `;

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
        U.id,
        U.email,
        U.dni,
        U.name,
        U.lastname1,
        U.lastname2,
        U.phone,
        U.location,
        U.password,
        U.image,
        JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route 
            )
        ) AS roles
    FROM
        users AS U
    INNER JOIN
		user_has_roles AS UHR
	ON
		UHR.id_user = U.id
    INNER JOIN
		roles AS R
	ON 
		UHR.id_rol = R.id
    WHERE
        email = ?
	GROUP BY
		U.id
    `;
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
        description,
        price, 
        experience,
        created_at,
        updated_at
    )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            user.description,
            user.price, 
            user.experience, 
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

User.registerNurse = async (user, result) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            result(err, null);
            return;
        }

        const sql = `
        INSERT INTO users (email, dni, name, lastname1, lastname2, phone, location, image, description, price, experience, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                user.description,
                user.price, 
                user.experience, 
                hash,
                new Date(),
                new Date()
            ],
            (err, res) => {
                if(err){
                    console.log(`Error: `, err);
                    result(err, null);
                }else{
                    console.log(`Id del nuevo enfermero: `, res.insertId);
                    result(null, res.insertId); // Aquí está el cambio
                }
            }
        )
    });
};

User.update = (user, result) => {

    const sql = `UPDATE 
        users 
    SET
        phone = ?,
        location = ?,
        image = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            user.phone,
            user.location,
            user.image,
            new Date(),
            user.id
        ],
        (err, res) => {
            if(err){
                console.log(`Error: `, err);
                result(err, null);
            }else{
                console.log(`Usuario actualizado: `, user.id);
                result(null, user.id);
            }
        }
    )
}

User.updateWithOutImage = (user, result) => {

    const sql = `UPDATE 
        users 
    SET
        phone = ?,
        location = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            user.phone,
            user.location,
            new Date(),
            user.id
        ],
        (err, res) => {
            if(err){
                console.log(`Error: `, err);
                result(err, null);
            }else{
                console.log(`Usuario actualizado: `, user.id);
                result(null, user.id);
            }
        }
    )
}

module.exports = User;