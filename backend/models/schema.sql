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
    id SERIAL PRIMARY KEY NOT NULL,
    permission VARCHAR(255) NOT NULL
  );

-- insert permissions  
INSERT INTO
  permissions (permission)
VALUES
  ('ADD_POST'),
  ('ADD_COMMENT') RETURNING *;

-- Create a table called **role_permission** in the database
DROP TABLE IF EXISTS role_permission CASCADE;

CREATE TABLE
  role_permission (
    id SERIAL PRIMARY KEY NOT NULL,
    role_id INT REFERENCES roles (id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions (id) ON DELETE CASCADE
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
    email TEXT UNIQUE NOT NULL,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL REFERENCES roles (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert users
INSERT INTO
  users (email, user_name, password, role_id)
VALUES
  ('admin@gmail.com', 'admin1', 123456, 1),
  ('user1@gmail.com', 'user1', 123456, 2),
  ('user2@gmail.com', 'user2', 123456, 2) RETURNING *;

--! the inserted passwords are not encrypted so the login will not work on them, so we need to register from POSTMAN.
--
-- Create a table called **user_profile** in the database
DROP TABLE IF EXISTS user_profile CASCADE;

CREATE TABLE
  user_profile (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birthday TIMESTAMP,
    gender VARCHAR(6) CHECK (gender IN ('male', 'female')),
    phone_number INT UNIQUE,
    school VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255)
  );

-- insert users
INSERT INTO
  user_profile (
    user_id,
    first_name,
    last_name,
    birthday,
    gender,
    phone_number,
    school,
    address,
    city,
    country
  )
VALUES
  (
    1,
    'fName',
    'lName',
    '2000-01-01',
    'male',
    0790000001,
    'school',
    'address',
    'Amman',
    'Jordan'
  ),
  (
    2,
    'fName',
    'lName',
    '1990-11-11',
    'female',
    0790000002,
    'school',
    'address',
    'Irbid',
    'Jordan'
  ),
  (
    3,
    'fName',
    'lName',
    '1999-09-09',
    'male',
    0790000003,
    'school',
    'address',
    'Zarqa',
    'Jordan'
  ) RETURNING *;

-- Create a table called **pages** in the database
DROP TABLE IF EXISTS pages CASCADE;

CREATE TABLE
  pages (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    page_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert pages
INSERT INTO
  pages (user_id, page_name)
VALUES
  (1, 'MERAKI'),
  (1, 'Udemy') RETURNING *;

-- Create a table called **page_content** in the database
DROP TABLE IF EXISTS page_content CASCADE;

CREATE TABLE
  page_content (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES pages (user_id) ON DELETE CASCADE,
    page_id INT NOT NULL REFERENCES pages (id) ON DELETE CASCADE,
    page_content TEXT
  );

--! need to discuss the page_content data type and what values it will hold.
-- insert page_content
INSERT INTO
  page_content (page_content)
VALUES
  ('text 1'),
  ('text 2') RETURNING *;

-- Create a table called **page_likes** in the database
DROP TABLE IF EXISTS page_likes CASCADE;

CREATE TABLE
  page_likes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    page_id INT NOT NULL REFERENCES pages (id) ON DELETE CASCADE
  );

-- insert page_likes
INSERT INTO
  page_likes (user_id, page_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2) RETURNING *;

-- Create a table called **friends** in the database
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE
  friends (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    friend_id INT UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

--! we have  user_id  and friend_id both refers to users table for unique instances (persons).
-- insert friends
INSERT INTO
  friends (user_id, friend_id)
VALUES
  (1, 2) RETURNING *;

-- Create a table called **posts** in the database
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE
  posts (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert posts
INSERT INTO
  posts (user_id, content)
VALUES
  (1, 'This is text post'),
  (2, 'This is text post 2') RETURNING *;

-- Create a table called **posts_likes** in the database
DROP TABLE IF EXISTS posts_likes CASCADE;

CREATE TABLE
  posts_likes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE
  );

--! prevent the user from liking the same post multiple times... Frontend and backend
-- insert posts_likes
INSERT INTO
  posts_likes (user_id, post_id)
VALUES
  (1, 1),
  (2, 1),
  (1, 2),
  (2, 2) RETURNING *;

-- Create a table called **photos** in the database
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE
  photos (
    id SERIAL PRIMARY KEY NOT NULL,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert photos
INSERT INTO
  photos (post_id, photo_url)
VALUES
  (1, 'image URL1'),
  (2, 'image URL2') RETURNING *;

-- Create a table called **shares** in the database
DROP TABLE IF EXISTS shares CASCADE;

CREATE TABLE
  shares (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE
  );

-- insert shares
INSERT INTO
  shares (user_id, post_id)
VALUES
  (1, 1),
  (1, 1),
  (1, 2),
  (2, 2) RETURNING *;

-- Create a table called **comments** in the database
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE
  comments (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW (),
    is_deleted SMALLINT DEFAULT 0
  );

-- insert comments
INSERT INTO
  comments (user_id, post_id, comment)
VALUES
  (1, 1, 'comment 1'),
  (2, 1, 'comment 2') RETURNING *;

-- Create a table called **comment_likes** in the database
DROP TABLE IF EXISTS comment_likes CASCADE;

CREATE TABLE
  comment_likes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    comment_id INT NOT NULL REFERENCES comments (id) ON DELETE CASCADE
  );

--! prevent the user from liking the same comment multiple times... frontend and backend
-- insert comment_likes
INSERT INTO
  comment_likes (user_id, comment_id)
VALUES
  (2, 1),
  (1, 2) RETURNING *;