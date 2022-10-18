const pool = require("../db");
const boardsRouter = require("express").Router();
module.exports = boardsRouter;

// GET boards
boardsRouter.get("/boards/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const boards = await pool.query("SELECT * FROM board WHERE user_id = $1", [user_id]);
    res.json(boards)
  } catch (e) {
    console.log(e);
  }
});

// Update(POST, PATCH, DELETE) boards
