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
  const createFavoritesProcedure =
    "CALL favorite_artworks($1, $2, $3, $4, $5, $6, $7);";
  const insertArtworkParams = [
    user,
    artworkId,
    title,
    artist_title,
    medium,
    date_display,
    image_id,
  ];
  try {
    //use SQL Transaction
    await client.query("BEGIN");
    const insertedArtwork = await client.query(
      createFavoritesProcedure,
      insertArtworkParams
    );
    await client.query("COMMIT");
    client.release();
  } catch (err) {
    console.log("db error is ", err);
    await client.query("ROLLBACK");
    client.release();
    next({
      log: `${err}` || "Error when retrieving user by username and password",
      status: err.status,
      message: err.message,
    });
  }
};
artworkController.removeFromFavoritresTransaction = async (req, res, next) => {
  const userObj = req.user;
  const { artworkId } = req.body;
  const user = userObj.id;

  //call procedure to remove artwork from user favotites collection
  const removeFromFavoritesProcedure =
    "CALL removeArtworkFromFavorites($1, $2);";
  const procedureParams = [user, artworkId];
  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");
    const removed = await client.query(
      removeFromFavoritesProcedure,
      procedureParams
    );
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
