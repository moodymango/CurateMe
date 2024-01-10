const { Pool } = require("pg");

const url = process.env.PG_URL;

const pool = new Pool({
  connectionString: url,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
