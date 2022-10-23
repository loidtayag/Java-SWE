const express = require("express");
const cors = require("cors")
const app = express()

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}))

// Routes
app.use("/", require("./routers/boardsRouter"));

app.listen(5000);

