const express = require("express");
const {
  AddPost,
  getAllPost,
  UpdatePost,
  getSpecificPost,
  GetPublicationByUserId,
  deletePost,
} = require("../PostController");
const publi = express.Router();

publi.post("/AddPost", AddPost);
publi.get("/AllPost", getAllPost);
publi.put("/UpdatePost/:id", UpdatePost);
publi.get("/getSpecificPost/:id", getSpecificPost);
publi.get("/GetPublicationByUserId", GetPublicationByUserId);
publi.delete("/deletePost/:id", deletePost);

module.exports = publi;
