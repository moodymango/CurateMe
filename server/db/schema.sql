CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(50),
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "username" VARCHAR(50),
    "password" VARCHAR(50)
);
CREATE TABLE "collection" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(150),
    "description" TEXT,
    "likes" INT, 
    --
    "creation_date" DATE
);
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
CREATE TABLE "artwork_seq" (
    "id" SERIAL PRIMARY KEY,
    "artwork_id" INT,
    "collection_id" INT,
    "position" INT DEFAULT NULL, 
    "prevID" INT DEFAULT NULL,
    "nextID" INT DEFAULT NULL,
    FOREIGN KEY("collection_id") REFERENCES collection("id"),
    FOREIGN KEY("artwork_id") REFERENCES artwork("id")
)