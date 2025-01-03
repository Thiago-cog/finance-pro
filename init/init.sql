\c finance;

CREATE SEQUENCE seq_users_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_accounts_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_cards_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_invoices_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_extracts_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_categories_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_wallets_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_type_investments_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_investments_id START WITH 1 INCREMENT BY 1;

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
    category_id BIGINT NOT NULL,
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
    category_id BIGINT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    type_movement INTEGER NOT NULL,
    date_movement DATE NOT NULL,
    month INTEGER NOT NULL,
    year BIGINT NOT NULL
);
ALTER TABLE
    invoices ADD PRIMARY KEY(id);

CREATE TABLE categories(
    id BIGINT NOT NULL DEFAULT nextval('seq_categories_id'),
    name_category VARCHAR(255) NOT NULL,
    type_category INTEGER NOT NULL
);
ALTER TABLE
    categories ADD PRIMARY KEY(id);

CREATE TABLE wallets(
    id BIGINT NOT NULL DEFAULT nextval('seq_wallets_id'),
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    total_value DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    wallets ADD PRIMARY KEY(id);

CREATE TABLE type_investments(
    id BIGINT NOT NULL DEFAULT nextval('seq_type_investments_id'),
    name_type VARCHAR(255) NOT NULL
);
ALTER TABLE
    type_investments ADD PRIMARY KEY(id);

CREATE TABLE investments(
    id BIGINT NOT NULL DEFAULT nextval('seq_investments_id'),
    wallet_id BIGINT NOT NULL,
    type_investments BIGINT NOT NULL,
    stock VARCHAR(255) NOT NULL,
    quota_amount BIGINT NOT NULL,
    value DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    investments ADD PRIMARY KEY(id);

ALTER TABLE
    extracts ADD CONSTRAINT extracts_account_id_foreign FOREIGN KEY(account_id) REFERENCES accounts(id);

ALTER TABLE
    extracts ADD CONSTRAINT extracts_category_id_foreign FOREIGN KEY(category_id) REFERENCES categories(id);

ALTER TABLE
    invoices ADD CONSTRAINT invoices_category_id_foreign FOREIGN KEY(category_id) REFERENCES categories(id);

ALTER TABLE
    cards ADD CONSTRAINT cards_accounts_id_foreign FOREIGN KEY(accounts_id) REFERENCES accounts(id);

ALTER TABLE
    accounts ADD CONSTRAINT accounts_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE
    invoices ADD CONSTRAINT invoices_card_id_foreign FOREIGN KEY(card_id) REFERENCES cards(id);

ALTER TABLE
    investments ADD CONSTRAINT investments_type_investments_foreign FOREIGN KEY(type_investments) REFERENCES type_investments(id);

ALTER TABLE
    wallets ADD CONSTRAINT wallets_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE
    investments ADD CONSTRAINT investments_wallet_id_foreign FOREIGN KEY(wallet_id) REFERENCES wallets(id);

INSERT INTO users(email, password, fullname) VALUES('adm@gmail.com', '$2b$10$oOZiInZ9Z2qHHac6TNQlH.0G7dGhZ3SoW.vIDK/yymrSPfEM0FpZ6', 'Admin');

INSERT INTO categories(name_category, type_category) VALUES('Alimentação', 2);
INSERT INTO categories(name_category, type_category) VALUES('Carro', 2);
INSERT INTO categories(name_category, type_category) VALUES('Estudos', 2);
INSERT INTO categories(name_category, type_category) VALUES('Lazer', 2);
INSERT INTO categories(name_category, type_category) VALUES('Casa', 2);
INSERT INTO categories(name_category, type_category) VALUES('Saúde', 2);
INSERT INTO categories(name_category, type_category) VALUES('Transporte', 2);
INSERT INTO categories(name_category, type_category) VALUES('Salário', 1);
INSERT INTO categories(name_category, type_category) VALUES('Vendas', 1);
INSERT INTO categories(name_category, type_category) VALUES('Rendimentos', 1);

INSERT INTO type_investments(name_type) VALUES('Ações');
INSERT INTO type_investments(name_type) VALUES('FIIs');
INSERT INTO type_investments(name_type) VALUES('BRD');
INSERT INTO type_investments(name_type) VALUES('Criptomoeda');