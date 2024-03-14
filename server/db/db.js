const { Pool } = require("pg");
require("dotenv").config();

const url = process.env.PG_URL;

const pool = new Pool({
  connectionString: url,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text, params);
    return pool.query(text, params, callback);
  },
  pool,
};
