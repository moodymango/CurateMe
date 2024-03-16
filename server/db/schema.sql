DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS artworks CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS impressions CASCADE;
DROP TABLE IF EXISTS collection_order CASCADE;


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

CREATE INDEX user_collection ON collections USING HASH (user_id);

CREATE TABLE "artworks" (
    "id" INT UNIQUE PRIMARY KEY,
    "title" VARCHAR(150) NULL,
    "artist_title" VARCHAR(150) NULL,
    "medium" VARCHAR(150) NULL,
    "date_display" VARCHAR(200) NULL,
    "image_id" INT NULL
);
INSERT INTO artworks("id", "title") VALUES(1,'sentinel'); 

CREATE TABLE "impressions" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NULL,
    "user_id" INT NULL, 
    "artwork_id" INT NULL,
    FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);

CREATE INDEX impression_user ON impressions USING HASH (user_id);
CREATE INDEX impression_artwork ON impressions USING HASH (artwork_id);


CREATE TABLE "collection_order" (
    "artwork_id" INT NULL,
    "collection_id" INT NULL,
    "position" INT DEFAULT NULL, 
    "prev_id" INT DEFAULT NULL,
    "next_id" INT DEFAULT NULL,
    FOREIGN KEY("collection_id") REFERENCES collections("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);

CREATE INDEX collection_order_prevID ON collection_order (prev_id);
CREATE INDEX collection_order_nextID ON collection_order (next_id);

CREATE INDEX collection_order_id ON collection_order USING HASH (collection_id);
CREATE INDEX collection_order_artwork_id on collection_order USING HASH (artwork_id);
