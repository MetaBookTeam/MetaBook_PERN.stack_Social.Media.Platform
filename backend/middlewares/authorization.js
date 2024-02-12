const pool = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const data = [role_id, string];
    const query = `SELECT * FROM role_permission RP INNER JOIN permissions P ON RP.permission_id = P.id WHERE RP.role_id = ($1) AND P.permission = ($2)`;
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "unauthorized" });
      });
  };
};

module.exports = authorization;
