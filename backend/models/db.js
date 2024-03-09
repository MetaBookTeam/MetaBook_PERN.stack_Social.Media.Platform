const { Pool } = require("pg");

const mongoose = require("mongoose");

const connectionString = process.env.DB_URL_kamal;
// const connectionString = process.env.DB_URL_nassar;
// const connectionString = process.env.DB_URL_osama;
// const connectionString = process.env.DB_URL_saqqa;

const pool = new Pool({
  connectionString,
});
pool
  .connect()
  .then((res) => {
    console.log(`DB connected to ${res.database}`);
  })
  .catch((err) => {
    console.log(err);
  });
// connecting to mongodb

// mongoose.connect(process.env.DB_URI).then(
//   () => {
//     console.log("DB Ready To Use");
//   },
//   (err) => {
//     console.log(err);
//   }
// );

module.exports = pool;
