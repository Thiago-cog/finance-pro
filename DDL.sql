create table users (
	id serial,
	email varchar(255),
	password char(8),
	fullName varchar(255)
);

insert into users(email, password, fullname) values('adm@gmail.com', '123456', 'Admin');