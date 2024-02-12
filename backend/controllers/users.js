const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  /* 
POST http://localhost:5000/users/register

{
    "email": "user3@gmail.com",
    "user_name": "user3",
    "password": "123456",
    "image": "img_url",
    "first_name": "fName",
    "last_name": "lName",
    "birthday": "2000-01-01",
    "gender": "male",
    "phone_number": "0790000004",
    "school": "school",
    "address": "home",
    "city": "Amman",
    "country": "Jordan"
}
*/
  const {
    email,
    user_name,
    password,
    image,
    first_name,
    last_name,
    birthday,
    gender,
    phone_number,
    school,
    address,
    city,
    country,
  } = req.body;

  const role_id = "2"; //! edit the value of role_id depend on role id in role table.

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (email, user_name, password, image, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;

  const data = [
    email.toLowerCase(),
    user_name,
    encryptedPassword,
    image,
    role_id,
  ];

  pool
    .query(query, data)
    .then(async (result) => {
      // add extra information to user_profile
      const user_id = result.rows[0].id;

      const query = `INSERT INTO user_profile 
      (user_id, first_name, last_name, birthday, gender, phone_number, school, address, city, country) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`;

      const data = [
        user_id,
        first_name,
        last_name,
        birthday,
        gender,
        phone_number,
        school,
        address,
        city,
        country,
      ];

      await pool
        .query(query, data)
        .then((result) => {
          console.log("user_profile created");
        })
        .catch((err) => {
          console.log({
            success: false,
            message: "user_profile error",
            err,
          });
        });

      // returning the result of creating new user
      console.log("Account created successfully");
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

const login = (req, res) => {
  /* 
POST http://localhost:5000/users/login

{
    "email": "user3@gmail.com",
    "password": "123456",
}
*/

  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

module.exports = {
  register,
  login,
};
