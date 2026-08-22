-- GlobeTrotter MySQL schema
-- Run this file in MySQL 8+ before enabling DATABASE_URL or DB_* variables.

CREATE DATABASE IF NOT EXISTS globetrotter
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE globetrotter;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  preferred_language VARCHAR(80) NOT NULL DEFAULT 'Spanish',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB;

-- Optional profile data for the GlobeTrotter dashboard.
CREATE TABLE IF NOT EXISTS user_languages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  language_name VARCHAR(80) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY user_language_unique (user_id, language_name),
  CONSTRAINT user_languages_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Demo account used by the frontend fallback and available for MySQL testing.
-- Password: demo123
-- The application stores bcrypt hashes; this hash is for "demo123".
INSERT INTO users (name, email, password, preferred_language)
VALUES (
  'Demo Traveler',
  'demo@globetrotter.app',
  '$2b$12$LQv3c1yqBWq8r5Yw0nqUeO7c3qV7N1kH5kZ5fH0X6GxK4mR2Z9a6K',
  'Spanish'
)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  preferred_language = VALUES(preferred_language);

INSERT INTO user_languages (user_id, language_name, is_primary)
SELECT id, 'Spanish', TRUE
FROM users
WHERE email = 'demo@globetrotter.app'
  AND NOT EXISTS (
    SELECT 1 FROM user_languages ul
    WHERE ul.user_id = users.id AND ul.language_name = 'Spanish'
  );

-- Optional verification queries:
-- SELECT id, name, email, preferred_language, created_at FROM users;
-- SELECT * FROM user_languages;
