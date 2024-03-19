const db = require("../db/db.js");
const collectionsController = {};
// @desc        Add/read user favorites collection
// @route       CREATE /:user/collections/favorites
//custom errors for error handling
class collectionsControllerError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = "collectionsController Error";
  }
}
//create favorite collection for individual user
collectionsController.createFavorites = async (req, res, next) => {
  const { id } = res.locals.userID;

  const client = await db.pool.connect();

  const title = "favorites";
  const description = `Favorite artworks`;
  const createFavoriteCollectionQuery = `INSERT INTO collections(user_id, title, description) VALUES($1, $2, $3) RETURNING id;`;
  const createFavoriteParams = [id, title, description];
  try {
    //use SQL transaction
    await client.query("BEGIN");

    const favoriteCollectionData = await client.query(
      createFavoriteCollectionQuery,
      createFavoriteParams
    );
    if (favoriteCollectionData.rowCount < 1) {
      throw new collectionsControllerError(
        404,
        `No favorite collection found by user ${id}`
      );
    }
    await client.query("COMMIT");
    client.release();
    next();
  } catch (err) {
    await client.query("ROLLBACK");
    client.release();
    next({
      log: "Error when creating favorite's collection for individual user",
      status: err.status,
      message: err.message,
    });
  }
};
//read all artworks in user favorite collection
collectionsController.readFavorites = async (req, res, next) => {
  const userObj = req.user;
  const client = await db.pool.connect();
  const title = "favorites";
  const retrieveFavorites = `SELECT id FROM collections WHERE user_id=$1 AND title=$2;`;
  const favoritesParams = [userObj.id, title];
  try {
    //use SQL transaction
    await client.query("BEGIN");
    const favoritesData = await client.query(
      retrieveFavorites,
      favoritesParams
    );
    if (favoriteCollectionData.rowCount < 1) {
      throw new collectionsControllerError(
        404,
        `No favorite collection found by user ${id}`
      );
    }
    //save the id of the favorites collection
    const collectionObj = favoritesData.rows[0];
    const collection_id = collectionObj.id;

    //use CTE to create readable join table
    const innerSelect =
      "SELECT c.description, a.id, a.title, a.artist_title, a.medium, a.date_display FROM artworks a INNER JOIN favorite_artworks USING (artwork_id) INNER JOIN collections c USING(collection_id) WHERE c.id=$1";
    const userFavoritesTableCTE = `WITH user_favorite_artworks AS (${innerSelect}) SELECT * FROM user_favorite_artworks;`;
    const userFavoriteArtworks = await client.query(userFavoritesTableCTE, [
      collection_id,
    ]);
    if (userFavoriteArtworks.rowCount < 0) {
      res.status.json("No artworks in user favorite collection yet.");
    }
    await client.query("COMMIT");
    client.release();
    return res.status(200).json(res.locals.userID);
  } catch (err) {
    await client.query("ROLLBACK");
    client.release();
    console.log("error when reading user favorites", err);
    // next({
    //   log: "Error when creating favorite's collection for individual user",
    //   status: err.status,
    //   message: err.message,
    // });
  }
};

module.exports = collectionsController;
