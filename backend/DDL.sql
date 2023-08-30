create table users (
	id serial,
	email varchar(255),
	password varchar(8),
	fullName varchar(255)
);

insert into users(email, password, fullname) values('adm@gmail.com', '12345678', 'Admin');