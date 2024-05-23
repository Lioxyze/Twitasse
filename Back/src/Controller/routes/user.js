const express = require("express");
const user = express.Router();
const {
  register,
  login,
  insertImageProfile,
  getAllUsers,
  valideAccount,
  testEmail,
  searchUser,
  DeleteUser,
} = require("../UserController");

user.post("/register", register);
user.post("/login", login);
user.post("/insert/picture", insertImageProfile);
user.get("/getAllUsers", getAllUsers);
user.get("/valideAccount", valideAccount);
user.get("/testEmail", testEmail);
user.post("/searchUser", searchUser);
user.delete("/DeleteUser/:id", DeleteUser);

module.exports = user;
