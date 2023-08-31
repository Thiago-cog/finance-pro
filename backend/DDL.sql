create table users (
	id bigint,
	email varchar(255),
	password varchar(8),
	fullName varchar(255),
	PRIMARY KEY (id)
);
CREATE SEQUENCE seq_users_id START WITH 1 INCREMENT BY 1;

insert into users(id, email, password, fullname) values(nextval('seq_users_id'),'adm@gmail.com', '12345678', 'Admin');

create table accounts(
	id bigint,
	user_id bigint,
	name varchar(255),
	typeaccounts int NOT NULL,
	balance float NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_users_id FOREIGN KEY (user_id) REFERENCES users (id)
);
	
CREATE SEQUENCE seq_accounts_id START WITH 1 INCREMENT BY 1;
