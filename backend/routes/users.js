const express = require("express");

const userRouter = express.Router();

const {
  register,
  login,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUser,
  searchUsers,
} = require("../controllers/users");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//end point

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUser);
userRouter.get("/", authentication, authorization("ADMIN"), getAllUsers);
userRouter.get("/search/:name", searchUsers);

module.exports = userRouter;

/*
 * Testing Object for register:
{
    "firstName":"osama",
    "lastName":"mohammad",
    "age":"25",
    "country":"jordan",
    "email":"osama@gmail.com",
    "password":"12345678",
    "role_id":"3",
    "img":"https://www.aljazeera.net/wp-content/uploads/2020/05/33d7db29-189c-445f-8f80-3882c67c1993.jpeg?resize=1200%2C675"
}
*/

/*
 * Testing Object for login:
{
    "email":"osama2@gmail.com",
    "password":"1234567"
}
*/
