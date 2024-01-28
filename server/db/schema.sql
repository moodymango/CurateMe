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
    "first_name" VARCHAR(100) NULL,
    "last_name" VARCHAR(100) NULL,
    "username" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL
); 

CREATE TABLE "collections" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT NULL,
    "likes" INT NULL, 
    "creation_date" DATE,
    FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE
);
CREATE TABLE "artworks" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(150) NULL,
    "artist_title" VARCHAR(150) NULL,
    "date_display" VARCHAR(200) NULL,
    "image_url" VARCHAR NULL
);
CREATE TABLE "impressions" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NULL,
    "user_id" INT NULL, 
    "artwork_id" INT NULL,
    FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);
--table to keep track of the sequence of artworks within a single collection
CREATE TABLE "collection_order" (
    "id" SERIAL PRIMARY KEY,
    "artwork_id" INT NULL,
    "collection_id" INT NULL,
    "position" INT UNIQUE DEFAULT NULL, 
    "prevID" INT DEFAULT NULL,
    "nextID" INT DEFAULT NULL,
    FOREIGN KEY("collection_id") REFERENCES collections("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);