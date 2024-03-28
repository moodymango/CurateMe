const db = require("../db/db.js");
const collectionsController = {};
// @desc        Add/read user favorites collection
// @route       CREATE /:user/collections/
//custom errors for error handling
class collectionsControllerError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = "collectionsController Error";
  }
}
//read all artworks in user favorite collection
collectionsController.readFavorites = async (req, res, next) => {
  const userObj = req.user;
  const client = await db.pool.connect();
  const retrieveFavorites = `SELECT * FROM viewFavorites($1)`;
  const favoritesParams = [userObj.id];
  try {
    const favorites = await client.query(retrieveFavorites, favoritesParams);
    if (!favorites.rowCount) {
      throw new collectionsControllerError(404, "No favorites found yet");
    } else {
      client.release();
      return res.status(200).json(favorites.rows);
    }
  } catch (err) {
    client.release();
    console.log("error when reading user favorites", err);
    next({
      log: "Error when creating favorite's collection for individual user",
      status: err.status,
      message: `${err}` || err.message,
    });
  }
};

module.exports = collectionsController;
