const db = require("../db/db.js");
const artworkController = {};
// @desc        CRUD functionality with artworks inside a db
// @route       CREATE /:user/collections/

artworkController.addToFavoritesTransaction = async (req, res, next) => {
  const { user } = req.params;

  const { id, title, artist_title, medium, date_display } = req.body;

  const client = db.pool.connect();
  //upsert new artwork into the db
  const innerInsert = `INSERT INTO artworks(id, title, artist_title, medium, date_display, image_id) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING RETURNING id;`;
  const insertArtworkQuery = `WITH artworkCTE AS (${innerInsert}) SELECT * FROM artworkCTE UNION SELECT id FROM artworks WHERE title=$2, artist_title=$3, medium=$4, date_display=$5;`;
  const insertArtworkParams = [id, title, artist_title, medium, date_display];
  //find user favorites collection by id
  const collection_title = "favorites";
  const findUserFavoritesQuery = `SELECT id FROM collections WHERE user_id=$1 AND title=$2;`;
  const findFavortiesParams = [user, collection_title];
  //insert artwork and collection id into collection_order table
  const insertArtworkAndCollectionID = `INSERT INTO collection_order()`;

  try {
    //use SQL Transaction
    await client.query("BEGIN");
    //insert favorites artwork into the db
    const insertedArtwork = await db.query(
      insertArtworkQuery,
      insertArtworkParams
    );
    await client.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK");
    // next({
    //   log: "Error when retrieving user by username and password",
    //   status: err.status,
    //   message: err.message,
    // });
  }
};
module.exports = artworkController;
