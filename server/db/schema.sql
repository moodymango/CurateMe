DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS artworks CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS impressions CASCADE;
DROP TABLE IF EXISTS favorite_artworks CASCADE;
-- DROP TABLE IF EXISTS collection_order CASCADE;


CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(100) NULL,
    "last_name" VARCHAR(100) NULL,
    "username" VARCHAR(100) NOT NULL UNIQUE,
    "pass" VARCHAR NOT NULL
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
    "date_display" VARCHAR(150) NULL,
    "image_id" VARCHAR(200) NULL
);
--sentinel artwork node for the doubly linked list implemenation.

-- INSERT INTO artworks("id", "title") VALUES(1,'sentinel'); 

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

CREATE TABLE "favorite_artworks" (
    "artwork_id" INT NULL,
    "collection_id" INT NULL,
    FOREIGN KEY("collection_id") REFERENCES collections("id") ON DELETE CASCADE,
    FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
);
CREATE INDEX favorites_id ON favorite_artworks USING HASH (collection_id);
CREATE INDEX favorites_artwork_id ON favorite_artworks USING HASH (artwork_id);

--DOUBLY LINKED LIST IMPLEMENTATION FOR COLLECTIONS FEATURING MAX 10 ARTWORKS:

--each colleciton_id references a specific collection associated with a specific user
--users ideally have a max fo 10 artworks within each collection
--each artwork_id references an artwork maintained in the collection
--each artwork contains a position reference, a prev and a next id referencing the id of the artworks before and after it
-- CREATE TABLE "collection_order" (
--     "artwork_id" INT NULL,
--     "collection_id" INT NULL,
--     "position" INT DEFAULT NULL, 
--     "prev_id" INT DEFAULT NULL,
--     "next_id" INT DEFAULT NULL,
--     FOREIGN KEY("collection_id") REFERENCES collections("id") ON DELETE CASCADE,
--     FOREIGN KEY("artwork_id") REFERENCES artworks("id") ON DELETE CASCADE
-- );

-- CREATE INDEX collection_order_prevID ON collection_order (prev_id);
-- CREATE INDEX collection_order_nextID ON collection_order (next_id);

-- CREATE INDEX collection_order_id ON collection_order USING HASH (collection_id);
-- CREATE INDEX collection_order_artwork_id on collection_order USING HASH (artwork_id);
