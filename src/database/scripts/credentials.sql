ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

CREATE TABLE IF NOT EXISTS credentials (
   user_id INT UNIQUE NOT NULL,
   salt VARCHAR(64) NOT NULL,
   hashed_password VARCHAR(1000) NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (id)
);
