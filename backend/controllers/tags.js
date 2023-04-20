const { Error } = require("mongoose");
const { pool } = require("../models/db");

const addTag = (req, res) => {
  const { tag } = req.body;

  const data = [tag];
  const query = `INSERT INTO tags (tag) VALUES ($1) RETURNING  *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "tags created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deleteTag = (req, res) => {
  const id = req.params.id;
  const data = [id];
  const query = `DELETE FROM  tags WHERE id=$1 RETURNING  *;`;
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(201).json({
          success: true,
          message: `the tag with the id:${id} delete successfully`,
        });
      } else {
        res.status(404).json({
          success: true,
          message: `the tag with the id:${id} is not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllTag = (req, res) => {
  const query = `SELECT * FROM tags;`;
  pool
    .query(query)
    .then((result) => {
      console.log("result");
      res.status(201).json({
        success: true,
        message: "Get all tags successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateTag = (req, res) => {
  const id = req.params.id;
  const { tag } = req.body;

  const query = `
    UPDATE tags 
    SET tag =$1
    WHERE id=$2 RETURNING  *`;
  const data = [tag, id];
  console.log(data);
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The tag with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `get the tag with id: ${id} successfully`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  addTag,
  deleteTag,
  getAllTag,
  updateTag,
};
