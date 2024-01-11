CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(50) NOT NULL,
    -- "profile_image" BLOB, 
);
CREATE TABLE "collections" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "likes" INT, 
    "creation_date" DATE,
    FOREIGN KEY("user_id") REFERENCES user("id"),
);
--
CREATE TABLE "artwork" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(150),
    "artist_title" VARCHAR(150),
    "date_display" VARCHAR(150),
);
CREATE TABLE "impression" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT,
    "user_id" INT, 
    "artwork_id" INT,
    FOREIGN KEY("user_id") REFERENCES user("id"),
    FOREIGN KEY("artwork_id") REFERENCES artwork("id")
);
--table to keep track of the sequence of artworks within a single collection
CREATE TABLE "collection_order" (
    "id" SERIAL PRIMARY KEY,
    "artwork_id" INT,
    "collection_id" INT,
    "position" INT UNIQUE DEFAULT NULL, 
    "prevID" INT DEFAULT NULL,
    "nextID" INT DEFAULT NULL,
    FOREIGN KEY("collection_id") REFERENCES collections("id"),
    FOREIGN KEY("artwork_id") REFERENCES artwork("id")
);