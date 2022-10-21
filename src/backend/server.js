const express = require("express");
const cors = require("cors")
const app = express()
const path = require("path")

// Heroku environment
// "start": "react-scripts start",
// "start": "react-scripts start",
const port = process.env.PORT || 5000;
app.use("/", express.static("build"))
app.get("*", (req, res) => {
  res.sendFile(__dirname.replace("src\\backend", "build\\index.html"))
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"))
}

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}))

// Routes
app.use("/", require("./routers/boardsRouter"));

app.listen(port);

