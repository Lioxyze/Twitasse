const express = require("express");
const {
  AddPost,
  getAllPost,
  UpdatePosts,
  getSpecificPost,
  GetPublicationByUserId,
  deletePost,
} = require("../PostController");
const publi = express.Router();

publi.post("/AddPost", AddPost);
publi.get("/AllPost", getAllPost);
publi.patch("/UpdatePost/:id", UpdatePosts);
publi.get("/getSpecificPost/:id", getSpecificPost);
publi.get("/GetPublicationByUserId", GetPublicationByUserId);
publi.delete("/deletePost/:id", deletePost);

module.exports = publi;
