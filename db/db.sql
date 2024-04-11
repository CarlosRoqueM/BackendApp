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
    imageback varchar(255) null,
    password varchar(90) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

create table roles(
	id bigint primary key auto_increment,
    name varchar(90) null,
    lastname1 varchar(90) null,
    lastname2 varchar(90) null,
    image varchar(255) null,
    route varchar(180) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);