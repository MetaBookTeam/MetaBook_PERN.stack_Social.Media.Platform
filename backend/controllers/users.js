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

// This function will getAllUsers

const getAllUsers = (req, res) => {
  const query = `
  SELECT * 
  FROM users 
  FULL OUTER JOIN user_profile 
  ON users.id = user_profile.user_id 
  WHERE users.is_deleted = 0;
  `;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log(`there is no users in DB`);

        res.status(204).json({
          success: true,
          message: `there is no users in DB`,
        });
      } else if (result.rows.length) {
        console.log(`getAllUsers done`);

        res.status(200).json({
          success: true,
          message: `getAllUsers done`,
          results: result.rows,
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message: "getAllUsers error",
        err,
      });
    });
};

// //? getUserById  /////////////////////////////////

const getUserById = (req, res) => {
  /* 
GET http://localhost:5000/users/:user_id
*/

  /* //! we need to check: 
  1. who have the authority the see the user info and what information shall we share with them:
    a. admin and the account owner (user) => all info
    b. the user's friends =>
    c. anyone else =>

*/

  const { user_id } = req.params;

  const query = `
  SELECT * 
  FROM users 
  FULL OUTER JOIN user_profile 
  ON users.id = user_profile.user_id 
  WHERE users.id = $1
  AND users.is_deleted = 0;
  `;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log(`there is no user with id= ${user_id}`);

        // status 204 will not return and response
        res.status(204).json({
          success: true,
          message: `there is no user with id= ${user_id}`,
        });
      } else if (result.rows.length) {
        console.log(`getUserById done`);
        res.status(200).json({
          success: true,
          message: `getUserById done`,
          results: result.rows,
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message: "getUserById error",
        err,
      });
    });
};

// //? updateUserById  /////////////////////////////////

const updateUserById = (req, res) => {
  //   /*
  //     postman params /:id ==>
  //     PUT http://localhost:5000/users/6595c80555fc1e4be12e5bcc
  //     req.body:
  // {
  //     "firstName": "user edited",
  //     "age": 100
  // }
  //   */
  //   const userId = req.params.id;
  //   // console.log("req.token.userId", req.token.userId);
  //   const {
  //     userName,
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     age,
  //     country,
  //     email,
  //     userCart,
  //     userFav,
  //     // password,
  //     // role,
  //   } = req.body;
  //   //* check the user account ownership before update it.
  //   usersModel
  //     .findById(userId)
  //     .then(async (result) => {
  //       if (
  //         result.id.toString() === req.token.userId ||
  //         req.token.role.role === "admin"
  //       ) {
  //         try {
  //           const findUser = await usersModel.findByIdAndUpdate(userId, {
  //             userName,
  //             firstName,
  //             lastName,
  //             phoneNumber,
  //             age,
  //             country,
  //             email,
  //             userCart,
  //             userFav,
  //             // password,
  //             // role,
  //           });
  //           const updatedUser = {
  //             userName: userName ? userName : findUser.userName,
  //             firstName: firstName ? firstName : findUser.firstName,
  //             lastName: lastName ? lastName : findUser.lastName,
  //             phoneNumber: phoneNumber ? phoneNumber : findUser.phoneNumber,
  //             age: age ? age : findUser.age,
  //             country: country ? country : findUser.country,
  //             email: email ? email : findUser.email,
  //             userCart: userCart ? userCart : findUser.userCart,
  //             userFav: userFav ? userFav : findUser.userFav,
  //             // password: password ? password : findUser.password,
  //             // role: role ? role : findUser.role,
  //           };
  //           console.log(`Updated user id: ${userId}
  //           by: ${
  //             req.token.role.role === "admin"
  //               ? "admin"
  //               : ` the owner id: ${req.token.userId}`
  //           }`);
  //           res.status(200).json({
  //             success: true,
  //             message: "user updated",
  //             user: updatedUser,
  //           });
  //         } catch (err) {
  //           console.log(err);
  //           res.status(500).json({
  //             success: false,
  //             message: "Server Error",
  //             err,
  //           });
  //         }
  //       } else {
  //         console.log("You are not the user account owner");
  //         res.status(500).json({
  //           success: false,
  //           message: "You are not the user account owner",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         success: false,
  //         message: " .findById(userId) Server Error",
  //         err,
  //       });
  //     });
};

// //? deleteUserById  /////////////////////////////////

const deleteUserById = (req, res) => {
  //   /*
  //     postman params /:id ==>
  //     DELETE http://localhost:5000/users/65975437a31cc98f9b7c61e2
  //   */
  //   const userId = req.params.id;
  //   //* check the user account ownership before delete it.
  //   usersModel
  //     .findById(userId)
  //     .then(async (result) => {
  //       if (result === null) {
  //         console.log(`user not found id: ${userId}`);
  //         return res.status(404).json({
  //           success: false,
  //           message: "user not found",
  //         });
  //       }
  //       if (
  //         result.id.toString() === req.token.userId ||
  //         req.token.role.role === "admin"
  //       ) {
  //         try {
  //           const findUser = await usersModel.findByIdAndDelete(userId);
  //           console.log(`user id: ${userId}
  //           Deleted by: ${
  //             req.token.role.role === "admin"
  //               ? "admin"
  //               : ` the owner id: ${req.token.userId}`
  //           }`);
  //           res.status(200).json({
  //             success: true,
  //             message: "user deleted",
  //           });
  //         } catch (err) {
  //           console.log(err);
  //           res.status(500).json({
  //             success: false,
  //             message: "Server Error",
  //             err,
  //           });
  //         }
  //       } else {
  //         console.log("You are not the user account owner");
  //         res.status(500).json({
  //           success: false,
  //           message: "You are not the user account owner",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         success: false,
  //         message: " .findById(userId) Server Error",
  //         err,
  //       });
  //     });
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
