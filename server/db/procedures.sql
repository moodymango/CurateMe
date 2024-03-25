--FUNCTIONS
--finds the user's favorite collection by id
DROP FUNCTION IF EXISTS locate_favorites_id;
CREATE OR REPLACE FUNCTION locate_favorites_id(userID INT)
RETURNS INT
AS $$
DECLARE favorites_id INT;
BEGIN
    --find user favorite collection by userID and favorite's title
    SELECT id INTO favorites_id FROM collections WHERE user_id=userID AND title='favorites';

    IF NOT found THEN
     RAISE 'Favorites collection with userID % not found', userID;
    END IF;

    RETURN favorites_id;
END;
$$ LANGUAGE plpgsql;

--finds the user's favorites by user_id and returns a table of artworks
DROP FUNCTION IF EXISTS viewFavorites;
CREATE OR REPLACE FUNCTION viewFavorites(userID IN INT)
RETURNS TABLE ( 
    artwork_title VARCHAR,
    artwork_artist_title VARCHAR,
    artwork_medium VARCHAR,
    artwork_date VARCHAR,
    collection_title VARCHAR
)
AS $$
DECLARE
    user_collection_id INT;
BEGIN

    SELECT locate_favorites_id(userID) INTO user_collection_id;
    --find all artworks within the user collection based on user_collection_id
    RETURN QUERY 
    SELECT a.id, a.title, a.artist_title, a.medium, a.date_display, c.title FROM artworks a 
    INNER JOIN favorite_artworks ON a.id = favorite_artworks.artwork_id 
    INNER JOIN collections c ON c.id = favorite_artworks.collection_id 
    WHERE c.id=user_collection_id;
END;
$$ LANGUAGE plpgsql;

--finds user by username and returns the id and pass
DROP FUNCTION IF EXISTS locate_user_by_username;
CREATE OR REPLACE FUNCTION locate_user_by_username(
    user_name IN VARCHAR(100) 
)
RETURNS TABLE (
    user_id INT,
    user_first_name VARCHAR,
    user_password VARCHAR
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT id, first_name, password FROM users WHERE username=user_name;
    --output success message
    RAISE NOTICE 'Retrieved user by username "%".', user_name;
END;
$$ LANGUAGE plpgsql;


--STORED PROCEDURES
--creates user and user's favorite collection in db
DROP PROCEDURE IF EXISTS create_user_transaction;
CREATE OR REPLACE PROCEDURE create_user_transaction(
    IN user_name VARCHAR, 
    IN password_hash VARCHAR, 
    IN f_name VARCHAR, 
    IN l_name VARCHAR)
AS $$
DECLARE
    new_user_id INT;
BEGIN
        -- Insert the user into the db
        INSERT INTO users(first_name, last_name, username, password)
        VALUES (f_name, l_name, user_name, password_hash)
        RETURNING id INTO new_user_id;

        -- Create favorite collection using user id
        INSERT INTO collections(user_id, title, description) 
        VALUES(new_user_id, 'favorites', 'Favorite artworks');
        -- Commit transaction
        COMMIT;
        
      
        

        -- Output success message
        RAISE NOTICE 'New user "%" with first name "%" has been added and favorites collection was created', user_name, f_name;
END;
$$ LANGUAGE plpgsql;

--upserts artwork into db and inserts artwork into favorite_artworks table
DROP PROCEDURE IF EXISTS favorite_artworks;
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
     --upsert artwork into the db    
    WITH artworkCTE
    AS(
        INSERT INTO artworks(id, title, artist_title, medium, date_display, image_id) 
        VALUES(artworkID, artwork_title, artist, med, date_dis, imageID) 
        ON CONFLICT (id) DO NOTHING RETURNING id INTO art_id
    )
    SELECT * FROM artworkCTE UNION SELECT art_id FROM artworks WHERE image_id=imageID;

    --find user favorites collection by id
        SELECT locate_favorites_id(userID) INTO favorite_collection_id;

    --insert artwork and collection id into favorite_artworks table
    INSERT INTO favorite_artworks(artwork_id, collection_id) VALUES(art_id, favorite_collection_id);

     --output success message
    RAISE NOTICE 'Artwork has been added to new user collection';  
END;
$$ LANGUAGE plpgsql;

--removes an artwork by artwork id from the user's favorite collection
DROP PROCEDURE IF EXISTS removeArtworkFromFavorites;
CREATE OR REPLACE PROCEDURE removeArtworkFromFavorites(
    userID INT, 
    artworkID INT)
AS $$
DECLARE
    user_collection_id INT;
BEGIN
--locate collection of user favorites by id
    SELECT locate_favorites_id(userID) INTO user_collection_id;
   --delete the artwork from the favorite_artworks table based on collection and artwork id
   DELETE FROM favorite_artworks WHERE collection_id=user_collection_id AND artwork_id=artworkID;
   RAISE NOTICE 'Artwork was removed from the user % favorites collection', username;
END;
$$ LANGUAGE plpgsql;
