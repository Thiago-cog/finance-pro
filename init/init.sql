\c finance;

CREATE SEQUENCE seq_users_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_accounts_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_cards_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_invoices_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_extracts_id START WITH 1 INCREMENT BY 1;

CREATE TABLE accounts(
    id BIGINT NOT NULL DEFAULT nextval('seq_accounts_id'),
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type_accounts INTEGER NOT NULL,
    balance DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    accounts ADD PRIMARY KEY(id);
CREATE TABLE cards(
    id BIGINT NOT NULL DEFAULT nextval('seq_cards_id'),
    accounts_id BIGINT NOT NULL,
    number_card VARCHAR(255) NOT NULL,
    due_day BIGINT NOT NULL,
    limit_card DOUBLE PRECISION NOT NULL,
    value DOUBLE PRECISION NULL
);
ALTER TABLE
    cards ADD PRIMARY KEY(id);
CREATE TABLE extracts(
    id BIGINT NOT NULL DEFAULT nextval('seq_extracts_id'),
    account_id BIGINT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    type_movement INTEGER NOT NULL,
    date_movement DATE NOT NULL,
    month INTEGER NOT NULL,
    year BIGINT NOT NULL
);
ALTER TABLE
    extracts ADD PRIMARY KEY(id);
CREATE TABLE users(
    id BIGINT NOT NULL DEFAULT nextval('seq_users_id'),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL
);
ALTER TABLE
    users ADD PRIMARY KEY(id);
CREATE TABLE invoices(
    id BIGINT NOT NULL DEFAULT nextval('seq_invoices_id'),
    card_id BIGINT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    type_movement INTEGER NOT NULL,
    date_movement DATE NOT NULL,
    month INTEGER NOT NULL,
    year BIGINT NOT NULL
);
ALTER TABLE
    invoices ADD PRIMARY KEY(id);
ALTER TABLE
    extracts ADD CONSTRAINT extracts_account_id_foreign FOREIGN KEY(account_id) REFERENCES accounts(id);
ALTER TABLE
    cards ADD CONSTRAINT cards_accounts_id_foreign FOREIGN KEY(accounts_id) REFERENCES accounts(id);
ALTER TABLE
    accounts ADD CONSTRAINT accounts_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE
    invoices ADD CONSTRAINT invoices_card_id_foreign FOREIGN KEY(card_id) REFERENCES cards(id);

INSERT INTO users(email, password, fullname) VALUES('adm@gmail.com', '$2b$10$oOZiInZ9Z2qHHac6TNQlH.0G7dGhZ3SoW.vIDK/yymrSPfEM0FpZ6', 'Admin');