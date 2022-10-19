const pool = require("../db");
const boardsRouter = require("express").Router();
module.exports = boardsRouter;

// GET boards
boardsRouter.get("/boards/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const boards = await pool.query("SELECT * FROM board WHERE user_id = $1", [user_id]);
    const ans = [];
    let boardKey = 0;
    let statusKey = 0;
    let taskKey = 0;

    for (const boardRow of boards.rows) {
      ans.push({
        name: boardRow.name,
        id: boardKey,
        status: []
      });
      const statuses = await pool.query("SELECT * FROM status WHERE board_id = $1", [boardRow.board_id]);
      for (const statusRow of statuses.rows) {
        ans[boardKey].status.push({
          name: statusRow.name,
          tasks: []
        });
        const tasks = await pool.query("SELECT * FROM task WHERE status_id = $1", [statusRow.status_id]);
        for (const taskRow of tasks.rows) {
          ans[boardKey].status[statusKey].tasks.push({
            title: taskRow.name,
            desc: taskRow.desc,
            subtasks: []
          });
          const subtasks = await pool.query("SELECT * FROM subtask WHERE task_id = $1", [taskRow.task_id]);
          for (const subtask of subtasks.rows) {
            ans[boardKey].status[statusKey].tasks[taskKey].subtasks.push({
              desc: subtask.desc,
              finished: !!subtask.finished
            });
          }
          taskKey += 1;
        }
        taskKey = 0;
        statusKey += 1;
      }
      statusKey = 0;
      boardKey += 1;
    }
    console.log(ans);
    res.json(ans);
  } catch (e) {
    console.log(e);
  }
});

// Update(POST, PATCH, DELETE) boards
