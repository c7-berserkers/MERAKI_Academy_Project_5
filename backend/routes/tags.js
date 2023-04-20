const express = require("express");

const tagRouter = express.Router();

const {
  addTag,
  deleteTag,
  getAllTag,
  updateTag,
} = require("../controllers/tags");

//end point

tagRouter.post("/", addTag);
tagRouter.get("/", getAllTag);
tagRouter.put("/:id", updateTag);
tagRouter.delete("/:id", deleteTag);

module.exports = tagRouter;
