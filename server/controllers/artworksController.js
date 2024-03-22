const db = require("../db/db.js");
const artworkController = {};
// @desc        CRUD functionality with artworks inside a db
// @route       CREATE /:user/collections/
artworkController.addToFavoritesTransaction = async (req, res, next) => {
  const userObj = req.user;
  const user = userObj.id;
  const { artworkId, title, artist_title, medium, date_display, image_id } =
    req.body;
  const client = await db.pool.connect();
  //upsert new artwork into the db
  // const innerInsert = `INSERT INTO artworks(id, title, artist_title, medium, date_display, image_id) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING RETURNING id`;
  // const insertArtworkQuery = `WITH artworkCTE AS (${innerInsert}) SELECT * FROM artworkCTE UNION SELECT id FROM artworks WHERE image_id=$6;`;
  const insertArtworkParams = [
    user,
    artworkId,
    title,
    artist_title,
    medium,
    date_display,
    image_id,
  ];
  //find user favorites collection by id
  // const collection_title = "favorites";
  // const findUserFavoritesQuery = `SELECT id FROM collections WHERE user_id=$1 AND title=$2;`;
  // const findFavortiesParams = [user, collection_title];
  // //insert artwork and collection id into "favorites artwork table"
  // const insertArtworkAndCollectionID = `INSERT INTO favorite_artworks(artwork_id, collection_id) VALUES($1, $2);`;
  const createFavoritesProcedure =
    "CALL favorite_artworks($1, $2, $3, $4, $5, $6, $7);";
  try {
    //use SQL Transaction
    await client.query("BEGIN");
    const insertedArtwork = await client.query(
      createFavoritesProcedure,
      insertArtworkParams
    );
    // //insert favorites artwork into the db
    // const insertedArtwork = await client.query(
    //   insertArtworkQuery,
    //   insertArtworkParams
    // );
    // const insertedArtworkID = insertedArtwork.rows[0].id;
    // //find user favorites collection by id
    // const foundUser = await client.query(
    //   findUserFavoritesQuery,
    //   findFavortiesParams
    // );
    // const userCollectionID = foundUser.rows[0].id;
    // //insert artworks into the favorites table based on collection_id
    // const insertedIntoFavorites = client.query(insertArtworkAndCollectionID, [
    //   insertedArtworkID,
    //   userCollectionID,
    // ]);
    await client.query("COMMIT");
    client.release();
  } catch (err) {
    console.log("db error is ", err);
    await client.query("ROLLBACK");
    // next({
    //   log: `${err}` || "Error when retrieving user by username and password",
    //   status: err.status,
    //   message: err.message,
    // });
  }
};
artworkController.removeFromFavoritresTransaction = async (req, res, next) => {
  const userObj = req.user;
  const { artworkID } = req.body;
  const user = userObj.id;
  //call procedure to remove artwork from user favotites collection
  const removeFromFavoritesProcedure =
    "CALL removeArtworkFromFavorites($1, $2);";
  const procedureParams = [user, artworkID];
  //retrieve the user favoritre collection based on the user id
  // const favoriteCollectionQuery =
  //   "SELECT id FROM collections WHERE user_id=$1 AND title=$2;";
  // const favoriteCollectionParams = [user, "favorites"];
  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");
    const removed = await client.query(
      removeFromFavoritesProcedure,
      procedureParams
    );
    // const foundCollectionID = await client.query(
    //   favoriteCollectionQuery,
    //   favoriteCollectionParams
    // );
    // const favoritesID = foundCollectionID.rows[0].id;
    // const removeFromFavorites =
    //   "DELETE FROM favorite_artworks WHERE collection_id=$1 AND artwork_id=$2;";
    // const removeParams = [favoritesID, artworkID];
    // const removedArtwork = await client.query(
    //   removeFromFavorites,
    //   removeParams
    // );

    client.release();
  } catch (err) {
    await client.query("ROLLBACK");
    client.release();
    console.log("error when removing favorite artwork from user account");
    // next({
    //   log: "Error when retrieving user by username and password",
    //   status: err.status,
    //   message: err.message,
    // });
  }
};
module.exports = artworkController;
