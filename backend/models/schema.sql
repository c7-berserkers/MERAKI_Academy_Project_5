--tag_
CREATE TABLE tags (
  id SERIAL NOT NULL,
  tag TEXT,
  img TEXT,
  created_at timestamp DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);

--roles
CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

--permissions
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

--role_permission
CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);

--users
CREATE TABLE users(
  id SERIAL NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at timestamp  DEFAULT NOW(),
  img TEXT NOT NULL,
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);

--posts
CREATE TABLE posts (
  id SERIAL NOT NULL,
  img VARCHAR NOT NULL,
  description TEXT,
  created_at timestamp DEFAULT NOW(),
  user_id INT,
  is_deleted SMALLINT DEFAULT 0,
  tag_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id),
  PRIMARY KEY (id)
);

--comments
CREATE TABLE comments(
  id SERIAL NOT NULL,
  comment TEXT,
  post_id INT,
  user_id INT,
  created_at timestamp DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);




--follows
CREATE TABLE follows(
  id SERIAL NOT NULL,
  following_user_id INT,
  followed_user_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (following_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (followed_user_id) REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

--likes
CREATE TABLE likes(
  id SERIAL NOT NULL,
  user_id INT,
  posts_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (posts_id) REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);


