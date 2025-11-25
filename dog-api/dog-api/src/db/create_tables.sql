CREATE TABLE public.favorite_dogs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  image_url TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);