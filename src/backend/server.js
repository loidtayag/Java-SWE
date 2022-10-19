const app = require("express")();
const cors = require("cors")
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000"
}))
app.use("/", require("./routers/boardsRouter"));
app.listen(port);

