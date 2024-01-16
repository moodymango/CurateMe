--to do:
    --create indexes for any foreign keys to speed up joins and other operations
    --indexes on columns that appear freqeuntly in where clauses
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS artworks CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS impressions CASCADE;
DROP TABLE IF EXISTS collection_order CASCADE;

DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS impression CASCADE;
DROP TABLE IF EXISTS artwork CASCADE;


CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(50) NOT NULL
); 

CREATE TABLE "collections" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "likes" INT, 
    "creation_date" DATE,
    FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE
);
CREATE TABLE "artworks" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(150),
    "artist_title" VARCHAR(150),
    "date_display" VARCHAR(150),
    "image_url" VARCHAR(200)
);
CREATE TABLE "impressions" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT,
    "user_id" INT, 
    "artwork_id" INT,
    FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);
--table to keep track of the sequence of artworks within a single collection
CREATE TABLE "collection_order" (
    "id" SERIAL PRIMARY KEY,
    "artwork_id" INT,
    "collection_id" INT,
    "position" INT UNIQUE DEFAULT NULL, 
    "prevID" INT DEFAULT NULL,
    "nextID" INT DEFAULT NULL,
    FOREIGN KEY("collection_id") REFERENCES collections("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);
