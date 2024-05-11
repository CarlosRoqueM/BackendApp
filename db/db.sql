use app;

create table users(
	id bigint primary key auto_increment,
    email varchar(100) not null unique,
    name varchar(90) null,
    lastname1 varchar(90) null,
    lastname2 varchar(90) null,
    phone varchar(90) null unique,
    location varchar(90) null,
    image varchar(255) null,
    password varchar(90) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

//Cambio 19/04/2024

ALTER TABLE app.users
ADD COLUMN dni varchar(90) null unique;

//Cambio 28/04/2024

ALTER TABLE app.users
DROP COLUMN imageback;

//Cambio 01/05/2024
create table roles(
	id bigint primary key auto_increment,
    name varchar(90) not null unique,
    image varchar(255) null,
    route varchar(100) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

insert into roles(
    name,  
    route, 
    created_at, 
    updated_at
) 
values(
    'Enfermero', 
    '/enfermero/booking/list', 
    now(), 
    now()
);

insert into roles(
    name,  
    route, 
    created_at, 
    updated_at
) 
values(
    'Cliente', 
    '/cliente/home', 
    now(), 
    now()
);

insert into roles(
    name,  
    route, 
    created_at, 
    updated_at
) 
values(
    'Admin', 
    '/admin/home', 
    now(), 
    now()
);

create table user_has_roles(
    id_user bigint not null,
    id_rol bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_user) references users(id) on update cascade on delete cascade,
    foreign key(id_rol) references roles(id) on update cascade on delete cascade,
	primary key (id_user, id_rol)	
);

// Nueva seleccion de usuario

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
				'id', R.id,
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
    ;


/* Seleccion de usuarios por rol de enfermero */

SELECT
    U.id,
    U.email,
    U.dni,
    U.name,
    U.lastname1,
    U.lastname2,
    U.phone,
    U.location,
    U.image,
    R.id AS id_rol
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