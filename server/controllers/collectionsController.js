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
    //use SQL transaction
    await client.query("BEGIN");
    const favorites = client.query(retrieveFavorites, favoritesParams);
    console.log("favorites data is ", favorites.data);
    await client.query("COMMIT");
    client.release();
    return res.status(200).json(favorites.data);
  } catch (err) {
    await client.query("ROLLBACK");
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
