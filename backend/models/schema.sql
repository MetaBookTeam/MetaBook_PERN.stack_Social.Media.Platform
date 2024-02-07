-- Create a table called **roles** in the database
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE
  roles (
    id SERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(255) NOT NULL
  );

-- insert roles
INSERT INTO
  roles (role)
VALUES
  ('Admin'),
  ('User') RETURNING *;

-- Create a table called **permissions** in the database
DROP TABLE IF EXISTS permissions CASCADE;

CREATE TABLE
  permissions (
    id SERIAL NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );

-- insert permissions  
INSERT INTO
  permissions (permission)
VALUES
  ('CREATE_ARTICLE'),
  ('CREATE_COMMENT') RETURNING *;

-- Create a table called **role_permission** in the database
DROP TABLE IF EXISTS role_permission CASCADE;

CREATE TABLE
  role_permission (
    id SERIAL PRIMARY KEY NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
  );

-- insert role_permission connections
INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 1),
  (1, 2) RETURNING *;

-- Create a table called **users** in the database
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT,
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
  );

-- insert users
INSERT INTO
  users (
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role_id
  )
VALUES
  ('fName', 'lName', 0, 'Jordan', 'admin', 123456, 1),
  ('fName', 'lName', 0, 'Jordan', 'user1', 123456, 2),
  ('fName', 'lName', 0, 'Jordan', 'user2', 123456, 2) RETURNING *;

--! the inserted passwords are not encrypted so the login will not work on them, so we need to register from POSTMAN.
--
