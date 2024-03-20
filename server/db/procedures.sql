--creates user and user's favorite collection in db
CREATE OR REPLACE PROCEDURE create_user_transaction(
    IN username VARCHAR(100), 
    IN password_hash VARCHAR(100), 
    IN first_name VARCHAR(100), 
    IN last_name VARCHAR(100))
AS $$
DECLARE
    new_user_id INT;
BEGIN
    --Start transaction
    BEGIN
    --insert the user into the db
    INSERT INTO users(first_name, last_name, username, password)
    VALUES (first_name, last_name, username, password_hash)
    RETURNING id INTO new_user_id;

    --create favorite collection using user id
    INSERT INTO collections(user_id, title, description) 
    VALUES(new_user_id, 'favorites', 'Favorite artworks');

    --commit transaction
    COMMIT;
    --output success message
    RAISE NOTICE 'New user "%" with first name "%" has been added and favorites collection was created', username, first_name;
    EXCEPTION
        -- Rollback the transaction if any error occurs
        WHEN others THEN
            ROLLBACK;
            RAISE EXCEPTION 'Error occurred while adding new user and making favorite collection';
    END;
END;
$$ LANGUAGE plpgsql;

--finds user by username and returns the id and pass
--MAYBE HAVE TO TRANSFORM INTO A FUNCTION!!

-- CREATE OR REPLACE PROCEDURE locate_user(
--     userID IN VARCHAR(100), 
--     password_hash IN VARCHAR(100),
--     found_user INOUT NULL
-- )
-- AS $$
-- BEGIN
--     SELECT id, first_name, password INTO found_user FROM users WHERE username=userID;
--     --output success message
--     RAISE NOTICE 'Retrieved user by username "%".', username;
-- END;
-- $$ LANGUAGE plpgsql;

--finds the user's favorite collection by id
CREATE OR REPLACE PROCEDURE locate_favorites_id(
    userID IN INT,
    collection_id INOUT INT
    )
AS $$
BEGIN
    --retrieve collection_id of user favorites collection
    SELECT id INTO collection_id FROM collections WHERE user_id=userID AND title='favorites';

    RAISE NOTICE 'Located user collection of favorites by id';
END;
$$ LANGUAGE plpgsql;


--finds the user's favorites by user_id and returns a table of artworks
-- WILL MOST LIKELY HAVE TO TRANSFORM INTO A FUNCTION
CREATE OR REPLACE PROCEDURE viewFavorites(userID IN INT)
AS $$
DECLARE
    user_collection_id INT;
BEGIN
    user_collection_id := CALL locate_favorites_id(userID);
    -- CALL locate_favorites_id(userID) INTO user_collection_id;

    --find all artworks within the user collection based on user_collection_id
    RETURN QUERY 
    SELECT a.id, a.title, a.artist_title, a.medium, a.date_display, c.title FROM artworks a 
    INNER JOIN favorite_artworks ON artworks.id = favorite_artworks.artwork_id 
    INNER JOIN collections c ON collections.id = favorite_artworks.collection_id 
    WHERE collections.id=user_collection_id;
END;
$$ LANGUAGE plpgsql;

--upserts artwork into db and inserts artwork into favorite_artworks table
CREATE OR REPLACE PROCEDURE favorite_artworks(
    userID IN INT, 
    artworkID IN INT, 
    artwork_title IN VARCHAR(150), 
    artist IN VARCHAR(150), 
    med IN VARCHAR(150), 
    date_dis IN VARCHAR(150), 
    imageID IN VARCHAR(150))
AS $$
DECLARE
    art_id INT;
    favorite_collection_id INT;
BEGIN
    BEGIN
    WITH artworkCTE
    AS(
         --upsert artwork into the db    
        INSERT INTO artworks(id, title, artist_title, medium, date_display, image_id) 
        VALUES(artworkID, artwork_title, artist, med, date_dis, imageID) 
        ON CONFLICT (id) DO NOTHING RETURNING id INTO art_id
    )
    SELECT * FROM artworkCTE UNION SELECT art_id FROM artworks WHERE image_id=imageID;

    --find user favorites collection by id
    fav_collection_id := CALL locate_favorites_id(userID);
    -- CALL locate_favorites_id(userID) INTO fav_collection_id;

    --insert artwork and collection id into favorite_artworks table
    INSERT INTO favorite_artworks(artwork_id, collection_id) VALUES(art_id, favorite_collection_id);
    COMMIT;
    --output success message
    RAISE NOTICE 'New user "%" with first name "%" has been added.', username, first_name;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE removeArtworkFromFavorites(
    userID IN INT, 
    artworkID IN INT)
AS $$
DECLARE
    user_collection_id INT;
BEGIN
    user_collection_id := CALL locate_favorites_id(userID);
    -- CALL locate_favorites_id(userID) INTO user_collection_id;
   --delete the artwork from the favorite_artworks table based on collection and artwork id
   DELETE FROM favorite_artworks WHERE collection_id=user_collection_id AND artwork_id=artworkID;
   RAISE NOTICE 'Artwork was removed from the user favorites collection', username, first_name;
END;
$$ LANGUAGE plpgsql;
