const bodyParser = require("body-parser");
const app = require("express")();
const port = 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use("/", require("./routers/boardsRouter"));
app.listen(port);

