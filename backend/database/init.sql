CREATE  TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  security_question TEXT NOT NULL,
  security_answer TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  age INTEGER,
  gender TEXT,
  phone TEXT,
  address TEXT,
  blood_type TEXT,
  allergies TEXT,
  medications TEXT,
  medical_history TEXT,
  emergency_contact TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS chat_threads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('user', 'bot')),
  content TEXT NOT NULL,
  image_path TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (thread_id) REFERENCES chat_threads (id)
);

INSERT OR IGNORE INTO users (email, password, name, security_question, security_answer) 
VALUES ('admin@hello.com', '$2a$10$rOzJqJ5rJ5rJ5rJ5rJ5rJ.', 'Admin Demo', 'What was the name of your first pet?', 'demo');
 