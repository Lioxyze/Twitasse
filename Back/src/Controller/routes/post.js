const express = require("express");
const {
  AddPost,
  getAllPost,
  deletePost,
  UpdatePost,
  getSpecificPost,
  GetPublicationByUserId,
} = require("../PostController");
const publi = express.Router();

publi.post("/AddPost", AddPost);
publi.get("/AllPost", getAllPost);
publi.delete("/deletePost/:id", deletePost);
publi.put("/UpdatePost/:id", UpdatePost);
publi.get("/getSpecificPost/:id", getSpecificPost);
publi.get("/GetPublicationByUserId", GetPublicationByUserId);

module.exports = publi;
