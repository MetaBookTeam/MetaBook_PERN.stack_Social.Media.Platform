const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  /* 
POST http://localhost:5000/users/register

{
    "email": "bugger@gmail.com",
    "user_name": "Bugger",
    "password": "Bug_123456",
    "image": "http://res.cloudinary.com/dpbh42kjy/image/upload/v1708864871/kk9y6ycii6xwvezxbvgx.jpg",
    "first_name": "Bug",
    "last_name": "Coder",
    "birthday": "2000-05-18",
    "gender": "male",
    "phone_number": "0790000006",
    "school": "Erroring",
    "city": "CatchError",
    "state": "Throw",
    "country": "Virus",
    "cover_photo": "http://res.cloudinary.com/dpbh42kjy/image/upload/v1708868452/gbjzxlonkhr629vgmfau.webp"
}
*/
  //http://localhost:5000/users/register

  /*test in ahmad {
    "email": "ahmad@gmail.com",
    "user_name": "ahmad",
    "password": "123456",
    "image": "img_url",
    "first_name": "fName",
    "last_name": "lName",
    "birthday": "2000-01-01",
    "gender": "male",
    "phone_number": "0789894881",
    "school": "school",
    "city": "zarqa",
    "state": "zarqa",
    "country": "Jordan"
} */

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
    city,
    state,
    country,
    cover_photo,
  } = req.body;

  const role_id = "1"; //! edit the value of role_id depend on role id in role table.

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (email, user_name, password, image, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;
  `;

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

      const query = `
      INSERT INTO user_profile 
      (user_id, first_name, last_name, birthday, gender, phone_number, school, city, state, country, cover_photo) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;

      const data = [
        user_id,
        first_name,
        last_name,
        birthday,
        gender,
        phone_number,
        school,
        city,
        state,
        country,
        cover_photo,
      ];

      await pool
        .query(query, data)
        .then((result) => {
          console.log("user_profile created");
        })
        .catch((error) => {
          console.log({
            success: false,
            message: "user_profile error",
            error,
          });
        });

      // returning the result of creating new user
      console.log("Account created successfully");
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        error,
      });
    });
};

const login = (req, res) => {
  /* 
POST http://localhost:5000/users/login

{
    "email": "user3@gmail.com",
    "password": "123456"
}
*/

  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = $1 AND is_deleted = 0;`;
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
            res.status(500).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        error,
      });
    });
};

//? getAllUsers  /////////////////////////////////

const getAllUsers = (req, res) => {
  const query = `   
  with cte_following as (
    select user_id, array_agg(friend_id) as following
    from friends
    group by user_id
    ),

  cte_followers as (
    select friend_id, array_agg(user_id) as followers
    from friends
    group by friend_id
    )

  SELECT *

  FROM users 

  FULL OUTER JOIN user_profile 
    ON users.id = user_profile.user_id 

  left join cte_following fg
    on users.id = fg.user_id

  left join cte_followers fr
    on users.id = fr.friend_id

  WHERE users.is_deleted = 0
  
  ORDER BY users.id;
  `;
  pool
    .query(query)
    .then((result) => {
      if (!result.rows.length) {
        console.log(`there is no users in DB`);
        // res.status(204) will not send back a response
        res.status(404).json({
          success: false,
          message: `there is no users in DB`,
        });
        return;
      }

      // console.log(`getAllUsers done`);
      res.status(200).json({
        success: true,
        message: `getAllUsers done`,
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        message: "getAllUsers error",
        error,
      });
    });
};

//? getUserById  /////////////////////////////////

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

  const query = `   with cte_following as (
    select user_id, array_agg(friend_id) as following
    from friends
    group by user_id
    ),

  cte_followers as (
    select friend_id, array_agg(user_id) as followers
    from friends
    group by friend_id
    )

  SELECT *

  FROM users 

  FULL OUTER JOIN user_profile 
    ON users.id = user_profile.user_id 

  left join cte_following fg
    on users.id = fg.user_id

  left join cte_followers fr
    on users.id = fr.friend_id

  WHERE users.id = $1 AND users.is_deleted = 0
  
  ORDER BY users.id;
  `;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (!result.rows.length) {
        console.log(`there is no user with id= ${user_id}`);
        // res.status(204) will not send back a response
        res.status(404).json({
          success: true,
          message: `there is no user with id= ${user_id}`,
        });
        return;
      }

      // console.log(`getUserById done`);
      res.status(200).json({
        success: true,
        message: `getUserById done`,
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "getUserById error",
        error,
      });
    });
};

// //? updateUserById  /////////////////////////////////

const updateUserById = (req, res) => {
  /* 
PUT http://localhost:5000/users/2

{
    "email": "user3edited@gmail.com",
    "user_name": "user3 Edited",
    "image": "img_url Edited",
    "first_name": "fName Edited",
    "last_name": "lName Edited",
    "birthday": "2000-11-11",
    "gender": "female",
    "phone_number": "0790000014",
    "school": "school Edited",
    "city": "Amman Edited",
    "state": "Amman Edited",
    "country": "Jordan Edited"
    "cover_photo": "cover photo URL",
    "bio": "Updated BIO"
}
*/
  //@ add new route for password only {"password": "123456"}
  //@ after updating the Email or password the user shall logout.
  //@ check if the user he is the one how edit the profile.

  /* //! we need to check: 
  1. who have the authority the see the user info and what information shall we share with them:
    a. admin and the account owner (user) => all info
    b. the user's friends =>
    c. anyone else =>
*/

  const {
    email,
    user_name,
    // password,
    image,
    first_name,
    last_name,
    birthday,
    gender,
    phone_number,
    school,
    city,
    state,
    country,
    cover_photo,
    bio,
  } = req.body;

  const { user_id } = req.params;

  const query = `
WITH updated_user AS (
    UPDATE users
    SET ( email, user_name, image ) 
    = ( COALESCE($2, email), COALESCE($3, user_name), COALESCE($4, image) ) 
    WHERE id=$1
    RETURNING *
)

UPDATE user_profile
  SET ( first_name, last_name, birthday, gender, phone_number, school, city, state, country, cover_photo, bio ) 
  = ( COALESCE($5, first_name), COALESCE($6, last_name), COALESCE($7, birthday), COALESCE($8, gender), COALESCE($9, phone_number), COALESCE($10, school), COALESCE($11, city), COALESCE($12, state), COALESCE($13, country), COALESCE($14, cover_photo), COALESCE($15, bio) ) 
  WHERE id=$1 RETURNING *;
`;
  //! this combined query will retune update data from user_profile table only.

  const data = [
    user_id,
    email,
    user_name,
    image,
    first_name,
    last_name,
    birthday,
    gender,
    phone_number,
    school,
    city,
    state,
    country,
    cover_photo,
    bio,
  ];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        console.log(`updateUserById done`);
        res.status(200).json({
          success: true,
          message: `updateUserById done`,
          result: result.rows,
        });
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      console.log("updateUserById error");
      res.status(403).json({
        success: false,
        message: "updateUserById error",
        error,
      });
    });

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
  //         } catch (error) {
  //           console.log(error);
  //           res.status(500).json({
  //             success: false,
  //             message: "Server Error",
  //             error,
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
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(500).json({
  //         success: false,
  //         message: " .findById(userId) Server Error",
  //         error,
  //       });
  //     });
};

//? softDeleteUserById  /////////////////////////////////
const softDeleteUserById = (req, res) => {
  /* 
DELETE http://localhost:5000/users/3
*/
  //@ after deleting the user the app shall logout.
  //@ check if the user he is the one who delete the profile.

  const { user_id } = req.params;

  const query = `UPDATE users SET is_deleted = 1 WHERE id=$1 RETURNING *;`;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        console.log(`softDeleteUserById done`);
        res.status(410).json({
          success: true,
          message: `softDeleteUserById done`,
          result: result.rows,
        });
      } else throw Error;
    })
    .catch((error) => {
      console.log("softDeleteUserById error");
      res.status(500).json({
        success: false,
        message: "softDeleteUserById error",
        error,
      });
    });

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
  //         } catch (error) {
  //           console.log(error);
  //           res.status(500).json({
  //             success: false,
  //             message: "Server Error",
  //             error,
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
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(500).json({
  //         success: false,
  //         message: " .findById(userId) Server Error",
  //         error,
  //       });
  //     });
};

//? hardDeleteUserById  /////////////////////////////////
const hardDeleteUserById = (req, res) => {
  /* 
DELETE http://localhost:5000/users/delete/3
*/
  //@ after deleting the user the app shall logout.
  //@ check if the user he is the one who delete the profile.

  const { user_id } = req.params;

  const query = `DELETE FROM users WHERE id=$1 RETURNING *;`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (!result.rows.length) {
        console.log(`user not found or already deleted.`);
        res.status(410).json({
          success: true,
          message: `user not found or already deleted.`,
        });
        return;
      }

      console.log(`hardDeleteUserById done`);
      res.status(410).json({
        success: true,
        message: `hardDeleteUserById done`,
        result: result.rows,
      });
    })
    .catch((error) => {
      console.log("hardDeleteUserById error");
      res.status(500).json({
        success: false,
        message: "hardDeleteUserById error",
        error,
      });
    });
};

const getAllFriends = async (req, res) => {
  const { userId } = req.token;

  const placeholder = [userId];

  try {
    const friends = await pool.query(
  //     `
  //   SELECT
  //     friends.user_id,
  //     friends.friend_id,
  //   --users.user_name,
  //     user_profile.first_name AS follower_first_name,
  //     user_profile.last_name AS follower_last_name ,
  //   --users.image,
  //     friends.created_at
  
  // FROM friends 
  
  // LEFT JOIN users
  //     ON users.id = friends.user_id
  
  // LEFT JOIN user_profile
  //     ON user_profile.user_id = friends.Friend_id
  
  // WHERE users.id = $1;
  //     `,
  //! I will get all users then handle which one is a friend from the followers column in getAllUsers
      `
      SELECT
        friends.user_id,
        friends.friend_id,
      --users.user_name,
        user_profile.first_name AS follower_first_name,
        user_profile.last_name AS follower_last_name ,
      --users.image,
        friends.created_at
    
    FROM friends 
    
    LEFT JOIN users
        ON users.id = friends.user_id
    
    LEFT JOIN user_profile
        ON user_profile.user_id = friends.Friend_id
    
    WHERE users.id = $1;
        `,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: `All friends of User No.${userId}`,
      result: friends.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "getAllFriends Server error",
      error,
    });
  }
};

const isMyFriend = async (req, res) => {
  const { userId } = req.token;
  const { friend_id } = req.params;

  const placeholder = [userId, friend_id];

  try {
    const friends = await pool.query(
      `SELECT user_id,friend_id FROM friends WHERE user_id=$1 AND friend_id = $2`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: `User No.${friend_id} is friend with User No.${userId}`,
      result: friends.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "isMyFriend Server error",
      error,
    });
  }
};

const addFriend = async (req, res) => {
  const { userId } = req.token;
  const { friend_id } = req.params;
  const placeholder = [userId, friend_id];
  try {
    const select = await pool.query(
      `SELECT user_id,friend_id FROM friends WHERE user_id= $1 AND friend_id = $2`,
      placeholder
    );
    if (!select.rowCount >= 1) {
      const addFriend = await pool.query(
        `INSERT INTO friends (user_id,friend_id) VALUES ($1,$2) RETURNING *`,
        placeholder
      );
      res.status(200).json({
        success: true,
        message: "Friend added successfully",
        result: addFriend.rows,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You are a friend",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

const deleteFriend = async (req, res) => {
  const { userId } = req.token;
  const { friend_id } = req.params;
  const placeholder = [friend_id, userId];
  try {
    const deleteFriend = await pool.query(
      `DELETE FROM friends WHERE friend_id=$1 AND user_id=$2`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      result: deleteFriend.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  softDeleteUserById,
  hardDeleteUserById,
  getAllFriends,
  isMyFriend,
  addFriend,
  deleteFriend,
};
